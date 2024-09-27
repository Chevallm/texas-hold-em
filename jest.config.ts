import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageReporters: ['lcov']
};

export default config;
