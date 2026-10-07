import { ArrowLeft, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
	return (
		<main className="py-12 sm:py-16">
			<header className="mb-8 sm:mb-12">
				<p className="terminal-label mb-4">
					PERSONNEL.ARCHIVE // ACCESS GRANTED
				</p>
				<h1 className="max-w-4xl text-4xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
					RAPHAEL "JANS"
					<br />
					CABALLEGAN
				</h1>
				<p className="mt-5 text-base text-base-content/75 sm:text-lg">
					FULL-STACK WEB DEVELOPER // REMOTE OPERATIONS
				</p>
			</header>

			<div className="grid items-start gap-6 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.6fr)]">
				<aside className="card card-border terminal-panel lg:self-start lg:sticky lg:top-6">
					<div className="card-body gap-6 p-6 sm:p-8">
						<div className="border border-primary/60 bg-primary/8 p-5">
							<p className="terminal-label">IDENTIFICATION MARK</p>
							<p className="mt-4 text-4xl tracking-[-0.08em] text-primary">
								J//C
							</p>
							<p className="mt-3 text-xs text-base-content/65">
								PROFILE VERIFIED
							</p>
						</div>
						<div>
							<p className="terminal-label">OPERATOR SUMMARY</p>
							<p className="mt-3 leading-7 text-base-content/75">
								Full-stack web developer focused on robust, scalable web and
								mobile applications, with an emphasis on interactive interfaces
								and dependable systems.
							</p>
						</div>
						<div className="terminal-rule" />
						<dl className="grid gap-4 text-sm">
							<div>
								<dt className="terminal-label">BASE OF OPERATIONS</dt>
								<dd className="mt-1 text-base-content/75">
									Batasan Hills, Quezon City
								</dd>
							</div>
							<div>
								<dt className="terminal-label">DEPLOYMENT MODE</dt>
								<dd className="mt-1 text-base-content/75">Remote</dd>
							</div>
						</dl>
						<div className="terminal-rule" />
						<div>
							<p className="terminal-label">COMMS CHANNELS</p>
							<div className="mt-3 grid gap-3 text-sm">
								<a
									className="link link-hover flex items-center gap-2"
									href="mailto:raphael.caballegan@gmail.com"
								>
									<Mail className="size-4 text-primary" /> Email
								</a>
								<a
									className="link link-hover flex items-center gap-2"
									href="tel:+639673127888"
								>
									<Phone className="size-4 text-primary" /> +63 967 312 7888
								</a>
								<a
									className="link link-hover flex items-center gap-2"
									href="https://www.linkedin.com/in/jans-caballegan"
									target="_blank"
									rel="noreferrer"
								>
									<Linkedin className="size-4 text-primary" /> LinkedIn
								</a>
								<a
									className="link link-hover flex items-center gap-2"
									href="https://github.com/arcsine0"
									target="_blank"
									rel="noreferrer"
								>
									<Github className="size-4 text-primary" /> GitHub
								</a>
							</div>
						</div>
					</div>
				</aside>

				<div className="grid gap-6">
					<section className="card card-border terminal-panel">
						<div className="card-body gap-6 p-6 sm:p-8">
							<div>
								<p className="terminal-label">ACTIVE SERVICE RECORD</p>
								<h2 className="card-title mt-3 text-2xl font-normal sm:text-3xl">
									SEEK MARKETING PARTNERS
								</h2>
								<p className="mt-1 text-sm text-base-content/70">
									JUNIOR FULL-STACK WEB DEVELOPER // JUN 2025 -- PRESENT //
									REMOTE
								</p>
							</div>
							<div className="terminal-rule" />
							<ul className="grid gap-3 text-sm leading-6 text-base-content/75">
								<li>
									&gt; Built business websites with Gatsby, React, and
									WordPress.
								</li>
								<li>
									&gt; Designed WordPress sites with WPBakery, Beaver Builder,
									and Elementor.
								</li>
								<li>
									&gt; Shipped features and hotfixes for a PHP, Symfony,
									Laravel, and MySQL learning management system.
								</li>
								<li>
									&gt; Developed delivery application interfaces with Expo and
									React Native.
								</li>
							</ul>
						</div>
					</section>

					<section className="card card-border terminal-panel">
						<div className="card-body gap-6 p-6 sm:p-8">
							<div>
								<p className="terminal-label">PRIOR SERVICE RECORD</p>
								<h2 className="card-title mt-3 text-2xl font-normal sm:text-3xl">
									SEEK SOCIAL LTD.
								</h2>
								<p className="mt-1 text-sm text-base-content/70">
									JUNIOR WEB DEVELOPER INTERN + SEO ASSISTANT // JAN 2025 -- JUN
									2025 // REMOTE
								</p>
							</div>
							<div className="terminal-rule" />
							<ul className="grid gap-3 text-sm leading-6 text-base-content/75">
								<li>
									&gt; Designed and optimized WordPress sites with WPBakery,
									Beaver Builder, and Elementor.
								</li>
								<li>
									&gt; Built Gatsby React pages integrated with WordPress as a
									CRM.
								</li>
								<li>
									&gt; Produced client backlinks and SEO-focused articles to
									defined style guides.
								</li>
							</ul>
						</div>
					</section>

					<section className="card card-border terminal-panel">
						<div className="card-body gap-6 p-6 sm:p-8">
							<div>
								<p className="terminal-label">SYSTEM PROFICIENCIES</p>
								<h2 className="card-title mt-3 text-2xl font-normal sm:text-3xl">
									FIELD TOOLKIT
								</h2>
							</div>
							<div className="terminal-rule" />
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<p className="terminal-label">LANGUAGES + INTERFACES</p>
									<p className="mt-2 text-sm leading-6 text-base-content/75">
										TypeScript, JavaScript, React, React Native, Gatsby, Expo
									</p>
								</div>
								<div>
									<p className="terminal-label">SYSTEMS + SERVICES</p>
									<p className="mt-2 text-sm leading-6 text-base-content/75">
										Firebase, Supabase, REST APIs, Express, PHP Symfony,
										Laravel, MySQL
									</p>
								</div>
								<div className="sm:col-span-2">
									<p className="terminal-label">CONTENT SYSTEMS</p>
									<p className="mt-2 text-sm leading-6 text-base-content/75">
										WordPress, WPBakery, Beaver Builder, Elementor, search
										engine optimization
									</p>
								</div>
							</div>
						</div>
					</section>

					<Link
						to="/"
						className="btn btn-ghost btn-sm justify-self-start"
					>
						<ArrowLeft className="size-4" /> Return to home
					</Link>
				</div>
			</div>
		</main>
	);
}

export default About;
