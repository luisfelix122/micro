// LABORATORIO DE MICROECONOMÍA - SECCIÓN EXAMEN AÑADIDA
// Sistema de Coordenadas: 0-100 (Económico) -> SVG Pixels
const OFFSET_X = 110;  // Más espacio para números grandes
const OFFSET_Y = 80;   // Más espacio superior para etiqueta P
const GRAPH_SIZE = 450; // Grafo mucho más grande
const SCALE = GRAPH_SIZE / 100;

function toSVG(q, p) {
    return {
        x: OFFSET_X + (q * SCALE),
        y: OFFSET_Y + ((100 - p) * SCALE)
    };
}

const workflow = [
    {
        mainTitle: "Bloque 1: Mercados Competitivos",
        substeps: [
            {
                subtitle: "La Curva de Demanda",
                explanation: "Representa a los consumidores. Para que sea un <strong>Mercado Competitivo</strong>, debe haber <em>Información Perfecta</em> y <em>Homogeneidad</em> (el producto es igual para todos). Los consumidores son 'precio-aceptantes'. <strong>¿Por qué baja?</strong> Por el efecto sustitución y renta: si es caro, buscamos alternativas.",
                legend: [{ label: "Demanda (D)", color: "var(--accent-blue)" }],
                draw: (svg) => {
                    const p1 = toSVG(0, 100); const p2 = toSVG(100, 0);
                    createPath(svg, "curve", `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`, "var(--accent-blue)");
                }
            },
            {
                subtitle: "La Curva de Oferta (CMg)",
                explanation: "Representa a las empresas. Aquí rige la <strong>Libertad de Entrada</strong>. La curva de oferta es, en realidad, la curva de <strong>Costo Marginal (CMg)</strong> de las empresas. Suben la producción solo si el precio cubre el costo de la última unidad producida.",
                legend: [{ label: "Demanda", color: "var(--accent-blue)" }, { label: "Oferta (S)", color: "var(--accent-red)" }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0);
                    const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                }
            },
            {
                subtitle: "Regla de Oro: P = CMg",
                explanation: "¡Exacto! En competencia perfecta, como la empresa es pequeña, el <strong>Ingreso Marginal (IMg)</strong> es igual al Precio. Esto significa que cada unidad extra se vende al mismo precio de mercado. Por eso, para la empresa, la Demanda es una línea horizontal: <i>P = D = IMg</i>. La regla es producir donde esta línea corta al <strong>Costo Marginal (CMg)</strong>.",
                legend: [{ label: "Precio = IMg", color: "var(--accent-purple)", isLine: true }, { label: "Costo Marginal (CMg)", color: "var(--accent-red)" }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0);
                    const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    const eq = toSVG(50, 50);
                    const lineEnd = toSVG(100, 50);
                    // Curvas de mercado
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)", null, true); // Rayada
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                    // Línea P = IMg (Horizontal)
                    createLine(svg, "line-intervention", OFFSET_X, eq.y, lineEnd.x, eq.y, "var(--accent-purple)");
                    createText(svg, "axis-label-small", lineEnd.x - 100, eq.y - 10, "P = D = IMg", "var(--accent-purple)");

                    createCircle(svg, "marker-point", eq.x, eq.y, 7);
                    createLine(svg, "line-intervention", eq.x, eq.y, eq.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.5)");
                }
            },
            {
                subtitle: "El Costo Medio (CMe)",
                explanation: "Para saber si hay beneficio real, usamos el <strong>Costo Medio (CMe)</strong>. Es el costo promedio de <em>todas</em> las unidades producidas (Costo Total / Q). Mientras el <i>CMg</i> decide <em>cuánto</em> producir, el <i>CMe</i> decide si hay <em>beneficio</em>. Solo si el Precio está por encima del CMe, la empresa gana dinero neto.",
                legend: [{ label: "Costo Marginal (CMg)", color: "var(--accent-red)" }, { label: "Costo Medio (CMe)", color: "var(--accent-orange)" }],
                draw: (svg) => {
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    let d = "";
                    for (let q = 15; q <= 100; q += 5) {
                        const p = 0.5 * q + 1250 / q;
                        const pos = toSVG(q, p);
                        d += (q === 15 ? "M " : "L ") + `${pos.x} ${pos.y} `;
                    }
                    createPath(svg, "curve", d, "var(--accent-orange)");
                    const min = toSVG(50, 50);
                    createCircle(svg, "marker-point", min.x, min.y, 5, "var(--accent-orange)");
                    createText(svg, "axis-label-small", min.x + 10, min.y + 20, "Mínimo CMe", "var(--accent-orange)");
                }
            },
            {
                subtitle: "Equilibrio y Eficiencia",
                explanation: "En el punto negro (Q=50, P=50), el mercado es <strong>Eficiente</strong>. No hay espacios vacíos a la izquierda del equilibrio; cada unidad que se podía producir a un costo menor de lo que alguien estaba dispuesto a pagar, se ha producido. Es el acuerdo perfecto.",
                legend: [{ label: "Equilibrio", color: "white" }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0);
                    const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    const eq = toSVG(50, 50);
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");

                    // Guías de equilibrio con etiquetas
                    createLine(svg, "line-intervention", OFFSET_X, eq.y, eq.x, eq.y, "rgba(255,255,255,0.3)");
                    createLine(svg, "line-intervention", eq.x, eq.y, eq.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.3)");
                    createText(svg, "axis-label-small", OFFSET_X - 45, eq.y + 5, "50", "white");
                    createText(svg, "axis-label-small", eq.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "50", "white");

                    createCircle(svg, "marker-point", eq.x, eq.y, 6);
                }
            },
            {
                subtitle: "Los Excedentes (Bienestar)",
                explanation: "Es la medida de 'felicidad' económica. <strong>Excedente del Consumidor:</strong> Triángulo azul (ahorro del bolsillo). <strong>Excedente del Productor:</strong> Triángulo rojo. Recuerda: es la ganancia operativa (<i>P - CMg</i>). Como vimos con el <strong>Costo Medio</strong>, de aquí el productor debe pagar sus costos fijos para llegar al beneficio neto final.",
                legend: [{ label: "E. Consumidor", color: "var(--accent-blue)", isArea: true }, { label: "E. Productor", color: "var(--accent-red)", isArea: true }],
                draw: (svg) => {
                    const top = toSVG(0, 100); const mid = toSVG(0, 50); const bot = toSVG(0, 0); const eq = toSVG(50, 50);
                    createPath(svg, "area-shade", `M ${mid.x} ${mid.y} L ${eq.x} ${eq.y} L ${top.x} ${top.y} Z`, "var(--accent-blue)");
                    createPath(svg, "area-shade", `M ${mid.x} ${mid.y} L ${eq.x} ${eq.y} L ${bot.x} ${bot.y} Z`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${top.x} ${top.y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${bot.x} ${bot.y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                }
            }
        ]
    },
    {
        mainTitle: "Intervención: Precio Máximo",
        substeps: [
            {
                subtitle: "Tope Legal (Caso Medicamentos)",
                explanation: "Imagina el control de precios de medicamentos esenciales. El Estado cree que el precio de mercado es abusivo y fija un <strong>Precio Máximo</strong> por debajo del equilibrio (<i>P<sub>max</sub> < P<sub>eq</sub></i>). Esto rompe la señal de precios natural.",
                legend: [{ label: "Precio Máximo", color: "var(--accent-purple)", isLine: true }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0); const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    const pmax = toSVG(100, 30);
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                    createLine(svg, "line-intervention", OFFSET_X, pmax.y, pmax.x, pmax.y, "var(--accent-purple)");
                    createText(svg, "axis-label", OFFSET_X - 55, pmax.y + 10, "30", "var(--accent-purple)");
                }
            },
            {
                subtitle: "Desequilibrio: ESCASEZ",
                explanation: "<strong>Efecto Inmediato:</strong> A $30, todos quieren comprar (<i>Q<sub>d</sub>=70</i>) pero a las farmacéuticas no les sale a cuenta producir tant (<i>Q<sub>s</sub>=30</i>). La distancia entre lo que la gente quiere y lo que hay es la <strong>ESCASEZ</strong>. Resultado: colas, mercado negro y gente sin medicinas.",
                legend: [{ label: "Escasez (Gap)", color: "var(--accent-orange)", isLine: true }],
                draw: (svg) => {
                    const qs = toSVG(30, 30); const qd = toSVG(70, 30);
                    const p100 = toSVG(0, 100); const q100 = toSVG(100, 0);
                    createPath(svg, "curve", `M ${p100.x} ${p100.y} L ${q100.x} ${q100.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${OFFSET_X} ${OFFSET_Y + GRAPH_SIZE} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    createLine(svg, "curve", qs.x, qs.y, qd.x, qd.y, "var(--accent-orange)");

                    // Guías limpias
                    createLine(svg, "line-intervention", qs.x, qs.y, qs.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.4)");
                    createLine(svg, "line-intervention", qd.x, qd.y, qd.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.4)");
                    createLine(svg, "line-intervention", OFFSET_X, qs.y, qd.x, qs.y, "var(--accent-purple)", null, true);

                    // Solo los números que importan
                    createText(svg, "axis-label-small", qs.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "30", "var(--accent-red)");
                    createText(svg, "axis-label-small", qd.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "70", "var(--accent-blue)");
                    createText(svg, "axis-label-small", OFFSET_X - 35, qs.y + 5, "30", "var(--accent-purple)");

                    createCircle(svg, "marker-point", qs.x, qs.y, 5, "var(--accent-red)");
                    createCircle(svg, "marker-point", qd.x, qd.y, 5, "var(--accent-blue)");
                }
            },
            {
                subtitle: "Análisis de Excedentes y DWL",
                explanation: "<strong>Consumidor:</strong> Gana precio bajo pero pierde por escasez. <strong>Productor:</strong> Pierde mucho (vende menos y más barato). <strong>Eficiencia:</strong> El triángulo blanco es la <em>Pérdida Irrecuperable (DWL)</em>. Es bienestar que 'desaparece' porque se dejan de hacer transacciones que eran valiosas.",
                legend: [{ label: "Pérdida Social (DWL)", color: "white", isArea: true }],
                draw: (svg) => {
                    const eq = toSVG(50, 50); const q30s = toSVG(30, 30); const q30d = toSVG(30, 70);
                    createPath(svg, "area-shade", `M ${q30s.x} ${q30s.y} L ${q30d.x} ${q30d.y} L ${eq.x} ${eq.y} Z`, "white");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");

                    // Etiquetas DWL Sincronizadas
                    createLine(svg, "line-intervention", q30s.x, q30s.y, q30s.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.4)");
                    createText(svg, "axis-label-small", q30s.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "30", "white");

                    createLine(svg, "line-intervention", OFFSET_X, q30s.y, q30s.x, q30s.y, "var(--accent-red)", null, true);
                    createLine(svg, "line-intervention", OFFSET_X, q30d.y, q30d.x, q30d.y, "var(--accent-blue)", null, true);

                    createText(svg, "axis-label-small", OFFSET_X - 45, q30s.y + 5, "30", "var(--accent-red)");
                    createText(svg, "axis-label-small", OFFSET_X - 45, q30d.y + 5, "70", "var(--accent-blue)");
                }
            },
        ]
    },
    {
        mainTitle: "Intervención: Impuestos",
        substeps: [
            {
                subtitle: "Impuesto (Caso Bebidas)",
                explanation: "Caso: Impuesto a bebidas azucaradas. El Estado cobra una tasa fija (<i>t</i>). Esto eleva el Costo Marginal, por lo que la curva de Oferta 'salta' hacia arriba exactamente en la cuantía del impuesto. La producción total cae (<i>Q<sub>2</sub> < Q<sub>1</sub></i>).",
                legend: [{ label: "Oferta Original", color: "var(--accent-red)" }, { label: "Oferta + Impuesto", color: "var(--accent-orange)", isDashed: true }],
                draw: (svg) => {
                    const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    const st1 = toSVG(0, 30); const st2 = toSVG(70, 100);
                    const q2 = toSVG(35, 35); // Punto nuevo equilibrio cantidad

                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${st1.x} ${st1.y} L ${st2.x} ${st2.y}`, "var(--accent-orange)", null, true);

                    // Mostrar caída de Q
                    createLine(svg, "line-intervention", q2.x, q2.y, q2.x, OFFSET_Y + GRAPH_SIZE, "white");
                    createText(svg, "axis-label-small", q2.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "35", "white");
                }
            },
            {
                subtitle: "La Cuña Fiscal",
                explanation: "El precio se rompe en dos. El consumidor paga más (<i>P<sub>c</sub> = 65</i>) y el vendedor se queda con menos (<i>P<sub>v</sub> = 35</i>). La diferencia vertical (<i>65 - 35 = 30</i>) es el impuesto que se lleva el Estado. Esto se llama <strong>Cuña Fiscal</strong>.",
                legend: [{ label: "Precio Consumidor (Pc)", color: "var(--accent-blue)" }, { label: "Precio Vendedor (Pv)", color: "var(--accent-red)" }],
                draw: (svg) => {
                    const pc = toSVG(35, 65); const pv = toSVG(35, 35);
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 30).x} ${toSVG(0, 30).y} L ${toSVG(70, 100).x} ${toSVG(70, 100).y}`, "var(--accent-orange)", null, true);

                    createLine(svg, "line-intervention", OFFSET_X, pc.y, pc.x, pc.y, "var(--accent-blue)");
                    createLine(svg, "line-intervention", OFFSET_X, pv.y, pv.x, pv.y, "var(--accent-red)");

                    // Línea vertical que une Pc y Pv (La Cuña)
                    createLine(svg, "line-intervention", pc.x, pc.y, pv.x, pv.y, "white");
                    createLine(svg, "line-intervention", pc.x, pv.y, pc.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.3)");

                    createText(svg, "axis-label-small", OFFSET_X - 45, pc.y + 5, "65", "var(--accent-blue)");
                    createText(svg, "axis-label-small", OFFSET_X - 45, pv.y + 5, "35", "var(--accent-red)");
                    createText(svg, "axis-label-small", pc.x - 10, OFFSET_Y + GRAPH_SIZE + 25, "35", "white");

                    createCircle(svg, "marker-point", pc.x, pc.y, 5);
                    createCircle(svg, "marker-point", pv.x, pv.y, 5);
                }
            },
            {
                subtitle: "Recaudación del Estado",
                explanation: "El rectángulo verde es el dinero que va al gobierno. Se calcula como: <i>Impuesto &times; Cantidad</i> (<i>30 &times; 35 = 1050</i>). Este dinero se usa para servicios públicos, pero a costa de achicar el mercado.",
                legend: [{ label: "Recaudación", color: "var(--accent-green)", isArea: true }],
                draw: (svg) => {
                    const pc = toSVG(35, 65); const pv = toSVG(35, 35);
                    createRect(svg, "area-shade", OFFSET_X, pc.y, 35 * SCALE, (65 - 35) * SCALE, "var(--accent-green)");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                }
            }
        ]
    },
    {
        mainTitle: "Monopolio: El Poder de Mercado",
        substeps: [
            {
                subtitle: "Definición y Barreras (UNIDAD 04)",
                explanation: "Cuando una sola empresa controla toda la oferta, 'la empresa es la industria'. Existen por <strong>Barreras de Entrada</strong>: 1) Economías de Escala (Monopolio Natural), 2) Control de Recursos Clave, o 3) Legales (Patentes, como en el software).",
                legend: [{ label: "Demanda (D)", color: "var(--accent-blue)" }, { label: "Ingreso Marginal (IMg)", color: "var(--accent-green)", isDashed: true }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0); const im1 = toSVG(0, 100); const im2 = toSVG(50, 0);
                    const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    // CMg
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                    // Demanda
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    // IMg
                    createPath(svg, "curve", `M ${im1.x} ${im1.y} L ${im2.x} ${im2.y}`, "var(--accent-green)", null, true);
                }
            },
            {
                subtitle: "Regla de Oro (<i>IMg = CMg</i>)",
                explanation: "El monopolista no cobra 'infinito'. Maximiza ganancia donde su ingreso extra iguala su costo extra (<i>IMg = CMg</i>). Cantidad <i>Q* = 33.3</i>. <strong>El Precio (<i>P*</i>)</strong> se fija subiendo hasta la Demanda. Resultado: <i>P > CMg</i>.",
                legend: [{ label: "Equilibrio Monopolio", color: "white" }],
                draw: (svg) => {
                    const qm = 33.3; const pm = 66.7; const cm = 33.3;
                    const p_pm = toSVG(qm, pm);
                    const cross = toSVG(qm, cm); // Donde IMg cruza CMg

                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(50, 0).x} ${toSVG(50, 0).y}`, "var(--accent-green)", null, true);

                    // Línea vertical mágica
                    createLine(svg, "line-intervention", cross.x, cross.y, cross.x, p_pm.y, "white");
                    createLine(svg, "line-intervention", cross.x, cross.y, cross.x, OFFSET_Y + GRAPH_SIZE, "rgba(255,255,255,0.3)");
                    createLine(svg, "line-intervention", OFFSET_X, p_pm.y, p_pm.x, p_pm.y, "var(--accent-purple)");

                    createText(svg, "axis-label-small", OFFSET_X - 65, p_pm.y + 5, "66.7", "var(--accent-purple)");
                    createText(svg, "axis-label-small", cross.x - 15, OFFSET_Y + GRAPH_SIZE + 25, "33.3", "white");

                    createCircle(svg, "marker-point", cross.x, cross.y, 5, "white"); // Cruce
                    createCircle(svg, "marker-point", p_pm.x, p_pm.y, 6, "var(--accent-purple)"); // Precio final
                }
            },
            {
                subtitle: "Índice de Lerner (Poder)",
                explanation: "<i>L = (P - CMg) / P = -1/E<sub>d</sub></i>. Mide el poder de mercado. Si la demanda es elástica (muchos sustitutos), <i>L</i> es bajo. Si es inelástica (tecnología única), <i>L</i> es alto. Aquí el monopolista tiene poder real sobre el precio.",
                legend: [{ label: "Ganancia Extra", color: "var(--accent-green)", isArea: true }],
                draw: (svg) => {
                    const qm = 33.3; const pm = 66.7; const cm = 33.3;
                    const p_pm = toSVG(qm, pm);
                    // Rectángulo de beneficio
                    createRect(svg, "area-shade", OFFSET_X, p_pm.y, qm * SCALE, (pm - cm) * SCALE, "var(--accent-green)");

                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(50, 0).x} ${toSVG(50, 0).y}`, "var(--accent-green)", null, true);

                    createLine(svg, "line-intervention", OFFSET_X, p_pm.y, p_pm.x, p_pm.y, "var(--accent-blue)");

                    createText(svg, "axis-label-small", OFFSET_X - 65, p_pm.y + 5, "P*", "var(--accent-blue)");
                    createText(svg, "axis-label-small", p_pm.x - 15, OFFSET_Y + GRAPH_SIZE + 25, "Q*", "white");
                }
            },
            {
                subtitle: "La Ineficiencia del Monopolio",
                explanation: "El monopolio es 'malo' para la sociedad porque genera el triángulo blanco (DWL). Al restringir la producción para subir el precio, se pierde el bienestar de muchos consumidores que valoraban el producto por encima del costo de fabricación.",
                legend: [{ label: "Pérdida Ineficiencia", color: "white", isArea: true }],
                draw: (svg) => {
                    const qm = 33.3; const pm = 66.7; const cm = 33.3; const eq = toSVG(50, 50);
                    const p_pm = toSVG(qm, pm); const p_cm = toSVG(qm, cm);

                    // Triángulo DWL
                    createPath(svg, "area-shade", `M ${p_cm.x} ${p_cm.y} L ${p_pm.x} ${p_pm.y} L ${eq.x} ${eq.y} Z`, "white");

                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 0).x} ${toSVG(0, 0).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(50, 0).x} ${toSVG(50, 0).y}`, "var(--accent-green)", null, true);
                }
            }
        ]
    },
    {
        mainTitle: "Mercado Laboral (El Factor Trabajo)",
        isLabor: true,
        substeps: [
            {
                subtitle: "Cambio de Roles",
                explanation: "¡OJO! Aquí cambian los papeles. <strong>TÚ eres la Oferta (<i>S<sub>L</sub></i>)</strong> (vendes tu tiempo y talento). <strong>Las EMPRESAS son la Demanda (<i>D<sub>L</sub></i>)</strong> (compran tu productividad).",
                legend: [{ label: "Oferta (Trabajadores)", color: "var(--accent-red)" }, { label: "Demanda (Empresas)", color: "var(--accent-blue)" }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0); const s1 = toSVG(0, 0); const s2 = toSVG(100, 100);
                    // L de Labor = Q, W de Wage = P
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                }
            },
            {
                subtitle: "Demanda Derivada (VPMgL)",
                explanation: "Las empresas solo contratan si les eres rentable. La Curva de Demanda depende del <strong>Valor del Producto Marginal (<i>VPMgL</i>)</strong>. Si generas mucho valor (ej. programador con IA), la empresa 'se pelea' por ti y la curva se desplaza a la DERECHA.",
                legend: [{ label: "Demanda Normal", color: "var(--accent-blue)" }, { label: "Demanda 'Tech'", color: "var(--accent-green)", isDashed: true }],
                draw: (svg) => {
                    const d1 = toSVG(0, 60); const d2 = toSVG(60, 0);
                    const dt1 = toSVG(20, 100); const dt2 = toSVG(100, 20); // Demanda desplazada a derecha

                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${dt1.x} ${dt1.y} L ${dt2.x} ${dt2.y}`, "var(--accent-green)", null, true);

                    // Flecha indicativa
                    const arrowStart = toSVG(30, 30); const arrowEnd = toSVG(50, 50);
                    createLine(svg, "curve", arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y, "white");
                    createText(svg, "axis-label-small", arrowEnd.x + 10, arrowEnd.y, "+ Productividad", "white");
                }
            },
            {
                subtitle: "El Caso 'Tech': Oferta Inelástica",
                explanation: "Un ingeniero senior no se 'fabrica' en un mes. La Oferta de talento experto es <strong>Inelástica</strong> (casi vertical). Resultado: Cuando la demanda explota (IA, digitalización) y se choca con una oferta fija, el <strong>Salario (<i>W</i>)</strong> se dispara brutalmente.",
                legend: [{ label: "Oferta Inelástica", color: "var(--accent-orange)" }, { label: "Salario Disparado", color: "white" }],
                draw: (svg) => {
                    const L_s = 70;
                    const s_top = toSVG(L_s, 100); const s_bot = toSVG(L_s, 0);
                    const d_low_1 = toSVG(0, 60); const d_low_2 = toSVG(100, 0);
                    const d_high_1 = toSVG(0, 100); const d_high_2 = toSVG(100, 40);

                    createPath(svg, "curve", `M ${s_bot.x} ${s_bot.y} L ${s_top.x} ${s_top.y}`, "var(--accent-orange)");
                    createPath(svg, "curve", `M ${d_low_1.x} ${d_low_1.y} L ${d_low_2.x} ${d_low_2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${d_high_1.x} ${d_high_1.y} L ${d_high_2.x} ${d_high_2.y}`, "var(--accent-green)", null, true);

                    const w_val = 58;
                    const eq_high = toSVG(L_s, w_val);
                    createCircle(svg, "marker-point", eq_high.x, eq_high.y, 7, "white");
                    createLine(svg, "line-intervention", OFFSET_X, eq_high.y, eq_high.x, eq_high.y, "rgba(255,255,255,0.5)");
                    createText(svg, "axis-label-small", OFFSET_X - 45, eq_high.y + 5, w_val, "var(--accent-green)");
                    createText(svg, "axis-label", OFFSET_X - 100, eq_high.y + 5, "W$$$", "var(--accent-green)");
                }
            }
        ]
    },
    {
        mainTitle: "¡EXAMEN FINAL!",
        substeps: [
            {
                subtitle: "P1: Precio Máximo (Internet)",
                explanation: "Imagina que el gobierno fija el precio del internet Fibra Óptica en $40 (antes $55). <strong>Consecuencia:</strong> A ese precio bajo, mucha gente quiere internet (Qd=60), pero a las empresas no les sale a cuenta instalar tanto (Qs=30). <strong>Escasez:</strong> Faltan 30 conexiones. Se generan colas y pérdida de bienestar (triángulo blanco).",
                legend: [{ label: "Precio Máximo ($40)", color: "var(--accent-purple)", isLine: true }, { label: "Escasez", color: "var(--accent-orange)", isLine: true }],
                draw: (svg) => {
                    const d1 = toSVG(0, 100); const d2 = toSVG(100, 0); const s1 = toSVG(0, 10); const s2 = toSVG(90, 100);
                    const pmax = toSVG(100, 40); const qs = toSVG(30, 40); const qd = toSVG(60, 40); const eq = toSVG(45, 55);
                    createPath(svg, "curve", `M ${d1.x} ${d1.y} L ${d2.x} ${d2.y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y}`, "var(--accent-red)");
                    createLine(svg, "line-intervention", OFFSET_X, pmax.y, pmax.x, pmax.y, "var(--accent-purple)");
                    createLine(svg, "curve", qs.x, qs.y, qd.x, qd.y, "var(--accent-orange)");
                    createPath(svg, "area-shade", `M ${qs.x} ${qs.y} L ${toSVG(30, 70).x} ${toSVG(30, 70).y} L ${eq.x} ${eq.y} Z`, "white");
                }
            },
            {
                subtitle: "P2: Impuesto (GPUs)",
                explanation: "El Estado pone un impuesto de $20 a las tarjetas de video. La oferta 'salta' hacia arriba. <strong>Resultado:</strong> El gamer paga más ($Pc=65$), la tienda recibe menos ($Pv=45$) y el Estado se lleva el rectángulo verde. Se venden menos GPUs (Q cae de 45 a 35).",
                legend: [{ label: "Recaudación", color: "var(--accent-green)", isArea: true }, { label: "Pérdida (PIE)", color: "white", isArea: true }],
                draw: (svg) => {
                    const pc = toSVG(35, 65); const pv = toSVG(35, 45); const eq = toSVG(45, 55);
                    createRect(svg, "area-shade", OFFSET_X, pc.y, 35 * SCALE, (65 - 45) * SCALE, "var(--accent-green)");
                    createPath(svg, "area-shade", `M ${pc.x} ${pc.y} L ${pv.x} ${pv.y} L ${eq.x} ${eq.y} Z`, "white");
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 10).x} ${toSVG(0, 10).y} L ${toSVG(90, 100).x} ${toSVG(90, 100).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 30).x} ${toSVG(0, 30).y} L ${toSVG(70, 100).x} ${toSVG(70, 100).y}`, "var(--accent-orange)", null, true);
                }
            },
            {
                subtitle: "P3: Barreras de Entrada Tech",
                explanation: "¿Por qué Google no tiene competencia? 1) <strong>Efecto de Red:</strong> Si todos están ahí, tú también. 2) <strong>Economías de Escala de Datos:</strong> Más datos = mejor IA. 3) <strong>Vendor Lock-in:</strong> Si usas AWS, migrar a otro lado es carísimo.",
                legend: [{ label: "Barrera Infranqueable", color: "var(--accent-red)", isLine: true }],
                draw: (svg) => {
                    createLine(svg, "line-intervention", OFFSET_X + 150, OFFSET_Y, OFFSET_X + 150, OFFSET_Y + GRAPH_SIZE, "var(--accent-red)");
                    createCircle(svg, "marker-point", OFFSET_X + 50, OFFSET_Y + 300, 40, "var(--accent-blue)");
                    createText(svg, "axis-label-small", OFFSET_X + 35, OFFSET_Y + 305, "TU APP", "white");
                }
            },
            {
                subtitle: "P4: Discriminación de Precios",
                explanation: "Mismo software, distinto precio. <strong>EE.UU. (Inelástica):</strong> Empresas que 'tienen' que comprar. Les cobras caro ($55). <strong>Latam (Elástica):</strong> Estudiantes sensibles al precio. Les cobras barato ($30) para que no pirateen.",
                legend: [{ label: "Precio USA", color: "var(--accent-red)" }, { label: "Precio Latam", color: "var(--accent-green)" }],
                draw: (svg) => {
                    const eq_usa = toSVG(22.5, 55); const eq_lat = toSVG(40, 30);
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(50, 0).x} ${toSVG(50, 0).y}`, "var(--accent-red)");
                    createPath(svg, "curve", `M ${toSVG(0, 50).x} ${toSVG(0, 50).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-green)");
                    createCircle(svg, "marker-point", eq_usa.x, eq_usa.y, 6, "white");
                    createCircle(svg, "marker-point", eq_lat.x, eq_lat.y, 6, "white");
                }
            },
            {
                subtitle: "P5: El Efecto IA (Productividad)",
                explanation: "<strong>Regla de Oro:</strong> Contratas hasta que <i>VPMgL = W</i>. Con GitHub Copilot, los Juniors programan el doble de rápido. <strong>Efecto:</strong> La demanda de trabajadores se desplaza a la DERECHA. Ahora las empresas quieren contratar a más gente al mismo sueldo.",
                isLabor: true,
                legend: [{ label: "Demanda + IA", color: "var(--accent-green)", isDashed: true }],
                draw: (svg) => {
                    createPath(svg, "curve", `M ${toSVG(0, 60).x} ${toSVG(0, 60).y} L ${toSVG(60, 0).x} ${toSVG(60, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(20, 100).x} ${toSVG(20, 100).y} L ${toSVG(100, 20).x} ${toSVG(100, 20).y}`, "var(--accent-green)", null, true);
                    createPath(svg, "curve", `M ${toSVG(0, 10).x} ${toSVG(0, 10).y} L ${toSVG(100, 100).x} ${toSVG(100, 100).y}`, "var(--accent-red)");
                }
            },
            {
                subtitle: "P6: Salario Mínimo IT",
                explanation: "Si el gobierno fija un sueldo mínimo de $70 para programadores (muy por encima del equilibrio). <strong>Resultado:</strong> 60 personas quieren trabajar (Oferta), pero las empresas solo contratan a 30 (Demanda). La brecha de 30 personas es el <strong>Desempleo</strong>.",
                isLabor: true,
                legend: [{ label: "Salario Mínimo", color: "var(--accent-purple)", isLine: true }, { label: "Desempleo", color: "red", isLine: true }],
                draw: (svg) => {
                    const ld = toSVG(30, 70); const ls = toSVG(60, 70);
                    createPath(svg, "curve", `M ${toSVG(0, 100).x} ${toSVG(0, 100).y} L ${toSVG(100, 0).x} ${toSVG(100, 0).y}`, "var(--accent-blue)");
                    createPath(svg, "curve", `M ${toSVG(0, 10).x} ${toSVG(0, 10).y} L ${toSVG(90, 100).x} ${toSVG(90, 100).y}`, "var(--accent-red)");
                    createLine(svg, "line-intervention", OFFSET_X, ld.y, toSVG(100, 70).x, ld.y, "var(--accent-purple)");
                    createLine(svg, "curve", ld.x, ld.y, ls.x, ls.y, "red");
                }
            }
        ]
    }
];

let currentSubStep = -1;
let flattenedSteps = [];

function flatten() {
    flattenedSteps = [];
    workflow.forEach(main => main.substeps.forEach(sub => flattenedSteps.push({ ...sub, mainTitle: main.mainTitle, isLabor: main.isLabor })));
}

function drawGrid(svg, isLabor = false) {
    // Ejes Principales
    createLine(svg, "axis-line", OFFSET_X, OFFSET_Y, OFFSET_X, OFFSET_Y + GRAPH_SIZE, "white");
    createLine(svg, "axis-line", OFFSET_X, OFFSET_Y + GRAPH_SIZE, OFFSET_X + GRAPH_SIZE, OFFSET_Y + GRAPH_SIZE, "white");

    // Etiquetas P y Q (O W y L) - MÁS GRANDES
    const labelY = isLabor ? "W" : "P";
    const labelX = isLabor ? "L" : "Q";
    createText(svg, "axis-label", OFFSET_X - 30, OFFSET_Y - 35, labelY, isLabor ? "var(--accent-orange)" : "var(--accent-blue)");
    createText(svg, "axis-label", OFFSET_X + GRAPH_SIZE + 25, OFFSET_Y + GRAPH_SIZE + 20, labelX, isLabor ? "var(--accent-red)" : "var(--accent-green)");

    // Dibujar solo extremos (0 y 100) para limpieza total
    [0, 100].forEach(i => {
        const p = toSVG(i, i);
        // Eje X
        createText(svg, "axis-label-small", p.x - 10, OFFSET_Y + GRAPH_SIZE + 25, i, "rgba(255,255,255,0.4)");
        createLine(svg, "axis-tick", p.x, OFFSET_Y + GRAPH_SIZE, p.x, OFFSET_Y + GRAPH_SIZE + 6, "rgba(255,255,255,0.4)");
        // Eje Y
        createText(svg, "axis-label-small", OFFSET_X - 40, p.y + 7, i, "rgba(255,255,255,0.4)");
        createLine(svg, "axis-tick", OFFSET_X - 5, p.y, OFFSET_X, p.y, "rgba(255,255,255,0.4)");
    });
}

function updateUI() {
    const overlay = document.getElementById("tutorial-overlay");
    const graphElements = document.getElementById("graph-elements");
    const legendContainer = document.getElementById("graph-legend");
    const expContainer = document.getElementById("explanation-text");
    const mainTitleEl = document.getElementById("section-title");
    const subTitleEl = document.getElementById("step-subtitle");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    const step = currentSubStep === -1 ? null : flattenedSteps[currentSubStep];
    const isLaborMode = step ? step.isLabor : false;

    graphElements.innerHTML = "";
    drawGrid(graphElements, isLaborMode);

    if (currentSubStep === -1) {
        overlay.style.display = "block";
        legendContainer.innerHTML = "";
        expContainer.innerHTML = "";
        mainTitleEl.textContent = "Laboratorio Económico";
        subTitleEl.textContent = "Matemáticamente Preciso";
        document.getElementById("next-btn").textContent = "¡Comenzar!";
        document.getElementById("prev-btn").disabled = true;
        progressFill.style.width = "0%";
        progressText.textContent = "0%";
        return;
    }

    overlay.style.display = "none";
    mainTitleEl.textContent = step.mainTitle;
    subTitleEl.textContent = step.subtitle;

    const progressPercent = Math.round(((currentSubStep + 1) / flattenedSteps.length) * 100);
    progressFill.style.width = `${progressPercent}% `;
    progressText.textContent = `${progressPercent}% Completado`;

    expContainer.innerHTML = `<div class="concept-card active"><h3>${step.subtitle}</h3><p>${step.explanation}</p></div>`;

    legendContainer.innerHTML = "";
    step.legend.forEach(item => {
        const div = document.createElement("div"); div.className = "legend-item";
        div.innerHTML = `<div class="dot" style="background:${item.color};opacity:${item.isArea ? 0.6 : 1}"></div><span>${item.label}</span>`;
        legendContainer.appendChild(div);
    });

    step.draw(graphElements);
    document.getElementById("prev-btn").disabled = false;
    document.getElementById("next-btn").textContent = currentSubStep === flattenedSteps.length - 1 ? "Reiniciar" : "Siguiente Paso";
}

// Helpers
function createPath(svg, className, d, color, id, dashed = false) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", className); path.setAttribute("d", d); path.setAttribute("stroke", color);
    if (className === "area-shade") path.setAttribute("fill", color);
    if (dashed) path.setAttribute("stroke-dasharray", "8,5");
    svg.appendChild(path);
}
function createCircle(svg, className, cx, cy, r, color = "white") {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("class", className); c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r); c.setAttribute("fill", color);
    svg.appendChild(c);
}
function createLine(svg, className, x1, y1, x2, y2, color) {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("class", className); l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2); l.setAttribute("stroke", color);
    svg.appendChild(l);
}
function createText(svg, className, x, y, content, fill) {
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("class", className); t.setAttribute("x", x); t.setAttribute("y", y); t.setAttribute("fill", fill); t.textContent = content;
    svg.appendChild(t);
}
function createRect(svg, className, x, y, w, h, fill) {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("class", className); r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h); r.setAttribute("fill", fill);
    svg.appendChild(r);
}

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentSubStep < flattenedSteps.length - 1) currentSubStep++; else currentSubStep = -1;
    updateUI();
});
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentSubStep > 0) currentSubStep--; else currentSubStep = -1;
    updateUI();
});

flatten();
window.onload = updateUI;
