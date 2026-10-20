import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Componentes de React Bits (instalados con shadcn): usan el patrón "latest ref",
  // válido en la práctica pero señalado por las reglas estrictas de React 19.
  {
    files: [
      "src/components/{Aurora,Particles,SplitText,ShinyText,RotatingText,ScrollReveal,Magnet,GlareHover,ClickSpark}.tsx",
    ],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
