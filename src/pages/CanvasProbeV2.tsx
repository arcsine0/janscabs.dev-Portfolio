import { useState, type UIEvent } from "react";
import Home from "./Home";
import Poco from "../components/TerminalAssistant";
import VHS from "../components/canvasui/VHS";

const probeModes = [
	"base",
	"nav",
	"poco",
	"toast",
	"all",
	"interactions",
	"main-geometry",
] as const;

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
	interactions: "complete composition + live controls",
	"main-geometry": "main-index capture geometry",
};

function ProbeNav({
	visible,
	interactive,
	onHome,
}: {
	visible: boolean;
	interactive: boolean;
	onHome: () => void;
}) {
	return (
		<div className="home-nav-slot">
			<header
				className={`navbar terminal-panel terminal-nav px-4 py-3 text-xs tracking-[0.12em] sm:px-6 sm:text-sm ${
					visible ? "terminal-nav--visible" : ""
				}`}
			>
				{interactive ? (
					<>
						<button className="navbar-start w-auto flex-none" type="button" onClick={onHome}>
							JANS//DEV
						</button>
						<div className="navbar-end ml-auto w-auto flex-none gap-3">
							<button className="link link-hover" type="button" onClick={onHome}>
								[HOME]
							</button>
							<button className="link link-hover" type="button" onClick={onHome}>
								[PERSONNEL]
							</button>
							<button className="link link-hover" type="button" onClick={onHome}>
								[PROJECTS]
							</button>
						</div>
					</>
				) : (
					<>
						<span className="navbar-start w-auto flex-none">JANS//DEV</span>
						<span className="navbar-end ml-auto w-auto flex-none">
							[HOME] [PERSONNEL] [PROJECTS]
						</span>
					</>
				)}
			</header>
		</div>
	);
}

function CanvasProbeV2({ mode }: { mode: CanvasProbeV2Mode }) {
	const [pastHero, setPastHero] = useState(false);
	const matchesMainGeometry = mode === "main-geometry";
	const interactive = mode === "interactions" || matchesMainGeometry;
	const complete = mode === "all" || interactive;
	const hasNav = mode !== "base";
	const hasPoco = mode === "poco" || mode === "toast" || complete;
	const hasHero = hasPoco;

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		if (!hasHero) return;
		const hero = event.currentTarget.querySelector<HTMLElement>("[data-home-hero]");
		const next = Boolean(hero && event.currentTarget.scrollTop >= hero.offsetHeight - 1);
		setPastHero((current) => (current === next ? current : next));
	};
	const scrollToContent = () => {
		const scroller = document.getElementById("canvas-probe-v2-scroll");
		const content = scroller?.querySelector<HTMLElement>("#home-content");
		if (scroller && content) {
			scroller.scrollTo({ top: content.offsetTop, behavior: "smooth" });
		}
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
					barrel={matchesMainGeometry ? 0.5 : 0.2}
					scanlines={matchesMainGeometry ? 0.18 : 0.12}
					grain={matchesMainGeometry ? 0.12 : 0.08}
					vignette={matchesMainGeometry ? 0.75 : 0.35}
					saturation={matchesMainGeometry ? 0.45 : undefined}
					contentClassName={hasHero ? "home-hero-snap" : undefined}
					contentId="canvas-probe-v2-scroll"
					contentStyle={
						matchesMainGeometry
							? {
									width: "100vw",
									minWidth: "100vw",
									height: "100dvh",
									minHeight: "100dvh",
								}
							: undefined
					}
					onScroll={handleScroll}
				>
					<div className="terminal-app relative min-h-full">
						{hasPoco && (
							<div className="assistant-stage">
								<Poco
									enableDialogueToast={!matchesMainGeometry}
									page="home"
									pastHero={pastHero}
								/>
							</div>
						)}
						<div className="relative min-h-full">
							{hasNav && (
								<ProbeNav
									interactive={interactive}
									onHome={() =>
										document.getElementById("canvas-probe-v2-scroll")?.scrollTo({ top: 0 })
									}
									visible={!hasHero || pastHero}
								/>
							)}
							<div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 sm:py-8">
								<Home
									onScrollToContent={interactive ? scrollToContent : undefined}
									showHero={hasHero}
								/>
								{complete && (
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
