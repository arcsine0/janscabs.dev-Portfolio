import { useEffect, useState } from "react";

const bootStages = [
	[12, "INITIALIZING TERMINAL CORE"],
	[36, "LOADING CRT RENDERER"],
	[58, "LOADING POCO ASSISTANT ENGINE"],
	[76, "SYNCING TYPEFACE MATRIX"],
	[92, "FINALIZING INTERFACE"],
] as const;

function TerminalLoader({
	boot = false,
	fading = false,
}: {
	boot?: boolean;
	fading?: boolean;
}) {
	const [stage, setStage] = useState(0);

	useEffect(() => {
		if (!boot) return;
		const interval = window.setInterval(
			() => setStage((current) => Math.min(current + 1, bootStages.length - 1)),
			420,
		);
		return () => window.clearInterval(interval);
	}, [boot]);

	const [progress, status] = fading
		? ([100, "HANDOFF COMPLETE // OPENING TERMINAL"] as const)
		: boot
			? bootStages[stage]
			: ([64, "ESTABLISHING DATA LINK"] as const);

	return (
		<main
			className={`terminal-loader ${boot ? "terminal-loader--boot" : ""} ${
				fading ? "terminal-loader--fading" : ""
			}`}
			aria-busy="true"
			aria-live="polite"
		>
			<div className="terminal-loader-content">
				<p className="terminal-loader-logo">JANS.DEV</p>
				<progress
					className="progress progress-primary terminal-loader-progress"
					value={progress}
					max={100}
				>
					{progress}%
				</progress>
				<p className="terminal-label terminal-loader-status">{status}</p>
			</div>
		</main>
	);
}

export default TerminalLoader;
