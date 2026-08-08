// Compiles the "no website" mailer-list research (5 parallel agents x 10
// companies, 2026-08-08) into a printable CSV. Every row here was checked
// individually for a live website, a real street address (via CCB active-
// license records, BBB, or the business's own listings), phone, and email.
// "not found" means genuinely not located anywhere searched — never guessed.
const fs = require("fs");

// Tier A: no website found, solid street address — ready to print & mail.
const tierA = [
  { company: "Advanced Electrical Contractors LLC", city: "Central Point", zip: "97502", license: "C1025", address: "191 Wilson Rd, Central Point, OR 97502", phone: "(541) 816-7951", email: "", note: "" },
  { company: "Advanced Electrical Services LLC", city: "Merlin", zip: "97532", license: "C732", address: "184 Harley Ln, Merlin, OR 97532", phone: "(541) 761-1670", email: "", note: "Candidate website domain found does not resolve — treated as no live site" },
  { company: "Advanced Electrical Solutions LLC", city: "Eugene", zip: "97408", license: "C2058", address: "92385 Powerline Rd, Eugene, OR 97408-9405", phone: "(503) 757-6405", email: "", note: "" },
  { company: "Agee Electric", city: "Redmond", zip: "97756", license: "C890", address: "1667 NW Rimrock Ct, Redmond, OR 97756-0311", phone: "(541) 604-4485", email: "", note: "Owner: Richard Brian Agee" },
  { company: "All Electric Service", city: "Tidewater", zip: "97390", license: "21-94C", address: "13394 East Alsea Highway, Tidewater, OR 97390", phone: "(541) 528-3684", email: "", note: "BBB also lists a PO Box 132 mailing address" },
  { company: "All In One Electric LLC", city: "Corvallis", zip: "97333", license: "C928", address: "5060 SW Philomath Blvd, Corvallis, OR 97333", phone: "(541) 753-4716", email: "", note: "High confidence — license matched directly via permit records" },
  { company: "All Power Electric", city: "Salem", zip: "97304", license: "C383", address: "3800 Wallace Rd NW, Salem, OR", phone: "(503) 551-8378", email: "allpower@comcast.net", note: "FLAG: a directory listed a different license # for this business — verify C383 before mailing" },
  { company: "Allen Electric Of Jackson County INC", city: "Eagle Point", zip: "97524", license: "C170", address: "33 Nick Young Rd, Eagle Point, OR", phone: "(541) 826-7625", email: "", note: "In business ~20 years per directory listings" },
  { company: "Alpine Electrical Of Oregon INC", city: "Salem", zip: "97317", license: "C1045", address: "8107 State St, Salem, OR 97317", phone: "(503) 991-9601", email: "", note: "BBB links a website domain that is dead/non-resolving — treated as no live site" },
  { company: "Alsea Electric LLC", city: "Waldport", zip: "97394", license: "C1640", address: "458 SE Moffitt Rd, Waldport, OR 97394", phone: "(541) 527-0700", email: "", note: "Strong candidate — matched via OR Secretary of State registration" },
  { company: "Arm & Amps Electric LLC", city: "Hillsboro", zip: "97123", license: "C2017", address: "7987 SE Engelmann St, Hillsboro, OR 97123", phone: "(907) 687-1077", email: "", note: "Phone has an Alaska area code — unusual but is what the state has on file" },
  { company: "Armored Electric Company LLC", city: "Eugene", zip: "97401", license: "C1819", address: "15 Rustic Pl, Eugene, OR 97401", phone: "(541) 729-4848", email: "", note: "IMPORTANT: armoredelectric.com belongs to an unrelated same-named company in Gallup, NM — do not use that site's info" },
  { company: "Arnzen Electric LLC", city: "Salem", zip: "97305", license: "C768", address: "8466 75th Ave NE, Salem, OR 97305", phone: "(503) 551-0795", email: "", note: "Owner: Brian Arnzen" },
];

// Tier B: no website found, but the address/identity has a flagged conflict
// or uncertainty — usable, just verify before printing.
const tierB = [
  { company: "Advanced Wiring Services INC", city: "Clackamas", zip: "97015", license: "C7", address: "35148 S Sawtell Rd, Molalla, OR 97038-8875", phone: "(503) 833-2980", email: "", note: "FLAG: real address (Molalla) differs from the city/zip on file (Clackamas) — some directories show a PO Box 644, Clackamas 97015 instead" },
  { company: "Alfa Electric", city: "Beaverton", zip: "97078", license: "34-443C", address: "7146 SW 158th Ave, Beaverton, OR 97007-4991", phone: "(503) 804-2090", email: "", note: "FLAG: BBB states this business is \"believed to be out of business\" — call to confirm before mailing" },
  { company: "Alpha Associates Services LLP", city: "Albany", zip: "97321", license: "C1138", address: "2813 Pacific Blvd SW, Albany, OR 97321 (a second source lists 2460 W 11th Ave, Eugene, OR 97402)", phone: "(541) 928-7561", email: "mike.helms@alpha-associates-svcs.com", note: "FLAG: two conflicting addresses found — no independent company website, only a Facebook page" },
  { company: "All Phase Electrical", city: "La Grande", zip: "97850", license: "C721", address: "808 4th St, La Grande, OR 97850 (alt: 224 Elkhorn Dr per one federal-vendor listing)", phone: "(541) 963-3000", email: "", note: "FLAG: found entity is registered as \"All Phase Electrical Construction Inc/LLC\" — identity match to license C721 not independently confirmed" },
  { company: "Anderson Electric", city: "Salem", zip: "97302", license: "C832", address: "4742 Liberty Rd S # 376, Salem, OR 97302-5037", phone: "(503) 931-3267", email: "", note: "FLAG: \"#376\" may be a mailbox-service suite rather than a physical shop — worth a Street View check" },
  { company: "Angus Electric", city: "Tillamook", zip: "97141", license: "C210", address: "2 Main Ave, Tillamook, OR 97141", phone: "(503) 815-8145", email: "", note: "FLAG: license not found in the state's current active-license dataset — confirm still operating" },
  { company: "Applecross Electric", city: "Days Creek", zip: "97429", license: "20-120C", address: "4483 Corn Creek Rd, Days Creek, OR 97429", phone: "(541) 825-3557", email: "", note: "FLAG: license appears inactive/expired on third-party lookups — confirm still operating" },
];

// No usable contact info found anywhere (website, address, or phone) —
// excluded from the mailer; would need a phone call or the official,
// CAPTCHA-gated CCB lookup to move forward.
const noInfo = [
  { company: "Accomplished Electric", city: "Hines", zip: "97738", license: "C2001" },
  { company: "Active Electric LLC", city: "Gresham", zip: "97030", license: "C2185" },
  { company: "All Circuits Electric LLC", city: "Ashland", zip: "97520", license: "C2024" },
  { company: "All Phaze Electric LLC", city: "Central Point", zip: "97502", license: "C1733", note: "License itself confirmed real via permit records — just no contact info found anywhere" },
  { company: "Ad Secondary Systems LLC", city: "Fall Creek", zip: "97438", license: "C2044", phone: "(503) 507-7352", note: "Phone found, but no street address located anywhere" },
];

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const header = ["Tier", "Company", "City", "State", "Zip", "License #", "Address", "Phone", "Email", "Notes"];
const rows = [
  ...tierA.map(c => ["A - Ready to mail", c.company, c.city, "OR", c.zip, c.license, c.address, c.phone, c.email, c.note]),
  ...tierB.map(c => ["B - Verify first", c.company, c.city, "OR", c.zip, c.license, c.address, c.phone, c.email, c.note]),
  ...noInfo.map(c => ["C - No contact info found", c.company, c.city, "OR", c.zip, c.license, "", c.phone || "", "", c.note || "not found anywhere searched"]),
];

const csv = [header, ...rows].map(r => r.map(csvEscape).join(",")).join("\r\n");
fs.writeFileSync("mailer-list-next-50.csv", csv);

console.log(`Wrote mailer-list-next-50.csv`);
console.log(`Tier A (ready to mail): ${tierA.length}`);
console.log(`Tier B (verify first): ${tierB.length}`);
console.log(`Tier C (no info found): ${noInfo.length}`);
console.log(`Disqualified (has a live website): ${50 - tierA.length - tierB.length - noInfo.length}`);
