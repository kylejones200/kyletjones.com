# Articles System Documentation

This document explains how to use the articles system on kyletjones.com.

## Folder Structure

```
content/
  posts/        - Regular articles
  essays/       - Longer form essays
  books/        - Book chapters (with book.md index files)
  archive/      - Older articles moved here
wip/
  inbox/        - Raw material
  edit/         - Active work
  ready/        - Pieces ready for release
assets/
  images/       - Images for articles
  figures/      - Charts and figures
  pdfs/         - PDF documents
```

## Article Naming Convention

Articles should be named using the pattern: `YYYY-MM-DD-slug.md`

Example: `2025-01-15-backlog-to-output.md`

- Date first (YYYY-MM-DD format)
- Slug second (lowercase, hyphens between words)
- All lowercase
- No special characters except hyphens

## Article Format

Each article should have frontmatter at the top:

```markdown
---
title: Article Title
date: 2025-01-15
slug: article-slug
description: A brief description of the article
type: posts (or essays, books)
category: Optional category
publish: true
---
```

**Important**: The `publish: true` field is **required** for articles to appear on the site. Articles without `publish: true` (or with `publish: false`) will not be displayed in the articles list and cannot be accessed directly.

Then write your content in Markdown below the frontmatter.

## articles.json

The `articles.json` file serves as the index for all published articles. Each article entry should have:

```json
{
  "title": "Article Title",
  "date": "2025-01-15",
  "slug": "article-slug",
  "description": "A brief description",
  "excerpt": "Optional longer excerpt",
  "type": "posts",
  "category": "Optional category",
  "path": "content/posts/2025-01-15-article-slug.md",
  "filename": "2025-01-15-article-slug.md",
  "publish": true
}
```

**Important**: The `publish` field must be set to `true` for the article to be visible on the site. You can set this to `false` or omit it entirely to keep articles as drafts. The `publish` field can also be set in the markdown frontmatter, and if present in both places, the frontmatter takes precedence.

## Workflow

1. **Create content**: Write your article in Markdown in the appropriate `content/` folder
2. **Add to index**: Add an entry to `articles.json` with the article metadata
3. **Publish**: The article will automatically appear on the site

## Book Chapters

For books, create a folder in `content/books/` with the book name:

```
content/books/my-book/
  01-introduction.md
  02-chapter-two.md
  book.md (index file)
```

The `book.md` file should list the chapters:

```markdown
---
title: Book Title
description: Book description
---

# Book Title

Description of the book.

## Chapters

1. Introduction
2. Chapter Two
```

## Images

Place images in `assets/images/` and reference them in your Markdown:

```markdown
![Image description](./image-name.png)
```

The system will automatically resolve the path.

## Publishing Process

1. Write article in Markdown with `publish: true` in frontmatter
2. Add entry to `articles.json` with `"publish": true`
3. Commit and push to git
4. Article appears on site automatically

**Note**: To keep an article as a draft, either:
- Set `publish: false` in the frontmatter and/or articles.json, or
- Omit the `publish` field entirely (defaults to unpublished)

## URLs

Articles are accessible at: `https://kyletjones.com/article.html?slug=article-slug`

The slug in the URL must match the slug in `articles.json`.

