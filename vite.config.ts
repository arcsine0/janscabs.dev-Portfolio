import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
	base: "./",
	plugins: [react(), tailwindcss(), netlify()],
});
