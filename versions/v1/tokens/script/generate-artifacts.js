import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

// ✅ Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Ensure `RAW_DIR` is correctly inside `script/raw/`
const RAW_DIR = resolve(__dirname, 'raw');

// ✅ Load tokens.json from `script/raw/`
const tokensPath = join(RAW_DIR, 'tokens.json');
const tokensData = JSON.parse(readFileSync(tokensPath, 'utf-8'));

// ✅ Define output directory inside the project's existing `src/generated-artifacts/`
const projectRoot = resolve(__dirname, '../'); // Adjust to point to the project root
const outputDir = join(projectRoot, 'src/generated-artifacts');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// ✅ Comment header for generated files (excluding `index.ts`)
const GENERATED_HEADER = `// ---------------------------------\n// DO NOT MODIFY, generated file\n// ---------------------------------\n\n`;

// ✅ Function to format token keys: Convert to lowercase & replace underscores with hyphens
const formatKey = (key) => key.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');

// ✅ Function to generate TypeScript files
const generateFile = (filename, content, excludeHeader = false) => {
  const filePath = join(outputDir, `${filename}.gen.ts`);
  const fileContent = excludeHeader ? content : `${GENERATED_HEADER}${content}`;
  writeFileSync(filePath, fileContent);
  console.log(`✅ Generated: ${filePath}`);
};

// ✅ Extract tokens by type
const colors = {};
const typography = {};
const spacing = {};

const extractTokens = (obj, prefix = '') => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value?.value) {
      const tokenKey = formatKey(`${prefix}${key}`);

      if (value.type === 'color') {
        colors[tokenKey] = value.value;
      } else if (value.type.includes('font') || value.type.includes('text')) {
        typography[tokenKey] = value.value;
      } else if (value.type === 'dimension') {
        spacing[tokenKey] = value.value;
      }
    } else if (typeof value === 'object') {
      extractTokens(value, `${prefix}${key}-`);
    }
  });
};

// ✅ Extract tokens from global sets
extractTokens(tokensData.global);
extractTokens(tokensData['Primitives/Mode 1']);
extractTokens(tokensData['Tokens/Mode 1']);

// ✅ Generate color tokens file
generateFile(
  'color-tokens',
  `export const colors = ${JSON.stringify(colors, null, 2)};`
);

// ✅ Generate typography tokens file
generateFile(
  'typography-tokens',
  `export const typography = ${JSON.stringify(typography, null, 2)};`
);

// ✅ Generate spacing tokens file
generateFile(
  'spacing-tokens',
  `export const spacing = ${JSON.stringify(spacing, null, 2)};`
);

// ✅ Generate index.ts file (without header)
generateFile(
  'index',
  `export * from "./color-tokens.gen";\nexport * from "./typography-tokens.gen";\nexport * from "./spacing-tokens.gen";`,
  true
);

console.log('🎨 Token generation completed! 🎉');
