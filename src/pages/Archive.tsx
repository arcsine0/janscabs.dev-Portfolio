import { ArrowLeft } from "lucide-react";

function Archive({ onReturnHome }: { onReturnHome: () => void }) {
	return (
		<main className="flex min-h-[70vh] items-center justify-center py-12">
			<section className="card card-border terminal-panel w-full max-w-2xl">
				<div className="card-body gap-6 p-8 sm:p-12">
					<p className="terminal-label">ARCHIVE.NODE // PLACEHOLDER</p>
					<h1 className="card-title text-3xl font-normal sm:text-5xl">
						TRANSMISSION LOG
					</h1>
					<div className="terminal-rule" />
					<p className="max-w-lg leading-7 text-base-content/75">
						This placeholder screen exists to test the terminal flash
						transition. Future case studies, experiments, and field notes will
						live here.
					</p>
					<div className="card-actions">
						<button className="btn btn-ghost btn-sm" onClick={onReturnHome}>
							<ArrowLeft className="size-4" /> Return to home
						</button>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Archive;
