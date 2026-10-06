import { lazy, Suspense, useState, type UIEvent } from "react";
import {
	ArrowUpRight,
	ChevronDown,
	Github,
	Mail,
	Terminal,
} from "lucide-react";
// import { Grid } from "./components/canvasui/Grid";
import Poco from "./components/TerminalAssistant";
import TerminalLoader from "./components/TerminalLoader";
import VHS from "./components/canvasui/VHS";

const projects = [
	["01", "SmartTicket", "A considered ticketing experience."],
	["02", "Cryptodw", "A clean crypto dashboard."],
	["03", "Kaquizz", "A playful learning platform."],
];
type Page = "home" | "projects" | "about";

let aboutCached = false;
let projectsCached = false;
const Projects = lazy(async () => {
	const module = await import("./pages/Projects");
	projectsCached = true;
	return module;
});
const About = lazy(async () => {
	const module = await import("./pages/About");
	aboutCached = true;
	return module;
});

function App() {
	const [page, setPage] = useState<Page>("home");
	const [flash, setFlash] = useState(0);
	const [pastHero, setPastHero] = useState(false);
	const handleScreenScroll = (event: UIEvent<HTMLDivElement>) => {
		if (page !== "home") return;
		const hero =
			event.currentTarget.querySelector<HTMLElement>("[data-home-hero]");
		const threshold = hero
			? hero.offsetTop + hero.offsetHeight
			: window.innerHeight;
		const next = event.currentTarget.scrollTop >= threshold - 1;
		setPastHero((current) => (current === next ? current : next));
	};
	const scrollToContent = () => {
		document
			.getElementById("home-content")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const navigate = (next: Page) => {
		if (next === "home") {
			setPastHero(false);
			requestAnimationFrame(() => {
				document.getElementById("crt-scroll")?.scrollTo({ top: 0 });
			});
		}
		if (next !== page) {
			setPage(next);
			if (
				next === "home" ||
				(next === "projects" && projectsCached) ||
				(next === "about" && aboutCached)
			) {
				setFlash((value) => value + 1);
			}
		}
	};

	return (
		<div className="site-shell">
			{/* <Grid
				className="ambient-grid"
				globalPointer
				tileSize={160}
				gap={0}
				cornerRadius={0}
				amplitude={2.5}
				waveSpeed={0.5}
				frequency={12}
				waveWidth={0.05}
				fadeTime={0.2}
				maxLift={1}
				jitter={0}
				liftHeight={60}
				perspective={1200}
				tilt={1}
				shading={0.05}
				tintStrength={0.1}
				idleRipples={0}
				tint={[0, 1, 0.4039]}
			>
				<div className="ambient-grid-surface" aria-hidden="true" />
			</Grid> */}
			<div className="crt-bezel">
				<div className="crt-housing">
					{/* <svg
						className="crt-frame"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path d="M 0 4 Q 50 0 100 4 Q 104 50 100 96 Q 50 100 0 96 Q -4 50 0 4 Z" />
					</svg> */}
					<VHS
						className="crt-display"
						barrel={0.5}
						scanlines={0.18}
						grain={0.12}
						vignette={0.75}
						saturation={0.45}
						contentClassName={
							page === "home" && !pastHero ? "home-hero-snap" : undefined
						}
						contentId="crt-scroll"
						onScroll={handleScreenScroll}
					>
						<Suspense fallback={<TerminalLoader />}>
							<div className="terminal-app">
								<div className="assistant-stage">
									<Poco page={page} pastHero={pastHero} />
								</div>
								<div className="mx-auto min-h-full max-w-7xl px-4 py-4 sm:px-8 sm:py-8">
									<div
										className={
											page === "home" ? "home-nav-slot" : "page-nav-slot"
										}
									>
										<header
											className={`navbar terminal-panel terminal-nav px-3 sm:px-6 ${page !== "home" || pastHero ? "terminal-nav--visible" : ""}`}
										>
											<div className="navbar-start w-auto flex-none gap-2 sm:gap-3">
												<Terminal
													aria-hidden="true"
													className="size-5 text-primary"
												/>
												<button
													className="text-sm font-bold tracking-[0.16em] sm:text-base"
													onClick={() => navigate("home")}
												>
													JANS//DEV
												</button>
											</div>
											<nav
												className="navbar-end ml-auto w-auto flex-none gap-2 text-[0.62rem] tracking-[0.08em] sm:gap-6 sm:text-sm sm:tracking-[0.14em]"
												aria-label="Primary navigation"
											>
												<button
													className="link link-hover"
													onClick={() => navigate("home")}
												>
													[HOME]
												</button>
												<button
													className="link link-hover"
													onClick={() => navigate("about")}
												>
													<span className="sm:hidden">[BIO]</span>
													<span className="hidden sm:inline">[PERSONNEL]</span>
												</button>
												<button
													className="link link-hover"
													onClick={() => navigate("projects")}
												>
													<span className="sm:hidden">[WORK]</span>
													<span className="hidden sm:inline">[PROJECTS]</span>
												</button>
												<a
													className="link link-hover"
													href="mailto:hello@janscabs.dev"
												>
													[CONTACT]
												</a>
											</nav>
										</header>
									</div>
									{page === "home" ? (
										<main id="top">
											<section
												className="home-hero flex min-h-[calc(100dvh-2rem)] items-end justify-center sm:min-h-[calc(100dvh-4rem)]"
												data-home-hero
											>
												<button
													aria-label="Scroll to selected work"
													className="home-hero-scroll mb-8"
													onClick={scrollToContent}
												>
													<ChevronDown
														aria-hidden="true"
														className="h-10 w-20"
														strokeWidth={1}
													/>
												</button>
											</section>
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
																I design and ship clear, resilient web
																experiences where thoughtful interface work
																meets reliable engineering.
															</p>
														</div>
														<aside className="card card-border terminal-panel w-full max-w-sm">
															<div className="card-body gap-4 p-5">
																<p className="terminal-label">
																	// OPERATOR STATUS
																</p>
																<p className="text-lg">ONLINE / AVAILABLE</p>
																<div className="terminal-rule" />
																<p className="text-sm text-base-content/75">
																	Based in the Philippines.
																	<br />
																	Working worldwide.
																</p>
																<div className="card-actions mt-2">
																	<a
																		className="btn btn-primary btn-sm"
																		href="mailto:hello@janscabs.dev"
																	>
																		Open channel{" "}
																		<ArrowUpRight className="size-4" />
																	</a>
																</div>
															</div>
														</aside>
													</div>
												</section>
												<section
													id="work"
													className="terminal-section py-14 sm:py-20"
												>
													<div className="mb-8 flex items-baseline justify-between">
														<h2 className="text-2xl font-normal sm:text-3xl">
															SELECTED WORK
														</h2>
														<span className="terminal-label">03 RECORDS</span>
													</div>
													<div className="grid gap-4 md:grid-cols-3">
														{projects.map(([number, name, description]) => (
															<article
																className="card card-border terminal-panel"
																key={number}
															>
																<div className="card-body p-6">
																	<p className="terminal-label">REC.{number}</p>
																	<h3 className="card-title mt-8 text-xl font-normal">
																		{name}
																	</h3>
																	<p className="text-sm text-base-content/75">
																		{description}
																	</p>
																	<div className="card-actions mt-4">
																		<a
																			className="btn btn-ghost btn-sm px-0"
																			href="#contact"
																		>
																			View record{" "}
																			<ArrowUpRight className="size-4" />
																		</a>
																	</div>
																</div>
															</article>
														))}
													</div>
												</section>
												<section
													id="about"
													className="terminal-section grid gap-8 py-14 sm:grid-cols-2 sm:py-20"
												>
													<h2 className="text-2xl font-normal sm:text-3xl">
														HUMAN INTERFACE,
														<br />
														MACHINE PRECISION.
													</h2>
													<p className="max-w-xl text-base leading-7 text-base-content/75">
														I am Raphael "Jans" Caballegan, a full-stack
														developer focused on elegant products, maintainable
														systems, and the space where the two meet.
													</p>
												</section>
											</div>
										</main>
									) : page === "projects" ? (
										<Projects onReturnHome={() => navigate("home")} />
									) : (
										<About onReturnHome={() => navigate("home")} />
									)}
									<footer
										id="contact"
										className="terminal-section flex flex-col gap-5 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
									>
										<p className="terminal-label">
											COPYRIGHT {new Date().getFullYear()} // JANS CABALLEGAN
										</p>
										<div className="flex gap-4">
											<a
												className="btn btn-ghost btn-sm"
												href="https://github.com/arcsine0"
												target="_blank"
												rel="noreferrer"
											>
												<Github className="size-4" /> GitHub
											</a>
											<a
												className="btn btn-ghost btn-sm"
												href="mailto:hello@janscabs.dev"
											>
												<Mail className="size-4" /> Email
											</a>
										</div>
									</footer>
								</div>
								{flash > 0 && <span className="terminal-flash" key={flash} />}
							</div>
						</Suspense>
					</VHS>
				</div>
			</div>
		</div>
	);
}

export default App;
