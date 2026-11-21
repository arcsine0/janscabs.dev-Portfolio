import {
	lazy,
	Suspense,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type ReactNode,
	type UIEvent,
} from "react";
import { AnimateIcon } from "@animate-ui/react/icons";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Folder } from "./components/animate-ui/icons/folder";
import { House } from "./components/animate-ui/icons/house";
import { Mail as MailIcon } from "./components/animate-ui/icons/mail";
import { UserRound } from "./components/animate-ui/icons/user-round";
import Poco from "./components/TerminalAssistant";
import TerminalLoader from "./components/TerminalLoader";
import TerminalSettings, {
	type TerminalTheme,
} from "./components/TerminalSettings";
import VHS from "./components/canvasui/VHS";
import CanvasProbe from "./pages/CanvasProbe";
import CanvasProbeV2, {
	canvasProbeV2ModeFromHash,
} from "./pages/CanvasProbeV2";
import BoringResume from "./pages/BoringResume";
import Home from "./pages/Home";

type Page = "home" | "projects" | "about" | "contact";
const boringScrollStorageKey = "jans.dev.boring-return-scroll";
const boringHeroStorageKey = "jans.dev.boring-return-hero";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function readTerminalTheme(): TerminalTheme {
	try {
		const saved = localStorage.getItem("jans.dev.terminal-theme");
		if (
			saved === "green" ||
			saved === "amber" ||
			saved === "blue" ||
			saved === "white"
		) {
			return saved;
		}
	} catch {
		return "amber";
	}
	return "amber";
}

type VHSAnimatedIconElement = HTMLSpanElement & {
	vhsHoverEnter?: () => void;
	vhsHoverLeave?: () => void;
};

function AnimatedDockIcon({ children }: { children: ReactNode }) {
	const [active, setActive] = useState(false);
	const setHoverRef = (element: HTMLSpanElement | null) => {
		if (!element) return;
		const icon = element as VHSAnimatedIconElement;
		icon.vhsHoverEnter = () => setActive(true);
		icon.vhsHoverLeave = () => setActive(false);
	};

	return (
		<AnimateIcon animate={active} asChild>
			<span
				className="terminal-dock-icon"
				data-vhs-animate-hover=""
				onPointerEnter={(event) => {
					if (event.pointerType !== "touch") setActive(true);
				}}
				onPointerLeave={() => setActive(false)}
				ref={setHoverRef}
			>
				{children}
			</span>
		</AnimateIcon>
	);
}

function pageForPath(pathname: string): Page {
	if (pathname === "/projects") return "projects";
	if (pathname === "/contact") return "contact";
	if (pathname === "/personnel" || pathname === "/about") return "about";
	return "home";
}

function App() {
	const location = useLocation();
	const [flash, setFlash] = useState(0);
	const [pastHero, setPastHero] = useState(false);
	const [theme, setTheme] = useState<TerminalTheme>(readTerminalTheme);
	const [boringMode, setBoringMode] = useState(
		() => window.location.hash === "#boring",
	);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const boringModeRef = useRef(boringMode);
	const pastHeroRef = useRef(pastHero);
	boringModeRef.current = boringMode;
	pastHeroRef.current = pastHero;
	const previousPath = useRef(location.pathname);
	const page = pageForPath(location.pathname);
	const canvasProbeV2Mode = canvasProbeV2ModeFromHash(window.location.hash);

	useLayoutEffect(() => {
		document.documentElement.dataset.terminalTheme = theme;
	}, [theme]);
	useLayoutEffect(() => {
		if (boringMode) return;
		const scroller = document.getElementById("terminal-scroll");
		if (!scroller) return;
		try {
			const savedScroll = sessionStorage.getItem(boringScrollStorageKey);
			if (savedScroll === null) return;
			scroller.scrollTop = Number(savedScroll);
			sessionStorage.removeItem(boringScrollStorageKey);
			sessionStorage.removeItem(boringHeroStorageKey);
		} catch {
			// The page still works when session storage is unavailable.
		}
	}, [boringMode]);
	useEffect(() => {
		try {
			localStorage.setItem("jans.dev.terminal-theme", theme);
		} catch {
			// Settings still apply for the current session when storage is unavailable.
		}
	}, [theme]);
	useEffect(() => {
		const syncBoringRoute = () => {
			const nextBoringMode = window.location.hash === "#boring";
			if (nextBoringMode && !boringModeRef.current) {
				const scroller = document.getElementById("terminal-scroll");
				if (scroller) {
					try {
						sessionStorage.setItem(
							boringScrollStorageKey,
							String(scroller.scrollTop),
						);
						sessionStorage.setItem(
							boringHeroStorageKey,
							String(pastHeroRef.current),
						);
					} catch {
						// Keep the route switch working when session storage is unavailable.
					}
				}
			} else if (!nextBoringMode && boringModeRef.current) {
				try {
					const savedHero = sessionStorage.getItem(boringHeroStorageKey);
					if (savedHero !== null) setPastHero(savedHero === "true");
				} catch {
					// The scroll handler recalculates the hero state after returning.
				}
			}
			boringModeRef.current = nextBoringMode;
			const settingsDialog = document.querySelector<HTMLDialogElement>(
				".terminal-settings",
			);
			if (settingsDialog?.open) settingsDialog.close();
			setSettingsOpen(false);
			setBoringMode(nextBoringMode);
		};
		window.addEventListener("hashchange", syncBoringRoute);
		return () => window.removeEventListener("hashchange", syncBoringRoute);
	}, []);

	useEffect(() => {
		const changedRoute = previousPath.current !== location.pathname;
		previousPath.current = location.pathname;
		setPastHero(false);
		document.getElementById("terminal-scroll")?.scrollTo({ top: 0 });
		if (changedRoute) setFlash((value) => value + 1);
	}, [location.pathname]);
	useEffect(() => {
		const root = document.getElementById("terminal-scroll");
		if (!root) return;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const targets = new Set<HTMLElement>();
		let wasAtTop = root.scrollTop <= 64;

		let observer: IntersectionObserver | undefined;
		const createObserver = () => {
			observer?.disconnect();
			if (reducedMotion || !("IntersectionObserver" in window)) {
				targets.forEach((target) => target.setAttribute("data-scroll-visible", "true"));
				return;
			}
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach(({ isIntersecting, target }) => {
						if (!isIntersecting) return;
						target.setAttribute("data-scroll-visible", "true");
					});
				},
				{
					root,
					rootMargin: `0px 0px -${Math.round(root.clientHeight * 0.35)}px 0px`,
				},
			);
			targets.forEach((target) => {
				if (!target.hasAttribute("data-scroll-visible")) observer?.observe(target);
			});
		};
		if ("IntersectionObserver" in window) {
			createObserver();
		}
		const observeNewTargets = () => {
			root.querySelectorAll<HTMLElement>("[data-scroll-flicker]").forEach((target) => {
				if (targets.has(target)) return;
				targets.add(target);
				if (reducedMotion || !observer) {
					target.setAttribute("data-scroll-visible", "true");
				} else {
					observer.observe(target);
				}
			});
		};
		observeNewTargets();
		const mutations = new MutationObserver(observeNewTargets);
		mutations.observe(root, { childList: true, subtree: true });
		const resetRevealsAtTop = () => {
			const isAtTop = root.scrollTop <= 64;
			if (isAtTop && !wasAtTop) {
				root.querySelectorAll<HTMLElement>("[data-scroll-flicker]").forEach((target) => {
					target.removeAttribute("data-scroll-visible");
					if (observer) {
						observer.unobserve(target);
						observer.observe(target);
					}
				});
			}
			wasAtTop = isAtTop;
		};
		const updateObserverBounds = () => createObserver();
		window.addEventListener("resize", updateObserverBounds);
		root.addEventListener("scroll", resetRevealsAtTop, { passive: true });
		return () => {
			observer?.disconnect();
			mutations.disconnect();
			window.removeEventListener("resize", updateObserverBounds);
			root.removeEventListener("scroll", resetRevealsAtTop);
		};
	}, [boringMode]);

	if (window.location.hash === "#canvas-probe") return <CanvasProbe />;
	if (canvasProbeV2Mode) return <CanvasProbeV2 mode={canvasProbeV2Mode} />;
	if (boringMode)
		return (
			<BoringResume
				onReturnToMain={() => {
					setSettingsOpen(false);
					window.location.hash = "";
				}}
			/>
		);

	const handleScreenScroll = (event: UIEvent<HTMLDivElement>) => {
		if (page !== "home") return;
		const hero = event.currentTarget.querySelector<HTMLElement>("[data-home-hero]");
		const threshold = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
		const next = event.currentTarget.scrollTop >= threshold - 1;
		setPastHero((current) => (current === next ? current : next));
	};

	const scrollToContent = () => {
		const scroller = document.getElementById("terminal-scroll");
		const content = scroller?.querySelector<HTMLElement>("#home-content");
		if (scroller && content) {
			scroller.scrollTo({ top: content.offsetTop, behavior: "smooth" });
		}
	};

	return (
		<main
			className="h-dvh w-full overflow-hidden bg-base-100 text-base-content"
			data-terminal-theme={theme}
		>
			<div className="relative h-full w-full">
				<VHS
					className={`crt-screen crt-screen--${theme} relative h-full w-full overflow-hidden border border-primary/70 bg-base-100`}
					barrel={0.5}
					scanlines={0.18}
					grain={0.12}
					vignette={0.75}
					saturation={0.45}
					contentClassName={
						page === "home" && !pastHero ? "home-hero-snap" : undefined
					}
					contentId="terminal-scroll"
					contentStyle={{
						width: "100%",
						minWidth: "100%",
						height: "100%",
						minHeight: "100%",
					}}
					onScroll={handleScreenScroll}
				>
					<div className="terminal-app relative min-h-full">
						<div className="terminal-dock-slot">
							<nav
								aria-label="Primary navigation"
								className={`terminal-dock ${page === "home" && !pastHero ? "terminal-dock--hidden" : ""}`}
							>
								<NavLink
									aria-label="Home"
									className="terminal-dock-item"
									data-vhs-expanded-hitbox=""
									end
									to="/"
									onClick={() => {
										setPastHero(false);
										document.getElementById("terminal-scroll")?.scrollTo({
											top: 0,
											behavior: "smooth",
										});
									}}
								>
									<span className="terminal-dock-content">
										<AnimatedDockIcon>
											<House size={20} />
										</AnimatedDockIcon>
										<span>HOME</span>
									</span>
								</NavLink>
								<NavLink
									aria-label="Personnel"
									className="terminal-dock-item"
									data-vhs-expanded-hitbox=""
									to="/personnel"
								>
									<span className="terminal-dock-content">
										<AnimatedDockIcon>
											<UserRound size={20} />
										</AnimatedDockIcon>
										<span>PERSONNEL</span>
									</span>
								</NavLink>
								<NavLink
									aria-label="Projects"
									className="terminal-dock-item"
									data-vhs-expanded-hitbox=""
									to="/projects"
								>
									<span className="terminal-dock-content">
										<AnimatedDockIcon>
											<Folder size={20} />
										</AnimatedDockIcon>
										<span>PROJECTS</span>
									</span>
								</NavLink>
								<NavLink
									aria-label="Contact"
									className="terminal-dock-item"
									data-vhs-expanded-hitbox=""
									to="/contact"
								>
									<span className="terminal-dock-content">
										<AnimatedDockIcon>
											<MailIcon size={20} />
										</AnimatedDockIcon>
										<span>CONTACT</span>
									</span>
								</NavLink>
							</nav>
						</div>
						<div className="assistant-stage">
							<Poco
								onOpenSettings={() => setSettingsOpen(true)}
								page={page}
								pastHero={pastHero}
							/>
						</div>
						<div className="relative min-h-full">
							<div className="terminal-content-frame mx-auto min-h-full max-w-7xl px-4 py-4 pb-28 sm:px-8 sm:py-8 sm:pb-28">
								<Suspense fallback={<TerminalLoader />}>
									<Routes>
									<Route
										path="/"
										element={<Home onScrollToContent={scrollToContent} />}
									/>
									<Route path="/personnel" element={<About />} />
									<Route
										path="/about"
										element={<Navigate replace to="/personnel" />}
									/>
									<Route path="/projects" element={<Projects />} />
									<Route path="/contact" element={<Contact />} />
									<Route path="*" element={<Navigate replace to="/" />} />
								</Routes>
								</Suspense>
								<footer className="terminal-section pt-6 text-sm">
									<p className="terminal-label">
										COPYRIGHT {new Date().getFullYear()} // JANS CABALLEGAN
									</p>
								</footer>
							</div>
						</div>
						{flash > 0 && <span className="terminal-flash" key={flash} />}
					</div>
				</VHS>
			</div>
			<TerminalSettings
				boringMode={boringMode}
				onBoringModeChange={(enabled) => {
					const dialog = document.querySelector<HTMLDialogElement>(
						".terminal-settings",
					);
					if (dialog?.open) dialog.close();
					setSettingsOpen(false);
					window.location.hash = enabled ? "boring" : "";
				}}
				onClose={() => setSettingsOpen(false)}
				onThemeChange={setTheme}
				open={settingsOpen}
				theme={theme}
			/>
		</main>
	);
}

export default App;
