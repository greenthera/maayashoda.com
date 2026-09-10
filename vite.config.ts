import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served from https://greenthera.github.io/maayashoda.com/ — every asset and
  // route URL must be prefixed with the repo name. `import.meta.env.BASE_URL`
  // (used as the react-router basename in src/main.tsx) picks this up too.
  base: "/maayashoda.com/",
  plugins: [react(), tailwindcss()],
  // react-fast-marquee ships CJS; let Vite bundle it for the SSR build so the
  // default export resolves and it prerenders cleanly.
  ssr: { noExternal: ["react-fast-marquee"] },
  ssgOptions: {
    includedRoutes(paths) {
      return paths.filter((p) => !p.includes("*"));
    },
  },
});
