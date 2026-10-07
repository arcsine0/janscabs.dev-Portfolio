import { lazy, Suspense, useEffect, useRef, useState, type UIEvent } from "react";
import { Github, Mail, Terminal } from "lucide-react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Poco from "./components/TerminalAssistant";
import TerminalLoader from "./components/TerminalLoader";
import VHS from "./components/canvasui/VHS";
import CanvasProbe from "./pages/CanvasProbe";
import CanvasProbeV2, {
	canvasProbeV2ModeFromHash,
} from "./pages/CanvasProbeV2";
import Home from "./pages/Home";

type Page = "home" | "projects" | "about";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));

function pageForPath(pathname: string): Page {
	if (pathname === "/projects") return "projects";
	if (pathname === "/personnel" || pathname === "/about") return "about";
	return "home";
}

function App() {
	const location = useLocation();
	const [flash, setFlash] = useState(0);
	const [pastHero, setPastHero] = useState(false);
	const previousPath = useRef(location.pathname);
	const page = pageForPath(location.pathname);
	const canvasProbeV2Mode = canvasProbeV2ModeFromHash(window.location.hash);

	useEffect(() => {
		const changedRoute = previousPath.current !== location.pathname;
		previousPath.current = location.pathname;
		setPastHero(false);
		document.getElementById("crt-scroll")?.scrollTo({ top: 0 });
		if (changedRoute) setFlash((value) => value + 1);
	}, [location.pathname]);

	if (window.location.hash === "#canvas-probe") return <CanvasProbe />;
	if (canvasProbeV2Mode) return <CanvasProbeV2 mode={canvasProbeV2Mode} />;

	const handleScreenScroll = (event: UIEvent<HTMLDivElement>) => {
		if (page !== "home") return;
		const hero = event.currentTarget.querySelector<HTMLElement>("[data-home-hero]");
		const threshold = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
		const next = event.currentTarget.scrollTop >= threshold - 1;
		setPastHero((current) => (current === next ? current : next));
	};

	const scrollToContent = () => {
		document
			.getElementById("home-content")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className="site-shell">
			<div className="crt-bezel">
				<div className="crt-housing">
					<VHS
						className="crt-display"
						barrel={0.5}
						scanlines={0.18}
						grain={0.12}
						vignette={0.75}
						saturation={0.45}
						contentClassName={page === "home" && !pastHero ? "home-hero-snap" : undefined}
						contentId="crt-scroll"
						contentStyle={{
							width: "100vw",
							minWidth: "100vw",
							height: "100dvh",
							minHeight: "100dvh",
						}}
						onScroll={handleScreenScroll}
					>
						<div className="terminal-app">
							<div className="assistant-stage">
								<Poco
									enableDialogueToast={false}
									page={page}
									pastHero={pastHero}
								/>
							</div>
							<div className="mx-auto min-h-full max-w-7xl px-4 py-4 sm:px-8 sm:py-8">
								<div className={page === "home" ? "home-nav-slot" : "page-nav-slot"}>
									<header
										className={`navbar terminal-panel terminal-nav px-3 sm:px-6 ${page !== "home" || pastHero ? "terminal-nav--visible" : ""}`}
									>
										<div className="navbar-start w-auto flex-none gap-2 sm:gap-3">
											<Terminal aria-hidden="true" className="size-5 text-primary" />
											<Link
												className="text-sm font-bold tracking-[0.16em] sm:text-base"
												to="/"
												onClick={() => setPastHero(false)}
											>
												JANS//DEV
											</Link>
										</div>
										<nav
											className="navbar-end ml-auto w-auto flex-none gap-2 text-[0.62rem] tracking-[0.08em] sm:gap-6 sm:text-sm sm:tracking-[0.14em]"
											aria-label="Primary navigation"
										>
											<Link className="link link-hover" to="/" onClick={() => setPastHero(false)}>
												[HOME]
											</Link>
											<Link className="link link-hover" to="/personnel">
												<span className="sm:hidden">[BIO]</span>
												<span className="hidden sm:inline">[PERSONNEL]</span>
											</Link>
											<Link className="link link-hover" to="/projects">
												<span className="sm:hidden">[WORK]</span>
												<span className="hidden sm:inline">[PROJECTS]</span>
											</Link>
											<a className="link link-hover" href="mailto:hello@janscabs.dev">
												[CONTACT]
											</a>
										</nav>
									</header>
								</div>
								<Suspense fallback={<TerminalLoader />}>
									<Routes>
										<Route path="/" element={<Home onScrollToContent={scrollToContent} />} />
										<Route path="/personnel" element={<About />} />
										<Route path="/about" element={<Navigate replace to="/personnel" />} />
										<Route path="/projects" element={<Projects />} />
										<Route path="*" element={<Navigate replace to="/" />} />
									</Routes>
								</Suspense>
								<footer
									id="contact"
									className="terminal-section flex flex-col gap-5 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
								>
									<p className="terminal-label">COPYRIGHT {new Date().getFullYear()} // JANS CABALLEGAN</p>
									<div className="flex gap-4">
										<a className="btn btn-ghost btn-sm" href="https://github.com/arcsine0" target="_blank" rel="noreferrer">
											<Github className="size-4" /> GitHub
										</a>
										<a className="btn btn-ghost btn-sm" href="mailto:hello@janscabs.dev">
											<Mail className="size-4" /> Email
										</a>
									</div>
								</footer>
							</div>
							{flash > 0 && <span className="terminal-flash" key={flash} />}
						</div>
					</VHS>
				</div>
			</div>
		</div>
	);
}

export default App;
