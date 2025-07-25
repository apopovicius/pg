// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["reflect-metadata"], // <- Important: loads metadata first
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  //   globals: {
  //     "ts-jest": {
  //       tsconfig: "tsconfig.json", // Ensures emitDecoratorMetadata is respected
  //     },
  //   },
};

export default config;
