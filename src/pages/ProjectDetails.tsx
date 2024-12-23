import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTechIcon } from "@/lib/tech-icons";

const projects = [
    {
        id: 1,
        title: "Project 1",
        description: "A brief description of Project 1",
        technologies: ["React", "TypeScript", "Node.js"],
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: "This is a longer description of Project 1, including its features, challenges, and outcomes.",
        specs: ["React", "Next.js", "TypeScript", "Node.js"],
        requirements: ["Node.js 14+", "npm 6+"]
    },
    {
        id: 2,
        title: "Project 2",
        description: "A brief description of Project 2",
        technologies: ["React Native", "Redux", "Firebase"],
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: "This is a longer description of Project 2, including its features, challenges, and outcomes.",
        specs: ["React Native", "Redux", "Firebase", "Expo"],
        requirements: ["Node.js 14+", "npm 6+", "Expo CLI"]
    },
    {
        id: 3,
        title: "Project 3",
        description: "A brief description of Project 3",
        technologies: ["Vue.js", "Vuex", "Express"],
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: "This is a longer description of Project 3, including its features, challenges, and outcomes.",
        specs: ["Vue.js", "Vuex", "Express", "MongoDB"],
        requirements: ["Node.js 14+", "npm 6+", "MongoDB"]
    },
];

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const project = projects.find(p => p.id === parseInt(id || ""));

    if (!project) {
        return <div>Project not found</div>;
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    return (
        <motion.div
            className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <Button
                onClick={() => navigate("/")}
                className="mb-8"
                variant="outline"
            >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={project.images[currentImageIndex]}
                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 bg-opacity-50 rounded-full p-2"
                        >
                            <ChevronLeft className="w-6 h-6 text-zinc-100" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 bg-opacity-50 rounded-full p-2"
                        >
                            <ChevronRight className="w-6 h-6 text-zinc-100" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <p className="text-zinc-600 dark:text-zinc-400">{project.description}</p>
                        <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.specs.map((spec, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            {getTechIcon(spec)}
                                            {spec}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                                    {project.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{project.longDescription}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

