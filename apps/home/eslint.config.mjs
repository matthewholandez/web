import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([".output/**", "src/routeTree.gen.ts"]),
]);

export default eslintConfig;
