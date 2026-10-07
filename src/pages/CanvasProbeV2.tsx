import Home from "./Home";
import Poco from "../components/TerminalAssistant";
import VHS from "../components/canvasui/VHS";

const probeModes = [
	"base",
	"nav",
	"hero",
	"snap",
	"poco",
	"poco-bg",
	"toast",
	"nav-poco",
	"all",
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
	nav: "home + navigation",
	hero: "home + full hero",
	snap: "hero + snap scroll",
	poco: "hero + foreground Poco",
	"poco-bg": "home + background Poco",
	toast: "home + dialogue toast",
	"nav-poco": "navigation + Poco engine",
	all: "all home layers",
};

function DialogueToast() {
	return (
		<div
			className="toast toast-end toast-bottom assistant-toast"
			style={{ top: "auto", bottom: "1rem" }}
		>
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

function CanvasProbeV2({ mode }: { mode: CanvasProbeV2Mode }) {
	const hasNav = mode === "nav" || mode === "nav-poco" || mode === "all";
	const hasHero =
		mode === "hero" || mode === "snap" || mode === "poco" || mode === "all";
	const hasSnap = mode === "snap" || mode === "all";
	const hasPoco =
		mode === "poco" || mode === "poco-bg" || mode === "nav-poco" || mode === "all";
	const hasBackgroundPoco = mode === "poco-bg";
	const hasToast = mode === "toast" || mode === "all";

	return (
		<main className="grid min-h-screen place-items-center bg-base-100 px-4 py-8 text-base-content">
			<div className="w-full max-w-3xl space-y-5">
				<header className="flex flex-wrap items-center justify-between gap-3">
					<div>
						<p className="terminal-label">SYS.DIAGNOSTIC // CAPTURE MATRIX</p>
						<h1 className="mt-2 text-2xl sm:text-3xl">VHS PROBE V2</h1>
					</div>
					<span className="badge badge-outline badge-primary">{modeLabels[mode]}</span>
				</header>

				<VHS
					className="relative h-80 overflow-hidden border border-primary/70 bg-base-100 shadow-[0_0_18px_rgb(71_255_125_/_0.2)]"
					barrel={0.2}
					scanlines={0.12}
					grain={0.08}
					vignette={0.35}
					contentClassName={hasSnap ? "home-hero-snap" : undefined}
					contentId="canvas-probe-v2-scroll"
				>
					<div className="terminal-app relative min-h-full">
						{hasPoco && (
							<div className="assistant-stage">
								<Poco page="home" pastHero={hasBackgroundPoco} />
							</div>
						)}
						<div className="relative z-20 min-h-full">
							{hasNav && (
								<nav className="navbar terminal-panel relative z-20 px-4 py-3 text-xs tracking-[0.12em] sm:px-6 sm:text-sm">
									<span>JANS//DEV</span>
									<span className="ml-auto">[HOME] [PERSONNEL] [PROJECTS]</span>
								</nav>
							)}
							<div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 sm:py-8">
								<Home showHero={hasHero} />
							</div>
						</div>
						{hasToast && <DialogueToast />}
					</div>
				</VHS>

				<nav className="flex flex-wrap gap-2" aria-label="Capture probe layers">
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
