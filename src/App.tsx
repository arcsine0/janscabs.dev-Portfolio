import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import SplashScreen from "./components/SplashScreen";

function App() {
	const [showSplash, setShowSplash] = useState(false);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisited");
		if (!hasVisited) {
			setShowSplash(true);
			document.body.style.overflow = "hidden";
			localStorage.setItem("hasVisited", "true");
		} else {
			setShowContent(true);
		}
	}, []);

	const handleSplashComplete = () => {
		setShowSplash(false);
		setShowContent(true);
		document.body.style.overflow = "unset";
	};

	return (
		<Router>
			<AnimatePresence>
				{showSplash && <SplashScreen onAnimationComplete={handleSplashComplete} />}
			</AnimatePresence>
			<motion.div
				className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
				initial={{ opacity: 0 }}
				animate={{ opacity: showContent ? 1 : 0 }}
				transition={{ duration: 0.5 }}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/project/:id" element={<ProjectDetails />} />
				</Routes>
			</motion.div>
		</Router>
	);
}

export default App;

