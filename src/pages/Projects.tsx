import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const records = ["01", "02", "03", "04"];

function Projects() {
	return (
		<main className="py-12 sm:py-16">
			<header className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="terminal-label mb-4">PROJECT.ARCHIVE // PUBLIC INDEX</p>
					<h1 className="text-4xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
						SELECTED
						<br />
						TRANSMISSIONS
					</h1>
				</div>
				<p className="max-w-sm text-sm leading-6 text-base-content/75 sm:text-right">
					Case files will be added here as project records are cleared for
					transmission.
				</p>
			</header>

			<section className="terminal-section py-10 sm:py-14">
				<div className="mb-8 flex items-baseline justify-between">
					<h2 className="text-2xl font-normal sm:text-3xl">CASE FILE INDEX</h2>
					<span className="terminal-label">{records.length} RECORDS</span>
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{records.map((record) => (
						<article
							className="card card-border terminal-panel min-h-64"
							key={record}
						>
							<div className="card-body justify-between gap-8 p-6 sm:p-8">
								<div>
									<div className="flex items-start justify-between gap-4">
										<p className="terminal-label">
											REC.{record} // PROJECT FILE
										</p>
										<span className="badge badge-outline badge-sm">
											PENDING
										</span>
									</div>
									<h3 className="card-title mt-10 text-2xl font-normal">
										INCOMING DATA
									</h3>
									<p className="mt-3 max-w-md text-sm leading-6 text-base-content/70">
										This record is being prepared for release. Project details,
										process notes, and outcomes will appear here.
									</p>
								</div>
								<div className="terminal-rule" />
							</div>
						</article>
					))}
				</div>
			</section>

			<Link className="btn btn-ghost btn-sm" to="/">
				<ArrowLeft className="size-4" /> Return to home
			</Link>
		</main>
	);
}

export default Projects;
