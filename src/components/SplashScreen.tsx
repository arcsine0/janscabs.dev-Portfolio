import { motion } from "framer-motion"

export default function SplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            onAnimationComplete={onAnimationComplete}
        >
            <motion.h1
                className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-[0.2em] font-sans"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                JANS/CABS
            </motion.h1>
        </motion.div>
    )
}

