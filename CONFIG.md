# Blog Configuration Guide

This guide explains how to customize your blog by editing the `config` object in `build.js`.

## Configuration Structure

The configuration is located at the top of `build.js` (lines 10-37):

```javascript
const config = {
    site: { ... },
    homepage: { ... },
    navigation: { ... },
    labels: { ... }
};
```

## Configuration Options

### 1. Site Settings (`config.site`)

Basic information about your blog:

```javascript
site: {
    title: 'My Blog',              // Main heading on homepage
    subtitle: 'A collection...',   // Subtitle below heading
    description: 'This blog...',   // Footer description
    pageTitle: 'My Awesome Blog',  // Browser tab title
    baseUrl: 'https://example.com' // Base URL for RSS/Atom feeds
}
```

**Example - Chinese version:**
```javascript
site: {
    title: '我的博客',
    subtitle: '思考的记录，用<em>优雅</em>的方式呈现。',
    description: '这个博客追求简洁：快速、无障碍、干净。',
    pageTitle: '我的精彩博客',
    baseUrl: 'https://myblog.com'
}
```

⚠️ **Important**: Update `baseUrl` to your actual domain for RSS/Atom feeds to work correctly.

### 2. Homepage Settings (`config.homepage`)

Control what appears on the homepage:

```javascript
homepage: {
    heading: 'Recent Posts',      // Section heading above post list
    showArchiveLink: true,        // Show/hide archive link
    showTagsLink: true            // Show/hide tags link
}
```

**Example:**
```javascript
homepage: {
    heading: '最新文章',
    showArchiveLink: true,
    showTagsLink: true
}
```

### 3. Navigation Labels (`config.navigation`)

Text for navigation links throughout the site:

```javascript
navigation: {
    backToHome: '← Back to Home',     // Link to return to homepage
    tagsPage: 'Browse all tags',      // Tags page link text
    archivePage: 'View archive'       // Archive page link text
}
```

**Example:**
```javascript
navigation: {
    backToHome: '← 返回首页',
    tagsPage: '浏览所有标签',
    archivePage: '查看归档'
}
```

### 4. Labels (`config.labels`)

Various text labels used throughout the blog:

```javascript
labels: {
    published: 'Published',
    lastModified: 'Last Modified',
    archivedPosts: 'Archived Posts',
    archivedCount: (count) => `${count} archived post(s)`,
    taggedWith: (tag, count) => `${count} post(s) tagged with "${tag}"`,
    tagsSubtitle: 'Browse all tags and discover posts by topic.',
    allTags: 'All Tags'
}
```

**Note:** `archivedCount` and `taggedWith` are functions that accept parameters.

**Example - Chinese version:**
```javascript
labels: {
    published: '发布于',
    lastModified: '最后修改',
    archivedPosts: '归档文章',
    archivedCount: (count) => `共 ${count} 篇归档文章`,
    taggedWith: (tag, count) => `标签"${tag}"下有 ${count} 篇文章`,
    tagsSubtitle: '浏览所有标签，发现感兴趣的话题。',
    allTags: '所有标签'
}
```

## Complete Examples

### English Version (Default)

```javascript
const config = {
    site: {
        title: 'My Blog',
        subtitle: 'A collection of thoughts, written with <em>style</em>.',
        description: 'This blog is built with simplicity in mind: fast, accessible, and clean.',
        pageTitle: 'My Awesome Blog'
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
```

### Chinese Version

```javascript
const config = {
    site: {
        title: '我的博客',
        subtitle: '思考的记录，用<em>优雅</em>的方式呈现。',
        description: '这个博客追求简洁：快速、无障碍、干净。',
        pageTitle: '我的精彩博客'
    },
    homepage: {
        heading: '最新文章',
        showArchiveLink: true,
        showTagsLink: true
    },
    navigation: {
        backToHome: '← 返回首页',
        tagsPage: '浏览所有标签',
        archivePage: '查看归档'
    },
    labels: {
        published: '发布于',
        lastModified: '最后修改',
        archivedPosts: '归档文章',
        archivedCount: (count) => `共 ${count} 篇归档文章`,
        taggedWith: (tag, count) => `标签"${tag}"下有 ${count} 篇文章`,
        tagsSubtitle: '浏览所有标签，发现感兴趣的话题。',
        allTags: '所有标签'
    }
};
```

### Minimal Version (Hide extra links)

```javascript
const config = {
    site: {
        title: 'Simple Blog',
        subtitle: 'Less is more.',
        description: '',  // Empty description
        pageTitle: 'Blog'
    },
    homepage: {
        heading: 'Posts',
        showArchiveLink: false,  // Hide archive link
        showTagsLink: false      // Hide tags link
    },
    navigation: {
        backToHome: '← Home',
        tagsPage: 'Tags',
        archivePage: 'Archive'
    },
    labels: {
        published: 'Posted',
        lastModified: 'Updated',
        archivedPosts: 'Archive',
        archivedCount: (count) => `${count} posts`,
        taggedWith: (tag, count) => `${count} posts`,
        tagsSubtitle: 'All tags',
        allTags: 'Tags'
    }
};
```

## How to Customize

1. Open `build.js` in your editor
2. Find the `config` object at the top (lines 10-37)
3. Modify the values you want to change
4. Save the file
5. Run `npm run build` to regenerate your blog

## Tips

- Use HTML tags in `subtitle` for formatting: `<em>`, `<strong>`, etc.
- Set `description` to empty string `''` to hide it completely
- Set `showArchiveLink` or `showTagsLink` to `false` to hide those links
- Function labels like `archivedCount` can use template literals for dynamic text

## Need Help?

If you want to add more customization options, you can:
1. Add new fields to the `config` object
2. Use them in the appropriate sections of `build.js`
3. Rebuild with `npm run build`

## RSS and Atom Feeds

Plume automatically generates both RSS 2.0 and Atom 1.0 feeds for your blog:

- **RSS Feed**: `/feed.xml` - Traditional RSS format supported by most feed readers
- **Atom Feed**: `/atom.xml` - Modern Atom format with richer metadata

### Setup

1. **Set your blog's base URL** in `config.site.baseUrl`:
   ```javascript
   site: {
       title: 'My Blog',
       baseUrl: 'https://yourdomain.com'  // ← Change this to your domain
   }
   ```

2. **Feed Discovery** is automatic - the following links are added to your blog's `<head>`:
   ```html
   <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml">
   <link rel="alternate" type="application/atom+xml" title="Atom Feed" href="/atom.xml">
   ```

3. **Feeds are generated automatically** when you run `npm run build`

### Features

- RSS feed includes article summaries (first 300 characters)
- Atom feed includes full HTML content for each article
- Both feeds include publication dates and tags
- Only **active posts** are included (archived posts are excluded)
- Feeds are updated every time you rebuild your blog

### Subscribing to Your Blog

Users can subscribe to your blog using:
- Feed readers like Feedly, Inoreader, or their browser's built-in feed reader
- The `/feed.xml` or `/atom.xml` URLs directly
- RSS/Atom discovery via your blog's HTML meta tags

### Testing Your Feeds

Use online feed validators to check your feeds:
- [W3C Feed Validator](https://validator.w3.org/feed/) - Validate RSS/Atom syntax
- [FeedBurner](https://feedburner.google.com/) - Monitor feed usage
