# Muestra gratis — 10 preguntas de cálculos (Journeyman Texas, NEC 2026)
# Free sample — 10 calculation questions

> **BEFORE THIS GOES PUBLIC — your checklist:**
> - [ ] I checked every answer against my NEC 2026 book
> - [ ] I confirmed every section/table number in the **2026** edition (marked ⚠ where numbering moved recently)
> - [ ] Bilingual reviewer approved the Spanish
>
> Drafted by AI. Not checked by a licensed electrician yet.

---

### 1. Llenado de caja / Box fill
**ES:** Una caja de dispositivos contiene 4 conductores aislados calibre 12 AWG, 2 conductores
de puesta a tierra de equipos calibre 12 AWG y un receptáculo. ¿Cuál es el volumen mínimo
requerido de la caja?
**EN:** A device box contains four 12 AWG insulated conductors, two 12 AWG equipment
grounding conductors, and one receptacle. What is the minimum required box volume?

A) 13.50 pulg³  B) 15.75 pulg³  C) 18.00 pulg³  D) 20.25 pulg³

**Respuesta: B — 15.75 pulg³**
4 conductores = 4 volúmenes. Los conductores de puesta a tierra (hasta 4) = 1 volumen.
El receptáculo (yugo) = 2 volúmenes. Total = 7 × 2.25 pulg³ (12 AWG) = **15.75 pulg³**.
Ref: 314.16(B) y Tabla 314.16(B).

---

### 2. Ley de Ohm / Ohm's law
**ES:** Un calentador de 1,500 W está conectado a 120 V. ¿Cuánta corriente consume?
**EN:** A 1,500 W heater is connected to 120 V. How much current does it draw?

A) 8.0 A  B) 10.0 A  C) 12.5 A  D) 15.0 A

**Respuesta: C — 12.5 A**
I = P ÷ E = 1,500 ÷ 120 = **12.5 A**.

---

### 3. Carga continua / Continuous load
**ES:** Un circuito ramal alimenta una carga continua de 40 A. ¿Cuál es la capacidad mínima
del dispositivo de protección contra sobrecorriente (sin dispositivo listado al 100%)?
**EN:** A branch circuit supplies a 40 A continuous load. What is the minimum overcurrent
device rating (device not listed for 100% operation)?

A) 40 A  B) 45 A  C) 50 A  D) 60 A

**Respuesta: C — 50 A**
40 A × 125% = **50 A**. Ref: 210.20(A).

---

### 4. Cálculo de vivienda / Dwelling demand ⚠
**ES:** Una vivienda unifamiliar de 2,000 pies². Incluya alumbrado general, 2 circuitos de
pequeños electrodomésticos y 1 circuito de lavandería. Aplicando los factores de demanda,
¿cuál es la carga neta para el cálculo del servicio?
**EN:** A 2,000 sq ft single-family dwelling. Include general lighting, two small-appliance
circuits, and one laundry circuit. After demand factors, what is the net load for the service calculation?

A) 4,500 VA  B) 4,925 VA  C) 5,625 VA  D) 8,500 VA

**Respuesta: B — 4,925 VA**
Alumbrado: 2,000 × 2 VA = 4,000 VA. Pequeños electrodomésticos: 2 × 1,500 = 3,000 VA.
Lavandería: 1,500 VA. Total = 8,500 VA.
Primeros 3,000 VA al 100% = 3,000. Resto 5,500 × 35% = 1,925. Neto = **4,925 VA**.
Cuidado: en el NEC 2026 la carga de alumbrado para alimentador/servicio bajó de 3 a **2 VA/pie²**.
Los 3 VA/pie² siguen usándose solo para contar circuitos ramales (120.13). La respuesta C usa el valor viejo.
Ref: 120.41 y factores de demanda del Artículo 120 — ⚠ **verify the lighting demand-factor table number in 2026**.

---

### 5. Ajuste por conductores portadores de corriente / Adjustment factor ⚠
**ES:** Seis conductores portadores de corriente THHN de cobre calibre 12 AWG están en la misma
canalización. Usando la columna de 90 °C, ¿cuál es la ampacidad ajustada?
**EN:** Six current-carrying 12 AWG copper THHN conductors are in the same raceway. Using the
90 °C column, what is the adjusted ampacity?

A) 20 A  B) 24 A  C) 25 A  D) 30 A

**Respuesta: B — 24 A**
12 AWG Cu a 90 °C = 30 A. 4–6 conductores = 80%. 30 × 0.80 = **24 A**.
Ref: Tabla 310.16 y Tabla 310.15(C)(1) — ⚠ **verify numbering in 2026**.

---

### 6. Motor monofásico / Single-phase motor
**ES:** Un motor monofásico de 2 HP a 230 V. ¿Cuál es la ampacidad mínima de los conductores
del circuito ramal?
**EN:** A 2 hp, 230 V single-phase motor. What is the minimum branch-circuit conductor ampacity?

A) 12 A  B) 15 A  C) 17 A  D) 20 A

**Respuesta: B — 15 A**
Corriente a plena carga (Tabla 430.248) = 12 A. 12 × 125% = **15 A**. Ref: 430.22.
Use la corriente de la tabla, no la de la placa de datos.

---

### 7. Caída de tensión / Voltage drop
**ES:** Un circuito monofásico de 240 V alimenta una carga de 30 A a 150 pies (una vía) con
conductores de cobre calibre 10 AWG (10,380 cmil). Use K = 12.9. ¿Cuál es la caída de tensión?
**EN:** A 240 V single-phase circuit feeds a 30 A load 150 ft away (one way) with 10 AWG
copper (10,380 cmil). Use K = 12.9. What is the voltage drop?

A) 5.6 V  B) 8.4 V  C) 11.2 V  D) 14.0 V

**Respuesta: C — 11.2 V**
VD = (2 × K × I × L) ÷ CM = (2 × 12.9 × 30 × 150) ÷ 10,380 = 116,100 ÷ 10,380 = **11.2 V**
(≈ 4.7%). Ref: Capítulo 9, Tabla 8 (cmil).

---

### 8. Ampacidad / Ampacity
**ES:** ¿Cuál es la ampacidad de un conductor de cobre THWN calibre 3 AWG (columna de 75 °C)?
**EN:** What is the ampacity of a 3 AWG copper THWN conductor (75 °C column)?

A) 85 A  B) 100 A  C) 110 A  D) 115 A

**Respuesta: B — 100 A**. Ref: Tabla 310.16.

---

### 9. Trifásico / Three-phase
**ES:** Una carga trifásica a 208 V consume 40 A por fase. ¿Cuántos kVA son?
**EN:** A 208 V three-phase load draws 40 A per phase. How many kVA is it?

A) 8.3 kVA  B) 12.0 kVA  C) 14.4 kVA  D) 16.6 kVA

**Respuesta: C — 14.4 kVA**
kVA = (E × I × 1.732) ÷ 1,000 = (208 × 40 × 1.732) ÷ 1,000 = **14.4 kVA**.

---

### 10. Secadora de ropa / Clothes dryer
**ES:** La placa de datos de una secadora eléctrica de vivienda indica 4,500 W. ¿Qué valor se
usa en el cálculo de carga?
**EN:** A dwelling electric dryer nameplate reads 4,500 W. What value is used in the load
calculation?

A) 4,500 W  B) 5,000 W  C) 5,625 W  D) 6,000 W

**Respuesta: B — 5,000 W**
Se usa 5,000 W o la placa de datos, lo que sea mayor. Ref: 120.54.

---

## How to turn this into a free self-grading quiz (about 20 min)
1. Go to forms.google.com → Blank form → Settings → turn on **Make this a quiz**.
2. For each question: Multiple choice, paste the ES + EN text, add A–D, click **Answer key**,
   pick the right letter, and paste the "Respuesta" explanation into **Add answer feedback**.
3. Add one optional short-answer question at the end: *"WhatsApp o correo para avisarle cuando
   salga el examen completo de 50 preguntas"* — this builds your launch list.
4. Send → copy link → post it in groups with one line: *"Examen de práctica gratis en español —
   cálculos para Journeyman de Texas, NEC 2026."*
