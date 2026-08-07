const fs = require("fs");
const rows = fs.readFileSync("pilot-outreach-list.csv", "utf8").trim().split("\r\n");
const header = rows[0].split(",");

// Minimal CSV parser good enough for our own escaped output (handles quoted fields with commas).
function parseCsvLine(line) {
  const out = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQ = false; }
      else cur += ch;
    } else {
      if (ch === '"') inQ = true;
      else if (ch === ",") { out.push(cur); cur = ""; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

const idx = Object.fromEntries(header.map((h, i) => [h, i]));
const records = rows.slice(1).map(parseCsvLine);

const withEmail = records.filter((r) => r[idx["Email"]]);

function csvEscape(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// Mailchimp's standard import columns: Email Address is required/reserved.
// COMPANY / CITY / DEMOURL become custom merge fields you create in Mailchimp
// (Audience > Settings > Audience fields) before importing — same names,
// and Mailchimp will auto-generate tags like *|COMPANY|* to use in the email.
const mcHeader = ["Email Address", "COMPANY", "CITY", "DEMOURL"];
const mcRows = withEmail.map((r) => [
  r[idx["Email"]],
  r[idx["Company"]],
  r[idx["City"]],
  r[idx["Demo URL"]],
]);

const csv = [mcHeader, ...mcRows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
fs.writeFileSync("mailchimp-import.csv", csv);
console.log(`Wrote mailchimp-import.csv — ${mcRows.length} contacts (only companies with a real email)`);
