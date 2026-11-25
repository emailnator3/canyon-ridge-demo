import re, sys
src = sys.argv[1]; out = sys.argv[2]
def body(name, end):
    t = open(f"{src}/{name}").read()
    t = t.split(end)[0]
    return t[t.index("\n### "):]
text = body("03-muestra-calculos-10.md", "\n## How to turn this") + "\n" + body("04-preguntas-11-50.md", "\n## Answer key")
blocks = re.findall(r"^### (\d+)\.[^\n]*\n(.*?)(?=^### \d+\.|^## |\Z)", text, flags=re.S | re.M)
qs = {}
for num, body in blocks:
    n = int(num)
    body = re.sub(r"\n---\s*$", "", body.strip()).strip()
    q, sol = body.split("**Respuesta:", 1)
    sol = "**Respuesta:" + sol
    letter = re.match(r"\*\*Respuesta: ([A-D])", sol).group(1)
    # one choice per line
    lines = []
    for ln in q.strip().splitlines():
        if re.match(r"^A\) ", ln):
            parts = re.split(r"\s{2,}(?=[B-D]\) )", ln.strip())
            lines.append("\n".join(f"- {p}" for p in parts))
        else:
            lines.append(ln)
    q = "\n".join(lines).strip().replace("\n**EN:**", "\n\n**EN:**")
    # strip internal verification notes from customer copy
    sol = re.sub(r"\s*(—\s*)?⚠\s*(—\s*)?(\*\*verify[^*]*\*\*)?(\s*\([^)]*renumbered[^)]*\))?", "", sol)
    sol = re.sub(r"\s*\(verificar número de tabla\)", "", sol)
    sol = re.sub(r"\s+\.", ".", sol).strip()
    qs[n] = (q, letter, sol)
assert sorted(qs) == list(range(1, 51)), sorted(qs)
for n,(q,l,s) in qs.items():
    for bad in ("⚠", "verify", "verificar", "renumbered", "Google", "checklist", "BEFORE", "##"):
        assert bad not in q + s, (n, bad)

PB = '\n<div class="pb"></div>\n'
doc = []
doc.append("""> **BORRADOR — DRAFT. Delete this box before publishing.** Not yet checked against the NEC 2026 by a licensed
> electrician, and the Spanish has not been reviewed. Do not sell until both checks are done.

# Simulacro de Cálculos
## Examen de Journeyman de Texas — NEC 2026
### 50 preguntas de práctica con soluciones explicadas · *Calculations practice exam, 50 questions with worked solutions*

**Cómo usar este simulacro / How to use this practice exam**

1. Tenga a mano su libro del NEC 2026 — el examen de Texas es a libro abierto. *Keep your NEC 2026 book handy — the Texas exam is open book.*
2. Conteste las 50 preguntas de la Parte 1 sin ver las respuestas. Tómese el tiempo. *Answer all 50 in Part 1 without looking. Time yourself.*
3. Califíquese con la Parte 2. *Grade yourself with Part 2.*
4. Estudie la Parte 3 para cada pregunta que falló — ahí está el procedimiento paso a paso y la sección del código. *Study Part 3 for every miss — it shows the step-by-step method and the code section.*

**Supuestos para todas las preguntas, salvo que se indique otra cosa:** conductores de cobre, temperatura ambiente de 30 °C,
terminales de 75 °C. *Assumptions unless stated: copper conductors, 30 °C ambient, 75 °C terminations.*

*Este material no está afiliado con TDLR ni con PSI. NEC® y National Electrical Code® son marcas registradas de la NFPA.
Las referencias indican la sección del código; consulte su propia copia del NEC 2026. This material is not affiliated
with TDLR or PSI. NEC® is a registered trademark of NFPA.*
""")
doc.append(PB + "\n# Parte 1 — Preguntas / Questions\n")
for n in range(1, 51):
    doc.append(f"### {n}.\n{qs[n][0]}\n")
doc.append(PB + "\n# Parte 2 — Hoja de respuestas / Answer key\n")
rows = ["| # | R | # | R | # | R | # | R | # | R |", "|---|---|---|---|---|---|---|---|---|---|"]
for i in range(1, 11):
    rows.append("| " + " | ".join(f"{n} | **{qs[n][1]}**" for n in (i, i+10, i+20, i+30, i+40)) + " |")
doc.append("\n".join(rows) + "\n\n**Su puntaje / Your score:** ______ / 50\n")
doc.append(PB + "\n# Parte 3 — Soluciones explicadas / Worked solutions\n")
for n in range(1, 51):
    doc.append(f"### {n}.\n{qs[n][2]}\n")
open(out, "w").write("\n".join(doc))
print("ok", len(qs), "questions; letters:", "".join(qs[n][1] for n in range(1,51)))
