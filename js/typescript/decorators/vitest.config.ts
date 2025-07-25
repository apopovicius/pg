import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["./**/*.test.ts"],
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
