import { useEffect, useState } from "react";

function greetingForBrowserTime() {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning, operator. The signal is feeling fresh.";
	if (hour < 18)
		return "Good afternoon, operator. Systems are pleasantly awake.";
	return "Good evening, operator. The archive lights are still on.";
}

function createLines() {
	return [
		greetingForBrowserTime(),
		"Link established. Welcome aboard.",
		"Archive systems are standing by.",
		"I will keep the signal clear.",
		"Scroll when you are ready.",
		"I have counted the pixels. There are quite a few.",
		"Please do not feed the archive after midnight.",
		"My imaginary antennae are delighted to see you.",
		"Stars are just very punctual status lights.",
		"A tiny bit of whimsy has been added to the signal.",
	];
}

const eyes = {
	center: "⦿",
	left: "◐",
	right: "◑",
	up: "◓",
	down: "◒",
};

const idleMouths = ["ᆺ", "₃", "ᵕ", ".", "~", "⤙"];
const talkingMouths = ["□", "ᵕ", "ᗜ", ".", "⌓"];
type Gaze = keyof typeof eyes;

function Poco({ isBackground }: { isBackground: boolean }) {
	const [lines] = useState(createLines);
	const [gaze, setGaze] = useState<Gaze>("center");
	const [isTalking, setIsTalking] = useState(true);
	const [lineIndex, setLineIndex] = useState(0);
	const [mouthIndex, setMouthIndex] = useState(0);
	const [idleMouthIndex, setIdleMouthIndex] = useState(idleMouths.length - 1);
	const [toastLine, setToastLine] = useState<string | null>(null);
	const [isBlinking, setIsBlinking] = useState(false);

	useEffect(() => {
		const onPointerMove = (event: PointerEvent) => {
			const x = event.clientX / window.innerWidth - 0.5;
			const y = event.clientY / window.innerHeight - 0.5;
			const next: Gaze =
				Math.abs(x) > Math.abs(y)
					? x < -0.16
						? "left"
						: x > 0.16
							? "right"
							: "center"
					: y < -0.16
						? "up"
						: y > 0.16
							? "down"
							: "center";
			setGaze((current) => (current === next ? current : next));
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => window.removeEventListener("pointermove", onPointerMove);
	}, []);

	useEffect(() => {
		let nextBlink = 0;
		let endBlink = 0;
		const blink = () => {
			setIsBlinking(true);
			endBlink = window.setTimeout(() => {
				setIsBlinking(false);
				nextBlink = window.setTimeout(blink, 2600 + Math.random() * 2200);
			}, 150);
		};
		nextBlink = window.setTimeout(blink, 2200);
		return () => {
			window.clearTimeout(nextBlink);
			window.clearTimeout(endBlink);
		};
	}, []);

	useEffect(() => {
		let nextLine = 0;
		let speechTimer = 0;
		let pauseTimer = 0;
		const speak = () => {
			setLineIndex(nextLine);
			nextLine = (nextLine + 1) % lines.length;
			setIsTalking(true);
			speechTimer = window.setTimeout(() => {
				setIdleMouthIndex((current) => (current + 1) % idleMouths.length);
				setIsTalking(false);
				pauseTimer = window.setTimeout(speak, 2200);
			}, 3000);
		};

		speak();
		return () => {
			window.clearTimeout(speechTimer);
			window.clearTimeout(pauseTimer);
		};
	}, []);

	useEffect(() => {
		if (!isTalking) return;
		setMouthIndex(0);
		const interval = window.setInterval(
			() => setMouthIndex((current) => (current + 1) % talkingMouths.length),
			150,
		);
		return () => window.clearInterval(interval);
	}, [isTalking]);

	useEffect(() => {
		if (!isBackground || !isTalking) {
			setToastLine(null);
			return;
		}
		setToastLine(lines[lineIndex]);
		const timeout = window.setTimeout(() => setToastLine(null), 3200);
		return () => window.clearTimeout(timeout);
	}, [isBackground, isTalking, lineIndex]);

	const blinkEye = "—";
	const eye = isBlinking ? blinkEye : eyes[gaze];
	const mouth = isTalking
		? talkingMouths[mouthIndex]
		: idleMouths[idleMouthIndex];

	return (
		<>
			<div
				className={`assistant-engine ${isBackground ? "assistant-engine--background" : ""}`}
			>
				<div className="assistant-float">
					<p className="assistant-face" aria-hidden="true">
						( {eye}{" "}
						<span
							className="assistant-mouth"
							key={`${isTalking}-${isTalking ? mouthIndex : idleMouthIndex}`}
						>
							{mouth}
						</span>{" "}
						{eye} )
					</p>
					<p
						className={`assistant-subtitle ${isTalking && !isBackground ? "assistant-subtitle--visible" : ""}`}
						aria-live={isTalking && !isBackground ? "polite" : "off"}
					>
						{isTalking && !isBackground ? lines[lineIndex] : ""}
					</p>
				</div>
			</div>
			{toastLine && (
				<div
					className="toast toast-end toast-bottom assistant-toast"
					aria-live="polite"
				>
					<div role="alert" className="alert alert-outline">
						<div className="avatar avatar-placeholder self-center">
							<div className="grid size-12 place-items-center rounded-none bg-primary font-mono text-base leading-none text-primary-content">
								<span className="block -translate-y-px">
									{eye}
									{mouth}
								</span>
							</div>
						</div>
						<span>{toastLine}</span>
					</div>
				</div>
			)}
		</>
	);
}

export default Poco;
