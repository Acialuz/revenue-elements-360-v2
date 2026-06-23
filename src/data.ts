import masterDataset from "./master_dataset.json";

export interface ElementData {
  symbol: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  wpExample: string;
  row: number;
  col: number;
  importance?: number;
  formula?: string;
  relatedElements?: string[];
  whyItMatters?: string;
  practicalApplication?: string;
  independentHotelExample?: string;
  chainHotelExample?: string;
  displayName_es?: string;
  displayName_en?: string;
}

export interface CategoryInfo {
  id: string;
  name_es: string;
  name_en: string;
  colorClass: string;
  textColorClass: string;
  borderClass: string;
  darkColorClass: string;
  darkTextColorClass: string;
  description_es: string;
  description_en: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  "Fundamentos Revenue": {
    id: "basicos",
    name_es: "Fundamentos Revenue",
    name_en: "Revenue Basics",
    colorClass: "bg-slate-200/80 border-slate-400 text-slate-800",
    textColorClass: "text-slate-800",
    borderClass: "border-slate-400",
    darkColorClass: "dark:bg-zinc-800/80 dark:border-zinc-700/85 dark:text-zinc-200",
    darkTextColorClass: "dark:text-zinc-200",
    description_es: "Componentes fundamentales de optimización de ingresos para vender al cliente adecuado.",
    description_en: "Core fundamental components of revenue optimization to sell to the right customer."
  },
  "Características": {
    id: "caracteristicas",
    name_es: "Características",
    name_en: "Characteristics",
    colorClass: "bg-blue-100/50 border-blue-300 text-blue-800",
    textColorClass: "text-blue-800",
    borderClass: "border-blue-405",
    darkColorClass: "dark:bg-blue-950/70 dark:border-blue-900/60 dark:text-blue-200",
    darkTextColorClass: "dark:text-blue-200",
    description_es: "Condicionantes operativas de la industria hotelera como capacidad e inventario perecederos.",
    description_en: "Operational conditions of the hotel industry such as capacity and perishable inventory."
  },
  "Tecnología": {
    id: "tecnologia",
    name_es: "Tecnología",
    name_en: "Technology",
    colorClass: "bg-amber-100/50 border-amber-300 text-amber-800",
    textColorClass: "text-amber-800",
    borderClass: "border-amber-400",
    darkColorClass: "dark:bg-amber-950/60 dark:border-amber-900/60 dark:text-amber-200",
    darkTextColorClass: "dark:text-amber-200",
    description_es: "Sistemas informáticos, infraestructuras y automatización digital de ventas.",
    description_en: "IT systems, infrastructures, and dynamic sales digital automation."
  },
  "Elementos": {
    id: "elementos",
    name_es: "Elementos",
    name_en: "Elements",
    colorClass: "bg-orange-100/50 border-orange-300 text-orange-850",
    textColorClass: "text-orange-850",
    borderClass: "border-orange-400",
    darkColorClass: "dark:bg-orange-950/70 dark:border-orange-900/60 dark:text-orange-205",
    darkTextColorClass: "dark:text-orange-205",
    description_es: "Componentes indispensables del flujo de trabajo de revenue management.",
    description_en: "Indispensable components of the daily revenue management workflow."
  },
  "Horizontes": {
    id: "horizontes",
    name_es: "Horizontes",
    name_en: "Horizons",
    colorClass: "bg-green-100/50 border-green-300 text-green-800",
    textColorClass: "text-green-800",
    borderClass: "border-green-400",
    darkColorClass: "dark:bg-green-950/70 dark:border-green-900/60 dark:text-green-200",
    darkTextColorClass: "dark:text-green-200",
    description_es: "Planificación comercial y horizontes temporales para el análisis de mercado.",
    description_en: "Commercial planning and time horizons for market demand analysis."
  },
  "Sostenibilidad": {
    id: "sostenibilidad",
    name_es: "Sostenibilidad",
    name_en: "Sustainability",
    colorClass: "bg-teal-100 border-teal-300 text-teal-850",
    textColorClass: "text-teal-850",
    borderClass: "border-teal-405",
    darkColorClass: "dark:bg-teal-950/75 dark:border-teal-900/60 dark:text-teal-200",
    darkTextColorClass: "dark:text-teal-200",
    description_es: "Ahorro de costes energéticos y prácticas ecológicas de gran impacto neto.",
    description_en: "Energy cost-savings and high net impact ecological operational practices."
  },
  "Indicadores KPI": {
    id: "indicadores",
    name_es: "Indicadores KPI",
    name_en: "KPI Indicators",
    colorClass: "bg-rose-100/50 border-rose-300 text-rose-800",
    textColorClass: "text-rose-800",
    borderClass: "border-rose-450",
    darkColorClass: "dark:bg-rose-950/70 dark:border-rose-900/60 dark:text-rose-205",
    darkTextColorClass: "dark:text-rose-205",
    description_es: "Métricas esenciales de optimización en la tarifa y la rentabilidad hotelera.",
    description_en: "Essential metrics for rate optimization, margin protection, and hotel profits."
  },
  "Tarifas": {
    id: "tarifas",
    name_es: "Tarifas",
    name_en: "Rates",
    colorClass: "bg-sky-100/50 border-sky-300 text-sky-850",
    textColorClass: "text-sky-850",
    borderClass: "border-sky-400",
    darkColorClass: "dark:bg-sky-950/70 dark:border-sky-900/60 dark:text-sky-200",
    darkTextColorClass: "dark:text-sky-200",
    description_es: "Estructuras comerciales y condiciones de precios adaptadas a la demanda.",
    description_en: "Commercial rate structures and pricing terms tailored to target demand."
  },
  "Marketing": {
    id: "marketing",
    name_es: "Marketing",
    name_en: "Marketing",
    colorClass: "bg-neutral-100 border-neutral-300 text-neutral-800",
    textColorClass: "text-neutral-850",
    borderClass: "border-neutral-400",
    darkColorClass: "dark:bg-zinc-900/80 dark:border-zinc-805 dark:text-zinc-200",
    darkTextColorClass: "dark:text-zinc-200",
    description_es: "Acciones tácticas de marketing, conversión web y captación directa de huéspedes.",
    description_en: "Tactical marketing actions, web conversion, and direct guest acquisition."
  },
  "Competidores": {
    id: "competidores",
    name_es: "Competidores",
    name_en: "Competitors",
    colorClass: "bg-pink-100/50 border-pink-300 text-pink-800",
    textColorClass: "text-pink-850",
    borderClass: "border-pink-400",
    darkColorClass: "dark:bg-pink-950/70 dark:border-pink-900/60 dark:text-pink-205",
    darkTextColorClass: "dark:text-pink-205",
    description_es: "Análisis estratégico y comparativos respecto al compset competitivo del mercado.",
    description_en: "Strategic analysis and benchmark benchmarks against the local competitive set."
  },
  "Herramientas": {
    id: "herramientas",
    name_es: "Herramientas",
    name_en: "Tools",
    colorClass: "bg-yellow-50/80 border-yellow-250 text-yellow-800 border-zinc-900/15",
    textColorClass: "text-yellow-800",
    borderClass: "border-yellow-300",
    darkColorClass: "dark:bg-amber-950/40 dark:border-amber-900/40 dark:text-amber-250",
    darkTextColorClass: "dark:text-amber-250",
    description_es: "Software y sistemas de gestión para la distribución y automatización hotelera.",
    description_en: "Core software and management systems for distribution and hotel automation."
  },
  "Personas": {
    id: "personas",
    name_es: "Personas",
    name_en: "People",
    colorClass: "bg-lime-100/60 border-lime-300 text-lime-800",
    textColorClass: "text-lime-850",
    borderClass: "border-lime-400",
    darkColorClass: "dark:bg-lime-950/70 dark:border-lime-900/60 dark:text-lime-205",
    darkTextColorClass: "dark:text-lime-205",
    description_es: "Talento, reclutamiento, liderazgo y capacitación de los equipos de revenue.",
    description_en: "Talent, recruitment, leadership, and professional training of revenue teams."
  },
  "Restricciones": {
    id: "restricciones",
    name_es: "Restricciones",
    name_en: "Restrictions",
    colorClass: "bg-yellow-100/50 border-yellow-350 text-yellow-800",
    textColorClass: "text-yellow-850",
    borderClass: "border-yellow-405",
    darkColorClass: "dark:bg-yellow-950/50 dark:border-yellow-905 dark:text-yellow-250",
    darkTextColorClass: "dark:text-yellow-250",
    description_es: "Límites y barreras comerciales aplicadas a la venta para proteger inventarios.",
    description_en: "Commercial limits and sales controls applied to protect high demand inventory."
  },
  "Operaciones": {
    id: "operaciones",
    name_es: "Operaciones",
    name_en: "Operations",
    colorClass: "bg-violet-100/50 border-violet-305 text-violet-800",
    textColorClass: "text-violet-850",
    borderClass: "border-violet-405",
    darkColorClass: "dark:bg-violet-950/70 dark:border-violet-900/60 dark:text-violet-205",
    darkTextColorClass: "dark:text-violet-205",
    description_es: "Áreas y dinámicas operativas del hotel que interactúan con las ventas.",
    description_en: "Operational departments and dynamics that actively interact with sales."
  },
  "Canales": {
    id: "canales",
    name_es: "Canales",
    name_en: "Channels",
    colorClass: "bg-cyan-100/50 border-cyan-305 text-cyan-805",
    textColorClass: "text-cyan-850",
    borderClass: "border-cyan-405",
    darkColorClass: "dark:bg-cyan-950/70 dark:border-cyan-900/60 dark:text-cyan-205",
    darkTextColorClass: "dark:text-cyan-205",
    description_es: "Vías de distribución para publicar el inventario de habitaciones en el mercado.",
    description_en: "Distribution paths used to expose and sell room inventory on the market."
  },
  "Cadenas Hoteleras": {
    id: "cadenas",
    name_es: "Cadenas Hoteleras",
    name_en: "Hotel Chains",
    colorClass: "bg-teal-100/60 border-teal-300 text-teal-850",
    textColorClass: "text-teal-850",
    borderClass: "border-teal-400",
    darkColorClass: "dark:bg-teal-950/70 dark:border-teal-900/60 dark:text-teal-205",
    darkTextColorClass: "dark:text-teal-205",
    description_es: "Grupos e imperios hoteleros globales utilizados como referencia industrial.",
    description_en: "Global hospitality corporate brands used as industry standards."
  },
  "Segmentos": {
    id: "segmentos",
    name_es: "Segmentos",
    name_en: "Segments",
    colorClass: "bg-amber-100/50 border-amber-305 text-amber-900",
    textColorClass: "text-amber-900",
    borderClass: "border-amber-500",
    darkColorClass: "dark:bg-amber-900/50 dark:border-amber-800/60 dark:text-amber-100",
    darkTextColorClass: "dark:text-amber-100",
    description_es: "Distintas tipologías de demanda con diferentes patrones y sensibilidades de tarifas.",
    description_en: "Differentiated target guest profiles with custom values and rate sensitivities."
  },
  "Posicionamiento": {
    id: "posicionamiento",
    name_es: "Posicionamiento",
    name_en: "Positioning",
    colorClass: "bg-emerald-110 border-emerald-300 text-emerald-800",
    textColorClass: "text-emerald-850",
    borderClass: "border-[#10B981]",
    darkColorClass: "dark:bg-emerald-950/70 dark:border-emerald-900/60 dark:text-emerald-205",
    darkTextColorClass: "dark:text-emerald-255",
    description_es: "Estrategias de posicionamiento comercial respecto al precio y el branding.",
    description_en: "Brand and rate level market positioning strategy in the local compset."
  },
  "Descubrimientos Futuros": {
    id: "futuros",
    name_es: "Descubrimientos Futuros",
    name_en: "Future Discoveries",
    colorClass: "bg-indigo-100/50 border-indigo-305 text-indigo-805",
    textColorClass: "text-indigo-850",
    borderClass: "border-indigo-400",
    darkColorClass: "dark:bg-indigo-950/70 dark:border-indigo-900/60 dark:text-indigo-205",
    darkTextColorClass: "dark:text-indigo-205",
    description_es: "Espacio de predicción para nuevas metodologías, teorías o tecnologías globales de distribución.",
    description_en: "Predictive space for brand-new distribution systems, frameworks, or worldwide concepts."
  },
  "Inteligencia Artificial": {
    id: "ia",
    name_es: "Inteligencia Artificial",
    name_en: "Artificial Intelligence",
    colorClass: "bg-indigo-100 border-indigo-300 text-indigo-900",
    textColorClass: "text-indigo-900",
    borderClass: "border-indigo-405",
    darkColorClass: "dark:bg-indigo-950/70 dark:border-indigo-900/60 dark:text-indigo-100",
    darkTextColorClass: "dark:text-indigo-100",
    description_es: "Sistemas avanzados de inteligencia artificial, asistentes y análisis predictivo aplicados al revenue management.",
    description_en: "Advanced AI systems, assistants, and predictive analytics applied to revenue management."
  }
};

export const MASTER_COORDINATES: Record<string, { row: number; col: number }> = {
  // Column 1: Fundamentos Revenue (Ends on Row 7)
  "RM": { "row": 1, "col": 1 },
  "PR": { "row": 2, "col": 1 },
  "CU": { "row": 3, "col": 1 },
  "MO": { "row": 4, "col": 1 },
  "P": { "row": 5, "col": 1 },
  "C": { "row": 6, "col": 1 },
  "YM": { "row": 7, "col": 1 },

  // Column 2: Características (Ends on Row 7)
  "FX": { "row": 1, "col": 2 },
  "VD": { "row": 2, "col": 2 },
  "PI": { "row": 3, "col": 2 },
  "AS": { "row": 4, "col": 2 },
  "SG": { "row": 5, "col": 2 },
  "SG__Características": { "row": 5, "col": 2 },
  "VP": { "row": 6, "col": 2 },
  "FC": { "row": 7, "col": 2 },

  // Column 3: Pure Spacer Column (No elements)

  // Column 4 (Tecnología & Future bridge Z1)
  "Z1": { "row": 3, "col": 4 },
  "Z1__Descubrimientos Futuros": { "row": 3, "col": 4 },
  "AI__Tecnología": { "row": 4, "col": 4 },
  "CY": { "row": 5, "col": 4 },
  "A": { "row": 6, "col": 4 },
  "DI": { "row": 7, "col": 4 },

  // Column 5 (Z2, OB, AR, FR, WD)
  "Z2": { "row": 3, "col": 5 },
  "Z2__Descubrimientos Futuros": { "row": 3, "col": 5 },
  "OB": { "row": 4, "col": 5 },
  "AR": { "row": 5, "col": 5 },
  "FR": { "row": 6, "col": 5 },
  "WD": { "row": 7, "col": 5 },
  "WD__Marketing": { "row": 7, "col": 5 },

  // Column 6 (Z3, LY, OC, NR, SM)
  "Z3": { "row": 3, "col": 6 },
  "Z3__Descubrimientos Futuros": { "row": 3, "col": 6 },
  "LY": { "row": 4, "col": 6 },
  "OC": { "row": 5, "col": 6 },
  "NR": { "row": 6, "col": 6 },
  "SM": { "row": 7, "col": 6 },
  "SM__Marketing": { "row": 7, "col": 6 },

  // Column 7 (Z4, SD, AL, LS, CN)
  "Z4": { "row": 3, "col": 7 },
  "Z4__Descubrimientos Futuros": { "row": 3, "col": 7 },
  "SD": { "row": 4, "col": 7 },
  "AL": { "row": 5, "col": 7 },
  "LS": { "row": 6, "col": 7 },
  "CN": { "row": 7, "col": 7 },
  "CN__Marketing": { "row": 7, "col": 7 },

  // Column 8 (F, RP, EB, AD)
  "F": { "row": 4, "col": 8 },
  "RP": { "row": 5, "col": 8 },
  "EB": { "row": 6, "col": 8 },
  "AD": { "row": 7, "col": 8 },
  "AD__Marketing": { "row": 7, "col": 8 },

  // Column 9 (B, N, CR, MT)
  "B": { "row": 4, "col": 9 },
  "N": { "row": 5, "col": 9 },
  "CR": { "row": 6, "col": 9 },
  "MT": { "row": 7, "col": 9 },
  "MT__Marketing": { "row": 7, "col": 9 },

  // Column 10 (YD, TP, PY, EM)
  "YD": { "row": 4, "col": 10 },
  "TP": { "row": 5, "col": 10 },
  "PY": { "row": 6, "col": 10 },
  "EM": { "row": 7, "col": 10 },
  "EM__Marketing": { "row": 7, "col": 10 },

  // Column 11 (MS, GP, Y, L)
  "MS__Competidores": { "row": 4, "col": 11 },
  "GP": { "row": 5, "col": 11 },
  "Y": { "row": 6, "col": 11 },
  "L": { "row": 7, "col": 11 },
  "L__Marketing": { "row": 7, "col": 11 },

  // Column 12 (RI, MP, RG, NT, DM)
  "RI__Competidores": { "row": 5, "col": 12 }, // RGI renamed input
  "MP__Competidores": { "row": 4, "col": 12 },
  "NT": { "row": 6, "col": 12 },
  "DM": { "row": 7, "col": 12 },
  "DM__Marketing": { "row": 7, "col": 12 },

  // Column 13 (LO, AT, SS, CS, CM)
  "LO": { "row": 3, "col": 13 },
  "LO__Restricciones": { "row": 3, "col": 13 },
  "AT": { "row": 4, "col": 13 },
  "AT__Restricciones": { "row": 4, "col": 13 },
  "SS": { "row": 5, "col": 13 },
  "SS__Restricciones": { "row": 5, "col": 13 },
  "CS__Competidores": { "row": 6, "col": 13 },
  "CM": { "row": 7, "col": 13 },
  "CM__Marketing": { "row": 7, "col": 13 },

  // Column 14 (DP, AV, CP, PC, RL)
  "DP": { "row": 3, "col": 14 },
  "DP__Restricciones": { "row": 3, "col": 14 },
  "AV": { "row": 4, "col": 14 },
  "AV__Restricciones": { "row": 4, "col": 14 },
  "CP": { "row": 5, "col": 14 },
  "CP__Restricciones": { "row": 5, "col": 14 },
  "PC": { "row": 6, "col": 14 },
  "PC__Restricciones": { "row": 6, "col": 14 },
  "RL": { "row": 7, "col": 14 }, // Replaces Ri under Restrictions
  "RL__Restricciones": { "row": 7, "col": 14 },

  // Column 15 (LX, UP, EC, GD, OT, TO)
  "LX": { "row": 2, "col": 15 },
  "LX__Posicionamiento": { "row": 2, "col": 15 },
  "UP": { "row": 3, "col": 15 },
  "UP__Posicionamiento": { "row": 3, "col": 15 },
  "EC": { "row": 4, "col": 15 },
  "EC__Posicionamiento": { "row": 4, "col": 15 },
  "GD": { "row": 5, "col": 15 },
  "GD__Canales": { "row": 5, "col": 15 },
  "OT": { "row": 6, "col": 15 },
  "OT__Canales": { "row": 6, "col": 15 },
  "TO": { "row": 7, "col": 15 },
  "TO__Canales": { "row": 7, "col": 15 },

  // Column 16 (LF, MS, EX, BO, XP, AB)
  "LF": { "row": 2, "col": 16 },
  "LF__Posicionamiento": { "row": 2, "col": 16 },
  "MS__Posicionamiento": { "row": 3, "col": 16 },
  "EX": { "row": 4, "col": 16 },
  "EX__Posicionamiento": { "row": 4, "col": 16 },
  "BO": { "row": 5, "col": 16 },
  "BO__Canales": { "row": 5, "col": 16 },
  "XP": { "row": 6, "col": 16 },
  "XP__Canales": { "row": 6, "col": 16 },
  "AB": { "row": 7, "col": 16 },
  "AB__Canales": { "row": 7, "col": 16 },

  // Column 17 (LU, BU, MI, LE, FA, CO, D)
  "LU": { "row": 1, "col": 17 },
  "LU__Segmentos": { "row": 1, "col": 17 },
  "BU": { "row": 2, "col": 17 },
  "BU__Segmentos": { "row": 2, "col": 17 },
  "MI": { "row": 3, "col": 17 },
  "MI__Segmentos": { "row": 3, "col": 17 },
  "LE": { "row": 4, "col": 17 },
  "LE__Segmentos": { "row": 4, "col": 17 },
  "FA": { "row": 5, "col": 17 },
  "FA__Segmentos": { "row": 5, "col": 17 },
  "CO": { "row": 6, "col": 17 },
  "CO__Segmentos": { "row": 6, "col": 17 },
  "D": { "row": 7, "col": 17 },
  "D__Canales": { "row": 7, "col": 17 },

  // Column 18 (M, HI, HY, WY, CI, AC, IH)
  "M": { "row": 1, "col": 18 },
  "M__Cadenas Hoteleras": { "row": 1, "col": 18 },
  "HI": { "row": 2, "col": 18 },
  "HI__Cadenas Hoteleras": { "row": 2, "col": 18 },
  "HY": { "row": 3, "col": 18 },
  "HY__Cadenas Hoteleras": { "row": 3, "col": 18 },
  "WY": { "row": 4, "col": 18 },
  "WY__Cadenas Hoteleras": { "row": 4, "col": 18 },
  "CI": { "row": 5, "col": 18 },
  "CI__Cadenas Hoteleras": { "row": 5, "col": 18 },
  "AC": { "row": 6, "col": 18 },
  "AC__Cadenas Hoteleras": { "row": 6, "col": 18 },
  "IH": { "row": 7, "col": 18 },
  "IH__Cadenas Hoteleras": { "row": 7, "col": 18 },

  // Bottom Elements - Mapped globally to Row 9, 10
  "T": { "row": 9, "col": 1 },
  "PE": { "row": 9, "col": 2 },
  "PS": { "row": 9, "col": 3 },
  "DA": { "row": 9, "col": 4 },
  "CH": { "row": 9, "col": 5 },
  "RS": { "row": 9, "col": 6 },
  "SH": { "row": 9, "col": 7 },
  "PM": { "row": 9, "col": 8 },
  "BI": { "row": 9, "col": 9 },
  "OR": { "row": 9, "col": 10 },
  "BE": { "row": 9, "col": 11 },
  "BH": { "row": 9, "col": 12 },
  "TI": { "row": 9, "col": 13 },
  "FB": { "row": 9, "col": 14 },

  "EE": { "row": 10, "col": 1 },
  "W": { "row": 10, "col": 2 },
  "WS": { "row": 10, "col": 3 },
  "SR": { "row": 10, "col": 4 },
  "EQ": { "row": 10, "col": 5 },
  "CF": { "row": 10, "col": 6 },
  "LC": { "row": 10, "col": 7 },
  "RC": { "row": 10, "col": 8 },
  "TR": { "row": 10, "col": 9 },
  "RT": { "row": 10, "col": 10 },
  "LD": { "row": 10, "col": 11 },
  "FD": { "row": 10, "col": 12 },
  "HK": { "row": 10, "col": 13 },
  "CE": { "row": 10, "col": 14 },

  // Row 11: Artificial Intelligence Complementary Block
  "AC__Inteligencia Artificial": { "row": 11, "col": 1 },
  "AF__Inteligencia Artificial": { "row": 11, "col": 2 },
  "AP__Inteligencia Artificial": { "row": 11, "col": 3 },
  "AA__Inteligencia Artificial": { "row": 11, "col": 4 },
  "AI__Inteligencia Artificial": { "row": 11, "col": 5 },
  "IN__Inteligencia Artificial": { "row": 11, "col": 5 },
  "GA__Inteligencia Artificial": { "row": 11, "col": 6 },
  "ID__Inteligencia Artificial": { "row": 11, "col": 7 },

  "AF": { "row": 11, "col": 2 },
  "AP": { "row": 11, "col": 3 },
  "AA": { "row": 11, "col": 4 },
  "AI": { "row": 11, "col": 5 },
  "IN": { "row": 11, "col": 5 },
  "GA": { "row": 11, "col": 6 },
  "ID": { "row": 11, "col": 7 }
};

// Generates importance rating
export function getElementImportance(symbol: string, category: string): number {
  const superCritical = [
    "AR", "RP", "OC", "PM", "CH", "RS", "Y", "BO", 
    "RM", "PR", "CU", "MO", "P", "C", "YM"
  ];
  if (superCritical.includes(symbol.toUpperCase())) return 5;
  if (category.includes("KPI") || category.includes("Fundamentos") || category.includes("Basics") || category.includes("Technology") || category.includes("Tecnología")) {
    return 5;
  }
  return 4;
}

// Display Name overrides for elegant look on grids
export const SPECIAL_DISPLAY_NAMES: Record<string, { es: string; en: string }> = {
  "RM": { es: "Revenue\nManagement", en: "Revenue\nManagement" },
  "YM": { es: "Yield\nManagement", en: "Yield\nManagement" },
  "FX": { es: "Capacidad\nFija", en: "Fixed\nCapacity" },
  "VD": { es: "Demanda\nVariable", en: "Variable\nDemand" },
  "PI": { es: "Inventario\nPerecedero", en: "Perishable\nInventory" },
  "FC": { es: "Costes\nFijos", en: "High Fixed\nCosts" },
  "AS": { es: "Venta\nAnticipada", en: "Advance\nSales" },
  "VP": { es: "Precios\nDinámicos", en: "Dynamic\nPricing" },
  "AI__Tecnología": { es: "Inteligencia\nArtificial", en: "Artificial\nIntel." },
  "CY": { es: "Ciber-\nseguridad", en: "Cyber-\nsecurity" },
  "A": { es: "Automatiza-\nción", en: "Automation" },
  "DI": { es: "Digitaliza-\nción", en: "Digitalization" },
  "OB": { es: "Reservas\n(OTB)", en: "On The Books\n(OTB)" },
  "LY": { es: "Cierre\n(LY)", en: "Last Year\n(LY)" },
  "SD": { es: "Misma Fecha\nAño Anterior", en: "Same Date\nLast Year" },
  "F": { es: "Previsión\n(Forecast)", en: "Forecast" },
  "B": { es: "Presupuesto\n(Budget)", en: "Budget" },
  "YD": { es: "Acumulado\nAño (YTD)", en: "Year-to-Date\n(YTD)" },
  "EE": { es: "Eficiencia\nEnergética", en: "Energy\nEfficiency" },
  "LC": { es: "Comunidad\nLocal", en: "Local\nCommunity" },
  "SR": { es: "Responsab.\nSocial", en: "Social\nRespons." },
  "CF": { es: "Certifica-\nciones", en: "Certifications" },
  "AR": { es: "ADR\n(Precio Medio)", en: "ADR\n(Avg. Rate)" },
  "AL": { es: "Estancia\nMedia", en: "Avg. Length\nof Stay" },
  "GP": { es: "GOPPAR\n(Margen Bruto)", en: "GOPPAR\n(Gross Profit)" },
  "RP": { es: "RevPAR\n(Ingreso Hab.)", en: "RevPAR" },
  "FR": { es: "Cancelación\nGratuita", en: "Free\nCancel." },
  "NR": { es: "No Reembol-\nsable", en: "Non-\nRefundable" },
  "LS": { es: "Estancias\nLargas", en: "Long Stay" },
  "EB": { es: "Reservas\nAnticipadas", en: "Early\nBooking" },
  "CR": { es: "Tarifas\nCorporativas", en: "Corporate\nRates" },
  "PY": { es: "Paridad\nPrecios", en: "Price\nParity" },
  "Y": { es: "Tarifas\nDinámicas", en: "Dynamic\nRates" },
  "NT": { es: "Tarifas\nNetas", en: "Net Rates" },
  "SM": { es: "Redes\nSociales", en: "Social\nMedia" },
  "CN": { es: "Comunica-\nción", en: "Communication" },
  "CM": { es: "CRM\n(Clientes)", en: "CRM\n(Customer)" },
  "MT": { es: "Meta-\nbuscadores", en: "Metasearch" },
  "EM": { es: "Email\nMarketing", en: "Email\nMarketing" },
  "L": { es: "Misma Fecha\nAño Anterior", en: "Same Date\nLast Year" },
  "DM": { es: "Marketing\nDigital", en: "Digital\nMarketing" },
  "RI__Competidores": { es: "RGI\n(Ingresos)", en: "RGI\n(Revenue Index)" },
  "MS__Competidores": { es: "Cuota de\nMercado", en: "Market\nShare" },
  "MP__Competidores": { es: "MPI\n(Penetración)", en: "MPI\n(Penetration)" },
  "CS__Competidores": { es: "Competidores\nCompset", en: "Competitors\nCompset" },
  "CH": { es: "Channel\nManager", en: "Channel\nManager" },
  "RS": { es: "RMS\n(Revenue Sys)", en: "RMS\n(Revenue Sys)" },
  "SH": { es: "Rate\nShopper", en: "Rate\nShopper" },
  "PM": { es: "PMS\n(Gestión)", en: "PMS\n(Hotel Sys)" },
  "TI": { es: "Inteligencia\nViajes", en: "Travel\nIntel." },
  "BI": { es: "Business\nIntel.", en: "Business\nIntel." },
  "OR": { es: "Reputación\nOnline", en: "Online\nReputation" },
  "BE": { es: "Motor\nReservas", en: "Booking\nEngine" },
  "BH": { es: "Benchmark", en: "Benchmark" },
  "LO": { es: "Estancia\nMínima", en: "Min. Length\nof Stay" },
  "AT": { es: "Cupos\n(Allotments)", en: "Allotments" },
  "AV": { es: "Disponibili-\ndad", en: "Availability" },
  "SS": { es: "Parada de\nVentas", en: "Stop Sell" },
  "CP": { es: "Políticas\nCancelación", en: "Cancel\nPolicies" },
  "PC": { es: "Condiciones\nPago", en: "Payment\nCond." },
  "RL": { es: "Release\n(Cancelación)", en: "Room\nRelease" },
  "FB": { es: "Comidas y\nBebidas", en: "Food &\nBeverage" },
  "HK": { es: "Limpieza\nMant.", en: "Housekeeping" },
  "CE": { es: "Experiencia\nCliente", en: "Customer\nExperience" },
  "GD": { es: "GDS\n(Distribución)", en: "GDS\n(Distribution)" },
  "OT": { es: "OTA\n(Agencia)", en: "OTA\n(Agency)" },
  "D": { es: "Canal\nDirecto", en: "Direct\nChannel" },
  "TO": { es: "Turoperadores", en: "Tour\nOperators" },
  "LX__Posicionamiento": { es: "Lujo\nLuxury", en: "Luxury\nPos." },
  "LF__Posicionamiento": { es: "Lifestyle", en: "Lifestyle\nPos." },
  "UP__Posicionamiento": { es: "Premium\nUpscale", en: "Upscale\nPos." },
  "MS__Posicionamiento": { es: "Escala\nMedia", en: "Midscale" },
  "EC__Posicionamiento": { es: "Económico\nEconomy", en: "Economy\nPos." },
  "EX__Posicionamiento": { es: "Estancia\nProlongada", en: "Extended\nStay" },
  "Z1": { es: "A Confirmar", en: "To Be\nConfirmed" },
  "Z2": { es: "A Confirmar", en: "To Be\nConfirmed" },
  "Z3": { es: "A Confirmar", en: "To Be\nConfirmed" },
  "Z4": { es: "A Confirmar", en: "To Be\nConfirmed" },
  "SG": { es: "Segmentación", en: "Segmentation" },
  "BU": { es: "Negocios\n(Business)", en: "Business" },
  "CO": { es: "Parejas\n(Couples)", en: "Couples" },
  
  // AI Elements Display Names
  "AC": { es: "Copiloto\nI.A.", en: "AI\nCopilot" },
  "AF": { es: "Previsión\nI.A.", en: "AI\nForecasting" },
  "AP": { es: "Personaliza-\nción I.A.", en: "AI\nPersonaliz." },
  "AA": { es: "Automatiza-\nción I.A.", en: "AI\nAutom." },
  "IN": { es: "Inteligencia\nPredictiva", en: "AI\nInsights" },
  "IN__Inteligencia Artificial": { es: "Inteligencia\nPredictiva", en: "AI\nInsights" },
  "GA": { es: "Asistente\nHuésped I.A.", en: "Guest AI\nAssistant" },
  "ID": { es: "Decisiones\nInteleg.", en: "Intelligent\nDecisions" }
};

// Map elements cleanly to the application representation
export const REVENUE_ELEMENTS: ElementData[] = masterDataset.map((item) => {
  const upperSymbol = item.symbol.toUpperCase();
  
  // Match coord key
  let symbolKey = upperSymbol;
  if (upperSymbol === "AI") {
    symbolKey = `${upperSymbol}__${item.category_es}`;
  } else if (upperSymbol === "SG" && item.category_es === "Características") {
    symbolKey = "SG__Características";
  } else if (upperSymbol === "MS" && item.category_es === "Competidores") {
    symbolKey = "MS__Competidores";
  } else if (upperSymbol === "MS" && item.category_es === "Posicionamiento") {
    symbolKey = "MS__Posicionamiento";
  } else if (upperSymbol === "RL" && item.category_es === "Restricciones") {
    symbolKey = "RL__Restricciones";
  } else if (upperSymbol === "CS" && item.category_es === "Competidores") {
    symbolKey = "CS__Competidores";
  } else if (upperSymbol === "LX" && item.category_es === "Posicionamiento") {
    symbolKey = "LX__Posicionamiento";
  } else if (upperSymbol === "LF" && item.category_es === "Posicionamiento") {
    symbolKey = "LF__Posicionamiento";
  } else if (upperSymbol === "UP" && item.category_es === "Posicionamiento") {
    symbolKey = "UP__Posicionamiento";
  } else if (upperSymbol === "EC" && item.category_es === "Posicionamiento") {
    symbolKey = "EC__Posicionamiento";
  } else if (upperSymbol === "EX" && item.category_es === "Posicionamiento") {
    symbolKey = "EX__Posicionamiento";
  }

  const coords = MASTER_COORDINATES[symbolKey] || MASTER_COORDINATES[upperSymbol] || { row: 0, col: 0 };
  
  // Resolve overrides
  const overrideKey = (upperSymbol === "AI" || upperSymbol === "SG" || upperSymbol === "MS" || upperSymbol === "RL" || upperSymbol === "CS" || upperSymbol === "LX" || upperSymbol === "LF" || upperSymbol === "UP" || upperSymbol === "EC" || upperSymbol === "EX")
    ? `${upperSymbol}__${item.category_es}`
    : upperSymbol;
  const disp = SPECIAL_DISPLAY_NAMES[overrideKey] || SPECIAL_DISPLAY_NAMES[upperSymbol];

  return {
    symbol: upperSymbol,
    name: item.name_es, // default to Spanish
    category: item.category_es, // default to Spanish
    shortDescription: item.description_es,
    longDescription: item.description_es,
    wpExample: "",
    row: coords.row,
    col: coords.col,
    importance: getElementImportance(upperSymbol, item.category_es),
    displayName_es: disp ? disp.es : item.name_es,
    displayName_en: disp ? disp.en : item.name_en
  };
});
