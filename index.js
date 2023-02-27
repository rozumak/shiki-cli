#!/usr/bin/env node

const fs = require("fs").promises;
const shiki = require("shiki");
const arg = require("arg");

const DEFAULT_THEME = "dark-plus";
const SUPPORTED_LANGUAGES = shiki.BUNDLED_LANGUAGES.map(
  (bundle) => bundle.id
).concat(shiki.BUNDLED_LANGUAGES.flatMap((bundle) => bundle.aliases || []));
const SUPPORTED_THEMES = shiki.BUNDLED_THEMES;

// Define the command-line interface
const args = arg({
  "--input": String,
  "--output": String,
  "--language": String,
  "--theme": String,
  "-i": "--input",
  "-o": "--output",
  "-t": "--theme",
  "-l": "--language",
});

async function main() {
  const inputFile = args["--input"];
  const outputFile = args["--output"];
  const language = args["--language"];
  const themeOption = args["--theme"];

  // Check required arguments
  if (!inputFile || !outputFile || !language) {
    console.error(
      "Usage: highlight --input [input file path] --output [output file path] --language [input file language]"
    );
    process.exit(1);
  }

  // Check language is supported
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    console.error(`Error: Unsupported language "${language}"`);
    console.error(`Supported languages: ${SUPPORTED_LANGUAGES.join(", ")}`);
    process.exit(1);
  }

  // Check theme is supported
  let theme = DEFAULT_THEME;

  if (themeOption) {
    if (!SUPPORTED_THEMES.includes(themeOption)) {
      console.error(`Error: Unsupported theme "${themeOption}"`);
      console.error(`Supported themes: ${SUPPORTED_THEMES.join(", ")}`);
      process.exit(1);
    }

    theme = themeOption;
  }

  // Read input file
  const input = await fs.readFile(inputFile, "utf-8");

  // Apply syntax highlighting using the shiki library
  const shikiHighlighter = await shiki.getHighlighter({ theme });
  const output = shikiHighlighter.codeToHtml(input, { lang: language });

  // Write highlighted code to output file
  await fs.writeFile(outputFile, output);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
