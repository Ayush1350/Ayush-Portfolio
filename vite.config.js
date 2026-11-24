import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { portfolioSeo } from "./portfolio-seo.js";

export default defineConfig({
  plugins: [tailwindcss(), portfolioSeo(process.env.SITE_URL)],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        ["index", "about/index", "projects/index", "resume/index"].map(
          (entry) => [
            entry,
            fileURLToPath(new URL(`./${entry}.html`, import.meta.url)),
          ],
        ),
      ),
    },
  },
});
