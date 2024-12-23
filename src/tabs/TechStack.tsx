import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { getTechIcon } from "@/lib/tech-icons"

const preferredTechStack = ["React", "React Native", "TypeScript", "Node.js", "Express", "Expo", "Firebase", "Supabase"]

const pastTechnologies = ["ElectronJS", "Python"]

const projectTechnologies = [
    { name: "React", percentage: 80 },
    { name: "TypeScript", percentage: 75 },
    { name: "Next.js", percentage: 70 },
    { name: "Node.js", percentage: 65 },
    { name: "Express", percentage: 60 },
    { name: "MongoDB", percentage: 55 },
]

export default function TechStack() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                        <CardTitle className="text-2xl">Preferred Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {preferredTechStack.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-sm flex items-center gap-1">
                                {getTechIcon(tech)}
                                {tech}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                        <CardTitle className="text-2xl">Past Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {pastTechnologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-sm flex items-center gap-1">
                                {getTechIcon(tech)}
                                {tech}
                            </Badge>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                        <CardTitle className="text-2xl">Technologies in Projects</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {projectTechnologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                className="space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        {getTechIcon(tech.name)}
                                        {tech.name}
                                    </span>
                                    <span>{tech.percentage}%</span>
                                </div>
                                <Progress value={tech.percentage} className="h-2" />
                            </motion.div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

