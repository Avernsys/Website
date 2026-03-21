# SEO Operations

This repo now supports site-wide SEO and analytics wiring in code, but a few steps still need to happen in external tools.

## What code should handle

- `robots.txt`
- `sitemap.xml`
- Canonical URLs
- Page titles and descriptions
- Open Graph and Twitter metadata
- JSON-LD structured data
- GTM, GA4, and Microsoft Clarity injection via env vars

## External setup checklist

### Google Search Console

- Verify the `avernsys.com` domain property.
- Submit `https://avernsys.com/sitemap.xml`.
- Inspect `/`, `/chaptersys`, and `/primeroute` after deploy.
- Request indexing for any new or updated page.

### Bing Webmaster Tools

- Add the domain property for `avernsys.com`.
- Verify ownership.
- Submit the sitemap.
- Enable IndexNow if Bing recommends it for this property.

### Ahrefs Webmaster Tools

- Verify the domain.
- Use the site audit and backlink monitoring features.
- Re-run the audit after major releases.

### Semrush

- Add the domain to a project.
- Run site audits and position tracking only after the site has indexed cleanly.

### Looker Studio

- Connect Google Search Console.
- Connect GA4.
- Build one dashboard for organic landing pages, impressions, clicks, and conversions.

### Screaming Frog

- Crawl the live site after each SEO release.
- Check for duplicate titles, missing descriptions, broken canonicals, and 4xx pages.
- Export crawl data when you ship new pages.

### PageSpeed Insights

- Test the homepage and each product page on mobile first.
- Use it to watch Core Web Vitals regressions after code changes.

### Rich Results Test

- Validate any JSON-LD before shipping.
- Re-test after schema changes.

### Schema Markup Validator

- Use it for syntax validation when Rich Results Test is too narrow.

### IndexNow

- Submit URLs when pages are created or materially updated.
- Keep the submission list focused on indexable pages only.

## Env vars

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `INDEXNOW_KEY`

## IndexNow from this repo

- The site now exposes `https://avernsys.com/indexnow-key.txt` when `INDEXNOW_KEY` is set.
- Submit all core pages with `npm run seo:indexnow`.
- Submit specific pages with `npm run seo:indexnow -- https://avernsys.com/chaptersys`.
