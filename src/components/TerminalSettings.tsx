import { useEffect, useRef } from "react";

export const terminalThemes = [
	{ id: "green", label: "Phosphor Green", swatch: "#6dff96" },
	{ id: "amber", label: "Amber", swatch: "#ffb000" },
	{ id: "blue", label: "Cyan-Blue", swatch: "#00c8ff" },
	{ id: "white", label: "Icy White", swatch: "#eaf7ff" },
] as const;

export type TerminalTheme = (typeof terminalThemes)[number]["id"];

interface TerminalSettingsProps {
	open: boolean;
	theme: TerminalTheme;
	boringMode: boolean;
	onClose: () => void;
	onThemeChange: (theme: TerminalTheme) => void;
	onBoringModeChange: (enabled: boolean) => void;
}

function TerminalSettings({
	open,
	theme,
	boringMode,
	onClose,
	onThemeChange,
	onBoringModeChange,
}: TerminalSettingsProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			aria-labelledby="terminal-settings-title"
			className="modal terminal-settings"
			data-terminal-theme={theme}
			onClose={onClose}
			onCancel={onClose}
			ref={dialogRef}
		>
			<div className="modal-box terminal-settings-box">
				<header className="flex items-start justify-between gap-4">
					<div>
						<p className="terminal-label">SYSTEM // DISPLAY CONFIGURATION</p>
						<h2 className="mt-2 text-2xl" id="terminal-settings-title">
							Settings
						</h2>
					</div>
					<button
						aria-label="Close settings"
						className="btn btn-ghost btn-sm"
						onClick={() => dialogRef.current?.close()}
						type="button"
					>
						X
					</button>
				</header>

				<fieldset className="mt-6 grid gap-3">
					<legend className="terminal-label mb-2">THEME COLOR</legend>
					{terminalThemes.map((option) => (
						<label className="terminal-theme-option" key={option.id}>
							<input
								checked={theme === option.id}
								className="radio radio-primary radio-sm"
								name="terminal-theme"
								onChange={() => onThemeChange(option.id)}
								type="radio"
								value={option.id}
							/>
							<span
								aria-hidden="true"
								className="terminal-theme-swatch"
								data-swatch={option.id}
							/>
							<span>{option.label}</span>
						</label>
					))}
				</fieldset>

				<div className="terminal-settings-divider" />

				<label className="terminal-boring-option">
					<span className="terminal-label">BORING MODE</span>
					<input
						checked={boringMode}
						className="toggle toggle-primary"
						onChange={(event) => onBoringModeChange(event.currentTarget.checked)}
						type="checkbox"
					/>
				</label>
			</div>
			<form className="modal-backdrop" method="dialog">
				<button aria-label="Close settings">X</button>
			</form>
		</dialog>
	);
}

export default TerminalSettings;
