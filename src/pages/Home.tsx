import { ArrowUpRight, ChevronDown } from "lucide-react";

const projects = [
	["01", "SmartTicket", "A considered ticketing experience."],
	["02", "Cryptodw", "A clean crypto dashboard."],
	["03", "Kaquizz", "A playful learning platform."],
];

interface HomeProps {
	showHero?: boolean;
	onScrollToContent?: () => void;
}

function Home({ showHero = true, onScrollToContent }: HomeProps) {
	return (
		<main id="top">
			{showHero && (
				<section
					className="home-hero flex min-h-[calc(100dvh-2rem)] items-end justify-center sm:min-h-[calc(100dvh-4rem)]"
					data-home-hero
				>
					<button
						aria-label="Scroll to selected work"
						className="home-hero-scroll mb-8"
						onClick={onScrollToContent}
					>
						<ChevronDown
							aria-hidden="true"
							className="h-10 w-20"
							strokeWidth={1}
						/>
					</button>
				</section>
			)}
			<div id="home-content">
				<section className="hero min-h-[58vh] py-12 sm:py-20">
					<div className="hero-content w-full max-w-none items-end justify-between gap-10 p-0 max-lg:flex-col max-lg:items-start lg:flex-row">
						<div className="max-w-3xl">
							<p className="terminal-label mb-5">
								SYS.ACCESS // FULL-STACK TYPESCRIPT DEVELOPER
							</p>
							<h1 className="text-5xl font-normal leading-[0.92] tracking-[-0.05em] text-base-content sm:text-7xl lg:text-8xl">
								Building useful things for the internet.
							</h1>
							<p className="mt-7 max-w-xl text-base leading-7 text-base-content/75">
								I design and ship clear, resilient web experiences where thoughtful
								interface work meets reliable engineering.
							</p>
						</div>
						<aside className="card card-border terminal-panel w-full max-w-sm">
							<div className="card-body gap-4 p-5">
								<p className="terminal-label">// OPERATOR STATUS</p>
								<p className="text-lg">ONLINE / AVAILABLE</p>
								<div className="terminal-rule" />
								<p className="text-sm text-base-content/75">
									Based in the Philippines.
									<br />
									Working worldwide.
								</p>
								<div className="card-actions mt-2">
									<a className="btn btn-primary btn-sm" href="mailto:hello@janscabs.dev">
										Open channel <ArrowUpRight className="size-4" />
									</a>
								</div>
							</div>
						</aside>
					</div>
				</section>
				<section id="work" className="terminal-section py-14 sm:py-20">
					<div className="mb-8 flex items-baseline justify-between">
						<h2 className="text-2xl font-normal sm:text-3xl">SELECTED WORK</h2>
						<span className="terminal-label">03 RECORDS</span>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{projects.map(([number, name, description]) => (
							<article className="card card-border terminal-panel" key={number}>
								<div className="card-body p-6">
									<p className="terminal-label">REC.{number}</p>
									<h3 className="card-title mt-8 text-xl font-normal">{name}</h3>
									<p className="text-sm text-base-content/75">{description}</p>
									<div className="card-actions mt-4">
										<a className="btn btn-ghost btn-sm px-0" href="#contact">
											View record <ArrowUpRight className="size-4" />
										</a>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>
				<section className="terminal-section grid gap-8 py-14 sm:grid-cols-2 sm:py-20">
					<h2 className="text-2xl font-normal sm:text-3xl">
						HUMAN INTERFACE,
						<br />
						MACHINE PRECISION.
					</h2>
					<p className="max-w-xl text-base leading-7 text-base-content/75">
						I am Raphael "Jans" Caballegan, a full-stack developer focused on
						elegant products, maintainable systems, and the space where the two meet.
					</p>
				</section>
			</div>
		</main>
	);
}

export default Home;
