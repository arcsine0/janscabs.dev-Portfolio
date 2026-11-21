import { Github, Linkedin, Mail } from "lucide-react";
import type { FormEvent } from "react";
import TerminalGlyphText from "../components/TerminalGlyphText";
import { contactChannels } from "../data/contactChannels";

function Contact() {
	const sendMessage = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = String(formData.get("name"));
		const email = String(formData.get("email"));
		const message = String(formData.get("message"));
		const subject = `Portfolio transmission from ${name}`;
		const body = `From: ${name}\nReply address: ${email}\n\n${message}`;

		window.location.href =
			`${contactChannels.email.href}?subject=${encodeURIComponent(subject)}` +
			`&body=${encodeURIComponent(body)}`;
	};

	return (
		<main className="py-10 sm:py-16">
			<header className="mb-8 sm:mb-12">
				<p className="terminal-label mb-4">COMMS.RELAY // OPEN CHANNEL</p>
				<h1
					aria-label="Contact Jans"
					className="text-4xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
					data-scroll-flicker
				>
					<TerminalGlyphText seed="contact-title" text="OPEN CHANNEL" />
				</h1>
				<p className="mt-5 max-w-2xl text-base leading-7 text-base-content/75 sm:text-lg">
					Have a project in mind or just want to say hello? Send a transmission
					through the form below.
				</p>
			</header>

			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
				<section
					aria-labelledby="contact-form-title"
					className="card card-border terminal-panel min-w-0"
				>
					<div className="card-body gap-6 p-5 sm:p-8">
						<div>
							<p className="terminal-label">OUTGOING TRANSMISSION</p>
							<h2
								className="card-title mt-3 text-2xl font-normal sm:text-3xl"
								id="contact-form-title"
							>
								MESSAGE COMPOSER
							</h2>
						</div>
						<div className="terminal-rule" />
						<form className="grid gap-5" onSubmit={sendMessage}>
							<div className="grid gap-5 sm:grid-cols-2">
								<label className="grid min-w-0 gap-2">
									<span className="terminal-label">OPERATOR NAME</span>
									<input
										className="input w-full rounded-none border-primary/40 bg-base-100 text-base-content focus:border-primary"
										name="name"
										placeholder="Your name"
										autoComplete="name"
										required
									/>
								</label>
								<label className="grid min-w-0 gap-2">
									<span className="terminal-label">REPLY ADDRESS</span>
									<input
										className="input w-full rounded-none border-primary/40 bg-base-100 text-base-content focus:border-primary"
										type="email"
										name="email"
										placeholder="you@example.com"
										autoComplete="email"
										required
									/>
								</label>
							</div>
							<label className="grid min-w-0 gap-2">
								<span className="terminal-label">MESSAGE DATA</span>
								<textarea
									className="textarea min-h-44 w-full resize-y rounded-none border-primary/40 bg-base-100 text-base-content focus:border-primary"
									name="message"
									placeholder="Write your message here..."
									required
								/>
							</label>
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<p className="max-w-md text-xs leading-5 text-base-content/60">
									Sending opens your email app with the message ready to send.
								</p>
								<button
									className="btn btn-primary w-full sm:w-auto"
									type="submit"
								>
									TRANSMIT MESSAGE <span aria-hidden="true">-&gt;</span>
								</button>
							</div>
						</form>
					</div>
				</section>

				<aside className="card card-border terminal-panel min-w-0">
					<div className="card-body gap-6 p-5 sm:p-8">
						<div>
							<p className="terminal-label">DIRECT ACCESS</p>
							<h2 className="card-title mt-3 text-2xl font-normal sm:text-3xl">
								RELAY DIRECTORY
							</h2>
						</div>
						<div className="terminal-rule" />
						<div className="grid gap-5">
							<a
								className="link link-hover flex min-w-0 items-start gap-3 break-all text-sm"
					href={contactChannels.email.href}
							>
								<Mail
									aria-hidden="true"
									className="mt-0.5 size-4 shrink-0 text-primary"
								/>
								<span>
									<span className="terminal-label block">EMAIL</span>
									{contactChannels.email.address}
								</span>
							</a>
							<a
								className="link link-hover flex min-w-0 items-start gap-3 break-all text-sm"
					href={contactChannels.github.href}
								target="_blank"
								rel="noreferrer"
							>
								<Github
									aria-hidden="true"
									className="mt-0.5 size-4 shrink-0 text-primary"
								/>
								<span>
									<span className="terminal-label block">GITHUB</span>
									github.com/{contactChannels.github.username}
								</span>
							</a>
							<a
								className="link link-hover flex min-w-0 items-start gap-3 break-all text-sm"
					href={contactChannels.linkedin.href}
								target="_blank"
								rel="noreferrer"
							>
								<Linkedin
									aria-hidden="true"
									className="mt-0.5 size-4 shrink-0 text-primary"
								/>
								<span>
									<span className="terminal-label block">LINKEDIN</span>
									linkedin.com/in/{contactChannels.linkedin.slug}
								</span>
							</a>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}

export default Contact;
