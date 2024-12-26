import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTechIcon } from "@/lib/tech-icons";

import { projects } from "@/lib/projects-list";

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
                                src={`/screenshots/${project.images[currentImageIndex]}`}
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
                                    {project.technologies.map((tech, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            {getTechIcon(tech)}
                                            {tech}
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
                <div className="mt-8 flex flex-col gap-4">
                    {project.longDescription.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                            <p className="text-zinc-600 dark:text-zinc-400">{section.text}</p>
                        </div>
                    ))}

                </div>
            </motion.div>
        </motion.div>
    );
}

