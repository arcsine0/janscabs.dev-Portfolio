import { useState } from "react";
import YouTube from "react-youtube";

interface YouTubeVideoProps {
    videoId: string;
}

export function YouTubeVideo({ videoId }: YouTubeVideoProps) {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const onReady = (event: { target: { pauseVideo: () => void; }; }) => {
        event.target.pauseVideo();
    };

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    return (
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            {!isVideoLoaded && (
                <div
                    className="absolute inset-0 bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    onClick={() => setIsVideoLoaded(true)}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-20 h-20 text-white opacity-80 hover:opacity-100 transition-opacity"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}
            {isVideoLoaded && (
                <div className="absolute inset-0">
                    <YouTube videoId={videoId} opts={opts} onReady={onReady} className="w-full h-full" />
                </div>
            )}
        </div>
    );
}

