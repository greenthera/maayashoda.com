import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served from https://greenthera.github.io/maayashoda.com/ — every asset and
  // route URL must be prefixed with the repo name. `import.meta.env.BASE_URL`
  // (used as the react-router basename in src/main.tsx) picks this up too.
  base: "/maayashoda.com/",
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    includedRoutes(paths) {
      return paths.filter((p) => !p.includes("*"));
    },
  },
});
