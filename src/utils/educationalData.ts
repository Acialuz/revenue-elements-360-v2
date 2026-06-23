import { ElementData } from "../data";

// Detailed educational formula map for KPI & Pricing elements
const FORMULAS: Record<string, string> = {
  // KPIs
  Ar: "Ingresos por Habitación / Habitaciones Vendidas (ADR = Room Revenue / Occupied Rooms)",
  Rp: "Ingresos por Habitación / Habitaciones Disponibles (RevPAR = ADR × % Ocupación)",
  Oc: "Habitaciones Vendidas / Habitaciones Disponibles × 100 (% Ocupación)",
  Tp: "Ingresos Totales (Alojamiento + Alimentos & Bebidas + Otros) / Habitaciones Disponibles (TrevPAR = Total Revenue / Available Rooms)",
  Gp: "Beneficio Operativo Bruto / Habitaciones Disponibles (GOPPAR = Gross Operating Profit / Available Rooms)",
  Al: "Total de Noches de Estancia / Número Total de Reservas (ALS / ALOS = Average Length of Stay)",
  N: "Ingresos de Habitaciones Netos (menos comisiones y tasas) / Habitaciones Disponibles (Net RevPAR)",
  
  // Tarifas
  Fr: "Tarifa base libre sin restricciones aplicadas (Rack Rate / Flexible)",
  Nr: "Tarifa neta libre de comisiones del intermediario (Net Rate)",
  Y: "Fijación dinámica inteligente de tarifas según demanda, inventariado e históricos de estancia (Yield)",
  Ls: "Tarifas optimizadas según la duración calculada de la estadía (Length of Stay Pricing)",
  Eb: "Descuento estratégico condicionado a reservas hechas con antelación preestablecida (Early Booking)",
  Cr: "Tarifa privada pactada con compañías comerciales según volumen de noches anuales (Corporate Rate)",
  Nt: "Tarifas netas empaquetadas opacas creadas para mayoristas y touroperadores (Tour Operator Rate)",
  Py: "Políticas tarifarias flexibles o restrictivas respecto a tasas de cancelación (Refundable vs Non-Refundable)",
};

// Precise relationships map to achieve genuine industry connectivity between elements
const RELATIONSHIPS: Record<string, string[]> = {
  // Key metrics
  Ar: ["Rp", "Oc", "Y", "N", "Tp"],
  Rp: ["Ar", "Oc", "Gp", "N", "Tp"],
  Oc: ["Ar", "Rp", "Al", "Ls", "Ct"],
  Tp: ["Rp", "Gp", "Fb", "Fd"],
  Gp: ["Rp", "Tp", "N", "Ch"],
  Al: ["Oc", "Ls", "Ct", "Dp"],
  N: ["Rp", "Ar", "Ch", "Ot", "Bo"],
  
  // Tech core
  Ch: ["Pm", "Rs", "Ot", "Bo", "Gd"],
  Pm: ["Ch", "Rs", "Bi", "Da"],
  Rs: ["Ch", "Pm", "Bi", "Ar", "Y"],
  Bi: ["Pm", "Rs", "Da", "Or"],

  // Tarifas
  Fr: ["Nr", "Y", "Eb", "Py"],
  Nr: ["Fr", "Ar", "Ch", "Ot"],
  Y: ["Fr", "Ar", "Oc", "Ls"],
  Ls: ["Al", "Oc", "Ct", "Dp"],
  Eb: ["Py", "Fr", "Nr", "Bo"],
  Cr: ["Nt", "Pm", "Bu"],
  Nt: ["Cr", "Ot", "To"],
  Py: ["Fr", "Eb", "Bo"],

  // Marketing
  Se: ["Wd", "Sm", "Cn", "L"],
  Wd: ["Se", "Bo", "Sm", "L"],
  Bo: ["Wd", "Ch", "Se", "Em"],
  Sm: ["Se", "Wd", "Cn", "Ad"],
  Cn: ["Se", "Wd", "Sm", "Em"],
  Em: ["Bo", "Cn", "L"],
  Ad: ["Sm", "Bo", "L", "Mt"],
  Mt: ["Ad", "Dm", "Ri"],
  Dm: ["Mt", "Ri", "Mp"],

  // Competidores
  Ri: ["Mp", "Rg", "Ms"],
  Mp: ["Ri", "Rg", "Ms", "Cs"],
  Rg: ["Ri", "Mp", "Ms", "Cs"],
  Ms: ["Ri", "Mp", "Rg", "Cs"],
  Cs: ["Ri", "Mp", "Rg", "Ms"],

  // Canales
  Gd: ["Ch", "To", "Ab"],
  Ot: ["Ch", "Xp", "Bo", "To"],
  Xp: ["Ot", "Ch", "To"],
  To: ["Gd", "Ot", "Xp"],
  Ab: ["Ot", "Bo", "Gd"],
  D: ["Bo", "Ch", "Ot"],
  
  // Restricciones
  Ct: ["Oc", "Al", "Ls", "Dp"],
  Dp: ["Ct", "Ls", "Al"],
  At: ["Ct", "Dp", "Ls"],
  Av: ["Ct", "Dp", "Ls"],
  Ss: ["Ct", "Dp", "Ls"],
  Cp: ["Ct", "Dp", "Ls"],
  Pc: ["Ct", "Dp", "Ls"],
  RI: ["Ct", "Dp", "Ls"]
};

// Lookups for specific symbols to provide highly specialized content (Spanish)
const SPECIALIZED_CONTENT: Record<string, {
  whyItMatters: string;
  practicalApplication: string;
  independentHotelExample: string;
  chainHotelExample: string;
}> = {
  Rm: {
    whyItMatters: "Es el núcleo estratégico de la disciplina. Permite coordinar la fijación de precios, la gestión de inventario y la distribución para maximizar la rentabilidad de las habitaciones.",
    practicalApplication: "Diseñar la estrategia mensual de tarifas basada en analítica predictiva, perfiles de demanda e históricos del mercado.",
    independentHotelExample: "Un hotel boutique rural de 20 habitaciones contrata un Revenue Consultant externo para estructurar sus tarifas por primera vez ante temporadas alta de verano.",
    chainHotelExample: "Una cadena multinacional centraliza sus políticas de Revenue Management a nivel regional cruzando datos de ocupación agregados en tiempo real con su PMS."
  },
  Pr: {
    whyItMatters: "La fijación de precios define la competitividad del hotel y el valor percibido por los huéspedes en cada punto de interacción en su ciclo de compra.",
    practicalApplication: "Ajustar las tarifas de forma ágil respondiendo a las fluctuaciones diarias de la ocupación y la oferta de la competencia directa.",
    independentHotelExample: "Un hostal en Granada incrementa su tarifa del fin de semana de forma proactiva cuando las visitas oficiales a la Alhambra agotan sus pases.",
    chainHotelExample: "Una firma corporativa de primer nivel aplica algoritmos automatizados que revalúan y actualizan mil tarifas simultáneamente cada hora según la ventana residual de reserva."
  },
  Cu: {
    whyItMatters: "Comprender los deseos y necesidades de los clientes específicos (Target Customer) permite ajustar la arquitectura de tarifas y el tono de marketing para maximizar la conversión.",
    practicalApplication: "Crear perfiles detallados del comprador ideal segmentados por motivación del viaje, nivel de gastos y flexibilidad horaria.",
    independentHotelExample: "Un hotel de diseño ecológico en Asturias orienta su contenido web y paquetes hacia escapadas de parejas interesadas en senderismo sostenible.",
    chainHotelExample: "Un grupo hotelero internacional utiliza su base de datos CRM avanzada para lanzar recomendaciones de personalización a los miembros de su club de fidelidad."
  },
  Ar: {
    whyItMatters: "La Tarifa Media Diaria (ADR) mide los ingresos promedio generados por cada habitación ocupada, indicando el poder absoluto de fijación de precios sin diluir el inventario.",
    practicalApplication: "Revisar diariamente los ingresos de marcas asociadas de alojamiento entre las noches vendidas para vigilar el cumplimiento de la tarifa óptima.",
    independentHotelExample: "Una casa de huéspedes histórica prefiere restringir ofertas masivas a última hora, sosteniendo un ADR un 15% superior al destino.",
    chainHotelExample: "Un rascacielos urbano de gran capacidad ajusta los precios mínimos automáticos en su motor corporativo para sostener el ADR corporativo durante congresos."
  },
  Rp: {
    whyItMatters: "Es el indicador fundamental del sector. Combina la ocupación física disponible con el precio medio cobrado, representando el retorno financiero de la capacidad general del hotel.",
    practicalApplication: "Evaluar el éxito de la estrategia integral de ventas comparando el RevPAR del mes contra el presupuesto estimado y el resultado del año anterior.",
    independentHotelExample: "Un hostal moderno de playa incrementa su RevPAR anual un 10% restringiendo las estancias de una sola noche en fines de semana de alta ocupación.",
    chainHotelExample: "Un holding hotelero internacional vincula los bonos trimestrales de los directores generales de sus complejos de playa directamente al RevPAR Index."
  },
  Oc: {
    whyItMatters: "La tasa de ocupación (Occupancy %) mide el aprovechamiento físico del hotel y asegura un flujo constante de clientes hacia servicios de ingresos complementarios (restoranes, spa, etc.).",
    practicalApplication: "Monitorear el ritmo de reservas (Booking Pace) para predecir si el hotel se llenará antes de lo previsto y comenzar a subir tarifas de forma escalonada.",
    independentHotelExample: "Un hotel céntrico mediano conserva una ocupación estable apoyándose en acuerdos estables de alojamiento con tripulaciones técnicas de paso.",
    chainHotelExample: "Un gran resort vacacional pre-vende un 25% de su inventario a operadores mayoristas con gran antelación para asegurar un colchón base de ocupación."
  },
  Tp: {
    whyItMatters: "TrevPAR evalúa el gasto completo del huésped en el resort, impulsando la disciplina de Revenue Management total más allá de la simple venta de la cama física.",
    practicalApplication: "Estudiar la rentabilidad combinada de habitaciones, restauración y masajes para empujar paquetes cerrados de alto valor.",
    independentHotelExample: "Un pequeño hotel con viñedo en la Rioja aumenta su TrevPAR sugiriendo catas guiadas y visitas privadas a las bodegas durante el proceso de reserva directa.",
    chainHotelExample: "Una cadena que opera complejos de todo incluido centraliza la analítica de TrevPAR para calibrar el stock y la fuerza laboral de alimentos y bebidas."
  },
  Gp: {
    whyItMatters: "Mide el beneficio bruto de explotación por habitación disponible, garantizando que las tácticas aplicadas protejan el margen neto de beneficios y no solo inflen las ventas.",
    practicalApplication: "Alinear los recursos operativos y las compras del hotel con el rango estimado de ocupación semanal para evitar el desperdicio de horas extras.",
    independentHotelExample: "Un hotel de montaña contiene los costes cerrando temporalmente un ala secundaria de habitaciones de baja demanda a mitad de semana.",
    chainHotelExample: "Un gran grupo internacional automatiza los pedidos y plantillas de cocina vinculándolos dinámicamente a las proyecciones de GOPPAR para el mes."
  },
};

// Lookups for specific symbols to provide highly specialized content (English)
const SPECIALIZED_CONTENT_EN: Record<string, {
  whyItMatters: string;
  practicalApplication: string;
  independentHotelExample: string;
  chainHotelExample: string;
}> = {
  Rm: {
    whyItMatters: "It is the strategic core of the discipline. It coordinates pricing, inventory management, and distribution to maximize room profitability.",
    practicalApplication: "Design the monthly pricing strategy based on predictive analytics, demand patterns, and historical market data.",
    independentHotelExample: "A 20-room rural boutique hotel hires an external Revenue Consultant to structure its rates for the first time ahead of peak summer seasons.",
    chainHotelExample: "A multinational chain centralizes its regional revenue management policies, crossing real-time aggregated occupancy data with its PMS."
  },
  Pr: {
    whyItMatters: "Pricing defines the competitiveness of the hotel and the value perceived by guests at each point of interaction in their buying cycle.",
    practicalApplication: "Adjust rates responsively based on daily occupancy fluctuations and competitor pricing.",
    independentHotelExample: "A hostel in Granada pro-actively increases its weekend rates when tickets for Alhambra tours sell out.",
    chainHotelExample: "A top-tier corporate brand uses automated algorithms that evaluate and update thousands of rates simultaneously every hour based on the booking window."
  },
  Cu: {
    whyItMatters: "Understanding the unique wants and needs of target customers lets you adjust your rate structure and marketing tone to maximize translation and conversion.",
    practicalApplication: "Create detailed ideal buyer profiles segmented by travel motivation, spending power, and scheduling flexibility.",
    independentHotelExample: "A design eco-hotel in Asturias tailors its web content and packages toward weekend getaways for couples interested in sustainable hiking.",
    chainHotelExample: "An international hotel group uses its CRM database to push personalized recommendations to guest loyalty club members."
  },
  Ar: {
    whyItMatters: "Average Daily Rate (ADR) measures the average revenue generated per occupied room, indicating absolute pricing power without diluting inventory.",
    practicalApplication: "Review rooms revenue divided by occupied nights daily to monitor optimal pricing performance.",
    independentHotelExample: "A historic guest house prefers to restrict last-minute discounts, sustaining an ADR 15% higher than the destination average.",
    chainHotelExample: "A large-scale urban high-rise adjusts its minimum automated rates in its corporate engine to maintain ADR during high-profile conventions."
  },
  Rp: {
    whyItMatters: "It is the sector's benchmark metric. It combines physical occupancy with the average rate charged, representing the financial return of overall capacity.",
    practicalApplication: "Evaluate the success of the comprehensive sales strategy by comparing the monthly RevPAR against budget and last year's results.",
    independentHotelExample: "A modern beach hostel boosts its annual RevPAR by 10% by restricting one-night weekend stays during high-demand dates.",
    chainHotelExample: "An international resort brand links managers' quarterly bonuses directly to their RevPAR Index performance."
  },
  Oc: {
    whyItMatters: "Occupancy rate measures physical capacity utilization and ensures a steady guest flow to auxiliary outlets (restaurants, spas, etc.).",
    practicalApplication: "Monitor booking pace to forecast if the hotel will fill earlier than expected and begin raising rates incrementally.",
    independentHotelExample: "A mid-sized city center hotel sustains a steady occupancy through accommodation agreements with visiting airline crews.",
    chainHotelExample: "A large vacation resort pre-sells 25% of its inventory to wholesalers early to establish a solid occupancy baseline."
  },
  Tp: {
    whyItMatters: "TrevPAR evaluates total guest spend at the property, pushing the total revenue management culture beyond just selling bedroom nights.",
    practicalApplication: "Analyze combined room, F&B, and spa profitability to market high-ticket leisure packages.",
    independentHotelExample: "A small vineyard hotel in Rioja increases TrevPAR by offering wine tastings and private estate tours during the direct booking process.",
    chainHotelExample: "An all-inclusive resort chain centralizes TrevPAR analytics to calibrate operational F&B staffing and stocking."
  },
  Gp: {
    whyItMatters: "Measures gross operating profit per available room, ensuring that sales tactics protect profit margins rather than just driving volume.",
    practicalApplication: "Align hotel staffing and purchasing with weekly occupancy forecasts to minimize labor cost overheads.",
    independentHotelExample: "A mountain lodge manages operational costs by temporarily closing a wing of rooms during low-demand mid-week periods.",
    chainHotelExample: "An international hotel group automates kitchen ordering and schedules based on GOPPAR projections for the current month."
  }
};

// Fallback educational enrichments based precisely on Category (Spanish)
const CATEGORY_EDUCATIONAL_DETAILS: Record<string, {
  whyItMatters: string;
  practicalApplication: string;
  independentHotelExample: string;
  chainHotelExample: string;
}> = {
  "Básicos de Revenue": {
    whyItMatters: "Determina las bases conceptuales para cualquier análisis posterior. Sin estos pilares, es imposible segmentar o fijar tarifas de manera científica.",
    practicalApplication: "Estructurar las reglas operativas diarias del hotel para garantizar consistencia comercial.",
    independentHotelExample: "Un pequeño hotel boutique de playa define sus políticas de reservas y prepago para evitar cancelaciones masivas de última hora.",
    chainHotelExample: "Una firma hotelera estandariza sus conceptos clave en un glosario unificado integrado en la escuela corporativa para nuevos talentos."
  },
  "Características": {
    whyItMatters: "Aborda las limitaciones y naturaleza específicas del inventario hotelero (perecedero, inelástico, de altos costes fijos).",
    practicalApplication: "Gestionar el inventario restante de manera defensiva, sabiendo que una noche de hotel no vendida representa un ingreso perdido para siempre.",
    independentHotelExample: "Un hotel familiar en un pueblo de montaña ajusta su oferta sabiendo que la venta de hoy no se puede almacenar para el invierno.",
    chainHotelExample: "Una cadena de hoteles de negocios utiliza algoritmos y overbooking calculado por IA para compensar cancelaciones espontáneas no deseadas."
  },
  "Tecnología": {
    whyItMatters: "Los sistemas tecnológicos son las venas operativas que permiten procesar datos de mercado y automatizar ventas las 24 horas del día.",
    practicalApplication: "Integrar el PMS, Channel Manager, Motor de Reservas y RMS en una sola arquitectura en tiempo real sin descuadres.",
    independentHotelExample: "Un hotel boutique rural instala un Channel Manager integrado en la nube para dejar de actualizar manualmente las tarifas en Booking.com y Expedia.",
    chainHotelExample: "Un gran grupo hotelero implementa una arquitectura segura multi-servidor con pasarela CRS propietaria para sincronizar miles de inventarios en red."
  },
  "Horizontes": {
    whyItMatters: "La planificación a largo plazo e identificación de tendencias macroeconómicas previenen crisis y garantizan la viabilidad futura del negocio.",
    practicalApplication: "Analizar curvas de recesión histórica o cambios en regulaciones de viajes locales antes de presupuestar el próximo año fiscal.",
    independentHotelExample: "Un resort histórico en Galicia analiza el auge del turismo ecológico para iniciar una transición ecológica y certificar sus consumos.",
    chainHotelExample: "Un desarrollador de hoteles de lujo planifica inversiones en mercados emergentes basándose en los modelos de accesibilidad aérea global a 10 años."
  },
  "Indicadores KPI": {
    whyItMatters: "Los KPIs cuantitativos permiten auditar el éxito financiero real de la explotación hotelera más allá de las meras intuiciones subjetivas.",
    practicalApplication: "Diseñar cuadros de mando (dashboards) semanales que comparen la evolución de la ocupación, tarifa media y costos por canales versus el mes anterior.",
    independentHotelExample: "Un albergue urbano controla su ADR y comisiones mensuales de OTAs para asegurar que su RevPAR neto rinda por encima de su umbral crítico.",
    chainHotelExample: "Un consorcio multinacional realiza juntas de directores analizando desviaciones mensuales de GOPPAR y Net RevPAR en todas sus marcas afiliadas."
  },
  "Tarifas": {
    whyItMatters: "La arquitectura tarifaria adecuada permite capturar de forma óptima el excedente del consumidor de diferentes nichos de mercado (corporativo, ocio, grupos).",
    practicalApplication: "Crear una matriz tarifaria variable con reglas bien delineadas de reservas anticipadas y estancias mínimas.",
    independentHotelExample: "Un hotel boutique ofrece tarifas 'no reembolsables' con un 15% de descuento para consolidar liquidez de tesorería fuera de temporada.",
    chainHotelExample: "Una multinacional lanza tarifas opacas combinadas con billetes de avión de forma automática a través de operadores mayoristas tradicionales."
  },
  "Marketing": {
    whyItMatters: "El marketing es el canalizador de la demanda. Atrae tráfico de valor hacia la web oficial, mejorando el canal directo y reduciendo los costosos cargos de distribución externos.",
    practicalApplication: "Ejecutar campañas de SEO local y anuncios de metabúsqueda optimizados para capturar clientes en la fase inicial de búsqueda.",
    independentHotelExample: "Un hotel rural boutique lanza anuncios centrados en 'escapadas de fin de semana' en redes sociales de provincias contiguas durante puentes.",
    chainHotelExample: "Una marca urbana escala campañas globales de retargoteo dinámico con códigos de promoción dirigidos a usuarios que abandonaron la reserva."
  },
  "Competidores": {
    whyItMatters: "El Benchmarking constante ayuda a entender el posicionamiento y valor relativo del hotel frente a su Compset (conjunto competitivo).",
    practicalApplication: "Revaluar periódicamente la cesta de rivales directos en base a renovaciones de habitaciones, reputación online u oferta de restauración.",
    independentHotelExample: "Un hostal moderno monitorea el precio de los 3 hostales más similares de la calle los viernes para no quedar fuera del mercado de viajeros mochileros.",
    chainHotelExample: "Una firma corporativa de primer nivel contrata herramientas automáticas de BI para vigilar diariamente el índice de penetración del compset de todas sus delegaciones."
  },
  "Canales": {
    whyItMatters: "Saber distribuir el inventario en OTAs, GDS, canales directos o mayoristas equilibra el volumen de ventas y los costes de adquisición de clientes.",
    practicalApplication: "Controlar el mix de distribución del hotel para incentivar el peso del canal de reserva directa, reduciendo las comisiones de agencias intermediarias.",
    independentHotelExample: "Un hotel independiente diversifica su inventario subiéndolo a portales específicos de escapadas rurales y reservando promociones especiales para su web.",
    chainHotelExample: "Una marca líder firma comisiones preferentes exclusivas con las principales portales turísticos mediante convenios globales de volumen anual."
  },
  "Restricciones": {
    whyItMatters: "Las restricciones aplicadas protegen el inventario de noches clave contra reservas cortas inoportunas que dejen vacías las noches de los lados.",
    practicalApplication: "Aplicar la restricción de Estancia Mínima de 3 noches para el fin de semana de Año Nuevo para asegurar reservas de larga estadía.",
    independentHotelExample: "Un bed-and-breakfast aplica una restricción de entrada obligatoria el viernes en puentes festivos para no quedarse con habitaciones sueltas el domingo.",
    chainHotelExample: "Un gran resort de esquí automatiza restricciones especiales de Closed to Arrival en su RMS global durante la semana pico de campeonatos de invierno."
  },
  "Posicionamiento": {
    whyItMatters: "El posicionamiento de marca define en qué segmento de precio y prestigio se aloja el hotel dentro del imaginario competitivo de los viajeros del destino.",
    practicalApplication: "Ajustar la tarifa promedio y el diseño web con la calidad física real, opiniones públicas e identidad para evitar quejas de clientes insatisfechos.",
    independentHotelExample: "Un hotel boutique rural añade amenities orgánicas locales y un conserje dedicado para justificar una tarifa de alojamiento superior a la media de la zona.",
    chainHotelExample: "Un consorcio multinacional reposiciona una marca antigua inyectando decoración minimalista de tendencia para subir un peldaño en la escala de prestigio."
  },
  "Segmentos": {
    whyItMatters: "No todos los clientes viajan por el mismo motivo ni tienen igual sensibilidad de desembolso. Diferenciar la demanda maximiza los ingresos.",
    practicalApplication: "Construir tarifas diferenciadas para el segmento vacacional de fin de semana versus las reservas corporativas fijas de lunes a jueves.",
    independentHotelExample: "Un hotel costero diseña una sección web exclusiva para familias numerosas y otra enfocada en retiros de descanso silenciosos para adultos.",
    chainHotelExample: "Un gran hotel de ferias segmenta estrictamente las reservas de comisiones cerradas para congresistas, limitándolas a periodos de baja temporada general."
  },
  "Cadenas Hoteleras": {
    whyItMatters: "Las cadenas marcan las tendencias clave del mercado mundial mediante sus vastos clubes de lealtad, herramientas propietarias y economías de escala.",
    practicalApplication: "Analizar e imitar las tácticas de fijación de precios dinámicos y fidelización que las grandes hoteleras operan con éxito constante.",
    independentHotelExample: "Un hotel boutique familiar adopta técnicas simplificadas de fidelización ofreciendo descuentos directos a huéspedes que reserven en recepción.",
    chainHotelExample: "Un holding hotelero unifica los datos de compras y consumos de restauración para renegociar contratos de provisión global en condiciones ideales."
  },
  "Herramientas": {
    whyItMatters: "Las aplicaciones de software liberan al equipo del hotel de tareas repetitivas, permitiéndoles enfocar los esfuerzos en la fijación de estrategias.",
    practicalApplication: "Vincular el RMS con el PMS para automatizar el trasvase de reservas e incorporar las recomendaciones dinámicas de precio propuestas.",
    independentHotelExample: "Un pequeño hotel en el Pirineo adopta un RMS liviano en régimen SaaS para actualizar tarifas automáticamente según el nivel de demanda local en pistas.",
    chainHotelExample: "Un grupo global consolida un equipo central de analistas automatizando informes integrados procedentes de más de 300 PMS locales."
  },
  "Sostenibilidad": {
    whyItMatters: "La sostenibilidad reduce significativamente los consumos operativos críticos (agua, luz, insumos) y capta un mercado premium de viajeros de alto valor.",
    practicalApplication: "Llevar la trazabilidad del consumo eléctrico e instalar luces de activación inteligente y sistemas ecológicos de ahorro de agua en baños.",
    independentHotelExample: "Un hotel rural de alta montaña implementa calderas de biomasa orgánica y paneles solares facilitando visitas eco-guiadas de bajo impacto.",
    chainHotelExample: "Una marca de resorts de lujo elimina por completo los envases de plástico de un solo uso y financia la conservación marina de sus arrecifes locales dándolo a conocer."
  },
  "Personas": {
    whyItMatters: "El equipo humano decide la experiencia final del huésped. Un personal capacitado y motivado es la mejor herramienta de fidelización e ingresos indirectos.",
    practicalApplication: "Capacitar sistemáticamente a la recepción en técnicas de Up-selling duraderas en el momento del recibimiento del viajero.",
    independentHotelExample: "Un establecimiento boutique premia mensualmente con comisiones por venta opcional a los recepcionistas que ofrezcan mejoras de suite exitosas.",
    chainHotelExample: "Una cadena urbana multinacional articula un campus interactivo corporativo de desarrollo profesional en Revenue Management con planes de ascenso claros."
  },
  "Operaciones": {
    whyItMatters: "Una gran ejecución operativa en recepción, mantenimiento y limpieza garantiza la satisfacción del cliente y sostiene la reputación online del hotel.",
    practicalApplication: "Dotar a pisos e inspección técnica de un sistema de aviso en tiempo real sobre el estado de habitaciones listas para el check-in temprano.",
    independentHotelExample: "Un hotel boutique rural coordina mediante app directa la gobernanta y el recepcionista para avisar instantáneamente de habitaciones limpias.",
    chainHotelExample: "Un resort corporativo monitorea los tiempos límite de resolución de quejas en habitaciones para corregir los cuellos de botella mediante auditorías trimestrales."
  }
};

// Fallback educational enrichments based precisely on Category (English)
const CATEGORY_EDUCATIONAL_DETAILS_EN: Record<string, {
  whyItMatters: string;
  practicalApplication: string;
  independentHotelExample: string;
  chainHotelExample: string;
}> = {
  "Básicos de Revenue": {
    whyItMatters: "Determines the conceptual foundations for any subsequent analysis. Without these pillars, scientific pricing or segmentation is impossible.",
    practicalApplication: "Structure the hotel's daily business rules to ensure commercial consistency.",
    independentHotelExample: "A small beach boutique hotel establishes advance payment policies to prevent last-minute cancellations.",
    chainHotelExample: "A hotel brand standardizes core concepts in an academy glossary for training incoming staff."
  },
  "Características": {
    whyItMatters: "Addresses unique hotel inventory limitations, like perishability, inelasticity, and high fixed costs.",
    practicalApplication: "Manage remaining room nights defensively, knowing an unsold room hour is lost revenue forever.",
    independentHotelExample: "A family mountain hotel adjusts daily pricing knowing today's empty bed cannot be resold in winter.",
    chainHotelExample: "A business hotel brand applies calculated overbooking to offset last-minute cancellations."
  },
  "Tecnología": {
    whyItMatters: "Tech systems are the operational blood vessels that process market data and automate modern sales.",
    practicalApplication: "Integrate PMS, CRS, Booking Engine, and RMS into a unified real-time architecture.",
    independentHotelExample: "A rural boutique hotel installs a cloud Channel Manager to stop updating OTA rates manually.",
    chainHotelExample: "A large hotel group implements automated PMS interfaces with proprietary CRS to synchronize room rates."
  },
  "Horizontes": {
    whyItMatters: "Long-term planning and identifying macroeconomic trends prevent crises and ensure business continuity.",
    practicalApplication: "Analyze recessions or local travel regulation changes before budgeting the next fiscal year.",
    independentHotelExample: "A resort in Galicia analyzes green tourism trends to seek sustainability certifications.",
    chainHotelExample: "A luxury developer evaluates emerging destinations based on long-term air carrier accessibility forecasts."
  },
  "Indicadores KPI": {
    whyItMatters: "Quantitative KPIs audit the hotel's financial success beyond subjective intuition and guesswork.",
    practicalApplication: "Design weekly dashboards tracking occupancy, ADR, and customer acquisition costs vs budget.",
    independentHotelExample: "An urban guest house tracks net RevPAR and OTA commission margins to remain above its break-even point.",
    chainHotelExample: "A multinational hotel consortium holds monthly performance reviews analyzing GOPPAR and Net RevPAR across brands."
  },
  "Tarifas": {
    whyItMatters: "The correct rate architecture allows capturing maximum consumer surplus from various market niches.",
    practicalApplication: "Create a dynamic matrix with rules regarding minimum stay restrictions and booking windows.",
    independentHotelExample: "A boutique property offers non-refundable rates with a 15% discount to secure off-season cash flow.",
    chainHotelExample: "A multinational group automatically distributes opaque room packages combined with flights via tour operators."
  },
  "Marketing": {
    whyItMatters: "Marketing channels demand. It drives high-value traffic to the direct website, reducing OTA commission expenses.",
    practicalApplication: "Execute local SEO search optimization and metasearch campaigns to capture guests in the research phase.",
    independentHotelExample: "A rural inn runs social media campaigns targeting weekend escapes in neighboring provinces.",
    chainHotelExample: "A city brand runs dynamic retargeting campaigns with custom code offers for cart-abandoner visitors."
  },
  "Competidores": {
    whyItMatters: "Benchmarking helps evaluate the hotel's price positioning relative to its primary CompSet.",
    practicalApplication: "Periodically revalue the competitive set based on room renovations and online reviews.",
    independentHotelExample: "A modern hostel monitors neighboring rates daily to stay appealing to backpacking travelers.",
    chainHotelExample: "A corporate chain uses automated BI toolkits to audit penetration indexes for all affiliate hotels."
  },
  "Canales": {
    whyItMatters: "Distributing inventory balanced across GDS, direct, wholesaling and OTAs optimizes acquisition costs.",
    practicalApplication: "Monitor distribution mix to increase direct sales share and reduce high commission fees.",
    independentHotelExample: "An independent hotel syndicates custom room packages on niche portals to drive direct bookings.",
    chainHotelExample: "A hospitality company signs preferred commission agreements by committing annual global volume."
  },
  "Restricciones": {
    whyItMatters: "Restrictions protect high-demand nights from short bookings that leave surrounding nights empty.",
    practicalApplication: "Apply a Minimum Stay threshold on holidays to secure longer, more profitable bookings.",
    independentHotelExample: "A cozy B&B sets a mandatory 2-night stay for peak weekends to avoid calendar fragmentation.",
    chainHotelExample: "A ski resort automates 'Closed to Arrival' rules during peak school holidays to secure full weeks."
  },
  "Posicionamiento": {
    whyItMatters: "Brand positioning defines the hotel's price tiered level and prestige in the traveler's mind.",
    practicalApplication: "Align room rates with physical quality, ratings, and identity to sustain guest satisfaction.",
    independentHotelExample: "A boutique hotel adds luxury organic amenities to justify its premium ADR tier.",
    chainHotelExample: "A hospitality firm repositions an old brand with designer decoration to elevate average pricing power."
  },
  "Segmentos": {
    whyItMatters: "Guests travel for varied reasons and have differing price sensitivities; custom segmenting optimizes yield.",
    practicalApplication: "Build separate pricing models for corporate travelers (midweek) and leisure guests (weekends).",
    independentHotelExample: "A seaside lodge designs targeted sections for family retreats and romantic adult couples.",
    chainHotelExample: "A convention hotel structures locked corporate rates for exhibition partners during specific dates."
  },
  "Cadenas Hoteleras": {
    whyItMatters: "Chains shape global market trends via huge loyalty clubs, proprietary software channels, and scale economies.",
    practicalApplication: "Study and apply lessons from chain pricing and marketing tactics to drive similar direct loyalty.",
    independentHotelExample: "A family hotel implements simple loyalty incentives like direct booking discount offers.",
    chainHotelExample: "A hospitality brand centralizes supplier contracts to optimize group-wide food and beverage purchasing margins."
  },
  "Herramientas": {
    whyItMatters: "Applications free the commercial team from repetitive tasks to focus on strategic execution.",
    practicalApplication: "Sync your RMS with your PMS to automate rate execution based on system demand recommendations.",
    independentHotelExample: "A boutique lodge uses a web SaaS RMS to yield rates automatically against destination demand signals.",
    chainHotelExample: "A global brand pools hotel data, producing consolidated executive dashboards across 300 locations."
  },
  "Sostenibilidad": {
    whyItMatters: "Sustainability reduces utility overhead expenses while tapping into a high-spending, eco-conscious market.",
    practicalApplication: "Track energy and water use metrics, install smart thermostats, and transition lights/toilets.",
    independentHotelExample: "A mountain eco-lodge deploys solar arrays and organizes premium native hiking programs.",
    chainHotelExample: "A luxury resort brand eliminates single-use plastic and sponsors ocean conservation efforts."
  },
  "Personas": {
    whyItMatters: "The human team defines guest experience. Trained, motivated employees are key to upselling auxiliary services.",
    practicalApplication: "Provide desk agents with systematically structured guest reception upselling skills.",
    independentHotelExample: "A boutique hotel motivates front-of-house staff by sharing performance commission percentages on upsold suites.",
    chainHotelExample: "An urban hotel group drives professional growth through structured e-learning paths."
  },
  "Operaciones": {
    whyItMatters: "Seamless operations in front desk, housekeeping, and maintenance sustain high online reputation ratings.",
    practicalApplication: "Equip room cleaners with real-time mobile updates to accelerate check-in preparedness.",
    independentHotelExample: "A small boutique hotel coordinates real-time room readiness directly using smart messaging channels.",
    chainHotelExample: "A business resort chain logs service resolution times to adjust housekeeping schedules accordingly."
  }
};

// Generates correct importance rating
export function getElementImportance(symbol: string, category: string): number {
  const superCritical = [
    "Ar", "Rp", "Oc", "Pm", "Ch", "Rs", "Y", "Bo", 
    "Rm", "Pr", "Cu", "Mo", "P", "C", "Ym"
  ];
  if (superCritical.includes(symbol)) return 5;
  
  switch (category) {
    case "Básicos de Revenue":
    case "Indicadores KPI":
    case "Tecnología":
      return 5;
    case "Tarifas":
    case "Canales":
    case "Restricciones":
      return 4;
    default:
      return 3;
  }
}

// Helper function to resolve keys case-insensitively
function getFromRecord(record: Record<string, any>, key: string): any {
  if (!key) return undefined;
  const kUpper = key.toUpperCase();
  const kLower = key.toLowerCase();
  const kTitle = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  return record[key] || record[kUpper] || record[kLower] || record[kTitle];
}

// Dynamically enrich an element with educational info
export function enrichElement(el: ElementData, lang: "ES" | "EN" = "ES"): Required<ElementData> {
  const symbol = el.symbol;
  const isEn = lang === "EN";
  const rawRelated = getFromRecord(RELATIONSHIPS, symbol) || [];
  const relatedSymbols = rawRelated.map((s: string) => s.toUpperCase());
  
  const categoryFallbackMap: Record<string, string[]> = {
    "Básicos de Revenue": ["RM", "PR", "CU", "MO", "P", "C", "YM"],
    "Fundamentos Revenue": ["RM", "PR", "CU", "MO", "P", "C", "YM"],
    "Características": ["FX", "VD", "PI", "AS", "SG", "VP"],
    "Canales": ["OT", "BO", "GD", "TO", "XP"],
    "Segmentos": ["LU", "BU", "CO", "MI", "LE"],
    "Sostenibilidad": ["EE", "W", "WS", "SR"],
    "Personas": ["EQ", "CF", "LC", "RC"],
    "Operaciones": ["TR", "RT", "LD", "FB", "FD", "HK", "CE"],
    "Inteligencia Artificial": ["AC", "AF", "AP", "AA", "IN", "GA", "ID"]
  };

  let resolvedRelated = [...relatedSymbols];
  const fallbackList = getFromRecord(categoryFallbackMap, el.category);
  if (resolvedRelated.length === 0 && fallbackList) {
    resolvedRelated = fallbackList.filter((s: string) => s.toUpperCase() !== symbol.toUpperCase());
  }

  if (resolvedRelated.length < 3) {
    const highUtility = ["RM", "AR", "RP", "OC", "CH", "PM"];
    const extra = highUtility.filter(s => s !== symbol.toUpperCase() && !resolvedRelated.includes(s));
    resolvedRelated = [...resolvedRelated, ...extra];
  }

  resolvedRelated = Array.from(new Set(resolvedRelated)).slice(0, 5).map((s: string) => s.toUpperCase());

  const specialized = isEn ? SPECIALIZED_CONTENT_EN : SPECIALIZED_CONTENT;
  const generalCat = isEn ? CATEGORY_EDUCATIONAL_DETAILS_EN : CATEGORY_EDUCATIONAL_DETAILS;

  const spec = getFromRecord(specialized, symbol) || {
    whyItMatters: `${getFromRecord(generalCat, el.category)?.whyItMatters || (isEn ? "Establishes indispensable foundations to calibrate general hotel profitability." : "Establece bases indispensables para calibrar la rentabilidad hotelera general.")} ${el.shortDescription}`,
    practicalApplication: `${getFromRecord(generalCat, el.category)?.practicalApplication || (isEn ? "Utilize the parameters of the domain to optimize revenue and occupancy." : "Utilizar los parámetros del rubro para optimizar el ingreso y la ocupación.")} ${isEn ? "Aligns weekly commercial tactics with annual sales objectives." : "Sintoniza las tácticas comerciales semanales con los objetivos de venta anuales."}`,
    independentHotelExample: getFromRecord(generalCat, el.category)?.independentHotelExample || (isEn ? "An independent hotel optimizes capture and improves global returns." : "Un hotel boutique rural rediseña su propuesta en el canal de metabúsqueda."),
    chainHotelExample: getFromRecord(generalCat, el.category)?.chainHotelExample || (isEn ? "A multinational chain standardizes corporate revenue tactics across regional affiliates." : "Una cadena multinacional unifica las tácticas del departamento integrado con soporte CRS.")
  };

  return {
    ...el,
    symbol: symbol.toUpperCase(),
    importance: el.importance || getElementImportance(symbol, el.category),
    formula: el.formula || getFromRecord(FORMULAS, symbol) || "",
    relatedElements: el.relatedElements || resolvedRelated,
    whyItMatters: spec.whyItMatters,
    practicalApplication: spec.practicalApplication,
    independentHotelExample: spec.independentHotelExample,
    chainHotelExample: spec.chainHotelExample
  } as Required<ElementData>;
}
