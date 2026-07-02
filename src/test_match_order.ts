import * as fs from "fs";

// Load master dataset
const masterData = JSON.parse(fs.readFileSync("src/master_dataset.json", "utf8"));

// Parsed ES names
const esContent = fs.readFileSync("src/MD_ES.md", "utf8");
const esLines = esContent.split("\n");
const esNames: string[] = [];
for (let i = 0; i < esLines.length; i++) {
  const line = esLines[i].trim();
  if (line.startsWith("### **")) {
    esNames.push(line.replace(/^###\s+\*\*/, "").replace(/\*\*$/, "").trim());
  } else if (/^Z\d\s+\*\*/.test(line)) {
    esNames.push(line.replace(/^Z\d\s+\*\*/, "").replace(/\*\*$/, "").trim());
  }
}

// Parsed EN names
const enContent = fs.readFileSync("src/MD_EN.md", "utf8");
const enLines = enContent.split("\n");
const enNames: string[] = [];
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
      enNames.push(titleClean);
    }
  }
}

console.log(`Master Dataset size: ${masterData.length}`);
console.log(`ES parsed size: ${esNames.length}`);
console.log(`EN parsed size: ${enNames.length}`);

console.log("\nSample comparison:");
for (let i = 0; i < masterData.length; i++) {
  const mdSymbol = masterData[i].symbol;
  const mdNameEs = masterData[i].name;
  const mdNameEn = masterData[i].name_en || masterData[i].nameEn || "";
  
  // print a subset
  if (i < 10 || (i >= 50 && i < 55) || i >= 120) {
    console.log(`Index ${i}:`);
    console.log(`  Master:  [${mdSymbol}] ${mdNameEs} / ${mdNameEn}`);
    console.log(`  MD_ES:   ${esNames[i]}`);
    console.log(`  MD_EN:   ${enNames[i]}`);
  }
}
