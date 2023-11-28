/// <reference types="vitest" />
import { configDefaults, defineConfig } from "vitest/config";

import * as path from "path";

export default defineConfig({
  test: {
    setupFiles: ["./vitestSetupFile.ts"],
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: [...configDefaults.exclude],
    coverage: {
      all: true,
      include: ["src/**/service.ts"],
      provider: "v8",
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      thresholdAutoUpdate: true,
    },
  },
  resolve: {
    alias: {
      "~": path.join(__dirname, "./src"),
    },
  },
});
