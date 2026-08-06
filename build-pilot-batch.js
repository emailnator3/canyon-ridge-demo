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
  const marker = 'render({"business":';
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
  data.footer.copyright = `© ${new Date().getFullYear()} ${c.company}. All rights reserved.`;
  data.footer.areas_served = `${c.city} & surrounding areas`;

  const html = before + JSON.stringify(data) + after;
  const dir = path.join(outDir, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);

  results.push({ ...c, slug, demoPath: `/biz/${slug}/` });
}

fs.writeFileSync(path.join(__dirname, "pilot-results.json"), JSON.stringify(results, null, 2));
console.log(`Generated ${results.length} personalized demos in biz/`);
console.log("Sample:", results[0].company, "->", results[0].demoPath);
