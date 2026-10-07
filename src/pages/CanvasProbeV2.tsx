import { useState, type UIEvent } from "react";
import Home from "./Home";
import Poco from "../components/TerminalAssistant";
import VHS from "../components/canvasui/VHS";

const probeModes = ["base", "nav", "poco", "toast", "all"] as const;

export type CanvasProbeV2Mode = (typeof probeModes)[number];

export function canvasProbeV2ModeFromHash(
	hash: string,
): CanvasProbeV2Mode | null {
	if (hash === "#canvas-probe-v2") return "all";
	const mode = hash.replace("#canvas-probe-v2-", "");
	return probeModes.includes(mode as CanvasProbeV2Mode)
		? (mode as CanvasProbeV2Mode)
		: null;
}

const modeLabels: Record<CanvasProbeV2Mode, string> = {
	base: "home content",
	nav: "home + sticky navigation",
	poco: "navigation + hero/snap + Poco",
	toast: "Poco state + dialogue toast",
	all: "complete home composition",
};

function DialogueToast() {
	return (
		<div className="toast toast-end toast-bottom assistant-toast" aria-live="polite">
			<div role="alert" className="alert alert-outline">
				<div className="avatar avatar-placeholder assistant-toast-avatar">
					<div className="bg-primary font-mono text-base text-primary-content">
						<span>⦿ᵕ</span>
					</div>
				</div>
				<span>Diagnostic dialogue relay online.</span>
			</div>
		</div>
	);
}

function ProbeNav({ visible }: { visible: boolean }) {
	return (
		<div className="home-nav-slot">
			<header
				className={`navbar terminal-panel terminal-nav px-4 py-3 text-xs tracking-[0.12em] sm:px-6 sm:text-sm ${
					visible ? "terminal-nav--visible" : ""
				}`}
			>
				<span className="navbar-start w-auto flex-none">JANS//DEV</span>
				<span className="navbar-end ml-auto w-auto flex-none">
					[HOME] [PERSONNEL] [PROJECTS]
				</span>
			</header>
		</div>
	);
}

function CanvasProbeV2({ mode }: { mode: CanvasProbeV2Mode }) {
	const [pastHero, setPastHero] = useState(false);
	const hasNav = mode !== "base";
	const hasPoco = mode === "poco" || mode === "toast" || mode === "all";
	const hasHero = hasPoco;
	const hasToast = (mode === "toast" || mode === "all") && pastHero;

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		if (!hasHero) return;
		const hero = event.currentTarget.querySelector<HTMLElement>("[data-home-hero]");
		const next = Boolean(hero && event.currentTarget.scrollTop >= hero.offsetHeight - 1);
		setPastHero((current) => (current === next ? current : next));
	};

	return (
		<main className="min-h-screen bg-base-100 p-4 text-base-content">
			<div className="relative h-[calc(100dvh-2rem)] w-full">
				<header className="pointer-events-none absolute inset-x-4 top-4 z-30 flex flex-wrap items-center justify-between gap-3">
					<div>
						<p className="terminal-label">SYS.DIAGNOSTIC // CAPTURE MATRIX</p>
						<h1 className="mt-2 text-2xl sm:text-3xl">VHS PROBE V2</h1>
					</div>
					<span className="badge badge-outline badge-primary">{modeLabels[mode]}</span>
				</header>

				<VHS
					className="relative h-full w-full overflow-hidden border border-primary/70 bg-base-100 shadow-[0_0_18px_rgb(71_255_125_/_0.2)]"
					barrel={0.2}
					scanlines={0.12}
					grain={0.08}
					vignette={0.35}
					contentClassName={hasHero ? "home-hero-snap" : undefined}
					contentId="canvas-probe-v2-scroll"
					onScroll={handleScroll}
				>
					<div className="terminal-app relative min-h-full">
						{hasPoco && (
							<div className="assistant-stage">
								<Poco page="home" pastHero={pastHero} />
								{hasToast && <DialogueToast />}
							</div>
						)}
						<div className="relative z-20 min-h-full">
							{hasNav && <ProbeNav visible={!hasHero || pastHero} />}
							<div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 sm:py-8">
								<Home showHero={hasHero} />
								{mode === "all" && (
									<footer className="terminal-section pt-6 text-sm">
										<p className="terminal-label">COPYRIGHT {new Date().getFullYear()} // JANS CABALLEGAN</p>
									</footer>
								)}
							</div>
						</div>
					</div>
				</VHS>

				<nav
					className="absolute inset-x-4 bottom-4 z-30 flex flex-wrap gap-2"
					aria-label="Capture probe layers"
				>
					{probeModes.map((item) => (
						<a
							className={`btn btn-sm ${item === mode ? "btn-primary" : "btn-ghost"}`}
							href={`#canvas-probe-v2-${item}`}
							onClick={(event) => {
								event.preventDefault();
								window.location.hash = `canvas-probe-v2-${item}`;
								window.location.reload();
							}}
							key={item}
						>
							{item}
						</a>
					))}
					<a className="btn btn-ghost btn-sm" href="/">
						Return home
					</a>
				</nav>
			</div>
		</main>
	);
}

export default CanvasProbeV2;
