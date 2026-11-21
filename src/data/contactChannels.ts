const emailAddress = "raphael.caballegan@gmail.com";
const githubUsername = "arcsine0";
const linkedinSlug = "jans-caballegan";

export const contactChannels = {
	email: {
		address: emailAddress,
		href: `mailto:${emailAddress}`,
	},
	phone: {
		display: "+63 967 312 7888",
		href: "tel:+639673127888",
	},
	github: {
		username: githubUsername,
		href: `https://github.com/${githubUsername}`,
	},
	linkedin: {
		slug: linkedinSlug,
		href: `https://www.linkedin.com/in/${linkedinSlug}/`,
	},
} as const;
