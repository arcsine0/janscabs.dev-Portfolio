import { lazy, StrictMode, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TerminalLoader from "./components/TerminalLoader.tsx";

const appResources = Promise.all([
	import("./App.tsx"),
	import("./components/TerminalAssistant.tsx"),
	import("./components/canvasui/VHS.tsx"),
	document.fonts?.ready ?? Promise.resolve(),
] as const).then(([module]) => module);

const App = lazy(() => appResources);

export function InitialBoot() {
	const [complete, setComplete] = useState(
		() => sessionStorage.getItem("jans.dev.booted") === "true",
	);
	const [fading, setFading] = useState(false);

	useEffect(() => {
		if (complete) return;
		let active = true;
		let timeout = 0;

		appResources.then(() => {
			if (!active) return;
			setFading(true);
			timeout = window.setTimeout(() => {
				sessionStorage.setItem("jans.dev.booted", "true");
				setComplete(true);
			}, 320);
		});

		return () => {
			active = false;
			window.clearTimeout(timeout);
		};
	}, [complete]);

	return (
		<>
			{complete && (
				<Suspense fallback={null}>
					<App />
				</Suspense>
			)}
			{!complete && <TerminalLoader boot fading={fading} />}
		</>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<InitialBoot />
	</StrictMode>,
);
