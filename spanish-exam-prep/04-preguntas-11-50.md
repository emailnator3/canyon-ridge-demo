# Simulacro de Cálculos — Preguntas 11–50 (Journeyman Texas, NEC 2026)
# Calculations drill — Questions 11–50

> **BEFORE ANY OF THIS IS SOLD — your checklist:**
> - [ ] I checked every answer against my NEC 2026 book
> - [ ] I confirmed every section/table number in the **2026** edition (⚠ = numbering moved in a recent edition, check first)
> - [ ] Bilingual reviewer approved the Spanish
>
> Drafted by AI. Arithmetic re-computed by script; code values and section numbers NOT yet checked by a licensed electrician.
> Assumptions for all questions unless stated: copper conductors, 30 °C ambient, terminations rated 75 °C.

**Topics in this batch:** box & conduit fill (11–13) · derating (14–15) · overcurrent (16, 24, 47) · motors (17–20) ·
basic theory (21–23, 48–49) · voltage drop (25–26) · dwelling loads (27–33) · transformers (34–36) ·
grounding (37–40) · commercial loads (41–46) · three-phase (50)

---

## Llenado de cajas y tubería / Box & conduit fill

### 11.
**ES:** Una caja contiene 6 conductores aislados calibre 14 AWG, 2 conductores de puesta a tierra de equipos 14 AWG,
una abrazadera interna de cable y un interruptor (switch). ¿Volumen mínimo de la caja?
**EN:** A box contains six 14 AWG insulated conductors, two 14 AWG EGCs, one internal cable clamp, and one switch.
Minimum box volume?

A) 16.0 pulg³  B) 18.0 pulg³  C) 20.0 pulg³  D) 22.5 pulg³

**Respuesta: C — 20.0 pulg³.** Conductores 6 + tierras 1 + abrazadera 1 + interruptor 2 = 10 × 2.00 = **20.0 pulg³**.
Ref: 314.16(B).

### 12.
**ES:** Una caja contiene 4 conductores aislados 12 AWG y 2 conductores aislados 14 AWG. No hay dispositivos, abrazaderas
ni tierras. ¿Volumen mínimo?
**EN:** A box holds four 12 AWG and two 14 AWG insulated conductors. No devices, clamps, or grounds. Minimum volume?

A) 12.0 pulg³  B) 13.0 pulg³  C) 13.5 pulg³  D) 15.75 pulg³

**Respuesta: B — 13.0 pulg³.** (4 × 2.25) + (2 × 2.00) = 9.0 + 4.0 = **13.0 pulg³**. Ref: Tabla 314.16(B).

### 13.
**ES:** ¿Cuántos conductores THHN calibre 12 AWG caben en un tubo EMT de 3/4"? (Más de 2 conductores = 40% de llenado.)
**EN:** How many 12 AWG THHN conductors are permitted in 3/4" EMT? (Over 2 conductors = 40% fill.)

A) 9  B) 12  C) 16  D) 22

**Respuesta: C — 16.** Área 40% del EMT 3/4" = 0.213 pulg². Área de 12 THHN = 0.0133 pulg².
0.213 ÷ 0.0133 = 16.0 → **16**. Ref: Cap. 9, Tablas 1, 4 y 5 (comprobar con Anexo C, Tabla C.1).

---

## Ajuste y corrección / Derating

### 14. ⚠
**ES:** Un conductor THHN calibre 8 AWG (columna de 90 °C) está en un lugar con temperatura ambiente de 40 °C.
Tres conductores portadores de corriente. ¿Ampacidad corregida?
**EN:** An 8 AWG THHN conductor (90 °C column) is in a 40 °C ambient. Three current-carrying conductors. Corrected ampacity?

A) 44 A  B) 50 A  C) 55 A  D) 60 A

**Respuesta: B — 50 A.** 55 A × 0.91 = **50.05 A**. Ref: Tabla 310.16 y Tabla 310.15(B)(1)(1) ⚠.

### 15. ⚠
**ES:** Seis conductores portadores de corriente THHN calibre 10 AWG en una canalización, temperatura ambiente 40 °C.
Usando la columna de 90 °C, ¿ampacidad ajustada?
**EN:** Six 10 AWG THHN current-carrying conductors in one raceway, 40 °C ambient. Using the 90 °C column, adjusted ampacity?

A) 29.1 A  B) 32.0 A  C) 36.4 A  D) 40.0 A

**Respuesta: A — 29.1 A.** 40 A × 0.80 × 0.91 = **29.12 A**. Ref: Tablas 310.16, 310.15(B)(1)(1) y 310.15(C)(1) ⚠.

---

## Protección contra sobrecorriente / Overcurrent

### 16.
**ES:** Un alimentador lleva 30 A de carga continua y 20 A de carga no continua. ¿Tamaño estándar mínimo del dispositivo
de protección?
**EN:** A feeder carries 30 A continuous plus 20 A noncontinuous load. Minimum standard OCPD size?

A) 50 A  B) 57.5 A  C) 60 A  D) 70 A

**Respuesta: C — 60 A.** (30 × 1.25) + 20 = 57.5 A → siguiente tamaño estándar **60 A**. Ref: 215.3, 240.6(A).

---

## Motores / Motors

### 17.
**ES:** Un motor monofásico de 5 HP a 230 V protegido con interruptor de tiempo inverso. ¿Capacidad máxima del
dispositivo de protección del circuito ramal contra cortocircuito y falla a tierra?
**EN:** A 5 hp, 230 V single-phase motor protected by an inverse-time breaker. Maximum branch-circuit
short-circuit and ground-fault protection rating?

A) 35 A  B) 50 A  C) 60 A  D) 70 A

**Respuesta: D — 70 A.** Corriente a plena carga (Tabla 430.248) = 28 A × 250% = **70 A** (tamaño estándar).
Ref: 430.52, Tabla 430.52.

### 18.
**ES:** La placa de datos de un motor indica 26 A y factor de servicio 1.15. ¿Ajuste máximo de la protección
contra sobrecarga?
**EN:** A motor nameplate shows 26 A and a 1.15 service factor. Maximum overload setting?

A) 29.9 A  B) 30.0 A  C) 32.5 A  D) 36.4 A

**Respuesta: C — 32.5 A.** 26 × 125% = **32.5 A**. Para sobrecarga se usa la corriente de la **placa de datos**.
Ref: 430.32(A)(1).

### 19.
**ES:** Un motor trifásico de 10 HP a 460 V. ¿Ampacidad mínima de los conductores del circuito ramal?
**EN:** A 10 hp, 460 V three-phase motor. Minimum branch-circuit conductor ampacity?

A) 14.0 A  B) 17.5 A  C) 21.0 A  D) 27.0 A

**Respuesta: B — 17.5 A.** Tabla 430.250 = 14 A × 125% = **17.5 A**. Ref: 430.22.

### 20.
**ES:** Un motor trifásico de 7.5 HP a 208 V. ¿Ampacidad mínima de los conductores del circuito ramal?
**EN:** A 7.5 hp, 208 V three-phase motor. Minimum branch-circuit conductor ampacity?

A) 24.2 A  B) 27.5 A  C) 30.3 A  D) 33.0 A

**Respuesta: C — 30.3 A.** Tabla 430.250 (columna 208 V) = 24.2 A × 125% = **30.25 A**. Ref: 430.22.

---

## Teoría básica / Basic theory

### 21.
**ES:** Se aplican 240 V a una resistencia de 20 Ω. ¿Cuántos watts disipa?
**EN:** 240 V is applied to a 20 Ω resistor. How many watts does it dissipate?

A) 1,200 W  B) 2,400 W  C) 2,880 W  D) 4,800 W

**Respuesta: C — 2,880 W.** P = E² ÷ R = 57,600 ÷ 20 = **2,880 W** (I = 12 A).

### 22.
**ES:** Tres resistencias de 10 Ω, 20 Ω y 30 Ω están en **serie** a 120 V. ¿Corriente del circuito?
**EN:** Three resistors of 10, 20 and 30 Ω are in **series** on 120 V. Circuit current?

A) 2 A  B) 4 A  C) 6 A  D) 12 A

**Respuesta: A — 2 A.** R total = 60 Ω. I = 120 ÷ 60 = **2 A**.

### 23.
**ES:** Dos resistencias de 6 Ω y 12 Ω están en **paralelo**. ¿Resistencia total?
**EN:** 6 Ω and 12 Ω resistors are in **parallel**. Total resistance?

A) 3 Ω  B) 4 Ω  C) 9 Ω  D) 18 Ω

**Respuesta: B — 4 Ω.** (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = **4 Ω**.

### 24.
**ES:** Un calentador de agua de almacenamiento de 4,500 W a 240 V (50 galones). ¿Tamaño mínimo estándar del dispositivo
de protección?
**EN:** A 4,500 W, 240 V storage water heater (50 gal). Minimum standard OCPD size?

A) 20 A  B) 25 A  C) 30 A  D) 35 A

**Respuesta: B — 25 A.** I = 4,500 ÷ 240 = 18.75 A × 125% = 23.4 A → **25 A**.
Ref: 422.13 (se considera carga continua), 240.6(A).

---

## Caída de tensión / Voltage drop

### 25.
**ES:** Circuito trifásico de 480 V, carga de 50 A a 200 pies, conductores de cobre 6 AWG (26,240 cmil). K = 12.9.
¿Caída de tensión?
**EN:** 480 V three-phase, 50 A load, 200 ft, 6 AWG copper (26,240 cmil). K = 12.9. Voltage drop?

A) 4.9 V  B) 8.5 V  C) 9.8 V  D) 14.7 V

**Respuesta: B — 8.5 V.** VD = (1.732 × K × I × L) ÷ CM = (1.732 × 12.9 × 50 × 200) ÷ 26,240 = **8.5 V**.
Ref: Cap. 9, Tabla 8.

### 26.
**ES:** Carga de 20 A a 120 V, a 100 pies. Caída máxima deseada 3%. K = 12.9. ¿Calibre mínimo de cobre?
**EN:** 20 A load at 120 V, 100 ft away. Max desired drop 3%. K = 12.9. Minimum copper size?

A) 12 AWG  B) 10 AWG  C) 8 AWG  D) 6 AWG

**Respuesta: C — 8 AWG.** 3% de 120 V = 3.6 V. CM = (2 × 12.9 × 20 × 100) ÷ 3.6 = 14,333 cmil.
10 AWG = 10,380 (muy chico); 8 AWG = 16,510 → **8 AWG**. Ref: Cap. 9, Tabla 8.

---

## Cargas de vivienda / Dwelling loads

### 27. ⚠
**ES:** Una vivienda tiene una estufa (range) de 12 kW. ¿Carga de demanda para el cálculo?
**EN:** A dwelling has one 12 kW range. Demand load for the calculation?

A) 6 kW  B) 8 kW  C) 9.6 kW  D) 12 kW

**Respuesta: B — 8 kW.** Tabla 220.55, Columna C, 1 aparato = **8 kW** ⚠ (verificar número de tabla).

### 28. ⚠
**ES:** Una vivienda tiene una estufa de 14 kW. ¿Carga de demanda?
**EN:** A dwelling has one 14 kW range. Demand load?

A) 8.0 kW  B) 8.4 kW  C) 8.8 kW  D) 11.2 kW

**Respuesta: C — 8.8 kW.** Excede 12 kW por 2 kW → aumentar Columna C 5% por cada kW = 10%.
8 × 1.10 = **8.8 kW**. Ref: Tabla 220.55, Nota 1 ⚠.

### 29.
**ES:** Una vivienda tiene 4 aparatos fijos: calentador de agua 4,500 VA, lavaplatos 1,200 VA, triturador 900 VA,
bomba de pozo 1,400 VA. ¿Carga de demanda?
**EN:** A dwelling has 4 fastened-in-place appliances: water heater 4,500 VA, dishwasher 1,200 VA, disposal 900 VA,
well pump 1,400 VA. Demand load?

A) 4,000 VA  B) 6,000 VA  C) 7,200 VA  D) 8,000 VA

**Respuesta: B — 6,000 VA.** Total 8,000 VA. 4 o más aparatos = 75%. 8,000 × 0.75 = **6,000 VA**. Ref: 220.53.

### 30.
**ES:** Una vivienda tiene calefacción eléctrica de 10 kW y aire acondicionado de 5 kW que nunca funcionan al mismo
tiempo. ¿Qué carga se usa?
**EN:** A dwelling has 10 kW electric heat and 5 kW A/C that never run at the same time. Which load is used?

A) 5 kW  B) 10 kW  C) 12.5 kW  D) 15 kW

**Respuesta: B — 10 kW.** Cargas no coincidentes: se usa la mayor. Ref: 220.60.

### 31.
**ES:** La carga calculada de una vivienda es 33,600 VA a 120/240 V monofásico. ¿Cuántos amperes?
**EN:** A dwelling's calculated load is 33,600 VA at 120/240 V single-phase. How many amperes?

A) 120 A  B) 140 A  C) 160 A  D) 280 A

**Respuesta: B — 140 A.** 33,600 ÷ 240 = **140 A**.

### 32.
**ES:** Método opcional para viviendas: la carga general (sin calefacción ni aire) es 30,000 VA. ¿Carga después de
aplicar la demanda?
**EN:** Dwelling optional method: general load (not including heat or A/C) is 30,000 VA. Load after demand?

A) 12,000 VA  B) 15,000 VA  C) 18,000 VA  D) 22,000 VA

**Respuesta: C — 18,000 VA.** Primeros 10,000 VA al 100% + 20,000 × 40% = 8,000 → **18,000 VA**. Ref: 220.82(B).

### 33.
**ES:** La demanda de una estufa es 8 kW. ¿Qué carga se usa para el **neutro** del alimentador/servicio?
**EN:** A range demand is 8 kW. What load is used for the feeder/service **neutral**?

A) 4,000 W  B) 5,600 W  C) 6,400 W  D) 8,000 W

**Respuesta: B — 5,600 W.** 8,000 × 70% = **5,600 W**. Ref: 220.61(B)(1).

---

## Transformadores / Transformers

### 34.
**ES:** Un transformador trifásico de 75 kVA tiene un primario de 480 V. ¿Corriente del primario?
**EN:** A 75 kVA three-phase transformer has a 480 V primary. Primary current?

A) 52.1 A  B) 90.2 A  C) 156.3 A  D) 208.2 A

**Respuesta: B — 90.2 A.** 75,000 ÷ (480 × 1.732) = **90.2 A**.

### 35.
**ES:** Un transformador monofásico de 25 kVA tiene un secundario de 240 V. ¿Corriente del secundario?
**EN:** A 25 kVA single-phase transformer has a 240 V secondary. Secondary current?

A) 60.1 A  B) 89.4 A  C) 104.2 A  D) 208.3 A

**Respuesta: C — 104.2 A.** 25,000 ÷ 240 = **104.2 A**.

### 36.
**ES:** El transformador de la pregunta 34 (90.2 A en el primario) tiene protección solo en el primario.
¿Tamaño máximo estándar del dispositivo de protección?
**EN:** The transformer in question 34 (90.2 A primary) has primary-only protection. Maximum standard OCPD size?

A) 90 A  B) 100 A  C) 110 A  D) 125 A

**Respuesta: D — 125 A.** 90.2 × 125% = 112.8 A. No es tamaño estándar → se permite el siguiente: **125 A**.
Ref: 450.3(B), Tabla 450.3(B) Nota 1, 240.6(A).

---

## Puesta a tierra / Grounding

### 37.
**ES:** Los conductores de entrada del servicio son de cobre 3/0 AWG. ¿Calibre mínimo del conductor del electrodo de
puesta a tierra (cobre)?
**EN:** Service-entrance conductors are 3/0 AWG copper. Minimum copper grounding electrode conductor?

A) 8 AWG  B) 6 AWG  C) 4 AWG  D) 2 AWG

**Respuesta: C — 4 AWG.** Tabla 250.66 (2/0 o 3/0 Cu → 4 AWG Cu).

### 38.
**ES:** Un circuito está protegido con un dispositivo de 60 A. ¿Calibre mínimo del conductor de puesta a tierra de
equipos (cobre)?
**EN:** A circuit is protected by a 60 A OCPD. Minimum copper equipment grounding conductor?

A) 12 AWG  B) 10 AWG  C) 8 AWG  D) 6 AWG

**Respuesta: B — 10 AWG.** Tabla 250.122.

### 39.
**ES:** Un alimentador está protegido con un dispositivo de 200 A. ¿Calibre mínimo del conductor de puesta a tierra de
equipos (cobre)?
**EN:** A feeder is protected by a 200 A OCPD. Minimum copper EGC?

A) 8 AWG  B) 6 AWG  C) 4 AWG  D) 2 AWG

**Respuesta: B — 6 AWG.** Tabla 250.122.

### 40.
**ES:** Servicio de 400 A. ¿Cuál es el calibre máximo **requerido** del conductor de electrodo de puesta a tierra que va
**solamente** a una varilla (rod) de tierra?
**EN:** 400 A service. What is the largest copper GEC **required** when it connects **only** to a ground rod?

A) 6 AWG  B) 4 AWG  C) 2 AWG  D) 1/0 AWG

**Respuesta: A — 6 AWG.** A una varilla, no se requiere más grande que 6 AWG cobre. Ref: 250.66(A).

---

## Cargas comerciales / Commercial loads

### 41.
**ES:** Un local comercial tiene 50 receptáculos sencillos de uso general. ¿Carga calculada?
**EN:** A commercial space has 50 general-use single receptacles. Calculated load?

A) 7,500 VA  B) 9,000 VA  C) 10,000 VA  D) 15,000 VA

**Respuesta: B — 9,000 VA.** 50 × 180 VA = **9,000 VA**. Ref: 220.14(I).

### 42.
**ES:** Un edificio comercial tiene 80 receptáculos de uso general. Aplique el factor de demanda. ¿Carga neta?
**EN:** A commercial building has 80 general-use receptacles. Apply the demand factor. Net load?

A) 10,000 VA  B) 12,200 VA  C) 14,400 VA  D) 7,200 VA

**Respuesta: B — 12,200 VA.** 80 × 180 = 14,400 VA. Primeros 10,000 al 100% + 4,400 × 50% = 2,200 → **12,200 VA**.
Ref: 220.44.

### 43.
**ES:** Un escaparate (show window) mide 30 pies lineales. ¿Carga mínima de alumbrado?
**EN:** A show window is 30 linear feet. Minimum lighting load?

A) 3,600 VA  B) 4,500 VA  C) 6,000 VA  D) 9,000 VA

**Respuesta: C — 6,000 VA.** 30 × 200 VA por pie = **6,000 VA**. Ref: 220.14(G).

### 44.
**ES:** Un local comercial con entrada para peatones requiere una salida para letrero. ¿Carga mínima de esa salida?
**EN:** A commercial occupancy with pedestrian access requires a sign outlet. Minimum load for that outlet?

A) 180 VA  B) 600 VA  C) 1,200 VA  D) 1,500 VA

**Respuesta: C — 1,200 VA.** Ref: 220.14(F), 600.5.

### 45. ⚠
**ES:** Un edificio de oficinas de 10,000 pies². ¿Carga de alumbrado general (sin factor de continuidad)?
**EN:** A 10,000 sq ft office building. General lighting load (before the continuous-load factor)?

A) 10,000 VA  B) 13,000 VA  C) 25,000 VA  D) 35,000 VA

**Respuesta: B — 13,000 VA.** 10,000 × 1.3 VA/pie² = **13,000 VA**.
Ref: Tabla 220.42(A) ⚠ — **verify the office unit load and table number in 2026.**

### 46.
**ES:** ¿Cuántos receptáculos de uso general se pueden conectar a un circuito de 20 A, 120 V en un local comercial?
**EN:** How many general-use receptacles may be on a 20 A, 120 V circuit in a commercial occupancy?

A) 10  B) 12  C) 13  D) 16

**Respuesta: C — 13.** (20 × 120) ÷ 180 = 13.3 → **13** (siempre redondear hacia abajo). Ref: 220.14(I).

### 47.
**ES:** ¿Carga continua máxima en un interruptor de 20 A que no está listado para operar al 100%?
**EN:** Maximum continuous load on a 20 A breaker not listed for 100% operation?

A) 15 A  B) 16 A  C) 18 A  D) 20 A

**Respuesta: B — 16 A.** 20 × 80% = **16 A** (lo inverso de 125%). Ref: 210.20(A).

---

## Potencia y trifásico / Power & three-phase

### 48.
**ES:** Una carga de 240 V consume 30 A con factor de potencia de 0.8. ¿Potencia real en watts?
**EN:** A 240 V load draws 30 A at 0.8 power factor. True power in watts?

A) 4,608 W  B) 5,760 W  C) 7,200 W  D) 9,000 W

**Respuesta: B — 5,760 W.** W = E × I × FP = 240 × 30 × 0.8 = **5,760 W**.

### 49.
**ES:** Un motor de 10 HP entrega su potencia completa y consume 8,500 W. ¿Eficiencia? (1 HP = 746 W)
**EN:** A 10 hp motor delivers full output and draws 8,500 W. Efficiency? (1 hp = 746 W)

A) 78%  B) 85%  C) 88%  D) 92%

**Respuesta: C — 88%.** Salida 7,460 W ÷ entrada 8,500 W = 0.878 → **≈ 88%**.

### 50.
**ES:** Una carga trifásica de 30 kW a 480 V con factor de potencia 1.0. ¿Corriente por fase?
**EN:** A 30 kW three-phase load at 480 V, unity power factor. Current per phase?

A) 36.1 A  B) 41.7 A  C) 62.5 A  D) 104.2 A

**Respuesta: A — 36.1 A.** 30,000 ÷ (480 × 1.732) = **36.1 A**.

---

## Answer key / Clave de respuestas
| # | R | # | R | # | R | # | R |
|---|---|---|---|---|---|---|---|
| 11 | C | 21 | C | 31 | B | 41 | B |
| 12 | B | 22 | A | 32 | C | 42 | B |
| 13 | C | 23 | B | 33 | B | 43 | C |
| 14 | B | 24 | B | 34 | B | 44 | C |
| 15 | A | 25 | B | 35 | C | 45 | B |
| 16 | C | 26 | C | 36 | D | 46 | C |
| 17 | D | 27 | B | 37 | C | 47 | B |
| 18 | C | 28 | C | 38 | B | 48 | B |
| 19 | B | 29 | B | 39 | B | 49 | C |
| 20 | C | 30 | B | 40 | A | 50 | A |

**Note for you:** too many answers land on B/C. When building the Google Form, open each question's ⋮ menu and turn on
**Shuffle option order**, and turn on **Shuffle question order** (Settings → Presentation), so buyers can't guess a pattern.
In the PDF version, the letters stay as written here.
