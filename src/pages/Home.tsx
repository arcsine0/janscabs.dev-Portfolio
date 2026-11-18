import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import TerminalGlyphText from "../components/TerminalGlyphText";

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
			<div id="home-content" className="home-content">
				<section className="home-brief py-12 sm:py-20" data-scroll-flicker>
					<div className="home-brief-frame">
						<span aria-hidden="true" className="home-brief-frame-label">
							+-------------------- SYS // 01 --------------------+
						</span>
						<div className="home-brief-copy">
							<p className="terminal-label mb-5">
								SYS.ACCESS // FULL-STACK TYPESCRIPT DEVELOPER
							</p>
							<h1
								aria-label="Building useful things for the internet."
								className="home-brief-title"
								data-scroll-flicker
							>
								<TerminalGlyphText
									seed="home-brief-title"
									text="Building useful things for the internet."
								/>
							</h1>
							<p className="home-brief-description">
								I design clear web experiences backed by dependable engineering.
							</p>
						</div>
					</div>
				</section>

				<section id="work" className="terminal-section home-archive py-14 sm:py-20" data-scroll-flicker>
					<div className="home-archive-layout">
						<header className="home-archive-heading">
							<p className="terminal-label mb-4">ARCHIVE // 02</p>
							<h2
								aria-label="Mission Select"
								className="home-archive-title"
								data-scroll-flicker
							>
								<TerminalGlyphText seed="mission-select" text={"MISSION\nSELECT"} />
							</h2>
							<p className="home-archive-note">CHOOSE A FILE TO OPEN</p>
							<div className="home-archive-count" aria-label="3 project records">
								<strong>03</strong>
								<span>
									RECORDS
									<br />
									ON FILE
								</span>
							</div>
						</header>
						<div className="home-archive-results">
							<div className="home-record-list">
								{projects.map(([number, name, description]) => (
									<article className="home-record" data-scroll-flicker key={number}>
										<span className="home-record-number">{number}</span>
										<div className="home-record-copy">
											<p className="terminal-label">// RECORD {number}</p>
											<h3 className="mt-2 text-xl font-normal sm:text-2xl">{name}</h3>
											<p className="mt-2 text-sm text-base-content/75">{description}</p>
										</div>
										<Link className="btn btn-ghost btn-sm home-record-link" to="/projects">
											Inspect <ArrowUpRight aria-hidden="true" className="size-4" />
										</Link>
									</article>
								))}
							</div>
							<Link className="home-archive-link link link-hover mt-6 inline-flex" to="/projects">
								OPEN FULL ARCHIVE <span aria-hidden="true">------------------&gt;</span>
							</Link>
						</div>
					</div>
				</section>

				<section className="terminal-section home-dossier py-14 sm:py-20" data-scroll-flicker>
					<div className="home-dossier-mark" aria-hidden="true">
						<span>PERSONNEL</span>
						<strong>J//C</strong>
						<span>PROFILE VERIFIED</span>
					</div>
					<div className="home-dossier-copy">
						<p className="terminal-label mb-3">DOSSIER // 03</p>
						<h2
							aria-label="Human interface, machine precision."
							className="whitespace-pre-line text-2xl font-normal sm:text-3xl"
							data-scroll-flicker
						>
							<TerminalGlyphText
								seed="home-dossier-title"
								text={"HUMAN INTERFACE,\nMACHINE PRECISION."}
							/>
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-base-content/75">
							I am Raphael "Jans" Caballegan, a full-stack developer focused on
							elegant products, maintainable systems, and the space where the two meet.
						</p>
						<Link className="btn btn-ghost btn-sm mt-5" to="/personnel">
							Read personnel file <ArrowUpRight aria-hidden="true" className="size-4" />
						</Link>
					</div>
					<span className="home-dossier-coordinate terminal-label">BASE // PHILIPPINES</span>
				</section>
			</div>
		</main>
	);
}

export default Home;
