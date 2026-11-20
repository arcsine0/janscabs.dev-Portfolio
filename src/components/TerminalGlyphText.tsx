import type { CSSProperties } from "react";

type GlyphStyle = CSSProperties & {
	"--glyph-delay": string;
	"--glyph-duration": string;
};

function seedHash(seed: string) {
	let hash = 2166136261;
	for (const character of seed) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
	return hash;
}

function glyphNoise(hash: number, index: number) {
	const value = Math.sin(hash * 0.001 + index * 12.9898) * 43758.5453;
	return value - Math.floor(value);
}

function TerminalGlyphText({ text, seed }: { text: string; seed: string }) {
	const hash = seedHash(seed);
	return (
		<>
			{Array.from(text).map((character, index) => {
				const timing = glyphNoise(hash, index);
				const style: GlyphStyle = {
					"--glyph-delay": `${Math.round(timing * 130)}ms`,
				"--glyph-duration": `${360 + Math.round(
					glyphNoise(hash, index + text.length) * 100,
				)}ms`,
				};

				return (
					<span
						aria-hidden="true"
						className="terminal-glyph"
						key={index}
						style={style}
					>
						{character}
					</span>
				);
			})}
		</>
	);
}

export default TerminalGlyphText;
