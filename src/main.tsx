import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./lib/queryClient";
import { initAppKit } from "./lib/appkit";

async function bootstrap() {
	try {
		await initAppKit();
	} catch (error) {
		console.error("Failed to initialize AppKit:", error);
	}

	createRoot(document.getElementById("root")!).render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<StrictMode>
					<App />
				</StrictMode>
			</BrowserRouter>
		</QueryClientProvider>,
	);
}

bootstrap();
