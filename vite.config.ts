import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    includedRoutes(paths) {
      return paths.filter((p) => !p.includes("*"));
    },
  },
});
