# seamspace Blog

Official blog for [seamspace](https://www.seamspace.site) — new features, use cases, and more.

## Structure

```
_posts/
  ko/    → 한국어 포스트
  en/    → English posts
assets/
  images/ → 포스트 이미지, 썸네일
  css/    → 스타일시트
```

## Writing a New Post

### 1. Create both language versions

**Korean:** `_posts/ko/YYYY-MM-DD-slug.md`
**English:** `_posts/en/YYYY-MM-DD-slug.md`

### 2. Front matter template

```yaml
---
layout: post
title: "포스트 제목"
description: "OG 설명 — 홈페이지 임베드 시 보이는 텍스트"
date: YYYY-MM-DD HH:MM:SS +0900
lang: ko  # or en
ref: YYYY/MM/DD/slug/  # must match between ko/en versions
thumbnail: /assets/images/your-thumbnail.png
category_label: "신규 기능"  # or "사용 사례", "팁", "공지"
tags: [tag1, tag2]
author: seamspace Team
reading_time: 5
---
```

### 3. Key fields for OG tags

- `title` → `og:title`
- `description` → `og:description`
- `thumbnail` → `og:image`
- `ref` → links ko ↔ en versions together

### 4. Commit and push

```bash
git add .
git commit -m "New post: your-title"
git push origin main
```

GitHub Actions will auto-deploy.

## Local Preview

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

## Custom Domain

Set `blog.seamspace.site` CNAME in your DNS pointing to `<username>.github.io`.

## OG Embed in Homepage

To embed blog post previews on `www.seamspace.site`:

```html
<!-- Fetch OG tags from blog URL and render card -->
<a href="https://blog.seamspace.site/ko/2026/04/09/post-slug/"
   class="blog-card"
   data-og-fetch>
</a>
```

Or use server-side OG parsing to pull `og:title`, `og:description`, `og:image` from any blog post URL.
