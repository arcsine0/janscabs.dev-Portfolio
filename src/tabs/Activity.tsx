import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

import GithubCalendar from "react-github-calendar"

export default function Activity() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
				<CardHeader>
					<CardTitle className="text-2xl">GitHub Contributions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg">
						<GithubCalendar username="arcsine0" colorScheme="light" />
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}

