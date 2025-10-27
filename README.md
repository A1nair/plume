# Plume

A lightweight, fast, and elegant static blog generator.

[English](README.md) | [中文](README_CN.md)

## Features

- 🚀 **Fast as hell** - No unnecessary JavaScript frameworks
- 📝 **Markdown support** - Write in markdown, get beautiful HTML
- 🎨 **Clean design** - Simple and readable
- 📐 **Math support** - MathJax for mathematical equations
- 📑 **Auto-generated TOC** - Table of contents for each post with active section highlighting
- 🏷️ **Tags system** - Organize posts with tags and auto-generated tag pages
- 📅 **Last modified tracking** - Optional last modified date for posts
- 📦 **Archive functionality** - Hide old posts but keep them accessible
- 📱 **Responsive** - Looks good on all devices
- ♿ **Accessible** - Following web accessibility guidelines

## Installation

```bash
npm install
```

## Quick Start & Customization

**🎨 Want to customize your blog?** Check out [CONFIG.md](CONFIG.md) for detailed configuration options.

**🚀 Want to deploy to GitHub Pages?** Check out [DEPLOY.md](DEPLOY.md) for step-by-step instructions.

You can easily customize:
- Blog title and subtitle
- Navigation labels
- Show/hide archive and tags links
- All text labels (supports any language!)

## Usage

1. Create markdown files in the `posts/` directory
2. Run the build command to generate HTML

```bash
npm run build
```

The generated HTML files will be in the `public/` directory.

## Post Format

Each post should have YAML front matter at the top:

```markdown
---
title: Your Post Title
date: 2025-10-27
modified: 2025-10-27  # Optional: last modified date
tags: [Tag1, Tag2]    # Optional: post tags
math: true            # Optional: enable math formulas
archived: true        # Optional: archive post (hide from homepage)
---

## This is a heading

Your content starts here...
```

### Front Matter Fields

- `title` (required): The post title
- `date` (required): Publication date in YYYY-MM-DD format
- `modified` (optional): Last modified date
- `tags` (optional): Array of tags for the post
- `math` (optional): Set to `true` to enable MathJax math rendering
- `archived` (optional): Set to `true` to archive the post (won't show on homepage but still accessible)

## Features

### 📐 Math Formulas

Enable math formulas by setting `math: true` in the front matter:

Inline math: `$E = mc^2$`

Display math:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 🏷️ Tags System

Add tags in the front matter:

```yaml
tags: [JavaScript, Tutorial, Web Development]
```

The system automatically generates:
- Individual pages for each tag
- A tags index page
- Tag links in posts

### 📦 Archive Functionality

To archive a post (hide from homepage but keep accessible):

```yaml
archived: true
```

Archived posts will:
- Be removed from the homepage listing
- Appear on the archive page
- Still be accessible via direct links
- Still appear in tag pages

### 📑 Auto-Generated TOC

The system automatically generates a table of contents for each post with:
- All headings (h1-h6)
- Clickable anchor links
- Nested structure
- Active section highlighting (on scroll)

### 🗑️ Automatic Cleanup

During build, automatically removes:
- HTML files for deleted posts
- Tag pages that are no longer used
- Other outdated files

## Project Structure

```
blog/
├── posts/              # Markdown posts
│   ├── welcome.md
│   └── ...
├── public/             # Generated HTML (auto-generated)
│   ├── index.html
│   ├── tags.html
│   ├── archive.html
│   └── ...
├── template.html       # HTML template
├── build.js           # Build script
├── package.json       # Project configuration
└── README.md          # Documentation
```

## Style Philosophy

This blog follows a simple philosophy:

1. **Keep it simple** - No unnecessary complexity
2. **Keep it fast** - Minimal resources, fast loading
3. **Keep it accessible** - Everyone should be able to read it
4. **Keep it readable** - Good typography and spacing
5. **Keep it clean** - Clean code and clean design

## Development

```bash
# Build once
npm run build

# Watch mode (if implemented)
npm run watch
```

## License

MIT - Do whatever you want with it!
```

## Usage

### Create your first post

Create a markdown file in the `posts/` directory:

```bash
# The build script will create a sample post if posts directory is empty
npm run build
```

### Markdown file format

```markdown
---
title: Your Post Title
date: 2025-10-26
modified: 2025-10-27  # Optional: Last modified date (only shown if different from date)
tags: [Tech, Blog, Tutorial]  # Optional: Article tags
math: true            # Optional: Enable MathJax for mathematical formulas
---

## Your content here

Write whatever the hell you want!
```

**YAML Front Matter Fields:**
- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `modified` (optional): Last modified date - only displayed if different from publication date
- `tags` (optional): Array of tags for categorizing posts (e.g., `[Tech, Blog]`)
- `math` (optional): Set to `true` to enable MathJax for mathematical formulas

### Build the blog

```bash
npm run build
```

This will generate HTML files in the `public/` directory.

### Watch for changes

```bash
npm run watch
```

This will watch for changes in your markdown files and rebuild automatically.

### View your blog

Open `public/index.html` in your browser to see your blog.

Or use a local server:
```bash
# In the public directory
python3 -m http.server 3000
# Then visit http://localhost:3000
```

## Navigation

- **Home** (`index.html`) - List of all posts
- **All Tags** (`tags.html`) - Browse posts by tags
- **Individual Tag Pages** (`tag-xxx.html`) - Posts for specific tags
- **Individual Posts** (`*.html`) - Your blog posts

## Project Structure

```
blog/
├── build.js           # Build script
├── watch.js           # Watch script for development
├── template.html      # HTML template
├── package.json       # Dependencies
├── posts/             # Your markdown posts
│   └── *.md
└── public/            # Generated HTML files
    ├── index.html
    └── *.html
```

## Writing Posts

### Front Matter

Each post should start with YAML front matter:

```yaml
---
title: Your Post Title
date: 2025-10-26
---
```

### Markdown Features

- **Headings**: `# H1`, `## H2`, etc.
- **Emphasis**: `*italic*`, `**bold**`
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Code**: `` `inline` `` or ` ```language ` for blocks
- **Math**: `$inline$` or `$$block$$` (KaTeX)
- **Blockquotes**: `> quote`
- **Lists**: `- item` or `1. item`
- **Tables**: Markdown tables are supported

## Style Philosophy

This blog follows a simple philosophy:

1. **Keep it simple** - No unnecessary complexity
2. **Keep it fast** - Minimal resources, fast loading
3. **Keep it accessible** - Everyone should be able to read it
4. **Keep it readable** - Good typography and spacing
5. **Keep it clean** - Clean code and clean design

## License

MIT - Do whatever you want with it!
