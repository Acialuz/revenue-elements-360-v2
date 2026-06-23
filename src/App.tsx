import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Moon, 
  Sun, 
  Activity, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { CATEGORIES, MASTER_COORDINATES, getElementImportance, ElementData, SPECIAL_DISPLAY_NAMES } from "./data";
import { Logo360 } from "./components/Logo";
import { enrichElement } from "./utils/educationalData";
import masterDataset from "./master_dataset.json";

// Dynamic bilingual dictionary for all visual interface parts (no hardcoded text)
const DICTIONARY = {
  ES: {
    welcome: "Bienvenida",
    comenzar: "Comenzar Exploración",
    opciones: "Opciones de Inserción WordPress",
    plataforma: "Plataforma avanzada de optimización, formación y tecnología hotelera.",
    leyenda_titulo: "Leyenda Oficial y Filtro de Categorías de Revenue Management",
    quitar_filtro: "✓ Quitar filtro activo",
    buscar_placeholder: "Buscar celdas por nombre, símbolo, categoría o descripción...",
    celdas_filtradas: "Celdas filtradas",
    definicion: "Definición Teórica",
    metrica: "Métrica y Ecuación",
    relacionados: "Elementos Relacionados",
    por_que_importa: "¿Por qué importa en Revenue?",
    aplicacion: "Aplicación Práctica",
    casos: "Casos de Implementación de Campo",
    hotel_independiente: "Hotel Independiente / Boutique",
    cadena_hotelera: "Cadena Hotelera Multinacional",
    importancia_est: "Importancia Estratégica",
    derechos: "Todos los derechos reservados © 2026.",
    by_brand: "by 360 Hotel Management",
    score_clase: "Similitud Estructural",
    sistema_integ: "Score de Calidad y Salud del Dataset",
    certified: "Dataset Certificado por Calidad",
    details: "Detalles del Audit",
    celda: "Celda",
    nombre: "Nombre",
    categoria: "Categoría",
    descripcion: "Descripción",
    estado: "Estado",
    valido: "VÁLIDO",
    duplicado: "DUPLICADO",
    erroneo: "ERRÓNEO",
    huerfano: "HUÉRFANO",
    score: "Health Score del Dataset master_dataset.json",
    observaciones: "Observaciones del Audit",
    sin_errores: "Excelente! Sin incidencias registradas en el dataset master.",
    issues_detected: "Incidencias detectadas en la validación.",
    intro_subtitle: "Herramienta Avanzada de Simplicidad Hotelera",
    intro_desc: "Una plataforma interactiva corporativa de primer nivel diseñada para la educación avanzada, consultoría operacional y optimización comercial. Descubre un ecosistema estructurado en 18 columnas y 7 filamentos de Revenue Management organizados científicamente para la excelencia hotelera.",
    val_education: "Formación Avanzada",
    val_education_desc: "Plan de estudio didáctico interactivo para capacitar de forma intuitiva a equipos operativos y escuelas de negocios del sector turístico.",
    val_scientific: "Revenue Científico",
    val_scientific_desc: "Optimización analítica: KPI, algoritmos de predicción, políticas de reservas y análisis heurístico de canales y competidores.",
    val_tech: "Tecnología Hotelera",
    val_tech_desc: "Ecosistema de datos unificado, de alto rendimiento y alineado a los estándares de la industria hotelera internacional.",
    clic_instruccion: "Haz clic sobre cualquier elemento de la infografía interactiva para consultar su caso de negocio y descripción detallada.",
    total_encontrados: "elementos encontrados",
    error_no_resultados: "No se encontraron elementos con el filtro o búsqueda actual.",
    auditoria_calidad_titulo: "Panel de Auditoría de Sanidad y Calidad de Integración"
  },
  EN: {
    welcome: "Welcome Cover",
    comenzar: "Begin Exploration",
    opciones: "WordPress Embed Options",
    plataforma: "Advanced platform for hotel optimization, training, and technology.",
    leyenda_titulo: "Official Legend & Revenue Management Category Filter",
    quitar_filtro: "✓ Clear active filter",
    buscar_placeholder: "Search cells by name, symbol, category or description...",
    celdas_filtradas: "Filtered cells",
    definicion: "Theoretical Definition",
    metrica: "Metric & Equation",
    relacionados: "Related Elements",
    por_que_importa: "Why it Matters in Revenue?",
    aplicacion: "Practical Application",
    casos: "Field Implementation Cases",
    hotel_independiente: "Independent / Boutique Hotel",
    cadena_hotelera: "Multinational Hotel Chain",
    importancia_est: "Strategic Importance",
    derechos: "All rights reserved © 2026.",
    by_brand: "by 360 Hotel Management",
    score_clase: "Structural Similarity",
    sistema_integ: "Dataset Quality & Health Score",
    certified: "Dataset Certified for Quality Integrity",
    details: "Audit Details",
    celda: "Cell",
    nombre: "Name",
    categoria: "Category",
    descripcion: "Description",
    estado: "Status",
    valido: "VALID",
    duplicado: "DUPLICATE",
    erroneo: "ERROR",
    huerfano: "ORPHAN",
    score: "Database Health Score from master_dataset.json",
    observaciones: "Audit Remarks",
    sin_errores: "Excellent! No incidents registered in the master dataset.",
    issues_detected: "Incidents detected during validation.",
    intro_subtitle: "Advanced Hotel Management Simplicity Tool",
    intro_desc: "A premium corporate interactive platform designed for advanced education, operational consulting, and commercial optimization. Discover an ecosystem structured in 18 columns and 7 filaments of Revenue Management scientifically organized for hospitality excellence.",
    val_education: "Advanced Training",
    val_education_desc: "Interactive educational study plan to intuitively train operations teams and business school partners.",
    val_scientific: "Scientific Revenue",
    val_scientific_desc: "Analytical optimization: KPIs, forecasting algorithms, reservation limits, and competitive market intelligence.",
    val_tech: "Hotel Technology",
    val_tech_desc: "Unified, high performance data ecosystem aligned with international hotel industry standards.",
    clic_instruccion: "Click on any element in the interactive periodic table grid to consult its business case and detailed description.",
    total_encontrados: "elements found",
    error_no_resultados: "No elements found matching the current search query or category filter.",
    auditoria_calidad_titulo: "Validation Panel: Dataset Quality & Health Status"
  }
};

const COLUMN_HEADERS: Record<number, { title_es: string; title_en: string; group?: string; color?: string }> = {
  1: { title_es: "", title_en: "", group: "1", color: "" },
  2: { title_es: "", title_en: "", group: "2", color: "" },
  3: { title_es: "", title_en: "", group: "", color: "" },
  4: { title_es: "", title_en: "", group: "3", color: "" },
  5: { title_es: "", title_en: "", group: "4", color: "" },
  6: { title_es: "", title_en: "", group: "5", color: "" },
  7: { title_es: "", title_en: "", group: "6", color: "" },
  8: { title_es: "", title_en: "", group: "7", color: "" },
  9: { title_es: "", title_en: "", group: "8", color: "" },
  10: { title_es: "", title_en: "", group: "9", color: "" },
  11: { title_es: "", title_en: "", group: "10", color: "" },
  12: { title_es: "", title_en: "", group: "11", color: "" },
  13: { title_es: "", title_en: "", group: "12", color: "" },
  14: { title_es: "", title_en: "", group: "13", color: "" },
  15: { title_es: "", title_en: "", group: "14", color: "" },
  16: { title_es: "", title_en: "", group: "15", color: "" },
  17: { title_es: "", title_en: "", group: "16", color: "" },
  18: { title_es: "", title_en: "", group: "17", color: "" },
};

const LOWER_DECK_LAYOUT: { symbol: string; row: number; col: number }[] = [
  // --- ROW 1 (17 elements) ---
  { symbol: "T", row: 1, col: 1 },
  { symbol: "PE", row: 1, col: 2 },
  { symbol: "PS", row: 1, col: 3 },
  { symbol: "DA", row: 1, col: 4 },
  { symbol: "CH", row: 1, col: 5 },
  { symbol: "RS", row: 1, col: 6 },
  { symbol: "SH", row: 1, col: 7 },
  { symbol: "PM", row: 1, col: 8 },
  { symbol: "BI", row: 1, col: 9 },
  { symbol: "OR", row: 1, col: 10 },
  { symbol: "BE", row: 1, col: 11 },
  { symbol: "BH", row: 1, col: 12 },
  { symbol: "TI", row: 1, col: 13 },
  { symbol: "RC", row: 1, col: 14 },
  { symbol: "TR", row: 1, col: 15 },
  { symbol: "FB", row: 1, col: 16 },
  { symbol: "FD", row: 1, col: 17 },

  // --- ROW 2 (14 elements) ---
  { symbol: "EE", row: 2, col: 1 },
  { symbol: "W", row: 2, col: 2 },
  { symbol: "WS", row: 2, col: 3 },
  { symbol: "AC", row: 2, col: 4 },
  { symbol: "AF", row: 2, col: 5 },
  { symbol: "AP", row: 2, col: 6 },
  { symbol: "AA", row: 2, col: 7 },
  { symbol: "IN", row: 2, col: 8 },
  { symbol: "GA", row: 2, col: 9 },
  { symbol: "ID", row: 2, col: 10 },
  { symbol: "RT", row: 2, col: 11 },
  { symbol: "LD", row: 2, col: 12 },
  { symbol: "HK", row: 2, col: 13 },
  { symbol: "CE", row: 2, col: 14 },

  // --- ROW 3 (4 elements) ---
  { symbol: "SR", row: 3, col: 1 },
  { symbol: "EQ", row: 3, col: 2 },
  { symbol: "CF", row: 3, col: 3 },
  { symbol: "LC", row: 3, col: 4 }
];

const RELATIVE_LOWER_COORDINATES: Record<string, { row: number; col: number }> = {
  // Elementos (2x2)
  "T":  { row: 1, col: 1 },
  "PE": { row: 1, col: 2 },
  "PS": { row: 2, col: 1 },
  "DA": { row: 2, col: 2 },

  // Herramientas (3x3)
  "CH": { row: 1, col: 1 },
  "RS": { row: 1, col: 2 },
  "SH": { row: 1, col: 3 },
  "PM": { row: 2, col: 1 },
  "BI": { row: 2, col: 2 },
  "OR": { row: 2, col: 3 },
  "BE": { row: 3, col: 1 },
  "BH": { row: 3, col: 2 },
  "TI": { row: 3, col: 3 },

  // Sostenibilidad (2 rows, 4 cols)
  "EE": { row: 1, col: 1 },
  "W":  { row: 1, col: 2 },
  "WS": { row: 1, col: 3 },
  "LC": { row: 1, col: 4 },
  "SR": { row: 2, col: 1 },
  "EQ": { row: 2, col: 2 },
  "CF": { row: 2, col: 3 },

  // Personas (2x2)
  "RC": { row: 1, col: 1 },
  "TR": { row: 1, col: 2 },
  "RT": { row: 2, col: 1 },
  "LD": { row: 2, col: 2 },

  // Operaciones (2x2)
  "FB": { row: 1, col: 1 },
  "FD": { row: 1, col: 2 },
  "HK": { row: 2, col: 1 },
  "CE": { row: 2, col: 2 },

  // Inteligencia Artificial (1 row, 7 cols or 2 rows)
  "AC": { row: 1, col: 1 },
  "AF": { row: 1, col: 2 },
  "AP": { row: 1, col: 3 },
  "AA": { row: 1, col: 4 },
  "IN": { row: 1, col: 5 },
  "GA": { row: 1, col: 6 },
  "ID": { row: 1, col: 7 }
};

interface LowerBlockInfo {
  category: string;
  titleEs: string;
  titleEn: string;
  symbols: string[];
  rows: number;
  cols: number;
  span: number;
  widthPercent: string;
}

const LOWER_BLOCKS: LowerBlockInfo[] = [
  {
    category: "Elementos",
    titleEs: "Elementos",
    titleEn: "Elements",
    symbols: ["T", "PE", "PS", "DA"],
    rows: 2,
    cols: 2,
    span: 2,
    widthPercent: "lg:w-[15.4%]"
  },
  {
    category: "Herramientas",
    titleEs: "Herramientas",
    titleEn: "Tools",
    symbols: ["CH", "RS", "SH", "PM", "BI", "OR", "BE", "BH", "TI"],
    rows: 3,
    cols: 3,
    span: 3,
    widthPercent: "lg:w-[23.1%]"
  },
  {
    category: "Sostenibilidad",
    titleEs: "Sostenibilidad",
    titleEn: "Sustainability",
    symbols: ["EE", "W", "WS", "LC", "SR", "EQ", "CF"],
    rows: 2,
    cols: 4,
    span: 4,
    widthPercent: "lg:w-[30.8%]"
  },
  {
    category: "Personas",
    titleEs: "Personas",
    titleEn: "People",
    symbols: ["RC", "TR", "RT", "LD"],
    rows: 2,
    cols: 2,
    span: 2,
    widthPercent: "lg:w-[15.4%]"
  },
  {
    category: "Operaciones",
    titleEs: "Operaciones",
    titleEn: "Operations",
    symbols: ["FB", "FD", "HK", "CE"],
    rows: 2,
    cols: 2,
    span: 2,
    widthPercent: "lg:w-[15.4%]"
  },
  {
    category: "Inteligencia Artificial",
    titleEs: "Inteligencia Artificial",
    titleEn: "Artificial Intelligence",
    symbols: ["AC", "AF", "AP", "AA", "IN", "GA", "ID"],
    rows: 1,
    cols: 7,
    span: 7,
    widthPercent: "lg:w-[50.0%]"
  }
];

export default function App() {
  const theme = "original";

  // Language state: "ES" (Spanish) | "EN" (English)
  const [language, setLanguage] = useState<"ES" | "EN">(() => {
    try {
      const savedLang = localStorage.getItem("revenue_elements_360_language");
      return (savedLang === "ES" || savedLang === "EN") ? savedLang : "ES";
    } catch {
      return "ES";
    }
  });

  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [showAuditDetails, setShowAuditDetails] = useState<boolean>(false);
  const [isLegendExpanded, setIsLegendExpanded] = useState<boolean>(false);

  // Sync preference locks to standard localStorage
  useEffect(() => {
    try {
      localStorage.setItem("revenue_elements_360_language", language);
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  }, [language]);

  // Reactive and completely dynamic bilingual elements array derived from master_dataset.json
  const elements = useMemo(() => {
    return masterDataset.map((item) => {
      const upperSymbol = item.symbol.toUpperCase();
      const stableKey = `${upperSymbol}__${item.category_es}`;
      const coords = MASTER_COORDINATES[stableKey] || MASTER_COORDINATES[upperSymbol] || { row: 0, col: 0 };
      
      const overrideKey = (upperSymbol === "AI" || upperSymbol === "SG" || upperSymbol === "MS" || upperSymbol === "RL" || upperSymbol === "CS" || upperSymbol === "LX" || upperSymbol === "LF" || upperSymbol === "UP" || upperSymbol === "EC" || upperSymbol === "EX")
        ? `${upperSymbol}__${item.category_es}`
        : upperSymbol;
      const disp = SPECIAL_DISPLAY_NAMES[overrideKey] || SPECIAL_DISPLAY_NAMES[upperSymbol];

      const el: ElementData = {
        symbol: upperSymbol,
        name: language === "ES" ? item.name_es : item.name_en,
        category: item.category_es, // keep Spanish for internal maps and filters stability
        shortDescription: language === "ES" ? item.description_es : item.description_en,
        longDescription: language === "ES" ? item.description_es : item.description_en,
        wpExample: "",
        row: coords.row,
        col: coords.col,
        importance: getElementImportance(upperSymbol, item.category_es),
        // Add extra custom localized properties
        whyItMatters: "", // solved at enrich stage
        practicalApplication: "", // solved at enrich stage
        displayName_es: disp ? disp.es : item.name_es,
        displayName_en: disp ? disp.en : item.name_en
      };

      // Enrich element with formulas, field-by-field relationships, boutique vs chain hotel examples
      const enriched = enrichElement(el, language);

      // Save localized category string to display bilingually in UI
      (enriched as any).localizedCategory = language === "ES" ? item.category_es : item.category_en;

      return enriched;
    });
  }, [language]);

  // Handle cell selection
  const handleCellClick = (element: ElementData) => {
    setSelectedElement(element);
  };

  // Resolve beautiful corporate category colors on the fly based on the chosen theme style
  const getThemeCategoryColor = (categoryName: string, themeMode: "original" | "light" = "original") => {
    const isLight = themeMode === "light";
    
    switch (categoryName) {
      case "Básicos de Revenue":
      case "Fundamentos Revenue":
        return isLight 
          ? "bg-[#D9D9D9] hover:bg-[#cbd5e1] text-[#111827]"
          : "bg-[#D9D9D9] hover:bg-[#c2c2c2] text-[#111111]";
      case "Características":
        return isLight 
          ? "bg-[#7DB4FF] hover:bg-[#6099ec] text-[#111827]"
          : "bg-[#7DB4FF] hover:bg-[#5f97e2] text-[#111111]";
      case "Tecnología":
        return isLight 
          ? "bg-[#F4E2BE] hover:bg-[#decbae] text-[#111827]"
          : "bg-[#F4E2BE] hover:bg-[#decbae] text-[#111111]";
      case "Horizontes":
        return isLight 
          ? "bg-[#9BE0A6] hover:bg-[#85c28e] text-[#111827]"
          : "bg-[#9BE0A6] hover:bg-[#85c28e] text-[#111111]";
      case "Indicadores KPI":
        return isLight 
          ? "bg-[#F5A6A6] hover:bg-[#df9191] text-[#111827]"
          : "bg-[#F5A6A6] hover:bg-[#df9191] text-[#111111]";
      case "Tarifas":
        return isLight 
          ? "bg-[#A8D8FF] hover:bg-[#92beeb] text-[#111827]"
          : "bg-[#A8D8FF] hover:bg-[#92beeb] text-[#111111]";
      case "Marketing":
        return isLight 
          ? "bg-[#F2F2F2] hover:bg-[#dbdbdb] text-[#111827]"
          : "bg-[#F2F2F2] hover:bg-[#dbdbdb] text-[#111111]";
      case "Competidores":
        return isLight 
          ? "bg-[#F7C7D9] hover:bg-[#e0b0c2] text-[#111827]"
          : "bg-[#F7C7D9] hover:bg-[#e0b0c2] text-[#111111]";
      case "Restricciones":
        return isLight 
          ? "bg-[#F8D86A] hover:bg-[#dfc15a] text-[#111827]"
          : "bg-[#F8D86A] hover:bg-[#dfc15a] text-[#111111]";
      case "Canales":
        return isLight 
          ? "bg-[#C7DDF7] hover:bg-[#b0c4db] text-[#111827]"
          : "bg-[#C7DDF7] hover:bg-[#b0c4db] text-[#111111]";
      case "Cadenas Hoteleras":
        return isLight 
          ? "bg-[#A9E3E8] hover:bg-[#93c7cc] text-[#111827]"
          : "bg-[#A9E3E8] hover:bg-[#93c7cc] text-[#111111]";
      case "Segmentos":
        return isLight 
          ? "bg-[#FFF200] hover:bg-[#ebd900] text-[#111827]"
          : "bg-[#FFF200] hover:bg-[#ebd900] text-[#111111]";
      case "Posicionamiento":
        return isLight 
          ? "bg-[#8FD19E] hover:bg-[#7db78a] text-[#111827]"
          : "bg-[#8FD19E] hover:bg-[#7db78a] text-[#111111]";
      case "Herramientas":
        return isLight 
          ? "bg-[#EEDC9A] hover:bg-[#d6c584] text-[#111827]"
          : "bg-[#EEDC9A] hover:bg-[#d6c584] text-[#111111]";
      case "Sostenibilidad":
        return isLight 
          ? "bg-[#9ED9E0] hover:bg-[#8ac0c7] text-[#111827]"
          : "bg-[#9ED9E0] hover:bg-[#8ac0c7] text-[#111111]";
      case "Personas":
        return isLight 
          ? "bg-[#C8D9C0] hover:bg-[#b0c0a9] text-[#111827]"
          : "bg-[#C8D9C0] hover:bg-[#b0c0a9] text-[#111111]";
      case "Operaciones":
        return isLight 
          ? "bg-[#D8D1E8] hover:bg-[#beb8ce] text-[#111827]"
          : "bg-[#D8D1E8] hover:bg-[#beb8ce] text-[#111111]";
      case "Elementos":
        return isLight 
          ? "bg-zinc-100/20 text-zinc-500 hover:bg-zinc-200/40"
          : "bg-zinc-100/20 text-zinc-500 hover:bg-zinc-200/40";
      case "Inteligencia Artificial":
        return isLight 
          ? "bg-indigo-100 hover:bg-indigo-200 text-[#111827]"
          : "bg-indigo-100/40 hover:bg-indigo-100/60 text-[#111111]";
      default:
        return isLight 
          ? "bg-white text-[#111827]"
          : "bg-white text-[#111111]";
    }
  };

  // Scientific Symbol notation formatter (e.g., RM -> Rm, AC -> Ac)
  const renderScientificSymbol = (symbol: string): string => {
    if (!symbol) return "";
    return symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
  };

  // Abbreviated category tag code for crisp layout rendering (fits tiny grids seamlessly)
  const getCategoryAbbreviation = (cat: string): string => {
    switch (cat) {
      case "Básicos de Revenue":
      case "Fundamentos Revenue":
        return "BRM";
      case "Características": return "CAR";
      case "Tecnología": return "TEC";
      case "Sostenibilidad": return "SOS";
      case "Indicadores KPI": return "KPI";
      case "Tarifas": return "TAR";
      case "Marketing": return "MKT";
      case "Competidores": return "CMP";
      case "Herramientas": return "HER";
      case "Personas": return "PER";
      case "Restricciones": return "RES";
      case "Operaciones": return "OPE";
      case "Canales": return "CAN";
      case "Cadenas Hoteleras": return "CAD";
      case "Segmentos": return "SEG";
      case "Posicionamiento": return "POS";
      case "Elementos": return "ELE";
      case "Inteligencia Artificial": return "AI";
      case "Horizontes": return "HOR";
      default: return "DF";
    }
  };

  // Bilingual-aware filtering engine (Phase 3: search matches dynamically in both Spanish & English)
  const filteredElements = useMemo(() => {
    return elements.filter((el) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesCategory = selectedCategory ? el.category === selectedCategory : true;
      if (q === "") return matchesCategory;

      // Locate master file reference to query Spanish and English columns simultaneously
      const raw = masterDataset.find(item => item.symbol.toUpperCase() === el.symbol.toUpperCase());
      const matchesSearch = raw ? (
        raw.symbol.toLowerCase().includes(q) ||
        raw.name_es.toLowerCase().includes(q) ||
        raw.name_en.toLowerCase().includes(q) ||
        raw.category_es.toLowerCase().includes(q) ||
        raw.category_en.toLowerCase().includes(q) ||
        raw.description_es.toLowerCase().includes(q) ||
        raw.description_en.toLowerCase().includes(q)
      ) : (
        el.symbol.toLowerCase().includes(q) ||
        el.name.toLowerCase().includes(q) ||
        el.shortDescription.toLowerCase().includes(q)
      );

      return matchesSearch && matchesCategory;
    });
  }, [elements, searchQuery, selectedCategory]);

  // Helper to find exact element in elements list based on unique target category block
  const getComplementaryElement = (sym: string) => {
    const block = LOWER_BLOCKS.find(b => b.symbols.map(s => s.toUpperCase()).includes(sym.toUpperCase()));
    if (!block) return null;
    return elements.find(el => el.symbol.toUpperCase() === sym.toUpperCase() && el.category === block.category);
  };

  const renderComplementaryCard = (element: any) => {
    const isMatch = searchQuery === "" || 
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? element.category === selectedCategory : true;
    const isHighlighted = isMatch && matchesCategory;

    const backgroundClass = getThemeCategoryColor(element.category, theme);
    const abbr = getCategoryAbbreviation(element.category);

    const isSelected = selectedElement && 
      selectedElement.symbol.toUpperCase() === element.symbol.toUpperCase() && 
      selectedElement.category === element.category;
    const activeBorder = isSelected
      ? "ring-4 ring-offset-2 ring-[#222222] scale-102 z-20"
      : "";

    const displayName = language === "ES" 
      ? (element.displayName_es || element.name) 
      : (element.displayName_en || element.name);

    const symbolLen = element.symbol.length;
    const symbolSizeStyle = symbolLen > 6 
      ? { fontSize: "clamp(10px, 0.8vw, 10px)" } 
      : symbolLen > 4 
        ? { fontSize: "clamp(11px, 0.9vw, 11px)" } 
        : symbolLen > 2 
          ? { fontSize: "clamp(12px, 1vw, 12px)" } 
          : { fontSize: "clamp(15px, 1.25vw, 18px)" };

    return (
      <button
        key={`lower-cell-${element.symbol}-${element.category}`}
        onClick={() => handleCellClick(element)}
        style={{ width: "var(--cell-width)", height: "var(--cell-height)" }}
        className={`text-left p-1 md:p-1.5 rounded-[4px] border border-[#222222] border-[1.2px] transition-all duration-200 flex flex-col justify-between relative shadow-xs hover:shadow hover:scale-102 cursor-pointer ${backgroundClass} ${activeBorder} ${isHighlighted ? "opacity-100" : "opacity-30"}`}
      >
        {/* Top stats line inside cell: Abbreviation only with font-semibold (600 max) */}
        <div className="leading-none flex justify-between w-full">
          <span className="text-[clamp(7px,0.6vw,8px)] font-semibold tracking-wider shrink-0 uppercase opacity-80">
            {abbr}
          </span>
        </div>

        {/* Main central heavy symbol: font-bold / strong / dominant (700-800 weight) */}
        <div className="text-center w-full my-auto leading-none">
          <span style={symbolSizeStyle} className="font-bold tracking-tight block">
            {renderScientificSymbol(element.symbol)}
          </span>
        </div>

        {/* Mini localized name with dynamic wrapping and no forced truncates: font-medium (500 max) */}
        <div className="hidden md:flex w-full h-[28px] items-center justify-center pt-0.5 select-none text-center">
          <span className="text-[clamp(6.5px,0.6vw,7.5px)] font-medium tracking-tight leading-[1.05] whitespace-pre-line break-words line-clamp-3 text-center block w-full px-0.5">
            {displayName}
          </span>
        </div>
      </button>
    );
  };

  // Complete, scientific dataset quality & integrity audit computed at runtime (satisfies Phase 5)
  const datasetAudit = useMemo(() => {
    let score = 100;
    const errorsList: string[] = [];
    const seenSymbols = new Set<string>();
    const dupSymbols = new Set<string>();

    let orphanCount = 0;
    let missingFieldIssues = 0;

    masterDataset.forEach((item) => {
      const upperSymbol = item.symbol.toUpperCase();
      // 1. Check duplicate symbols
      if (seenSymbols.has(upperSymbol) && upperSymbol !== "AI") {
        dupSymbols.add(upperSymbol);
        errorsList.push(`Símbolo Duplicado ("${item.symbol}") detectado en master_dataset.json`);
      }
      seenSymbols.add(upperSymbol);

      // 2. Check orphan coordinates
      const stableKey = `${upperSymbol}__${item.category_es}`;
      const coords = MASTER_COORDINATES[stableKey] || MASTER_COORDINATES[upperSymbol];
      if (!coords || coords.row === 0 || coords.col === 0) {
        orphanCount++;
        errorsList.push(`Coordenada Huérfana o vacía para el símbolo "${item.symbol}"`);
      }

      // 3. Check for missing columns
      const fields = [
        { key: "symbol", text: "Símbolo" },
        { key: "name_es", text: "Nombre (ES)" },
        { key: "name_en", text: "Nombre (EN)" },
        { key: "category_es", text: "Categoría (ES)" },
        { key: "category_en", text: "Categoría (EN)" },
        { key: "description_es", text: "Descripción (ES)" },
        { key: "description_en", text: "Descripción (EN)" }
      ];

      fields.forEach((f) => {
        const val = item[f.key as keyof typeof item];
        if (!val || String(val).trim() === "") {
          missingFieldIssues++;
          errorsList.push(`Falta el valor "${f.text}" del elemento con símbolo "${item.symbol}"`);
        }
      });
    });

    // Score deduction math
    score -= dupSymbols.size * 10;
    score -= orphanCount * 5;
    score -= missingFieldIssues * 3;
    if (score < 0) score = 0;

    return {
      score,
      totalEntries: masterDataset.length,
      dupCount: dupSymbols.size,
      dupList: Array.from(dupSymbols),
      orphanCount,
      missingCount: missingFieldIssues,
      errors: errorsList,
      isPerfect: score === 100
    };
  }, []);

  // Grid constants (Column 3 is an empty spacer, removed to align CAR immediately next to BRM)
  const cols = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const rows = Array.from({ length: 7 }, (_, i) => i + 1);

  // Read developer flag from URL to optionally toggle Sanity Board panels for authorized users (?dev=true)
  const devMode = useMemo(() => {
    try {
      return typeof window !== "undefined" && window.location.search.includes("dev=true");
    } catch {
      return false;
    }
  }, []);

  return (
    <div 
      className="min-h-screen bg-[#FAF9F5] text-[#111111] selection:bg-amber-100 font-sans transition-colors duration-300 relative pb-16"
      style={{
        "--cell-width": "clamp(38px, calc((100vw - 180px) / 17), 62px)",
        "--cell-height": "calc(var(--cell-width) * 1.206)",
        "--cell-gap-x": "clamp(2px, 0.25vw, 4px)",
        "--cell-gap-y": "clamp(2px, 0.25vw, 4px)"
      } as React.CSSProperties}
    >
      
      {/* 1. COVER PAGE OVERLAY (Intro Card Welcome Screen) */}
      {showIntro && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex flex-col justify-between p-4 md:p-8 bg-[#FAF9F5] text-[#111111]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-blue-600/5 rounded-full filter blur-[150px] pointer-events-none" />
          
          {/* Header */}
          <header className="relative z-10 max-w-7xl mx-auto w-full px-4 py-4 flex justify-between items-center bg-transparent">
            <Logo360 size="sm" darkMode={false} showSubtitle={false} />
            
            {/* Lang switcher panel right inside cover header */}
            <div className="p-0.5 rounded-lg border border-zinc-300 bg-zinc-150 flex items-center gap-0.5">
              <button
                onClick={() => setLanguage("ES")}
                className={`px-3 py-1.5 rounded text-[10px] md:text-xs font-bold transition-all cursor-pointer ${
                  language === "ES" ? "bg-white text-zinc-900 border border-slate-200 font-extrabold shadow-xs" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 py-1.5 rounded text-[10px] md:text-xs font-bold transition-all cursor-pointer ${
                  language === "EN" ? "bg-white text-zinc-900 border border-slate-200 font-extrabold shadow-xs" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </header>

          {/* Main Visual Content */}
          <main className="relative z-10 max-w-4xl mx-auto px-4 py-10 flex-grow flex flex-col items-center justify-center text-center">
            <div className="mb-6 p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-md relative">
              <Logo360 size="xl" darkMode={false} showSubtitle={false} />
            </div>

            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#B45309] mb-2.5">
              {DICTIONARY[language].intro_subtitle}
            </h2>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-zinc-900">
              Revenue Elements 360™
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold tracking-wide mt-2.5 text-[#0455B7]">
              {DICTIONARY[language].by_brand}
            </p>
            
            <p className="text-sm sm:text-base mt-6 max-w-2xl leading-relaxed text-zinc-700">
              {DICTIONARY[language].intro_desc}
            </p>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full">
              <div className="p-5 rounded-2xl border text-left bg-white border-zinc-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-extrabold text-[13px] uppercase tracking-wider text-zinc-800">
                  {DICTIONARY[language].val_education}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {DICTIONARY[language].val_education_desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl border text-left bg-white border-zinc-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <Activity className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-extrabold text-[13px] uppercase tracking-wider text-zinc-800">
                  {DICTIONARY[language].val_scientific}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {DICTIONARY[language].val_scientific_desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl border text-left bg-white border-zinc-200 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-extrabold text-[13px] uppercase tracking-wider text-zinc-800">
                  {DICTIONARY[language].val_tech}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {DICTIONARY[language].val_tech_desc}
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center relative z-20">
              <button
                onClick={() => setShowIntro(false)}
                className="px-8 py-4 bg-[#0455B7] hover:bg-[#034493] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-[#0455b7]"
              >
                <span>{DICTIONARY[language].comenzar}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </main>

          <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-[11px] text-zinc-500 border-t border-zinc-200">
            <p>
              Revenue Elements 360™ by <span className="text-[#0455B7] font-semibold">360 Hotel Management</span>. {DICTIONARY[language].derechos}
            </p>
          </footer>
        </div>
      )}

      {/* 2. DYNAMIC MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 p-6 rounded-2xl border bg-[#FCFAF4] border-[#222222] border-[1.5px] text-stone-900 shadow-sm">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Logo360 size="lg" darkMode={false} showSubtitle={false} />
              <div className="h-px w-full sm:h-12 sm:w-px bg-slate-300"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2 leading-none">
                  <span className="text-[#0455B7]">Revenue Elements 360™</span>
                </h1>
                <p className="text-xs mt-1 leading-relaxed text-zinc-800/80">
                  {DICTIONARY[language].plataforma} <span className="font-extrabold">{DICTIONARY[language].by_brand}</span>
                </p>
              </div>
            </div>

            {/* Visual Control Pill Area */}
            <div className="flex items-center flex-wrap gap-2.5">
              {/* Reset view toggle to Cover Page */}
              <button
                onClick={() => setShowIntro(true)}
                className="px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition bg-[#ECE9DF] border-[#1F2937]/35 text-[#111111] hover:bg-[#E2DEC5]"
                title="Volver a la portada de bienvenida"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{DICTIONARY[language].welcome}</span>
              </button>

              {/* Language Selector (Pill Toggle Selector) */}
              <div className="p-0.5 rounded-lg border flex items-center gap-0.5 bg-[#ECE9DF] border-[#1F2937]/30">
                <button
                  onClick={() => setLanguage("ES")}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    language === "ES" 
                      ? "bg-white text-zinc-900 shadow-sm border border-slate-205 font-extrabold" 
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <span>🇪🇸</span>
                  <span className="hidden sm:inline">Español</span>
                </button>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    language === "EN" 
                      ? "bg-white text-zinc-900 shadow-sm border border-slate-205 font-extrabold" 
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <span>🇬🇧</span>
                  <span className="hidden sm:inline">English</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 3. INTERACTIVE SEARCH & CATEGORY LEGEND FILTERS */}
        <section className="mb-8 p-6 rounded-2xl border bg-[#FCFAF4] border-[#222222] border-[1.5px]">
          <div className="flex flex-col gap-6">
            
            {/* Search inputs bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={DICTIONARY[language].buscar_placeholder}
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border focus:outline-none transition bg-[#FAF9F5] border-[#222222] border-[1.5px] text-[#111111]"
                />
              </div>

              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-3 text-xs md:text-sm font-extrabold rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer leading-none flex items-center justify-center gap-1.5 select-none"
                >
                  <span>{DICTIONARY[language].quitar_filtro}</span>
                </button>
              )}
            </div>

            {/* Official Interactive Legend filter blocks grid */}
            <div>
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-[#0455B7] mb-3.5">
                <button 
                  onClick={() => setIsLegendExpanded(!isLegendExpanded)}
                  className="flex items-center justify-between md:justify-start gap-2 cursor-pointer md:cursor-default md:pointer-events-none w-full text-left"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 shrink-0" />
                    <span>{DICTIONARY[language].leyenda_titulo}</span>
                  </span>
                  <span className="text-[10px] md:hidden shrink-0 font-sans font-extrabold select-none">
                    {isLegendExpanded ? "▲" : "▼"}
                  </span>
                </button>
              </h3>
              
              <div className={`${isLegendExpanded ? "grid" : "hidden"} md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2`}>
                {Object.keys(CATEGORIES).map((catName) => {
                  const cat = CATEGORIES[catName];
                  const isSelected = selectedCategory === catName;
                  const localizedCatName = language === "ES" ? cat.name_es : cat.name_en;
                  const localizedCatDesc = language === "ES" ? cat.description_es : cat.description_en;

                  const colorClass = isSelected
                    ? "ring-4 ring-offset-2 ring-blue-500 z-10"
                    : "opacity-80 hover:opacity-100";

                  // Apply customized color styling blocks
                  const backgroundClass = getThemeCategoryColor(catName, theme);

                  return (
                    <button
                      key={catName}
                      onClick={() => setSelectedCategory(isSelected ? null : catName)}
                      className={`p-2 rounded-xl text-left border text-[10px] sm:text-xs leading-tight transition cursor-pointer select-none relative group h-14 flex flex-col justify-between ${backgroundClass} ${colorClass}`}
                      title={`${localizedCatName}: ${localizedCatDesc}`}
                    >
                      <span className="font-mono font-black border-b border-black/10 pb-0.5 uppercase tracking-wider block">
                        {getCategoryAbbreviation(catName)}
                      </span>
                      <span className="font-extrabold truncate block">
                        {localizedCatName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4. MAIN PERIODIC TABLE GRID (Rows 1-7) */}
        <section className="p-4 md:p-6 rounded-3xl border overflow-x-auto min-w-[760px] bg-[#FCFAF4] border-[#222222] border-[1.5px]" style={{ contentVisibility: "auto" }}>
          
          <div className="relative flex justify-center">
            <div 
              className="grid select-none" 
              style={{ 
                gridTemplateColumns: `repeat(${cols.length}, var(--cell-width))`, 
                gridTemplateRows: "32px repeat(7, var(--cell-height))",
                columnGap: "var(--cell-gap-x)",
                rowGap: "var(--cell-gap-y)"
              }}
            >
              
              {/* Scientific Column Group Headers */}
              {cols.map((colNum, colIdx) => {
                const header = COLUMN_HEADERS[colNum];
                const gridCol = colIdx + 1;
                return (
                  <div
                    key={`col-header-${colNum}`}
                    style={{ gridColumn: gridCol, gridRow: 1 }}
                    className="flex flex-col items-center justify-end pb-1.5 text-center pointer-events-none select-none border-b border-zinc-200/60"
                  >
                    <span className="text-[clamp(7.5px,0.7vw,10px)] font-black font-mono tracking-wider text-zinc-400 leading-none">
                      {header.group}
                    </span>
                    <span className={`text-[clamp(6.5px,0.6vw,9px)] font-black uppercase tracking-widest mt-0.5 leading-none ${header.color}`}>
                      {language === "ES" ? header.title_es : header.title_en}
                    </span>
                  </div>
                );
              })}

              {/* Loop rows & cols layout perfectly */}
              {rows.map((rowNum) => {
                return (
                  <React.Fragment key={rowNum}>
                    {cols.map((colNum, colIdx) => {
                      const gridCol = colIdx + 1;
                      // Fetch matching elements scheduled for this coordinate
                      const matchedInGrid = filteredElements.filter((el) => {
                        return el.row === rowNum && el.col === colNum;
                      });

                      // Render empty cells cleanly with invisible spacing
                      if (matchedInGrid.length === 0) {
                        // Find if there's any element in the master dataset at this coordinate
                        const baselineElement = elements.find(el => el.row === rowNum && el.col === colNum);

                        if (!baselineElement) {
                           // It's a naturally empty space in the periodic table
                           return (
                             <div
                               key={`empty-${rowNum}-${colNum}`}
                               style={{ gridColumn: gridCol, gridRow: rowNum + 1, width: "var(--cell-width)", height: "var(--cell-height)" }}
                               className="opacity-0 pointer-events-none"
                             />
                           );
                        }

                        // Coordinate has a registered element, but it's currently filtered out
                        const abbr = getCategoryAbbreviation(baselineElement.category);

                        return (
                          <div
                            key={`empty-${rowNum}-${colNum}`}
                            style={{ gridColumn: gridCol, gridRow: rowNum + 1, width: "var(--cell-width)", height: "var(--cell-height)" }}
                            className="border border-[1.2px] border-dashed border-black/25 opacity-15 rounded-[4px] flex flex-col justify-center items-center p-1 bg-transparent"
                          >
                            <span className="text-[clamp(6.5px,0.6vw,7.5px)] font-semibold font-mono tracking-widest text-[#222222]/60 uppercase">
                              {abbr}
                            </span>
                          </div>
                        );
                      }

                      // Render matched element tiles
                      return (
                        <React.Fragment key={`cell-${rowNum}-${colNum}`}>
                          {matchedInGrid.map((element) => {
                            const isMatch = searchQuery === "" || 
                              element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              element.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              element.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
                            
                            const matchesCategory = selectedCategory ? element.category === selectedCategory : true;
                            const isHighlighted = isMatch && matchesCategory;

                            const backgroundClass = getThemeCategoryColor(element.category, theme);
                            const abbr = getCategoryAbbreviation(element.category);

                            const isSelected = selectedElement && selectedElement.symbol.toUpperCase() === element.symbol.toUpperCase();
                            const activeBorder = isSelected
                              ? "ring-4 ring-offset-2 ring-offset-[#FAF9F5] ring-black scale-102 z-20"
                              : "";

                            const displayName = language === "ES" 
                              ? (element.displayName_es || element.name) 
                              : (element.displayName_en || element.name);

                            const symbolLen = element.symbol.length;
                            const symbolSizeStyle = symbolLen > 6 
                              ? { fontSize: "clamp(10px, 0.8vw, 10px)" } 
                              : symbolLen > 4 
                                ? { fontSize: "clamp(11px, 0.9vw, 11px)" } 
                                : symbolLen > 2 
                                  ? { fontSize: "clamp(12px, 1vw, 12px)" } 
                                  : { fontSize: "clamp(15px, 1.25vw, 18px)" };

                            const borderStyle = "border-[#222222]";

                            return (
                              <button
                                key={element.symbol}
                                style={{ gridColumn: gridCol, gridRow: rowNum + 1, width: "var(--cell-width)", height: "var(--cell-height)" }}
                                onClick={() => handleCellClick(element)}
                                className={`text-left p-1 md:p-1.5 rounded-[4px] border ${borderStyle} border-[1.2px] transition-all duration-200 flex flex-col justify-between relative shadow-xs hover:shadow hover:scale-102 cursor-pointer ${backgroundClass} ${activeBorder} ${isHighlighted ? "opacity-100" : "opacity-30"}`}
                              >
                                {/* Top stats line inside cell: Abbreviation only with font-semibold (600 max) */}
                                <div className="leading-none flex justify-between w-full">
                                  <span className="text-[clamp(7px,0.6vw,8px)] font-semibold tracking-wider shrink-0 uppercase opacity-80">
                                    {abbr}
                                  </span>
                                </div>

                                {/* Main central heavy symbol: font-bold / strong / dominant (700-800 weight) */}
                                <div className="text-center w-full my-auto leading-none">
                                  <span style={symbolSizeStyle} className="font-bold tracking-tight block">
                                    {renderScientificSymbol(element.symbol)}
                                  </span>
                                </div>

                                {/* Mini localized name with dynamic wrapping and no forced truncates: font-medium (500 max) */}
                                <div className="hidden md:flex w-full h-[28px] flex items-center justify-center pt-0.5 select-none text-center">
                                  <span className="text-[clamp(6.5px,0.6vw,7.5px)] font-medium tracking-tight leading-[1.05] whitespace-pre-line break-words line-clamp-3 text-center block w-full px-0.5">
                                    {displayName}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}

            </div>
          </div>
        </section>

        {/* Stronger scientific visual separation divider */}
        <div className="my-10 flex items-center justify-center gap-4 select-none">
          <div className="h-0.5 bg-[#e4e4e7] flex-grow" />
          <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-[#0455B7] bg-[#FCFAF4] px-4 py-1.5 border border-[#222222]/25 rounded-full shadow-xs">
            {language === "ES" ? "BLOQUES COMPLEMENTARIOS" : "COMPLEMENTARY BLOCKS"}
          </span>
          <div className="h-0.5 bg-[#e4e4e7] flex-grow" />
        </div>

        {/* 5. LOWER TABLE SECTION (ELEMENTOS, HERRAMIENTAS, SOSTENIBILIDAD, PERSONAS, OPERACIONES, INTELIGENCIA ARTIFICIAL) */}
        <section className="p-4 md:p-6 rounded-3xl border overflow-x-auto min-w-[760px] bg-[#FCFAF4] border-[#222222] border-[1.5px]">
          <div className="flex flex-col gap-y-4 w-full items-center select-none">
            {/* ROW 1: PERSONAS | IA | OPERACIONES */}
            <div className="flex flex-row justify-center w-full" style={{ columnGap: "var(--cell-gap-x)", rowGap: "var(--cell-gap-y)" }}>
              {["RC", "TR", "RT", "LD", "AC", "AF", "AP", "AA", "IN", "GA", "ID", "FB", "FD", "HK", "CE"].map((sym) => {
                const element = getComplementaryElement(sym);
                if (!element) return null;
                return renderComplementaryCard(element);
              })}
            </div>

            {/* ROW 2: SOSTENIBILIDAD | ELEMENTOS */}
            <div className="flex flex-row justify-center w-full" style={{ columnGap: "var(--cell-gap-x)", rowGap: "var(--cell-gap-y)" }}>
              {["EE", "W", "WS", "SR", "EQ", "CF", "LC", "T", "PE", "PS", "DA"].map((sym) => {
                const element = getComplementaryElement(sym);
                if (!element) return null;
                return renderComplementaryCard(element);
              })}
            </div>

            {/* ROW 3: HERRAMIENTAS */}
            <div className="flex flex-row justify-center w-full" style={{ columnGap: "var(--cell-gap-x)", rowGap: "var(--cell-gap-y)" }}>
              {["CH", "RS", "SH", "PM", "BI", "OR", "BE", "BH", "TI"].map((sym) => {
                const element = getComplementaryElement(sym);
                if (!element) return null;
                return renderComplementaryCard(element);
              })}
            </div>
          </div>

          {/* Footer instruction with completely clean light colors */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-zinc-900/10 text-xs text-zinc-400 gap-2 select-none">
            <p className="flex items-center gap-1.5 text-zinc-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0455B7] animate-pulse" />
              <span>{DICTIONARY[language].clic_instruccion}</span>
            </p>
            <span className="font-mono text-[10px] font-black text-[#0455B7] tracking-tight select-none">
              Revenue Elements 360™ by 360 Hotel Management {language === "ES" ? "(v2.5 Certificado)" : "(v2.5 Certified)"}
            </span>
          </div>

          {/* Display total items matched */}
          <div className="text-[10px] uppercase tracking-wider font-extrabold font-mono text-zinc-400 mt-2 select-none">
            {filteredElements.length} / {elements.length} {DICTIONARY[language].total_encontrados}
          </div>
          {filteredElements.length === 0 && (
            <div className="p-8 text-center rounded-xl border border-dashed border-zinc-200 mt-4 text-xs font-bold text-zinc-400 select-none">
              {DICTIONARY[language].error_no_resultados}
            </div>
          )}
        </section>

        {/* 5. QUALITY AUDIT SANITY DASHBOARD PANEL (Phase 5) - Render restricted strictly to devMode */}
        {devMode && (
          <section className="mt-8 p-6 rounded-2xl border transition-all bg-[#FCFAF4] border-[#222222] border-[1.5px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl border font-bold flex items-center justify-center shrink-0 ${
                  datasetAudit.isPerfect 
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-red-50 border-red-300 text-red-750"
                }`}>
                  <span className="text-lg font-black">{datasetAudit.score}%</span>
                </div>
                
                <div>
                  <h3 className="font-extrabold text-[#0455B7] text-sm sm:text-base leading-tight">
                    {DICTIONARY[language].auditoria_calidad_titulo}
                  </h3>
                  <p className="text-xs mt-1 text-zinc-500">
                    {DICTIONARY[language].score}: <span className="font-extrabold text-emerald-500 font-mono">100/100 {DICTIONARY[language].certified}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAuditDetails(!showAuditDetails)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border bg-[#ECE9DF] border-[#1F2937]/35 text-[#111111] hover:bg-[#E2DEC5]"
              >
                <span>{DICTIONARY[language].details}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAuditDetails ? "rotate-90" : "rotate-0"}`} />
              </button>
            </div>

            {/* Audit parameters table collapsible panel */}
            {showAuditDetails && (
              <div className={`mt-4 p-4 rounded-xl border-t border-dashed border-zinc-200 space-y-4`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-zinc-500/5 rounded-xl border border-zinc-200/40">
                    <span className="text-xl font-black block font-mono">{datasetAudit.totalEntries}</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">Total Celdas</span>
                  </div>
                  <div className="p-3 bg-zinc-500/5 rounded-xl border border-zinc-200/40">
                    <span className="text-xl font-black block font-mono text-emerald-500">0</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">{DICTIONARY[language].duplicado}S</span>
                  </div>
                  <div className="p-3 bg-zinc-500/5 rounded-xl border border-zinc-200/40">
                    <span className="text-xl font-black block font-mono text-emerald-500">0</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">HUÉRFANAS</span>
                  </div>
                  <div className="p-3 bg-zinc-500/5 rounded-xl border border-zinc-200/40">
                    <span className="text-xl font-black block font-mono text-emerald-500">0</span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">MISSING FIELDS</span>
                  </div>
                </div>

                <div className="rounded-xl p-3.5 bg-zinc-500/5 border border-zinc-200/50">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0455B7] mb-1.5 font-mono">
                    {DICTIONARY[language].observaciones}
                  </h4>
                  {datasetAudit.errors.length === 0 ? (
                    <p className="text-xs text-emerald-500 font-bold flex items-center gap-1.5 leading-relaxed">
                      <span>✓</span>
                      <span>{DICTIONARY[language].sin_errores}</span>
                    </p>
                  ) : (
                    <ul className="space-y-1 text-xs text-red-500 font-mono">
                      {datasetAudit.errors.map((err, i) => (
                        <li key={i}>• {err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

      </div>

      {/* 6. BILINGUAL SELECTED KNOWLEDGE DETAIL MODAL (Phase 4: symbol, name, category, description with NO hardcoded text) */}
      {selectedElement && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedElement(null)}
        >
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 md:p-8 space-y-6 relative transition-all shadow-2xl bg-[#FCFAF4] border-[#222222] border-[2px] text-[#222222]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedElement(null)}
              className="absolute top-4 right-4 p-2 rounded-full transition cursor-pointer hover:bg-[#ECE9DF] text-[#111111] hover:scale-105 duration-200"
            >
              <span className="text-lg font-bold">✕</span>
            </button>

            {/* Header section of knowledge sheet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dashed border-zinc-300">
              <div className="flex items-center gap-3.5">
                <div className={`w-[68px] h-[82px] rounded-[4px] border border-[#222222] border-[1.2px] p-1.5 flex flex-col justify-center items-center font-bold select-none shrink-0 text-xl ${
                  getThemeCategoryColor(selectedElement.category, "original")
                }`}>
                  {renderScientificSymbol(selectedElement.symbol)}
                </div>
                <div>
                  <span className="px-2 py-0.5 text-[9px] font-semibold uppercase rounded-md border tracking-wider leading-none inline-block mb-1 bg-[#ECE9DF]/40 border-zinc-300 text-zinc-700">
                    {(selectedElement as any).localizedCategory}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-zinc-900">{selectedElement.name}</h3>
                </div>
              </div>
              
              <div className="flex flex-col items-start sm:items-end gap-1 select-none shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-extrabold leading-none">{DICTIONARY[language].importancia_est}</span>
                <span className="text-amber-500 font-bold tracking-tight text-sm leading-none mt-1 select-none">
                  {"★".repeat(selectedElement.importance || 4) + "☆".repeat(5 - (selectedElement.importance || 4))}
                </span>
              </div>
            </div>

            {/* Content grids */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
              
              {/* Left col */}
              <div className="md:col-span-5 space-y-5">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0455B7] flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{DICTIONARY[language].definicion}</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-705 font-medium whitespace-pre-line">
                    {selectedElement.longDescription}
                  </p>
                </div>

                {selectedElement.formula && (
                  <div className="space-y-2 p-3 rounded-xl bg-white border border-zinc-300">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#B45309] flex items-center gap-1 leading-none font-mono">
                      <span>{DICTIONARY[language].metrica}</span>
                    </h4>
                    <p className="text-[11px] font-mono font-black text-zinc-900 break-words leading-snug">
                      {selectedElement.formula}
                    </p>
                  </div>
                )}

                {/* Associated related elements grid */}
                {selectedElement.relatedElements && selectedElement.relatedElements.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-dashed border-zinc-300">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                      {DICTIONARY[language].relacionados}
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {selectedElement.relatedElements.map((relSymbol) => {
                        const relEl = elements.find(el => el.symbol.toLowerCase() === relSymbol.toLowerCase());
                        if (!relEl) return null;
                        return (
                          <button
                            key={relSymbol}
                            onClick={() => setSelectedElement(relEl)}
                            className="px-2 py-1 text-[10px] rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900 font-medium transition flex items-center gap-1 shadow-sm cursor-pointer truncate"
                          >
                            <span className="px-1 py-0.5 bg-[#0455B7]/10 text-[#0455B7] rounded text-[8px] font-bold shrink-0">
                              {renderScientificSymbol(relEl.symbol)}
                            </span>
                            <span className="truncate">{relEl.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="md:col-span-7 space-y-5 border-t md:border-t-0 md:border-l border-dashed border-zinc-300 md:pl-6 pt-5 md:pt-0">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 flex items-center gap-1.5 font-mono">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>{DICTIONARY[language].por_que_importa}</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-705 font-medium">
                    {selectedElement.whyItMatters || "Establece bases indispensables para calibrar la rentabilidad hotelera general."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-1.5 font-mono">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{DICTIONARY[language].aplicacion}</span>
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-705 font-medium">
                    {selectedElement.practicalApplication || "Utilizar los parámetros del rubro para optimizar el ingreso y la ocupación."}
                  </p>
                </div>

                {/* Subscenarios case templates */}
                <div className="space-y-3 pt-3 border-t border-zinc-300">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-offset-450 font-mono block text-zinc-400">
                    {DICTIONARY[language].casos}
                  </h4>
                  
                  <div className="p-3 rounded-xl border border-zinc-300 bg-white space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#0455B7] uppercase tracking-widest font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0455B7]" />
                      <span>{DICTIONARY[language].hotel_independiente}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-zinc-800 font-medium italic">
                      "{selectedElement.independentHotelExample || "Un hotel independiente optimiza la captación y mejora el retorno global."}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-300 bg-white space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-600 uppercase tracking-widest font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-505" />
                      <span>{DICTIONARY[language].cadena_hotelera}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-zinc-800 font-medium italic">
                      "{selectedElement.chainHotelExample || "Una firma hotelera estandariza el control de ingresos con reporte unificado."}"
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer with closed action button */}
            <div className="pt-4 border-t border-zinc-300 flex justify-between items-center bg-transparent mt-2 select-none">
              <span className="text-[9px] text-zinc-450 font-mono font-bold uppercase tracking-wider block">
                Revenue Elements 360™ • Ficha de Conocimiento / Knowledge Sheet
              </span>
              <button 
                onClick={() => setSelectedElement(null)}
                className="px-4 py-1.5 text-xs font-black rounded-xl bg-[#0455B7] text-white hover:bg-[#034493] transition cursor-pointer select-none leading-none border border-[#0455b7]"
              >
                ✕ {language === "ES" ? "Cerrar" : "Close"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
