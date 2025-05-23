import { dirname } from "path";
import { fileURLToPath } from "url";

/** Resolución de rutas */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Configuración de ESLint */
const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
      project: "./tsconfig.json",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
