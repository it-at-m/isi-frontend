// Plugins
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

import vue from "@vitejs/plugin-vue";
// Utilities
import { defineConfig } from "vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

function frontendInfoPlugin() {
  return {
    name: "frontend-info-plugin",
    closeBundle() {
      let commitHash = process.env.CI_COMMIT_SHA ?? "";
      let branch = process.env.CI_COMMIT_REF_NAME ?? "";
      let version = "";

      try {
        const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8"));
        version = packageJson.version ?? "";
      } catch {
        version = "";
      }

      if (!commitHash) {
        try {
          commitHash = execSync("git rev-parse HEAD").toString().trim();
        } catch {
          commitHash = "";
        }
      }

      if (!branch) {
        try {
          branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
        } catch {
          branch = "";
        }
      }

      const info = {
        application: {
          name: "isi-frontend",
          version,
          commitHash,
          branch,
          buildTime: new Date().toISOString(),
        },
      };

      const outDir = path.resolve(__dirname, "dist");
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "info.json"), JSON.stringify(info, null, 2), "utf-8");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
    frontendInfoPlugin(),
  ],
  server: {
    host: "0.0.0.0",
    port: 8081,
    allowedHosts: ["localhost", "host.docker.internal"],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
});
