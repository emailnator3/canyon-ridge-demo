const fs = require("fs");
const roster = JSON.parse(fs.readFileSync("pilot-results.json", "utf8"));

// Research findings from 5 parallel research agents (web search + site checks,
// 2026-08-06). "not found" means genuinely not published anywhere findable —
// never fabricated. Notes flag anything needing a human sanity-check.
const research = {
  "1 800 Plumber+air Pacific Nw; Wired Together Electric": { website: "https://wiredtogether.com/", phone: "(971) 979-4733", email: "info@wiredtogether.com", note: "Dual-brand entity (plumbing+electrical, same owner/address) — matched to the electrical-specific brand 'Wired Together Electric'." },
  "3 Brothers Home Solutions": { website: "https://3brothershomesolutions.com/", phone: "971-340-6837", email: "mike@3brothershomesolutions.com", note: "High confidence." },
  "360 Electric INC": { website: "https://www.360-electric.com/", phone: "(541) 514-8028", email: "contact@360-electric.com", note: "High confidence — corroborated by BBB, Chamber, BuildZoom." },
  "3RD Rock Electric LLC": { website: "https://electricianmadras.com/", phone: "(458) 262-6889", email: "", note: "No published email — contact form only." },
  "4 Point Electric LLC": { website: "https://4pointelectric.com/", phone: "(541) 632-6545", email: "", note: "High confidence on ID/phone (CCB #239271 active); no email published." },
  "4G Electric": { website: "", phone: "(541) 936-4133", email: "", note: "Operates as a DBA of McLain Electric Inc; matched via BuildZoom permit record, no independent site." },
  "4S Electrical Contractors LLC": { website: "", phone: "", email: "", note: "Confirmed to exist via CCB #231151 only — no phone/site/listing found anywhere." },
  "5 Star Electric INC": { website: "", phone: "(503) 851-4360", email: "", note: "Matched via BBB profile (owner Frances Turner) + Yelp/BuildZoom. No email published." },
  "84 Electric": { website: "", phone: "", email: "", note: "FLAG: could not locate this business at all in Portland OR — recommend verifying legal name/CCB# before outreach." },
  "A & A Electrical Contractors INC": { website: "", phone: "(503) 949-3193", email: "", note: "High confidence on ID/phone (BBB, in business since 1984); no site found, relies on directories." },
  "A & E Security & Electronic Solutions; A & E Technology And": { website: "https://www.4security.org", phone: "(503) 472-6439", email: "help@4security.org", note: "High confidence — operates under brand '4security'." },
  "A & J Electric INC": { website: "https://www.aandj-electric.com", phone: "(503) 359-5891", email: "leeann@aandj-electric.com", note: "High confidence — CCB #959 active, matches IBEW Local 48 directory." },
  "A And R Solar SPC": { website: "https://www.a-rsolar.com", phone: "(503) 420-8680", email: "info@a-rsolar.com", note: "Tualatin branch of a Seattle-HQ'd company." },
  "A Temp Heating & Cooling INC": { website: "https://www.atempheating.com", phone: "(503) 694-3396", email: "", note: "High confidence on ID; no general business email published (only a data-broker-sourced individual email, excluded)." },
  "A-Tech Electric LLC": { website: "", phone: "(503) 781-3946", email: "", note: "LOW CONFIDENCE — directories show this Culver, OR phone, but the apparent matching website (atechelectricpdx.com, email jim@atechelectricpdx.com) is Portland-based with a different phone. Could be same owner/different location or two unrelated businesses. Verify by phone before emailing." },
  "AC Electric Energy": { website: "", phone: "(541) 963-2024", email: "", note: "Single-source match (Procore listing) — no independent site/BBB/Yelp found." },
  "Aaken CORP": { website: "", phone: "(541) 330-9545", email: "", note: "Phone high-confidence (BBB/Yelp/Yellow Pages consistent). Listed domain aakencorp.com currently has an SSL/host mismatch — do not link to it." },
  "Aaron Hodge Electric": { website: "", phone: "(541) 661-2337", email: "aaronhodgeelectric@gmail.com", note: "Phone confirmed via BBB directly. Email came from a search snippet (source page returned 403) — light sanity-check recommended before relying on it." },
  "Ab Electric CO": { website: "", phone: "(503) 314-7174", email: "abelectric955@gmail.com", note: "Matched via IBEW Local 48 official contractor directory." },
  "Abc Electric": { website: "http://www.abc-electric.net/", phone: "(503) 233-7551", email: "", note: "High confidence (family-owned since 1954, CCB #161501). Site has no published email, phone-only." },
  "Abiqua Electric LLC": { website: "https://www.abiquaelectricllc.com", phone: "(503) 390-0831", email: "abiquaelectric@gmail.com", note: "High confidence — matched via own site contact page." },
  "Abney Solar Electrix": { website: "https://abneysolarelectrix.com", phone: "(541) 923-6000", email: "", note: "High confidence (CCB #108442, 30+ yrs in business). No email published." },
  "Aboveboard Electric INC": { website: "https://www.aboveboardoregon.com", phone: "(541) 574-2948", email: "info@aboveboardoregon.com", note: "High confidence, BBB-accredited. Branded 'Aboveboard Electric & Plumbing'." },
  "Abs Electric LLC": { website: "", phone: "(503) 888-7676", email: "", note: "No official site found. Minor phone discrepancy across directories — (503) 888-7676 is the one confirmed directly on BuildZoom." },
  "Ac&e Electric; Peci": { website: "https://www.acandeelectric.com", phone: "(503) 363-2301", email: "info@acandeelectric.com", note: "High confidence match to 'AC&E Electric Company LLC' (commercial/industrial, since 1959). The 'Peci' fragment in the directory name is unexplained/likely a data artifact — disregarded." },
};

const DEMO_BASE = "https://canyon-ridge-demo.vercel.app";

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const header = ["Company", "City", "State", "Zip", "License #", "Website", "Phone", "Email", "Demo URL", "Notes"];
const rows = roster.map((r) => {
  const res = research[r.company] || { website: "", phone: "", email: "", note: "NO RESEARCH DATA — not covered by pilot batch" };
  return [
    r.company,
    r.city,
    r.state,
    r.zip,
    r.licenseNumber,
    res.website,
    res.phone,
    res.email,
    DEMO_BASE + r.demoPath,
    res.note,
  ];
});

const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
fs.writeFileSync("pilot-outreach-list.csv", csv);

// quick summary stats
const withWebsite = rows.filter((r) => r[5]).length;
const withPhone = rows.filter((r) => r[6]).length;
const withEmail = rows.filter((r) => r[7]).length;
console.log(`Wrote pilot-outreach-list.csv — ${rows.length} companies`);
console.log(`Found: website ${withWebsite}/25, phone ${withPhone}/25, email ${withEmail}/25`);
