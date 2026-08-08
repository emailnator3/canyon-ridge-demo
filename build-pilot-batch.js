// Generates 25 personalized "quick-swap" outreach demos from the roster pulled
// from the AskTheJourneyman contractor directory. Swaps identity fields (name,
// tagline, description, city) to the real contractor — but genericizes the
// reviews/rating, since Canyon Ridge Electric's real reviewer names and review
// count belong to THAT business, not the prospect being emailed. Never
// fabricates a street address, phone, or email — those stay blank pending
// real research.
const fs = require("fs");
const path = require("path");

const roster = JSON.parse(fs.readFileSync(path.join(__dirname, "pilot-roster.json"), "utf8"));
const baseHtml = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Extract the embedded data object from `renderWithData({...})` (brace-matched,
// string-aware, same technique used in website-template/build-demo.js).
function extractEmbeddedData(html) {
  const marker = 'renderWithData({"business":';
  const start = html.indexOf(marker);
  if (start === -1) throw new Error("marker not found");
  const openParen = html.indexOf("(", start);
  let i = openParen + 1, depth = 0, inStr = false, esc = false, objStart = -1;
  for (; i < html.length; i++) {
    const ch = html[i];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") { if (depth === 0) objStart = i; depth++; }
    else if (ch === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return { text: html.slice(objStart, i), start: objStart, end: i };
}

const { text: baseObjText, start, end } = extractEmbeddedData(baseHtml);
const baseData = JSON.parse(baseObjText);
const before = baseHtml.slice(0, start);
const after = baseHtml.slice(end);

// Generic stock photo replacing Canyon Ridge Electric's real jobsite hero
// photo (base64-embedded, ~275KB) — reused from elsewhere in this same
// template (the Panel Upgrades service photo) so it's proven to load.
const GENERIC_HERO_URL = "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1600&q=72&auto=format&fit=crop";

// The static HTML ships the hero photo TWICE outside the JSON data (a CSS
// background-image and a plain <img src>) — JS overwrites both after
// render() runs, but the raw markup (what a crawler or a screenshot taken
// before JS finishes would see) still shows Canyon Ridge Electric's real
// photo unless these are also replaced.
const heroDataUriMarker = "data:image/jpeg;base64,";
const heroDataUriStart = before.indexOf(heroDataUriMarker);
if (heroDataUriStart === -1) throw new Error("static hero data URI not found in before-HTML");
const heroDataUriEndQuote = before.indexOf('"', heroDataUriStart);
const heroDataUriEndEntity = before.indexOf("&quot;", heroDataUriStart);
const heroDataUriEnd = heroDataUriEndEntity !== -1 && heroDataUriEndEntity < heroDataUriEndQuote ? heroDataUriEndEntity : heroDataUriEndQuote;
const staticHeroDataUri = before.slice(heroDataUriStart, heroDataUriEnd);
const staticHeroOccurrences = before.split(staticHeroDataUri).length - 1;
if (staticHeroOccurrences !== 2) {
  throw new Error(`expected the static hero data URI twice in before-HTML, found ${staticHeroOccurrences}`);
}

const genericReviews = [
  { author: "J. Martinez", rating: 5, text: "Showed up when they said they would and the work was clean and professional.", date: "" },
  { author: "S. Nguyen", rating: 5, text: "Explained everything clearly before starting and the pricing was fair.", date: "" },
  { author: "R. Douglas", rating: 5, text: "Handled our job quickly and left everything tidy. Would call again.", date: "" },
];

const outDir = path.join(__dirname, "biz");
fs.mkdirSync(outDir, { recursive: true });

const results = [];
for (const c of roster) {
  const slug = slugify(c.company) || c.id;
  const cityState = `${c.city}, ${c.state}${c.zip ? " " + c.zip : ""}`;

  const data = JSON.parse(JSON.stringify(baseData)); // deep clone
  data.business.name = c.company;
  data.business.tagline = `Your Trusted Electrical Experts in ${c.city}`;
  data.business.category = "Electrical installation service";
  data.business.description = `Serving ${c.city}, Oregon & surrounding areas with reliable, licensed electrical services for homes and businesses.`;
  data.business.phone = "";
  data.business.email = "";
  data.business.address = cityState;
  data.business.website = "";
  data.business.rating = 5.0;
  data.business.review_count = genericReviews.length;
  data.business.google_maps_url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.company + " " + cityState)}`;
  data.business.logo_url = "";
  data.business.license_number = c.licenseNumber || "";
  data.reviews = genericReviews;

  // The hero photo was Canyon Ridge Electric's own real jobsite photo
  // (base64-embedded) — showing it under 24 other companies' names would
  // misrepresent someone else's work as theirs, same issue already avoided
  // for reviews. Swap in a generic stock photo already used elsewhere on
  // this same template (about/services), so it's proven to load and stays
  // thematically consistent.
  data.images.hero = GENERIC_HERO_URL;
  data.footer.copyright = `© ${new Date().getFullYear()} ${c.company}. All rights reserved.`;
  data.footer.areas_served = `${c.city} & surrounding areas`;

  // hero{} and about{} are SEPARATE fields from business.tagline/description —
  // easy to miss (they don't show up in the page <title>, only rendered into
  // the H1/subheadline and About section), and the base template hardcodes
  // Canyon Ridge Electric's own name/city into both.
  data.hero.headline = `Your Trusted Electrical Experts in ${c.city}`;
  data.hero.subheadline = `Serving ${c.city}, Oregon & surrounding areas with reliable, licensed electrical services for homes and businesses.`;
  data.about.headline = `Why Choose ${c.company}?`;
  data.about.text = `We're a locally owned and operated electrical company serving ${c.city}, Oregon and surrounding communities. Our licensed electricians bring years of experience, quality craftsmanship, and a commitment to customer satisfaction on every job — big or small.`;

  // Safety net: catch any leftover Canyon Ridge Electric / Oregon City
  // reference anywhere in the personalized data, so a missed field (like
  // hero{}/about{} were the first time) fails loudly instead of shipping.
  const dataText = JSON.stringify(data);
  const leaks = [];
  if (/Canyon Ridge/i.test(dataText)) leaks.push("Canyon Ridge");
  if (/\bOregon City\b/.test(dataText) && c.city !== "Oregon City") leaks.push("Oregon City");
  if (leaks.length) {
    console.log(`LEAK in ${c.company}:`, leaks.join(", "));
    process.exitCode = 1;
    continue;
  }

  // The <title> and <meta name="description"> tags are static HTML, not part
  // of the render()'d data — JS corrects them after load, but the raw HTML
  // (what search engines and link-preview cards see first) still said Canyon
  // Ridge Electric until this replacement runs.
  const staticTitle = "Canyon Ridge Electric — Your Trusted Electrical Experts in Oregon City";
  const staticDesc = 'Serving Oregon City, Oregon &amp; surrounding areas with reliable, licensed electrical services for homes and businesses.';
  const newTitle = `${escapeHtml(c.company)} — Your Trusted Electrical Experts in ${escapeHtml(c.city)}`;
  const newDesc = escapeHtml(data.business.description);

  let companyBefore = before;
  for (const [oldStr, newStr, label] of [
    [`<title>${staticTitle}</title>`, `<title>${newTitle}</title>`, "title"],
    [`content="${staticDesc}"`, `content="${newDesc}"`, "meta description"],
  ]) {
    const count = companyBefore.split(oldStr).length - 1;
    if (count !== 1) {
      console.log(`WARN ${c.company}: expected 1 occurrence of static ${label}, found ${count}`);
      process.exitCode = 1;
      continue;
    }
    companyBefore = companyBefore.split(oldStr).join(newStr);
  }

  const heroCount = companyBefore.split(staticHeroDataUri).length - 1;
  if (heroCount !== 2) {
    console.log(`WARN ${c.company}: expected 2 occurrences of static hero data URI, found ${heroCount}`);
    process.exitCode = 1;
  } else {
    companyBefore = companyBefore.split(staticHeroDataUri).join(GENERIC_HERO_URL);
  }

  let html = companyBefore + JSON.stringify(data) + after;

  // Tag both Buy Now links with this company's slug so a Stripe payment can be
  // traced back to which contractor's demo it came from (Stripe payment links
  // pass ?client_reference_id=... straight through to the Checkout Session).
  const buyLinks = [
    "https://buy.stripe.com/6oUdRaaP1gkr1Ahasc00000",
    "https://buy.stripe.com/14A7sM2ivc4ba6Nbwg00001",
  ];
  for (const link of buyLinks) {
    const before_ = html;
    html = html.split(link).join(`${link}?client_reference_id=${slug}`);
    const count = before_.split(link).length - 1;
    if (count !== 1) {
      console.log(`WARN ${c.company}: expected 1 occurrence of ${link}, found ${count}`);
      process.exitCode = 1;
    }
  }

  const dir = path.join(outDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(dir, "admin"), { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  fs.writeFileSync(path.join(dir, "site-data.json"), JSON.stringify(data, null, 2));
  fs.copyFileSync(path.join(__dirname, "admin", "index.html"), path.join(dir, "admin", "index.html"));

  results.push({ ...c, slug, demoPath: `/biz/${slug}/` });
}

fs.writeFileSync(path.join(__dirname, "pilot-results.json"), JSON.stringify(results, null, 2));
console.log(`Generated ${results.length}/${roster.length} personalized demos in biz/`);
if (results.length === roster.length) console.log("ALL CLEAN — no leftover Canyon Ridge / Oregon City references.");
console.log("Sample:", results[0].company, "->", results[0].demoPath);
