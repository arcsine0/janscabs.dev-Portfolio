import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent,
} from "react";

type Page = "home" | "projects" | "about";
type LineGroup =
	| "boot"
	| "hero"
	| "homeReturn"
	| "homeContent"
	| "personnel"
	| "projects"
	| "contact"
	| "inactive"
	| "eyeClick"
	| "cheekClick"
	| "shake";

function greetingForBrowserTime() {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning, operator. The signal is feeling fresh.";
	if (hour < 18)
		return "Good afternoon, operator. Systems are pleasantly awake.";
	return "Good evening, operator. The archive lights are still on.";
}

const lines: Record<LineGroup, string[]> = {
	boot: [
		greetingForBrowserTime(),
		"Poco online. I brought a spare pixel, just in case.",
		"Terminal awake. Please mind the freshly polished phosphor.",
	],
	hero: [
		"This is the quiet bit. Dramatic, isn’t it?",
		"I am practicing my heroic floating pose.",
		"A blank canvas! I promise not to draw a mustache on it.",
		"Scroll when ready. I’ll keep the lights warm.",
	],
	homeReturn: [
		"Welcome back to the bridge. I saved your seat.",
		"Home signal reacquired. The void missed you.",
		"Back to the hero deck. Excellent navigational instincts.",
	],
	homeContent: [
		"Portfolio records unlocked. No secret hand stamp required.",
		"These are the useful-things-for-the-internet files.",
		"Work samples ahead. Please admire responsibly.",
		"I catalogued the pixels. They are all doing their best.",
	],
	personnel: [
		"Personnel record open. Operator Jans appears highly capable.",
		"Credential scan complete. Very respectable human detected.",
		"Background file loaded. No embarrassing yearbook photos found.",
		"Professional history: surprisingly free of space pirates.",
	],
	projects: [
		"Project archive online. Please refrain from reorganizing by vibes.",
		"Case files loaded. Each one has been dusted for fingerprints.",
		"Experiments, systems, and a few very tidy interfaces ahead.",
		"I call this collection ‘evidence of making things.’",
	],
	contact: [
		"Open channel prepared. I will try not to read over your shoulder.",
		"Contact relay standing by. Compose something nice.",
		"Message route ready. Carrier pigeon mode remains experimental.",
	],
	inactive: [
		"Still there, operator? I have been rehearsing my blink.",
		"Five quiet minutes logged. I named three dust motes.",
		"No rush. I’ll keep watch over the little green lights.",
	],
	eyeClick: [
		"Boop acknowledged. Optical systems are ticklish.",
		"Hey! Those are precision viewing modules.",
		"You found the eyes. They are mostly decorative. Mostly.",
	],
	cheekClick: [
		"Boop! That was one of my very important brackets.",
		"Gentle! My cheeks are calibrated to be extremely decorative.",
		"Aha, personal space test. I passed by scooting over a little.",
	],
	shake: [
		"Whoa, the cursor is doing jazz hands.",
		"Rapid motion detected. I am impressed and mildly dizzy.",
		"Emergency wiggle protocol: enthusiastically enabled.",
	],
};

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

function groupFor(page: Page, pastHero: boolean): LineGroup {
	if (page === "about") return "personnel";
	if (page === "projects") return "projects";
	return pastHero ? "homeContent" : "hero";
}

function choose(group: LineGroup) {
	const choices = lines[group];
	return choices[Math.floor(Math.random() * choices.length)];
}

function Poco({
	page,
	pastHero,
	enableClickInteractions = true,
	enableDialogueToast = true,
}: {
	page: Page;
	pastHero: boolean;
	enableClickInteractions?: boolean;
	enableDialogueToast?: boolean;
}) {
	const [gaze, setGaze] = useState<Gaze>("center");
	const [activeLine, setActiveLine] = useState("");
	const [isTalking, setIsTalking] = useState(false);
	const [mouthIndex, setMouthIndex] = useState(0);
	const [idleMouthIndex, setIdleMouthIndex] = useState(idleMouths.length - 1);
	const [isBlinking, setIsBlinking] = useState(false);
	const [clickedEye, setClickedEye] = useState<"left" | "right" | null>(null);
	const [isShaking, setIsShaking] = useState(false);
	const [follow, setFollow] = useState({ x: 0, y: 0 });
	const [recoil, setRecoil] = useState({ x: 0, y: 0 });
	const [reaction, setReaction] = useState<"eye" | "cheek" | null>(null);
	const endSpeech = useRef(0);
	const endReaction = useRef(0);
	const priorityUntil = useRef(0);
	const context = useRef<LineGroup>("hero");
	const previous = useRef<{ page: Page; pastHero: boolean } | null>(null);
	const isBackground = page !== "home" || pastHero;
	const canInteract = page === "home" && !pastHero;
	const canClick = canInteract && enableClickInteractions;

	const speak = useCallback((group: LineGroup, priority = false) => {
		if (!priority && Date.now() < priorityUntil.current) return;
		window.clearTimeout(endSpeech.current);
		setActiveLine(choose(group));
		setIsTalking(true);
		if (priority) priorityUntil.current = Date.now() + 3600;
		endSpeech.current = window.setTimeout(() => {
			setIdleMouthIndex((current) => (current + 1) % idleMouths.length);
			setIsTalking(false);
		}, 3000);
	}, []);

	useEffect(() => {
		speak("boot", true);
		const interval = window.setInterval(() => speak(context.current), 7000);
		return () => {
			window.clearInterval(interval);
			window.clearTimeout(endSpeech.current);
		};
	}, [speak]);

	useEffect(() => {
		if (canInteract) return;
		setFollow({ x: 0, y: 0 });
	}, [canInteract]);

	useEffect(() => {
		const nextContext = groupFor(page, pastHero);
		const prior = previous.current;
		context.current = nextContext;
		previous.current = { page, pastHero };
		if (!prior) return;
		const returnedHome =
			page === "home" && !pastHero && (prior.page !== "home" || prior.pastHero);
		speak(returnedHome ? "homeReturn" : nextContext, true);
	}, [page, pastHero, speak]);

	useEffect(() => {
		let timeout = 0;
		const reset = () => {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => speak("inactive", true), 300_000);
		};
		const events = [
			"pointerdown",
			"pointermove",
			"keydown",
			"scroll",
			"touchstart",
		] as const;
		events.forEach((event) =>
			window.addEventListener(event, reset, { passive: true }),
		);
		reset();
		return () => {
			window.clearTimeout(timeout);
			events.forEach((event) => window.removeEventListener(event, reset));
		};
	}, [speak]);

	useEffect(() => {
		let movement = { x: 0, delta: 0, time: 0, turns: 0 };
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
			if (!canInteract) return;
			setFollow({
				x: Math.max(-22, Math.min(22, x * 44)),
				y: Math.max(-16, Math.min(16, y * 32)),
			});

			const delta = event.clientX - movement.x;
			const now = performance.now();
			if (
				Math.abs(delta) > 90 &&
				now - movement.time < 180 &&
				delta * movement.delta < 0
			) {
				movement.turns += 1;
				if (movement.turns >= 3) {
					movement.turns = 0;
					setIsShaking(true);
					speak("shake", true);
					window.setTimeout(() => setIsShaking(false), 700);
				}
			} else if (now - movement.time > 300) {
				movement.turns = 0;
			}
			movement = { x: event.clientX, delta, time: now, turns: movement.turns };
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		return () => window.removeEventListener("pointermove", onPointerMove);
	}, [canInteract, speak]);

	useEffect(() => () => window.clearTimeout(endReaction.current), []);

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
		if (!isTalking) return;
		setMouthIndex(0);
		const interval = window.setInterval(
			() => setMouthIndex((current) => (current + 1) % talkingMouths.length),
			150,
		);
		return () => window.clearInterval(interval);
	}, [isTalking]);

	const interactWithEye = (side: "left" | "right") => {
		if (!canClick) return;
		setClickedEye(side);
		setReaction("eye");
		speak("eyeClick", true);
		window.setTimeout(() => setClickedEye(null), 600);
		window.clearTimeout(endReaction.current);
		endReaction.current = window.setTimeout(() => setReaction(null), 1160);
	};
	const interactWithCheek = (event: MouseEvent<HTMLButtonElement>) => {
		if (!canClick) return;
		const x = event.clientX - window.innerWidth / 2;
		const y = event.clientY - window.innerHeight / 2;
		const distance = Math.max(1, Math.hypot(x, y));
		const magnitude = Math.min(34, Math.max(16, distance * 0.05));
		setRecoil({
			x: (-x / distance) * magnitude,
			y: (-y / distance) * magnitude,
		});
		setReaction("cheek");
		speak("cheekClick", true);
		window.clearTimeout(endReaction.current);
		endReaction.current = window.setTimeout(() => setReaction(null), 1160);
	};
	const defaultEye = isShaking ? "꩜" : eyes[gaze];
	const leftEye = isBlinking ? "—" : clickedEye === "left" ? "˃" : defaultEye;
	const rightEye = isBlinking ? "—" : clickedEye === "right" ? "˂" : defaultEye;
	const mouth = isShaking
		? "ᯅ"
		: isTalking
			? talkingMouths[mouthIndex]
			: idleMouths[idleMouthIndex];
	const presenceStyle = {
		"--poco-follow-x": `${follow.x}px`,
		"--poco-follow-y": `${follow.y}px`,
		"--poco-recoil-x": `${recoil.x}px`,
		"--poco-recoil-y": `${recoil.y}px`,
	} as CSSProperties;

	return (
		<>
			<div
				className={`assistant-engine ${isBackground ? "assistant-engine--background" : ""} ${
					canClick ? "assistant-engine--interactive" : ""
				}`}
			>
				<div className="assistant-float">
					<div
						className={`assistant-presence ${reaction ? `assistant-presence--${reaction}` : ""}`}
						style={presenceStyle}
					>
						<p className="assistant-face" aria-label="Poco assistant">
							<button
								type="button"
								className="assistant-eye assistant-cheek"
								aria-label="Nudge Poco from the left"
								onClick={interactWithCheek}
							>
								(
							</button>{" "}
							<button
								type="button"
								className="assistant-eye"
								onClick={() => interactWithEye("left")}
							>
								{leftEye}
							</button>{" "}
							<span
								className="assistant-mouth"
								key={`${isTalking}-${mouthIndex}-${idleMouthIndex}-${isShaking}`}
							>
								{mouth}
							</span>{" "}
							<button
								type="button"
								className="assistant-eye"
								onClick={() => interactWithEye("right")}
							>
								{rightEye}
							</button>{" "}
							<button
								type="button"
								className="assistant-eye assistant-cheek"
								aria-label="Nudge Poco from the right"
								onClick={interactWithCheek}
							>
								)
							</button>
						</p>
						<p
							className={`assistant-subtitle ${isTalking && !isBackground ? "assistant-subtitle--visible" : ""}`}
							aria-live={isTalking && !isBackground ? "polite" : "off"}
						>
							{isTalking && !isBackground ? activeLine : ""}
						</p>
					</div>
				</div>
			</div>
			{enableDialogueToast && isBackground && isTalking && activeLine && (
				<div
					className="toast toast-end toast-bottom assistant-toast"
					aria-live="polite"
				>
					<div role="alert" className="alert alert-outline">
						<div className="avatar avatar-placeholder assistant-toast-avatar">
							<div className="bg-primary font-mono text-base text-primary-content">
								<span>
									{defaultEye}
									{mouth}
								</span>
							</div>
						</div>
						<span>{activeLine}</span>
					</div>
				</div>
			)}
		</>
	);
}

export default Poco;
