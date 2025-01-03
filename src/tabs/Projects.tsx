import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getTechIcon } from "@/lib/tech-icons"

import { projects } from "@/lib/projects-list"

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<string | number | undefined>(undefined)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link
                            to={{
                                pathname: `/project/${project.id}`,
                            }}
                        >
                            <Card
                                className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 cursor-pointer h-full"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(undefined)}
                            >
                                <div className="relative">
                                    {project.thumbnail.length > 0 ?
                                        <img
                                            src={`/thumbnails/${project.thumbnail}`}
                                            alt={`${project.title} thumbnail`}
                                            className="w-full h-48 object-cover"
                                        />
                                    :
                                        <div className="w-full h-48 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                                    }
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                        <span className="text-white text-lg font-semibold">View Details</span>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Badge key={techIndex} variant="secondary" className="text-xs flex items-center gap-1">
                                                {getTechIcon(tech)}
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                    {hoveredProject === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-2 text-sm text-blue-600 dark:text-blue-400"
                                        >
                                            Click to view details
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

