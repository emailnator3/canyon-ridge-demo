// Builds the actual customer-facing package for a purchased contractor site:
// index.html with the sales banner/pricing modal stripped out (a paying
// customer shouldn't see "Buy This Website" on their own live site), plus
// their site-data.json, their own admin/ editor, and a plain-language README.
// Usage: node build-delivery.js <slug>
// Reads biz/<slug>/index.html (already personalized by build-pilot-batch.js)
// and writes delivery/<slug>/{index.html, site-data.json, admin/index.html, README.md}.
const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node build-delivery.js <slug>");
  process.exit(1);
}

const srcDir = path.join(__dirname, "biz", slug);
const srcHtmlPath = path.join(srcDir, "index.html");
if (!fs.existsSync(srcHtmlPath)) {
  console.error(`No demo found at biz/${slug}/index.html — run build-pilot-batch.js first, or check the slug.`);
  process.exit(1);
}

let html = fs.readFileSync(srcHtmlPath, "utf8");

// Strip the sales banner + pricing modal block. Exact-match guarded so a
// template change can't silently ship a customer site with the banner still on.
const startMarker = '<div id="pvBanner">';
const uniqueAnchor = '-webkit-user-select'; // inside the <style> tag right after the banner block
const startCount = html.split(startMarker).length - 1;
const anchorCount = html.split(uniqueAnchor).length - 1;
if (startCount !== 1) {
  console.error(`Expected 1 occurrence of the banner start marker, found ${startCount}. Aborting — check the template.`);
  process.exit(1);
}
if (anchorCount !== 1) {
  console.error(`Expected 1 occurrence of the end anchor, found ${anchorCount}. Aborting — check the template.`);
  process.exit(1);
}
const s = html.indexOf(startMarker);
const anchorIdx = html.indexOf(uniqueAnchor);
const e = html.lastIndexOf('<style>', anchorIdx); // the <style> tag immediately after the banner block
if (e <= s) {
  console.error("Banner end marker not found after start marker. Aborting — check the template.");
  process.exit(1);
}
html = html.slice(0, s) + html.slice(e);

// The company's site-data.json — read back from the already-personalized HTML
// via the same brace-matched extraction used elsewhere, so it always matches
// exactly what's embedded (single source of truth).
function extractEmbeddedData(h) {
  const marker = 'renderWithData({"business":';
  const start = h.indexOf(marker);
  if (start === -1) throw new Error("renderWithData marker not found — is this demo's index.html up to date?");
  const openParen = h.indexOf("(", start);
  let i = openParen + 1, depth = 0, inStr = false, esc = false, objStart = -1;
  for (; i < h.length; i++) {
    const ch = h[i];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") { if (depth === 0) objStart = i; depth++; }
    else if (ch === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return JSON.parse(h.slice(objStart, i));
}
const data = extractEmbeddedData(html);

const outDir = path.join(__dirname, "delivery", slug);
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "admin"), { recursive: true });

fs.writeFileSync(path.join(outDir, "index.html"), html);
fs.writeFileSync(path.join(outDir, "site-data.json"), JSON.stringify(data, null, 2));
fs.copyFileSync(path.join(__dirname, "admin", "index.html"), path.join(outDir, "admin", "index.html"));

const readme = `# ${data.business.name} — Website

Your professional website is ready to deploy! This package includes everything
you need to get your site live.

## What's Inside

| File | Description |
|------|-------------|
| \`index.html\` | Your complete website — open in any browser to preview |
| \`admin/index.html\` | Your admin panel — edit colors, images, content, and more |
| \`site-data.json\` | Your site configuration (auto-loaded by both files above) |
| \`README.md\` | This file |

## Quick Start (5 minutes)

### Option A — Vercel (Recommended, Free)
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New → Project"**
3. Choose **"Upload"** and drag your unzipped folder
4. Click **Deploy** — your site is live!
5. To use your own domain: Settings → Domains → Add your domain

### Option B — Netlify (Free)
1. Go to [netlify.com](https://www.netlify.com) and sign up (free)
2. Drag your unzipped folder onto the deploy area
3. Your site is live instantly
4. Add a custom domain in Site Settings → Domain Management

### Option C — Any Web Host
Upload all files to your web host's public folder (usually \`public_html\`
or \`www\`). The site works on any standard web hosting provider.

## Using the Admin Panel

1. Open \`admin/index.html\` in your browser
2. Edit any section: business info, colors, images, services, reviews, hours
3. Click **"Save Changes"** — this downloads an updated \`site-data.json\`
4. Replace the old \`site-data.json\` with the new one and re-upload to your host

That's it! No coding required.

## Need Help?

- 📧 Email: contact@askthejourneyman.com
- 📞 Phone: 1-844-ASK-0001 (1-844-275-0001)
- 🌐 Website: askthejourneyman.com

Built with ⚡ by AskTheJourneyman.com
`;
fs.writeFileSync(path.join(outDir, "README.md"), readme);

console.log(`Built delivery package: delivery/${slug}/`);
console.log(`  business.name = ${data.business.name}`);
console.log(`  files: index.html, site-data.json, admin/index.html, README.md`);
