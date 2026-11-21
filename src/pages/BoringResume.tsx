import { contactChannels } from "../data/contactChannels";

const experience = [
	{
		company: "Seek Marketing Partners",
		role: "Junior Full-Stack Web Developer",
		period: "June 2025 – Present",
		location: "Remote",
		responsibilities: [
			"Build client websites with Gatsby, React, and WordPress.",
			"Develop delivery app interfaces with Expo and React Native.",
			"Ship features and hotfixes for a PHP, Symfony, Laravel, and MySQL learning management system.",
		],
	},
	{
		company: "Seek Social Ltd.",
		role: "Junior Web Developer Intern and SEO Assistant",
		period: "January 2025 – June 2025",
		location: "Remote",
		responsibilities: [
			"Built Gatsby pages integrated with WordPress as a CMS.",
			"Designed and optimized WordPress sites with WPBakery, Beaver Builder, and Elementor.",
			"Created backlinks and wrote SEO articles to client style guides.",
		],
	},
];

const projects = [
	{
		name: "P2Trust",
		role: "Lead Developer and Project Leader · August–October 2024",
		description:
			"FinTech mobile application built with Expo, React Native, and TypeScript. Integrated Supabase for data and user management, implemented end-to-end encrypted messaging, and designed a National ID e-verification KYC flow.",
	},
	{
		name: "SmartTicket",
		description: "Ticketing application.",
	},
	{
		name: "Cryptodw",
		description: "Cryptocurrency dashboard.",
	},
	{
		name: "Kaquizz",
		description: "Learning platform.",
	},
];

function BoringResume({ onReturnToMain }: { onReturnToMain: () => void }) {
	return (
		<main className="boring-resume">
			<article className="boring-resume-document">
				<header className="boring-resume-header">
					<div className="boring-resume-heading-row">
						<div>
							<h1>Raphael “Jans” Caballegan</h1>
							<p className="boring-resume-role">Full-Stack Web Developer</p>
						</div>
						<div className="terminal-settings-box boring-resume-mode-box">
							<label className="terminal-boring-option">
								<span className="terminal-label">BORING MODE</span>
								<input
									aria-label="Return to the main theme"
									checked
									className="toggle toggle-primary"
									onChange={onReturnToMain}
									type="checkbox"
								/>
							</label>
						</div>
					</div>
					<address>
						<span>Batasan Hills, Quezon City, Philippines</span>
						<a href={contactChannels.email.href}>{contactChannels.email.address}</a>
						<a href={contactChannels.phone.href}>{contactChannels.phone.display}</a>
						<a href={contactChannels.github.href}>GitHub</a>
						<a href={contactChannels.linkedin.href}>LinkedIn</a>
					</address>
				</header>

				<section>
					<h2>Professional Summary</h2>
					<p>
						Full-stack web developer building web and mobile applications with
						TypeScript, React, and modern content platforms. Experienced in
						frontend development, backend integrations, and website delivery.
					</p>
				</section>

				<section>
					<h2>Professional Experience</h2>
					{experience.map((record) => (
						<article className="boring-resume-entry" key={record.company}>
							<h3>{record.company}</h3>
							<p>
								<strong>{record.role}</strong> · {record.period} · {record.location}
							</p>
							<ul>
								{record.responsibilities.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</article>
					))}
				</section>

				<section>
					<h2>Selected Projects</h2>
					{projects.map((project) => (
						<article className="boring-resume-entry" key={project.name}>
							<h3>{project.name}</h3>
							{project.role && <p>{project.role}</p>}
							<p>{project.description}</p>
						</article>
					))}
				</section>

				<section>
					<h2>Technical Skills</h2>
					<dl className="boring-resume-skills">
						<div>
							<dt>Languages</dt>
							<dd>TypeScript, JavaScript, PHP</dd>
						</div>
						<div>
							<dt>Web and Mobile</dt>
							<dd>React, React Native, Expo, Gatsby, Express, REST APIs</dd>
						</div>
						<div>
							<dt>Data and Platforms</dt>
							<dd>Supabase, Firebase, MySQL, WordPress</dd>
						</div>
						<div>
							<dt>Other</dt>
							<dd>Symfony, Laravel, WPBakery, Beaver Builder, Elementor, SEO</dd>
						</div>
					</dl>
				</section>
			</article>
		</main>
	);
}

export default BoringResume;
