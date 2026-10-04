function TerminalLoader() {
	return (
		<main className="terminal-loader" aria-busy="true" aria-live="polite">
			<div className="terminal-loader-content">
				<p className="terminal-loader-logo">JANS.DEV</p>
				<progress
					className="progress progress-primary terminal-loader-progress"
					value={64}
					max={100}
				>
					64%
				</progress>
				<p className="terminal-label terminal-loader-status">
					ESTABLISHING DATA LINK
				</p>
			</div>
		</main>
	);
}

export default TerminalLoader;
