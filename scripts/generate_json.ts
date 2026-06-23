import fs from "fs";
import { REVENUE_ELEMENTS, CATEGORIES } from "../src/data";
import { enrichElement } from "../src/utils/educationalData";

const enrichedElements = REVENUE_ELEMENTS.map(el => enrichElement(el));

// Ensure public directory exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

fs.writeFileSync("public/categories.json", JSON.stringify(CATEGORIES, null, 2));
fs.writeFileSync("public/elements.json", JSON.stringify(enrichedElements, null, 2));
fs.writeFileSync("public/data.json", JSON.stringify({ categories: CATEGORIES, elements: enrichedElements }, null, 2));

console.log("JSON files generated successfully in /public !");
