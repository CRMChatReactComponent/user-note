import { r } from "./scripts/utils";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { GenI18nTypes } from "vite-i18n-gen-resources-type";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    GenI18nTypes({
      watchFolder: `${r("src/i18n/locales")}`,
      outputFolder: `${r("src/i18n")}`,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "usernote",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@ant-design/icons",
        "react/jsx-runtime",
        "antd",
        "i18next",
        "react-i18next",
        "emoji-picker-react",
        "lodash-es",
        "color",
        "react-intersection-observer",
        "react-rnd",
        "react-use",
        "styled-components",
      ],
    },
  },
});
