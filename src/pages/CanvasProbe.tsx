import VHS from "../components/canvasui/VHS";

function CanvasProbe() {
	return (
		<main className="grid min-h-screen place-items-center bg-base-100 px-4 py-8 text-base-content">
			<div className="w-full max-w-3xl space-y-5">
				<header className="flex items-center justify-between gap-4">
					<div>
						<p className="terminal-label">SYS.DIAGNOSTIC // CANVAS CAPTURE</p>
						<h1 className="mt-2 text-2xl sm:text-3xl">VHS PROBE</h1>
					</div>
					<a className="btn btn-ghost btn-sm" href="/">
						Return home
					</a>
				</header>

				<VHS
					className="relative h-80 overflow-hidden border border-primary/70 bg-base-100 shadow-[0_0_18px_rgb(71_255_125_/_0.2)]"
					barrel={0.2}
					scanlines={0.12}
					grain={0.08}
					vignette={0.35}
				>
					<div className="h-full bg-base-100 p-8 sm:p-12">
						<p className="terminal-label">CAPTURE TARGET // STATIC / VISIBLE</p>
						<h2 className="mt-7 text-4xl leading-none sm:text-6xl">
							Signal received.
						</h2>
						<p className="mt-7 max-w-lg text-base leading-7 text-base-content/75">
							This isolated panel has no page-level canvas wrapper, lazy content,
							or internal scroll region.
						</p>
						<span className="badge badge-outline badge-primary mt-8">
							DRAWABLE TARGET
						</span>
					</div>
				</VHS>

				<p className="text-sm text-base-content/60">
					If this panel renders with VHS distortion, the Origin Trial is working and
					the portfolio root is the incompatible capture target.
				</p>
			</div>
		</main>
	);
}

export default CanvasProbe;
