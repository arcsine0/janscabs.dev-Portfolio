import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PaginatedTechList from "@/components/PaginatedTechList";

import { motion } from "framer-motion";
import { getTechIcon } from "@/lib/tech-icons";

import { projects } from "@/lib/projects-list";
import { TechPercentage } from "@/lib/types";

const preferredTechStack = ["React", "React Native", "TypeScript", "Node.js", "Express", "Expo", "Firebase", "Supabase"];

const pastTechnologies = ["ElectronJS", "Python"];

const getProjectTechnologies = (): TechPercentage[] => {
    const technologiesCount: { [key: string]: number } = {};

    projects.forEach((project) => {
        project.technologies.forEach((tech) => {
            technologiesCount[tech] = (technologiesCount[tech] || 0) + 1;
        });
    });

    const technologiesArray: TechPercentage[] = Object.entries(technologiesCount).map(
        ([name, count]) => ({ name, percentage: (count * 100) / projects.length })
    );

    return technologiesArray;
}

export default function TechStack() {
    const [projectTechnologies, setProjectTechnologies] = useState<TechPercentage[] | undefined>(undefined);

    useEffect(() => {
        setProjectTechnologies(getProjectTechnologies().sort(
            (a, b) => b.percentage - a.percentage
        ));
    }, []);


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
                        <PaginatedTechList
                            technologies={projectTechnologies || []}
                            renderTech={(tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className="w-full space-y-2"
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
                            )}
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

