import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/components/YoutubeVideo";

import { ChevronLeft, ChevronRight, CircleSlash2, Github, Globe } from "lucide-react";
import { getTechIcon } from "@/lib/tech-icons";

import { projects, Media } from "@/lib/projects-list";

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
    }, []);

    const project = projects.find(p => p.id === parseInt(id || ""));

    if (!project) {
        return <div>Project not found</div>;
    }

    const nextMedia = () => {
        setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % project.media.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + project.media.length) % project.media.length);
    };

    const renderMedia = (media: Media) => {
        if (media.type === 'video') {
            return <YouTubeVideo videoId={media.src} />;
        } else {
            return (
                <img
                    src={`/screenshots/${media.src}`}
                    alt={`${project.title} screenshot`}
                    className="w-auto h-full max-h-[500px] object-cover rounded-lg"
                />
            );
        }
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
                    {project.media.length > 0 ?
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentMediaIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-center"
                                >
                                    {renderMedia(project.media[currentMediaIndex])}
                                </motion.div>
                            </AnimatePresence>
                            {project.media.length > 1 && (
                                <>
                                    <button
                                        onClick={prevMedia}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 bg-opacity-50 rounded-full p-2"
                                        aria-label="Previous media"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-zinc-100" />
                                    </button>
                                    <button
                                        onClick={nextMedia}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-zinc-800 bg-opacity-50 rounded-full p-2"
                                        aria-label="Next media"
                                    >
                                        <ChevronRight className="w-6 h-6 text-zinc-100" />
                                    </button>
                                </>
                            )}
                        </div>
                        :
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-200">
                            <CircleSlash2
                                color="black"
                                size={32}
                            />
                            <h2>There are no current screenshots for this project yet</h2>
                        </div>
                    }

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
                        <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Project Links</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.projectLinks.map((link, index) => {
                                        switch (link.type) {
                                            case "code":
                                                return (
                                                    <Button
                                                        key={index}
                                                        className="flex items-center gap-2"
                                                        onClick={() => window.open(link.url, '_blank')}
                                                    >
                                                        <Github className="w-4 h-4" />
                                                        Source Code
                                                    </Button>
                                                )

                                                break;
                                            case "store":
                                                break;
                                            default:
                                            case "demo":
                                                <Button
                                                    key={index}
                                                    className="flex items-center gap-2"
                                                    onClick={() => window.open(link.url, '_blank')}
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Live Demo
                                                </Button>
                                                break;
                                        }
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                    {project.longDescription.map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                            {section.type === "simple" ? (
                                <div className="flex flex-col gap-2">
                                    {section.text.map((item, index) => (
                                        <p key={index} className="text-zinc-600 dark:text-zinc-400">{item}</p>
                                    ))}
                                </div>

                            ) : (
                                <ul>
                                    {section.text.map((item, index) => (
                                        <li key={index} className="text-zinc-600 dark:text-zinc-400">- {item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                </div>
            </motion.div>
        </motion.div>
    );
}

