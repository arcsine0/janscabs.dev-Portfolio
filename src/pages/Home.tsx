import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Bio from "@/components/Bio";
import TechStack from "@/tabs/TechStack";
import Projects from "@/tabs/Projects";
import Activity from "@/tabs/Activity";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Home() {
    const [activeTab, setActiveTab] = useState("stack");
    const isMobile = useMediaQuery("(max-width: 768px)");

    const renderContent = () => (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === "stack" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <TechStack />
                    </motion.div>
                )}
                {activeTab === "projects" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Projects />
                    </motion.div>
                )}
                {activeTab === "contributions" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Activity />
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {isMobile ? (
                <>
                    <Bio />
                    <Tabs defaultValue="stack" className="mt-8">
                        <TabsList className="grid w-full grid-cols-3 h-14">
                            <TabsTrigger value="stack" className="text-lg">Stack</TabsTrigger>
                            <TabsTrigger value="projects" className="text-lg">Projects</TabsTrigger>
                            <TabsTrigger value="contributions" className="text-lg">Contributions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="stack"><TechStack /></TabsContent>
                        <TabsContent value="projects"><Projects /></TabsContent>
                        <TabsContent value="contributions"><Activity /></TabsContent>
                    </Tabs>
                </>
            ) : (
                <div className="flex gap-8">
                    <div className="w-1/4">
                        <Bio />
                    </div>
                    <div className="w-3/4">
                        <Tabs defaultValue="stack" onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full justify-start h-14">
                                <TabsTrigger value="stack" className="text-lg px-8">Tech Stack</TabsTrigger>
                                <TabsTrigger value="projects" className="text-lg px-8">Projects</TabsTrigger>
                                <TabsTrigger value="contributions" className="text-lg px-8">Activity</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="mt-8">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

