import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"

export default function Bio() {
    return (
        <Card className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                    <Avatar className="w-32 h-32">
                        <AvatarImage src="/avatar.jpg" alt="Jans Caballegan" />
                        <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                </div>
                <h1 className="text-2xl font-bold text-center">Raphael "Jans" Caballegan</h1>
                <h2 className="text-xl text-zinc-600 dark:text-zinc-400 text-center">Fullstack TS Developer</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    Passionate about creating seamless user experiences with React and React Native.
                    Always exploring new technologies and pushing the boundaries of what"s possible in web and mobile development.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open("https://github.com/arcsine0", "_blank")?.focus()}
                    >
                        <Github className="h-5 w-5" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open("https://www.linkedin.com/in/jans-caballegan/", "_blank")?.focus()}
                    >
                        <Linkedin className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

