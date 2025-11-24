const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
}).use(require('markdown-it-mathjax3'));

// ========================================
// Configuration - Customize your blog here
// ========================================
// Configuration object for easy customization
const config = {
    site: {
        title: 'Plume Blog',
        subtitle: 'A collection of thoughts, written with style.',
        description: 'Personal blog built with Plume - a lightweight static site generator',
        pageTitle: 'Plume Blog', // Used in browser tab title
        baseUrl: 'https://example.com' // Base URL for RSS/Atom feeds - change to your domain
    },
    homepage: {
        heading: 'Recent Posts',
        showArchiveLink: true,
        showTagsLink: true
    },
    navigation: {
        backToHome: '← Back to Home',
        tagsPage: 'Browse all tags',
        archivePage: 'View archive'
    },
    labels: {
        published: 'Published',
        lastModified: 'Last Modified',
        archivedPosts: 'Archived Posts',
        archivedCount: (count) => `${count} archived post(s)`,
        taggedWith: (tag, count) => `${count} post(s) tagged with "${tag}"`,
        tagsSubtitle: 'Browse all tags and discover posts by topic.',
        allTags: 'All Tags'
    }
};

// Paths configuration
const paths = {
    postsDir: path.join(__dirname, 'posts'),
    templatePath: path.join(__dirname, 'template.html')
};

// Generate table of contents from markdown content
function generateTOC(content) {
    const headings = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
        const match = line.match(/^(#{1,6})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text.toLowerCase()
                .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
                .replace(/^-|-$/g, '');
            headings.push({ level, text, id });
        }
    }
    
    if (headings.length === 0) {
        return '';
    }
    
    let tocHtml = '<div class="toc">\n<h2>Contents</h2>\n<ul>\n';
    let currentLevel = 1;
    
    for (const heading of headings) {
        while (currentLevel < heading.level) {
            tocHtml += '<ul>\n';
            currentLevel++;
        }
        while (currentLevel > heading.level) {
            tocHtml += '</ul>\n';
            currentLevel--;
        }
        tocHtml += `<li><a href="#${heading.id}">${heading.text}</a></li>\n`;
    }
    
    while (currentLevel > 1) {
        tocHtml += '</ul>\n';
        currentLevel--;
    }
    
    tocHtml += '</ul>\n</div>\n';
    return tocHtml;
}

// Add IDs to headings for anchor links
function addHeadingIds(htmlContent) {
    return htmlContent.replace(/<h([1-6])>(.+?)<\/h\1>/g, (match, level, text) => {
        const plainText = text.replace(/<[^>]+>/g, '');
        const id = plainText.toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
            .replace(/^-|-$/g, '');
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
}

// Paths configuration
const { postsDir, templatePath } = paths;

// Output directory (changed from 'public' to 'docs' for GitHub Pages)
const publicDir = path.join(__dirname, 'docs');

// Create necessary directories
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

if (postFiles.length === 0) {
    console.log('No markdown files found in posts directory. Creating a sample post...');
    const samplePost = `---
title: Welcome to My Blog
date: 2025-10-26
---

## This is a simple blog

This blog is built with simplicity and performance in mind.

### Why is it awesome?

- It's **fast as hell**
- It doesn't load unnecessary JavaScript frameworks
- The design is clean and readable
- It supports **math** with KaTeX: $E = mc^2$
- It has a table of contents
- It's simple and clean

### Code blocks work too

\`\`\`javascript
function hello() {
    console.log("Hello, world!");
}
\`\`\`

### More features

> This is a blockquote. It looks pretty good.

And of course, you can write whatever you want here. Enjoy!
`;
    fs.writeFileSync(path.join(postsDir, 'welcome.md'), samplePost);
    console.log('Sample post created: posts/welcome.md');
    process.exit(0);
}

const postsData = postFiles.map(file => {
    const postPath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(postPath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    // Check if math formulas are enabled in YAML front matter
    const hasMath = data.math === true;
    
    // MathJax configuration (only when needed)
    let mathJaxScript = '';
    if (hasMath) {
        mathJaxScript = '<!-- MathJax Configuration -->\n' +
            '    <script>\n' +
            '    MathJax = {\n' +
            '        tex: {\n' +
            '            inlineMath: [[\'$\', \'$\'], [\'\\\\(\', \'\\\\)\']],\n' +
            '            displayMath: [[\'$$\', \'$$\'], [\'\\\\[\', \'\\\\]\']],\n' +
            '            processEscapes: true,\n' +
            '            processEnvironments: true\n' +
            '        },\n' +
            '        options: {\n' +
            '            skipHtmlTags: [\'script\', \'noscript\', \'style\', \'textarea\', \'pre\']\n' +
            '        }\n' +
            '    };\n' +
            '    </script>\n' +
            '    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>';
    }
    
    // Generate table of contents
    const toc = generateTOC(content);
    
    // Render markdown to HTML
    let htmlContent = md.render(content);
    
    // Add IDs to headings
    htmlContent = addHeadingIds(htmlContent);
    
    const outputFileName = file.replace('.md', '.html');
    const postDate = new Date(data.date);
    const formattedDate = postDate.toISOString().split('T')[0];

    // Handle modified date (optional)
    let modifiedHtml = '';
    if (data.modified) {
        const modifiedDate = new Date(data.modified);
        const formattedModified = modifiedDate.toISOString().split('T')[0];
        // Only show modified date if it's different from publish date
        if (formattedModified !== formattedDate) {
            modifiedHtml = ` | ${config.labels.lastModified}: ${formattedModified}`;
        }
    }

    // Handle tags (optional)
    let tagsHtml = '';
    if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
        const tagLinks = data.tags.map(tag => {
            const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
            return `<a href="tag-${tagSlug}.html" class="tag">${tag}</a>`;
        }).join('');
        tagsHtml = `<div class="tags">${tagLinks}</div>`;
    }

    // Add navigation and date information
    const navHtml = `<div class="nav-home"><a href="index.html">${config.navigation.backToHome}</a></div>`;
    const dateHtml = `<p class="post-date"><em>${config.labels.published}: ${formattedDate}${modifiedHtml}</em></p>`;
    
    const finalHtml = template
        .replace(/{{TITLE}}/g, data.title)
        .replace('{{MATHJAX}}', () => mathJaxScript)  // Use function to avoid $ being parsed
        .replace('{{DATE}}', dateHtml)
        .replace('{{TAGS}}', tagsHtml)
        .replace('{{NAV}}', navHtml)
        .replace('{{TOC}}', toc)
        .replace('{{CONTENT}}', htmlContent);

    fs.writeFileSync(path.join(publicDir, outputFileName), finalHtml);

    return {
        title: data.title,
        date: postDate,
        url: outputFileName,
        tags: data.tags || [],
        archived: data.archived || false  // Add archive flag
    };
});

// Sort posts by date (newest first)
postsData.sort((a, b) => b.date - a.date);

// Separate archived and active posts
const activePosts = postsData.filter(post => !post.archived);
const archivedPosts = postsData.filter(post => post.archived);

// Generate post list for homepage (only active posts)
const postLinks = activePosts.map(post => {
    const formattedDate = post.date.toISOString().split('T')[0];
    const tagsHtml = post.tags.length > 0 
        ? `<div class="tags-inline">${post.tags.map(tag => {
            const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
            return `<a href="tag-${tagSlug}.html" class="tag">${tag}</a>`;
        }).join('')}</div>`
        : '';
    return `<li>
        <span class="post-list-date">${formattedDate}</span> - <a href="${post.url}">${post.title}</a>
        ${tagsHtml}
    </li>`;
});

const indexContent = `
    <h1>${config.site.title}</h1>
    <p class="subtitle">${config.site.subtitle}</p>
    
    <h2>${config.homepage.heading}</h2>
    <ul class="post-list">
        ${postLinks.join('\n        ')}
    </ul>
    
    <hr>
    
    <p>
        ${config.homepage.showTagsLink ? `📂 <a href="tags.html">${config.navigation.tagsPage}</a> | ` : ''}
        ${config.homepage.showArchiveLink ? `📦 <a href="archive.html">${config.navigation.archivePage} (${archivedPosts.length})</a> | ` : ''}
        ${config.site.description}
    </p>
`;

const indexHtml = template
    .replace(/{{TITLE}}/g, `Home - ${config.site.pageTitle}`)
    .replace('{{MATHJAX}}', '') 
    .replace('{{DATE}}', '') 
    .replace('{{TAGS}}', '')
    .replace('{{NAV}}', '') 
    .replace('{{TOC}}', '') 
    .replace('{{CONTENT}}', indexContent);

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);

// Generate archive page
if (archivedPosts.length > 0) {
    const archivePostLinks = archivedPosts.map(post => {
        const formattedDate = post.date.toISOString().split('T')[0];
        const tagsHtml = post.tags.length > 0 
            ? `<div class="tags-inline">${post.tags.map(tag => {
                const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                return `<a href="tag-${tagSlug}.html" class="tag">${tag}</a>`;
            }).join('')}</div>`
            : '';
        return `<li>
            <span class="post-list-date">${formattedDate}</span> - <a href="${post.url}">${post.title}</a>
            ${tagsHtml}
        </li>`;
    }).join('\n        ');

    const archiveContent = `
    <h1>📦 ${config.labels.archivedPosts}</h1>
    <p class="subtitle">${config.labels.archivedCount(archivedPosts.length)}</p>
    
    <ul class="post-list">
        ${archivePostLinks}
    </ul>
    
    <hr>
    
    <p><a href="index.html">${config.navigation.backToHome}</a></p>
    `;

    const archiveHtml = template
        .replace(/{{TITLE}}/g, `Archive - ${config.site.pageTitle}`)
        .replace('{{MATHJAX}}', '') 
        .replace('{{DATE}}', '') 
        .replace('{{TAGS}}', '')
        .replace('{{NAV}}', '') 
        .replace('{{TOC}}', '') 
        .replace('{{CONTENT}}', archiveContent);

    fs.writeFileSync(path.join(publicDir, 'archive.html'), archiveHtml);
}

// Generate tag pages
const allTags = {};
postsData.forEach(post => {
    post.tags.forEach(tag => {
        if (!allTags[tag]) {
            allTags[tag] = [];
        }
        allTags[tag].push(post);
    });
});

Object.keys(allTags).forEach(tag => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
    const tagPosts = allTags[tag];
    
    const tagPostLinks = tagPosts.map(post => {
        const formattedDate = post.date.toISOString().split('T')[0];
        return `<li><span class="post-list-date">${formattedDate}</span> - <a href="${post.url}">${post.title}</a></li>`;
    }).join('\n        ');
    
    const tagContent = `
    <p class="subtitle">${config.labels.taggedWith(tag, tagPosts.length)}</p>
    
    <ul class="post-list">
        ${tagPostLinks}
    </ul>
    
    <hr>
    <p><a href="index.html">${config.navigation.backToHome}</a></p>
`;
    
    const tagHtml = template
        .replace(/{{TITLE}}/g, `Tag: ${tag}`)
        .replace('{{MATHJAX}}', '')
        .replace('{{DATE}}', '')
        .replace('{{TAGS}}', '')
        .replace('{{NAV}}', '')
        .replace('{{TOC}}', '')
        .replace('{{CONTENT}}', tagContent);
    
    fs.writeFileSync(path.join(publicDir, `tag-${tagSlug}.html`), tagHtml);
});

// Generate all tags page
const allTagsList = Object.keys(allTags).sort().map(tag => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
    const count = allTags[tag].length;
    return `<li><a href="tag-${tagSlug}.html" class="tag-link">${tag}</a> <span class="tag-count">(${count})</span></li>`;
}).join('\n        ');

const tagsPageContent = `
    <p class="subtitle">${config.labels.tagsSubtitle}</p>
    
    <ul class="tags-list">
        ${allTagsList}
    </ul>
    
    <hr>
    <p><a href="index.html">${config.navigation.backToHome}</a></p>
`;

const tagsPageHtml = template
    .replace(/{{TITLE}}/g, config.labels.allTags)
    .replace('{{MATHJAX}}', '')
    .replace('{{DATE}}', '')
    .replace('{{TAGS}}', '')
    .replace('{{NAV}}', '')
    .replace('{{TOC}}', '')
    .replace('{{CONTENT}}', tagsPageContent);

fs.writeFileSync(path.join(publicDir, 'tags.html'), tagsPageHtml);

// Clean up outdated files
// 1. Collect expected files
const expectedFiles = new Set([
    'index.html',
    'tags.html',
    'archive.html'
]);

// Add all post pages
postsData.forEach(post => {
    expectedFiles.add(post.url);
});

// Add all tag pages
Object.keys(allTags).forEach(tag => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
    expectedFiles.add(`tag-${tagSlug}.html`);
});

// 2. Delete files that shouldn't exist
const existingFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));
let deletedCount = 0;

existingFiles.forEach(file => {
    if (!expectedFiles.has(file)) {
        fs.unlinkSync(path.join(publicDir, file));
        deletedCount++;
        console.log(`🗑️  Deleted: ${file}`);
    }
});

if (deletedCount > 0) {
    console.log(`🧹 Cleaned up ${deletedCount} old file(s)`);
}

// ========================================
// Generate RSS and Atom Feeds
// ========================================

// Helper function to escape XML special characters
function escapeXml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Helper function to get post content (with HTML stripping for excerpt)
function getPostExcerpt(filePath, isRss = true) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(fileContent);
    const htmlContent = md.render(content);
    
    if (isRss) {
        // For RSS, return first 300 chars as excerpt
        const plainText = htmlContent.replace(/<[^>]+>/g, '');
        return escapeXml(plainText.substring(0, 300));
    } else {
        // For Atom, return escaped HTML content
        return htmlContent;
    }
}

// Generate RSS 2.0 Feed
function generateRSSFeed() {
    const baseUrl = config.site.baseUrl || 'https://example.com';
    const rssItems = activePosts.map(post => {
        const postPath = path.join(postsDir, post.url.replace('.html', '.md'));
        const excerpt = getPostExcerpt(postPath, true);
        const postDate = post.date.toUTCString();
        
        return `    <item>
        <title>${escapeXml(post.title)}</title>
        <link>${baseUrl}/${post.url}</link>
        <guid isPermaLink="true">${baseUrl}/${post.url}</guid>
        <pubDate>${postDate}</pubDate>
        <description>${excerpt}</description>
    </item>`;
    }).join('\n');

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>${escapeXml(config.site.title)}</title>
        <link>${baseUrl}</link>
        <description>${escapeXml(config.site.description)}</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <docs>https://www.rssboard.org/rss-specification</docs>
        <generator>Plume RSS Generator</generator>
${rssItems}
    </channel>
</rss>`;

    fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssContent);
    console.log('📡 RSS feed generated: feed.xml');
}

// Generate Atom 1.0 Feed
function generateAtomFeed() {
    const baseUrl = config.site.baseUrl || 'https://example.com';
    const now = new Date().toISOString();
    
    const atomEntries = activePosts.map(post => {
        const postPath = path.join(postsDir, post.url.replace('.html', '.md'));
        const fileContent = fs.readFileSync(postPath, 'utf-8');
        const { content } = matter(fileContent);
        const htmlContent = md.render(content);
        
        return `    <entry>
        <title>${escapeXml(post.title)}</title>
        <link href="${baseUrl}/${post.url}" rel="alternate"/>
        <id>urn:uuid:${baseUrl}/${post.url}</id>
        <published>${post.date.toISOString()}</published>
        <updated>${post.date.toISOString()}</updated>
        <summary>${escapeXml(htmlContent.replace(/<[^>]+>/g, '').substring(0, 200))}</summary>
        <content type="html"><![CDATA[${htmlContent}]]></content>
    </entry>`;
    }).join('\n');

    const atomContent = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${escapeXml(config.site.title)}</title>
    <link href="${baseUrl}/" rel="alternate"/>
    <link href="${baseUrl}/atom.xml" rel="self"/>
    <id>urn:uuid:${baseUrl}</id>
    <updated>${now}</updated>
    <author>
        <name>${escapeXml(config.site.title)}</name>
    </author>
    <subtitle>${escapeXml(config.site.description)}</subtitle>
${atomEntries}
</feed>`;

    fs.writeFileSync(path.join(publicDir, 'atom.xml'), atomContent);
    console.log('📡 Atom feed generated: atom.xml');
}

// Generate both feeds
generateRSSFeed();
generateAtomFeed();

console.log(`✅ ${postsData.length} post(s) built successfully!`);
console.log(`   📝 Active: ${activePosts.length} | 📦 Archived: ${archivedPosts.length}`);
console.log(`📂 Output directory: ${publicDir}`);
