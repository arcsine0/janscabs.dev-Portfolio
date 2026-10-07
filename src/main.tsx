import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const appResources = Promise.all([
	import("./App.tsx"),
	import("./components/TerminalAssistant.tsx"),
	import("./components/canvasui/VHS.tsx"),
	document.fonts?.ready ?? Promise.resolve(),
] as const).then(([module]) => module);

const App = lazy(() => appResources);

export function InitialBoot() {
	return (
		<Suspense fallback={null}>
			<App />
		</Suspense>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<InitialBoot />
		</BrowserRouter>
	</StrictMode>,
);
