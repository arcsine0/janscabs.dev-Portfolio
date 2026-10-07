import Poco from "../components/TerminalAssistant";
import VHS from "../components/canvasui/VHS";

const probeModes = [
	"base",
	"nav",
	"scroll",
	"poco",
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
	base: "static target only",
	nav: "base + navigation",
	scroll: "base + internal scroll region",
	poco: "base + Poco engine",
	"nav-poco": "navigation + Poco engine",
	all: "navigation + scroll region + Poco",
};

function CanvasProbeV2({ mode }: { mode: CanvasProbeV2Mode }) {
	const hasNav = mode === "nav" || mode === "nav-poco" || mode === "all";
	const hasScroll = mode === "scroll" || mode === "all";
	const hasPoco = mode === "poco" || mode === "nav-poco" || mode === "all";

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
				>
					<div className="terminal-app relative h-full overflow-hidden">
						{hasPoco && (
							<div className="assistant-stage">
								<Poco page="home" pastHero={false} />
							</div>
						)}
						<div
							className={`relative z-20 h-full p-6 sm:p-8 ${
								hasScroll ? "overflow-y-auto" : "overflow-hidden"
							}`}
						>
							{hasNav && (
								<nav className="mb-8 flex items-center justify-between border-b border-primary/30 pb-4 text-xs tracking-[0.12em] sm:text-sm">
									<span>JANS//DEV</span>
									<span>[HOME] [PERSONNEL] [PROJECTS]</span>
								</nav>
							)}
							<p className="terminal-label">CAPTURE TARGET // {mode.toUpperCase()}</p>
							<h2 className="mt-5 text-4xl leading-none sm:text-5xl">
								Signal received.
							</h2>
							<p className="mt-5 max-w-xl text-sm leading-6 text-base-content/75 sm:text-base sm:leading-7">
								Each route uses the same fixed VHS target and adds one real home
								layer at a time.
							</p>
							{hasScroll && (
								<div className="mt-8 space-y-6 border-t border-primary/30 pt-6 text-sm text-base-content/75">
									{Array.from({ length: 8 }, (_, index) => (
										<p key={index}>
											SCROLL RECORD {String(index + 1).padStart(2, "0")} // internal
											capture content remains deliberately longer than the panel.
										</p>
									))}
								</div>
							)}
						</div>
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
