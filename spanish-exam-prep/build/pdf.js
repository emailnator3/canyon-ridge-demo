const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + process.argv[2]); await p.pdf({ path: process.argv[3], format: 'Letter', printBackground: true,
  displayHeaderFooter: true, headerTemplate: '<span></span>',
  footerTemplate: '<div style="font-size:8pt;width:100%;text-align:center;color:#666">Simulacro de Cálculos — Journeyman Texas NEC 2026 · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
  margin: { top: '0.6in', bottom: '0.7in', left: '0.7in', right: '0.7in' } }); await b.close(); })();
