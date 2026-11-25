# Rebuilding the combined file and PDF

Edit the source files (`03-muestra-calculos-10.md`, `04-preguntas-11-50.md`), then from the repo root run:

```bash
python3 -I spanish-exam-prep/build/combine.py spanish-exam-prep spanish-exam-prep/05-simulacro-completo-50.md
pandoc spanish-exam-prep/05-simulacro-completo-50.md -f markdown -s --metadata pagetitle="Simulacro de Calculos" \
  --css spanish-exam-prep/build/style.css --embed-resources -o /tmp/simulacro.html
node spanish-exam-prep/build/pdf.js /tmp/simulacro.html spanish-exam-prep/simulacro-completo-50-BORRADOR.pdf
```

Or just ask Claude: "rebuild the PDF."
