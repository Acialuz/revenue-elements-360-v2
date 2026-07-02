import * as fs from "fs";
import * as path from "path";

// Dynamically load compiled elements/formulas if needed, or read educationalData.ts as text to parse
const masterDataPath = "src/master_dataset.json";
const masterData = JSON.parse(fs.readFileSync(masterDataPath, "utf8"));

// Read and split Markdown files
const esContent = fs.readFileSync("src/MD_ES.md", "utf8");
const esLines = esContent.split("\n");

const enContent = fs.readFileSync("src/MD_EN.md", "utf8");
const enLines = enContent.split("\n");

// Parse ES markdown sections
const esStarts: number[] = [];
for (let i = 0; i < esLines.length; i++) {
  const line = esLines[i].trim();
  if (line.startsWith("### **") || /^Z\d\s+\*\*/.test(line)) {
    esStarts.push(i);
  }
}

const esSections: { name: string; rawText: string; startLine: number }[] = [];
for (let k = 0; k < esStarts.length; k++) {
  const start = esStarts[k];
  const end = k + 1 < esStarts.length ? esStarts[k + 1] : esLines.length;
  const sectionLines = esLines.slice(start, end);
  let name = sectionLines[0].trim().replace(/^###\s+\*\*/, "").replace(/\*\*$/, "").trim();
  if (/^Z\d\s+\*\*/.test(name)) {
    name = name.replace(/^Z\d\s+\*\*/, "").replace(/\*\*$/, "").trim();
  }
  esSections.push({ name, rawText: sectionLines.join("\n"), startLine: start + 1 });
}

// Parse EN markdown sections
const enStarts: number[] = [];
for (let i = 0; i < enLines.length; i++) {
  const line = enLines[i].trim();
  if (line.startsWith("# **")) {
    const titleClean = line.replace(/#\s+\*\*/g, "").replace(/\*\*/g, "").trim();
    const categories = [
      "FUNDAMENTOS REVENUE EN", "CHARACTERISTICS", "TECHNOLOGY", "FUTURE DISCOVERIES",
      "HORIZONS", "KPI INDICATORS", "RATES", "MARKETING", "COMPETITORS", "RESTRICTIONS",
      "POSITIONING", "DISTRIBUTION CHANNELS", "SEGMENTS", "HOTEL CHAINS", "PEOPLE",
      "ARTIFICIAL INTELLIGENCE", "OPERATIONS", "SUSTAINABILITY", "ELEMENTS", "TOOLS"
    ];
    if (!categories.includes(titleClean)) {
      enStarts.push(i);
    }
  }
}

const enSections: { name: string; rawText: string; startLine: number }[] = [];
for (let k = 0; k < enStarts.length; k++) {
  const start = enStarts[k];
  const end = k + 1 < enStarts.length ? enStarts[k + 1] : enLines.length;
  const sectionLines = enLines.slice(start, end);
  let name = sectionLines[0].trim().replace(/^#\s+\*\*/, "").replace(/\*\*$/, "").trim();
  enSections.push({ name, rawText: sectionLines.join("\n"), startLine: start + 1 });
}

// -------------------------------------------------------------
// HELPER PARSING FUNCTIONS
// -------------------------------------------------------------
function cleanContent(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^[\s*\-"']+|[\s*\-"']+$/g, "").trim();
  return cleaned;
}

function parseFieldsEs(rawText: string) {
  const lines = rawText.split("\n");
  let definition = "";
  let relatedElements = "";
  let formula = "";
  let whyItMatters = "";
  let practicalApplication = "";
  let independentHotel = "";
  let chainHotel = "";

  let currentField = "";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (/^#[^#]/.test(line)) continue;

    if (line.includes("Definición Teórica") || line.includes("efinición Teórica")) {
      currentField = "definition";
    } else if (line.includes("Elementos Relacionados")) {
      currentField = "related";
    } else if (line.includes("Métrica y Ecuación") || line.includes("Métrica y Fórmula") || line.includes("Métrica y Ecuacion")) {
      currentField = "formula";
    } else if (line.includes("¿Por qué importa en Revenue?")) {
      currentField = "why";
    } else if (line.includes("Aplicación Práctica")) {
      currentField = "practical";
    } else if (line.includes("Casos de Implementación de Campo")) {
      currentField = "cases";
    } else {
      if (currentField === "definition") {
        definition += (definition ? " " : "") + line;
      } else if (currentField === "related") {
        relatedElements += (relatedElements ? "\n" : "") + line;
      } else if (currentField === "formula") {
        formula += (formula ? " " : "") + line;
      } else if (currentField === "why") {
        whyItMatters += (whyItMatters ? " " : "") + line;
      } else if (currentField === "practical") {
        practicalApplication += (practicalApplication ? " " : "") + line;
      } else if (currentField === "cases") {
        if (line.includes("Hotel Independiente / Boutique") || line.startsWith("**Hotel Independiente / Boutique**")) {
          currentField = "independent";
        } else if (line.includes("Cadena Hotelera Multinacional") || line.startsWith("**Cadena Hotelera Multinacional**")) {
          currentField = "chain";
        }
      } else if (currentField === "independent") {
        if (line.includes("Cadena Hotelera Multinacional") || line.startsWith("**Cadena Hotelera Multinacional**")) {
          currentField = "chain";
        } else {
          independentHotel += (independentHotel ? " " : "") + line;
        }
      } else if (currentField === "chain") {
        chainHotel += (chainHotel ? " " : "") + line;
      }
    }
  }

  return {
    definition: cleanContent(definition),
    relatedElements: relatedElements.trim(),
    formula: cleanContent(formula),
    whyItMatters: cleanContent(whyItMatters),
    practicalApplication: cleanContent(practicalApplication),
    independentHotel: cleanContent(independentHotel),
    chainHotel: cleanContent(chainHotel)
  };
}

function parseFieldsEn(rawText: string) {
  const lines = rawText.split("\n");
  let definition = "";
  let relatedElements = "";
  let formula = "";
  let whyItMatters = "";
  let practicalApplication = "";
  let independentHotel = "";
  let chainHotel = "";

  let currentField = "";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line === "---") continue;
    if (/^#[^#]/.test(line)) continue;

    if (line.includes("Definition") || line.includes("definition")) {
      currentField = "definition";
    } else if (line.includes("Related Elements")) {
      currentField = "related";
    } else if (line.includes("Metric & Formula") || line.includes("Metric and Formula") || line.includes("Metric & Equation")) {
      currentField = "formula";
    } else if (line.includes("Why It Matters") || line.includes("Why it Matters")) {
      currentField = "why";
    } else if (line.includes("Practical Application")) {
      currentField = "practical";
    } else if (line.includes("Real-World Use Cases")) {
      currentField = "cases";
    } else {
      if (currentField === "definition") {
        definition += (definition ? " " : "") + line;
      } else if (currentField === "related") {
        relatedElements += (relatedElements ? "\n" : "") + line;
      } else if (currentField === "formula") {
        formula += (formula ? " " : "") + line;
      } else if (currentField === "why") {
        whyItMatters += (whyItMatters ? " " : "") + line;
      } else if (currentField === "practical") {
        practicalApplication += (practicalApplication ? " " : "") + line;
      } else if (currentField === "cases") {
        if (line.includes("Independent / Boutique Hotel") || line.startsWith("**Independent / Boutique Hotel**")) {
          currentField = "independent";
        } else if (line.includes("International Hotel Chain") || line.startsWith("**International Hotel Chain**") || line.includes("International Hotel Chain")) {
          currentField = "chain";
        }
      } else if (currentField === "independent") {
        if (line.includes("International Hotel Chain") || line.startsWith("**International Hotel Chain**") || line.includes("International Hotel Chain")) {
          currentField = "chain";
        } else {
          independentHotel += (independentHotel ? " " : "") + line;
        }
      } else if (currentField === "chain") {
        chainHotel += (chainHotel ? " " : "") + line;
      }
    }
  }

  return {
    definition: cleanContent(definition),
    relatedElements: relatedElements.trim(),
    formula: cleanContent(formula),
    whyItMatters: cleanContent(whyItMatters),
    practicalApplication: cleanContent(practicalApplication),
    independentHotel: cleanContent(independentHotel),
    chainHotel: cleanContent(chainHotel)
  };
}

function cleanName(n: string): string {
  let cleaned = n.toLowerCase()
          .replace(/[()]/g, "")
          .replace(/\s+/g, " ")
          .trim();
  cleaned = cleaned.replace(/^z\d\s+/, "");
  return cleaned;
}

// -------------------------------------------------------------
// AUDIT RUNS
// -------------------------------------------------------------
const correctElements: string[] = [];
const differences: any[] = [];
const errors: any[] = [];

// 1. Coverage Check
if (masterData.length !== 125) {
  errors.push({
    file: "src/master_dataset.json",
    severity: "CRITICAL",
    msg: `Dataset length is ${masterData.length} instead of 125.`
  });
}

const symbols = masterData.map((e: any) => e.symbol.toUpperCase());
const uniqueSymbols = new Set(symbols);
if (uniqueSymbols.size !== symbols.length) {
  errors.push({
    file: "src/master_dataset.json",
    severity: "CRITICAL",
    msg: "Found duplicate symbols in master dataset.",
    details: symbols.filter((item, index) => symbols.indexOf(item) !== index)
  });
}

// 2. Exact Field Synchronization & Verification
// Compile maps of valid symbols to verify related entries
const validSymbols = new Set(symbols);

for (let i = 0; i < masterData.length; i++) {
  const el = masterData[i];
  const symbol = el.symbol.toUpperCase();
  const nameEs = el.name_es;
  const nameEn = el.name_en;

  // Locate matching markdown sections dynamically based on symbol and name
  let esIdx = -1;
  if (["Z1", "Z2", "Z3", "Z4"].includes(symbol)) {
    const zNum = parseInt(symbol.slice(1));
    esIdx = 18 + (zNum - 1);
  } else {
    esIdx = esSections.findIndex(s => cleanName(s.name) === cleanName(nameEs));
  }

  const esSection = esSections[esIdx];
  const enSection = enSections[esIdx];

  if (!esSection) {
    errors.push({
      file: "src/MD_ES.md",
      severity: "HIGH",
      msg: `No ES Markdown section for index ${i} (${symbol})`
    });
    continue;
  }
  if (!enSection) {
    errors.push({
      file: "src/MD_EN.md",
      severity: "HIGH",
      msg: `No EN Markdown section for index ${i} (${symbol})`
    });
    continue;
  }

  // Compare ES and EN names from MD vs JSON
  if (cleanName(esSection.name) !== cleanName(nameEs)) {
    differences.push({
      file: "src/master_dataset.json",
      line: i * 8, // rough line
      severity: "MEDIUM",
      msg: `ES Name mismatch for [${symbol}]: JSON="${nameEs}" vs Markdown="${esSection.name}"`,
      sol: `Set JSON name_es to "${esSection.name}"`
    });
  }

  if (cleanName(enSection.name) !== cleanName(nameEn)) {
    differences.push({
      file: "src/master_dataset.json",
      line: i * 8,
      severity: "MEDIUM",
      msg: `EN Name mismatch for [${symbol}]: JSON="${nameEn}" vs Markdown="${enSection.name}"`,
      sol: `Set JSON name_en to "${enSection.name}"`
    });
  }

  // Parse fields
  const esFields = parseFieldsEs(esSection.rawText);
  const enFields = parseFieldsEn(enSection.rawText);

  // Compare JSON descriptions with MD definitions
  if (cleanName(esFields.definition) !== cleanName(el.description_es)) {
    differences.push({
      file: "src/master_dataset.json",
      severity: "LOW",
      msg: `ES Description mismatch for [${symbol}]. JSON has some minor wording or spacing diff.`
    });
  }
  if (cleanName(enFields.definition) !== cleanName(el.description_en)) {
    differences.push({
      file: "src/master_dataset.json",
      severity: "LOW",
      msg: `EN Description mismatch for [${symbol}]. JSON has some minor wording or spacing diff.`
    });
  }

  // Audit specific translations
  // Spanish keywords in English content
  const spanishKeywords = [
    "Habitaciones", "Ingresos", "Ocupación", "Precio", "Disponibles", "Vendidas", "Clientes", "Estancia",
    "Fórmula", "Definición", "Relacionados", "Importa", "Aplicación", "Caso", "Cadena"
  ];

  for (const kw of spanishKeywords) {
    const rx = new RegExp(`\\b${kw}\\b`, "i");
    // Ignore uppercase abbreviations like "OC", "PR", "CE" if they match
    if (rx.test(enFields.definition)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Spanish word "${kw}" leaked in [${symbol}] EN Definition: "${enFields.definition.substring(0, 40)}..."`,
        sol: "Translate text fully into English."
      });
    }
    if (rx.test(enFields.formula)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "CRITICAL",
        msg: `Spanish term "${kw}" leaked in [${symbol}] EN Formula: "${enFields.formula}"`,
        sol: "Translate formula variables to standard English hotel terms."
      });
    }
    if (rx.test(enFields.whyItMatters)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Spanish word "${kw}" leaked in [${symbol}] EN WhyItMatters.`,
        sol: "Translate fully into English."
      });
    }
    if (rx.test(enFields.practicalApplication)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Spanish word "${kw}" leaked in [${symbol}] EN PracticalApplication.`,
        sol: "Translate fully into English."
      });
    }
    if (rx.test(enFields.independentHotel)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Spanish word "${kw}" leaked in [${symbol}] EN Independent Hotel Case.`,
        sol: "Translate fully into English."
      });
    }
    if (rx.test(enFields.chainHotel)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Spanish word "${kw}" leaked in [${symbol}] EN Chain Hotel Case.`,
        sol: "Translate fully into English."
      });
    }
  }

  // Check English words leaking into Spanish
  const englishKeywords = [
    "Rooms", "Revenue", "Occupancy", "Rate", "Available", "Sold", "Guests", "Length of Stay", "Definition", "Formula"
  ];
  for (const kw of englishKeywords) {
    const rx = new RegExp(`\\b${kw}\\b`, "i");
    if (rx.test(esFields.definition) && kw !== "Rate" && kw !== "Revenue" && kw !== "Formula") {
      errors.push({
        file: "src/MD_ES.md",
        line: esSection.startLine,
        severity: "MEDIUM",
        msg: `English term "${kw}" leaked in [${symbol}] ES Definition: "${esFields.definition}"`,
        sol: "Translate terms to official Spanish hotel terminology."
      });
    }
  }

  // 3. Related Elements Validation
  const relSymbolsEs: string[] = [];
  const relRegex = /\*\*([a-zA-Z0-9]+)\*\*/g;
  let match;
  while ((match = relRegex.exec(esFields.relatedElements)) !== null) {
    relSymbolsEs.push(match[1].toUpperCase());
  }

  for (const sym of relSymbolsEs) {
    if (!validSymbols.has(sym)) {
      errors.push({
        file: "src/MD_ES.md",
        line: esSection.startLine,
        severity: "HIGH",
        msg: `Related Element symbol "${sym}" in [${symbol}] ES is invalid / does not exist.`,
        sol: `Verify the spelling and change to a valid 360 Element symbol.`
      });
    }
  }

  const relSymbolsEn: string[] = [];
  // EN markdown might not have asterisks, or might just list them. Let's check how they look
  const lines = enSection.rawText.split("\n");
  let underRel = false;
  for (const ln of lines) {
    const l = ln.trim();
    if (l.includes("Related Elements")) {
      underRel = true;
    } else if (underRel && (l.includes("Definition") || l.includes("Why It Matters") || l.startsWith("---") || l.startsWith("#"))) {
      underRel = false;
    } else if (underRel && l) {
      // It's a related element line. Look for symbol codes at the beginning of words
      // e.g. PrProduct, RMRevenue Management, or space-separated "AF AI Forecasting", "PM Property Management System"
      const matchSpace = l.match(/^([a-zA-Z0-9]{1,3})\s+[a-zA-Z]/);
      const matchSym = l.match(/^([a-zA-Z0-9]{1,3})[A-Z]/);
      if (matchSpace) {
        relSymbolsEn.push(matchSpace[1].toUpperCase());
      } else if (matchSym) {
        relSymbolsEn.push(matchSym[1].toUpperCase());
      } else {
        // try finding any capital letter pairs
        const matchPair = l.match(/^([a-zA-Z0-9]{1,3})\s+\*\*/);
        if (matchPair) {
          relSymbolsEn.push(matchPair[1].toUpperCase());
        }
      }
    }
  }

  for (const sym of relSymbolsEn) {
    if (!validSymbols.has(sym)) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "MEDIUM",
        msg: `Related Element symbol "${sym}" parsed in [${symbol}] EN is invalid or unmatched.`,
        sol: `Ensure code spacing exists between symbol and name.`
      });
    }
  }

  // 4. Specific Z1-Z4 Checks
  const isZ = ["Z1", "Z2", "Z3", "Z4"].includes(symbol);
  if (isZ) {
    // Check Spanish placeholder correctness
    if (nameEs !== "A Confirmar" && nameEs !== "Z1 Reserved Space" && nameEs !== "Reserved Space") {
      errors.push({
        file: "src/master_dataset.json",
        severity: "MEDIUM",
        msg: `Z placeholder [${symbol}] name_es is "${nameEs}" instead of "A Confirmar".`
      });
    }
    // Check EN correctness
    if (!nameEn.toLowerCase().includes("reserved space")) {
      errors.push({
        file: "src/master_dataset.json",
        severity: "MEDIUM",
        msg: `Z placeholder [${symbol}] name_en is "${nameEn}" instead of "Reserved Space".`
      });
    }

    // Check specific translations in fields
    let expectedEsDef = "";
    let expectedEnDef = "";
    if (symbol === "Z1") {
      expectedEsDef = "Espacio reservado para futuros conceptos que puedan transformar la disciplina del Revenue Management.";
      expectedEnDef = "A reserved space for future concepts that may transform the discipline of Revenue Management.";
    } else if (symbol === "Z2") {
      expectedEsDef = "Elemento reservado para futuras innovaciones todavía no consolidadas dentro del sector hotelero.";
      expectedEnDef = "A reserved element for future innovations that have not yet become established within the hospitality industry.";
    } else if (symbol === "Z3") {
      expectedEsDef = "Espacio abierto para nuevas metodologías, tecnologías o modelos de negocio aún por descubrir.";
      expectedEnDef = "An open space reserved for new methodologies, technologies, or business models yet to be discovered.";
    } else if (symbol === "Z4") {
      expectedEsDef = "Elemento reservado para futuras generaciones de Revenue Management.";
      expectedEnDef = "A reserved element for future generations of Revenue Management.";
    }

    if (esFields.definition !== expectedEsDef) {
      differences.push({
        file: "src/MD_ES.md",
        line: esSection.startLine,
        severity: "LOW",
        msg: `Z placeholder [${symbol}] ES definition does not match official placeholder text.`
      });
    }
    if (enFields.definition !== expectedEnDef) {
      differences.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "LOW",
        msg: `Z placeholder [${symbol}] EN definition does not match official placeholder text.`
      });
    }

    // Check for "To Be Confirmed" or "A Confirmar" or "No available" in details
    const textToCheckEs = esSection.rawText.toLowerCase();
    const textToCheckEn = enSection.rawText.toLowerCase();

    if (textToCheckEn.includes("to be confirmed")) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Prohibited text "To Be Confirmed" found in Z placeholder [${symbol}] EN section.`,
        sol: "Replace with 'Reserved Space' and 'Not available.'."
      });
    }
    if (textToCheckEs.includes("a confirmar") && !esSection.rawText.startsWith("Z")) {
      errors.push({
        file: "src/MD_ES.md",
        line: esSection.startLine,
        severity: "HIGH",
        msg: `Prohibited text "A Confirmar" found inside Z placeholder [${symbol}] ES details.`,
        sol: "Replace with 'Espacio reservado...' and 'No disponible.'."
      });
    }
    if (textToCheckEn.includes("no available") && !textToCheckEn.includes("not available")) {
      errors.push({
        file: "src/MD_EN.md",
        line: enSection.startLine,
        severity: "HIGH",
        msg: `Prohibited text "No available" (without T) found in Z placeholder [${symbol}] EN section.`,
        sol: "Use 'Not available.' instead."
      });
    }
  }

  // 5. General consistency checks: Double spaces, corrupt characters, trailing spaces, empty fields
  const fieldsToCheck = [
    { text: esFields.definition, name: "ES Definition" },
    { text: esFields.whyItMatters, name: "ES WhyItMatters" },
    { text: esFields.practicalApplication, name: "ES PracticalApplication" },
    { text: esFields.independentHotel, name: "ES IndependentHotel" },
    { text: esFields.chainHotel, name: "ES ChainHotel" },
    { text: enFields.definition, name: "EN Definition" },
    { text: enFields.whyItMatters, name: "EN WhyItMatters" },
    { text: enFields.practicalApplication, name: "EN PracticalApplication" },
    { text: enFields.independentHotel, name: "EN IndependentHotel" },
    { text: enFields.chainHotel, name: "EN ChainHotel" },
  ];

  for (const fd of fieldsToCheck) {
    if (!isZ && !fd.text) {
      errors.push({
        file: fd.name.startsWith("ES") ? "src/MD_ES.md" : "src/MD_EN.md",
        severity: "HIGH",
        msg: `Empty field "${fd.name}" for element [${symbol}].`,
        sol: "Populate field with official text."
      });
    }
    if (fd.text.includes("  ")) {
      differences.push({
        file: fd.name.startsWith("ES") ? "src/MD_ES.md" : "src/MD_EN.md",
        severity: "LOW",
        msg: `Double spaces found in [${symbol}] "${fd.name}": "...${fd.text.substring(fd.text.indexOf("  ") - 10, fd.text.indexOf("  ") + 10)}..."`
      });
    }
    if (/[\uFFFD]/.test(fd.text)) {
      errors.push({
        file: fd.name.startsWith("ES") ? "src/MD_ES.md" : "src/MD_EN.md",
        severity: "HIGH",
        msg: `Corrupt character (Replacement Character \\uFFFD) found in [${symbol}] "${fd.name}".`,
        sol: "Re-encode character to valid UTF-8."
      });
    }
    if (fd.text.includes("---")) {
      errors.push({
        file: fd.name.startsWith("ES") ? "src/MD_ES.md" : "src/MD_EN.md",
        severity: "MEDIUM",
        msg: `Residual markdown separator "---" leaked into field "${fd.name}" of [${symbol}].`,
        sol: "Remove divider from parsed content boundaries."
      });
    }
    if (fd.text.includes("<") && fd.text.includes(">") && !fd.text.includes("×")) {
      differences.push({
        file: fd.name.startsWith("ES") ? "src/MD_ES.md" : "src/MD_EN.md",
        severity: "MEDIUM",
        msg: `Potential raw HTML tag leaked into field "${fd.name}" of [${symbol}]: "${fd.text}"`
      });
    }
  }

  // If no critical errors or major differences for this symbol, count as correct
  const symbolErrors = errors.filter((e: any) => e.msg.includes(`[${symbol}]`));
  const symbolDiffs = differences.filter((d: any) => d.msg.includes(`[${symbol}]`));
  if (symbolErrors.length === 0 && symbolDiffs.length === 0) {
    correctElements.push(symbol);
  }
}

// -------------------------------------------------------------
// CHECK OF COMPILED FILE src/utils/educationalData.ts CONSISTENCY
// -------------------------------------------------------------
const eduDataRaw = fs.readFileSync("src/utils/educationalData.ts", "utf8");

// Check if educationalData.ts contains Spanish words inside SPECIALIZED_CONTENT_EN formulas or texts
const spanishKeywordsInEduEn = [
  "Habitaciones", "Ingresos", "Ocupación", "Disponibles", "Vendidas", "Estancia"
];
for (const kw of spanishKeywordsInEduEn) {
  // We scan lines containing FORMULAS or SPECIALIZED_CONTENT_EN lookup objects in educationalData.ts
  const lines = eduDataRaw.split("\n");
  let insideEnBlock = false;
  for (let idx = 0; idx < lines.length; idx++) {
    const ln = lines[idx];
    if (ln.includes("const FORMULAS_EN") || ln.includes("const SPECIALIZED_CONTENT_EN") || ln.includes("const CATEGORY_EDUCATIONAL_DETAILS_EN")) {
      insideEnBlock = true;
    } else if (insideEnBlock && (ln.includes("const FORMULAS_ES") || ln.includes("const SPECIALIZED_CONTENT") || ln.includes("const CATEGORY_EDUCATIONAL_DETAILS") || ln.includes("export function enrichElement") || ln.includes("const RELATIONSHIPS"))) {
      insideEnBlock = false;
    }
    if (insideEnBlock) {
      const rx = new RegExp(`\\b${kw}\\b`, "i");
      if (rx.test(ln)) {
        errors.push({
          file: "src/utils/educationalData.ts",
          line: idx + 1,
          severity: "CRITICAL",
          msg: `Spanish term "${kw}" leaked inside compiled educationalData.ts English block: "${ln.trim()}"`,
          sol: "Recompile educationalData.ts and ensure formulas/descriptions are fully translated."
        });
      }
    }
  }
}

// -------------------------------------------------------------
// PRINT SUMMARY AUDIT REPORT TO FILE
// -------------------------------------------------------------
let report = "";
report += `========================================\n`;
report += `  REVENUE ELEMENTS 360™ FORENSIC AUDIT  \n`;
report += `========================================\n`;
report += `Total elements audited: 125\n`;
report += `Perfectly correct elements: ${correctElements.length}\n`;
report += `Differences found: ${differences.length}\n`;
report += `Errors found: ${errors.length}\n`;
report += `========================================\n\n`;

if (errors.length > 0) {
  report += "--- ❌ ERRORS FOUND ---\n";
  errors.forEach((e, idx) => {
    report += `[${idx+1}] [${e.severity}] File: ${e.file}${e.line ? " at line " + e.line : ""}\n`;
    report += `    Message: ${e.msg}\n`;
    if (e.sol) report += `    Proposed Solution: ${e.sol}\n`;
    report += `\n`;
  });
} else {
  report += "✅ Zero high-severity errors found!\n";
}

if (differences.length > 0) {
  report += "\n--- ⚠ DIFFERENCES FOUND ---\n";
  differences.forEach((d, idx) => {
    report += `[${idx+1}] [${d.severity}] File: ${d.file}${d.line ? " at line " + d.line : ""}\n`;
    report += `    Message: ${d.msg}\n`;
    if (d.sol) report += `    Proposed Solution: ${d.sol}\n`;
    report += `\n`;
  });
} else {
  report += "✅ Zero differences found!\n";
}

fs.writeFileSync("src/forensic_audit_report.txt", report, "utf8");
console.log("Written audit report to src/forensic_audit_report.txt");
