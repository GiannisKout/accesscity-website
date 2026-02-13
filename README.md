# AccessCity — accesscity.gr (Static Landing Page)

Preliminary static website for AccessCity, focused on:

- Clear public information about the initiative
- Touch points for citizens, municipalities, partners, volunteers, and supporters
- Ultra SEO-friendly, fast, and fully accessible from every device

## Goals

- **Accessibility-first:** semantic HTML, keyboard support, visible focus, strong contrast, readable typography
- **Performance:** no heavy dependencies, minimal CSS, fast LCP
- **SEO:** clean headings, structured data (JSON-LD), Open Graph/Twitter cards, canonical URL
- **Maintainability:** one page, easy to edit copy, optional bilingual content

## Tech

- Pure **HTML** + **CSS** (inline in `index.html` for simplicity)
- No build step required

## Project Structure

- `index.html` — the landing page
- (optional) `robots.txt`
- (optional) `sitemap.xml`
- (optional) `assets/` — logos, social preview image, press kit PDFs, etc.

## Local Preview

Just open the file in a browser:

- macOS: double click `index.html`
- or use a tiny local server (recommended so URLs behave like production):
  - `python3 -m http.server 5173`
  - then visit `http://localhost:5173`

## Deployment

You can deploy this as static hosting:

- Cloudflare Pages / Netlify / Vercel / GitHub Pages
- Any traditional hosting with an `index.html`

Production domain:

- `https://accesscity.gr`

## Editing Content

Open `index.html` and edit the text within sections:

- Hero
- Mission / How it works
- Who it helps
- Get involved
- FAQ
- Contact

**Tip:** Keep headings hierarchical (`h1` once, then `h2`, then `h3`) and avoid skipping levels.

## SEO Checklist (Production)

- [ ] Set correct `<title>` and meta description
- [ ] Confirm `canonical` points to `https://accesscity.gr/`
- [ ] Add `og:image` at `https://accesscity.gr/assets/og-accesscity.jpg` (1200×630)
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Ensure one `h1` only
- [ ] Validate JSON-LD (Organization + WebSite)
- [ ] Use real links to socials and contact
- [ ] Add FAQ content that matches real questions

## Accessibility Checklist (Baseline)

- [ ] Full keyboard navigation (Tab/Shift+Tab)
- [ ] Visible focus outlines
- [ ] Skip-to-content link works
- [ ] Color contrast meets WCAG AA
- [ ] Reduced-motion support
- [ ] Form fields have labels and hints
- [ ] No essential info only via color/position

## Bilingual Setup (Greek / English)

The landing page supports:

- Greek (default)
- English

Language switching:

- Accessible toggle button
- Updates `<html lang="">`
- Updates page title + meta description dynamically
- Works without page reload

SEO:

- `hreflang="el"` and `hreflang="en"` included
- Canonical points to main domain
- Structured data remains language neutral (brand-level)

## Contact

- Email: `info@accesscity.gr`
