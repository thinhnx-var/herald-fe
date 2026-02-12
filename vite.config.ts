import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@/components": path.resolve(__dirname, "./src/components"),
			"@/hooks": path.resolve(__dirname, "./src/hooks"),
			"@/lib": path.resolve(__dirname, "./src/lib"),
			"@/types": path.resolve(__dirname, "./src/types"),
			"@/utils": path.resolve(__dirname, "./src/utils"),
			"@/constants": path.resolve(__dirname, "./src/constants"),
			"@/pages": path.resolve(__dirname, "./src/pages"),
			"@/assets": path.resolve(__dirname, "./src/assets"),
			"@/stores": path.resolve(__dirname, "./src/stores"),
			"@/services": path.resolve(__dirname, "./src/services"),
		},
	},
});
