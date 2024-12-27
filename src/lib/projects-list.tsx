export interface Media {
    type: "image" | "video";
    src: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    thumbnail: string;
    media: Media[];
    longDescription: {
        type: "simple" | "list";
        title: string;
        text: string | string[];
    }[]
    requirements: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "P2Trust",
        description: "A FinTech Fraud Prevention Mobile App",
        technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Supabase", "NativeWind"],
        thumbnail: "p2trust_logo1.jpg",
        media: [
            {
                type: "video",
                src: "FriKUNfmthU"
            },
            {
                type: "video",
                src: "tbyzaNb8NE4"
            }
        ],
        longDescription: [
            {
                type: "simple",
                title: "Project Details",
                text: "P2Trust is a Fin-Tech mobile application that aims to solve online Peer-to-Peer (P2P) fraud through open transactional data sharing. It aims to be a global repository of transactions viewable by any user so that anyone can utilize existing transactional data like proof of payments and transaction histories to determine whether an online seller is trustworthy or not.",
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "Real-time global transaction records and analytics",
                    "User profiles with sentimemnt-based reputation systems",
                    "In-app Peer-to-Peer (P2P) chat messaging",
                    "Proof of payment verification system",
                    "QR-based transaction sharing"
                ]
            }
        ],
        requirements: ["Expo 50", "Android 6+", "iOS 13.4+", "Node 18+"]
    },
    {
        id: 2,
        title: "Smart Ticket",
        description: "An Automatic Feedback Organization System",
        technologies: ["React", "JavaScript", "Express", "Firebase", "HuggingFace", "TailwindCSS"],
        thumbnail: "smartticket_logo.jpg",
        media: [
            {
                type: "image",
                src: "smartTicket1.png"
            },
            {
                type: "image",
                src: "smartTicket2.png"
            },
            {
                type: "image",
                src: "smartTicket3.png"
            },
            {
                type: "image",
                src: "smartTicket4.png"
            },
            {
                type: "image",
                src: "smartTicket5.png"
            }
        ],
        longDescription: [
            {
                type: "simple",
                title: "Project Description",
                text: "SmartTicket is a feedback ticketing system that utilizes zero-shot classification machine learning models to automatically organize tickets and provides scores of importance depending on user-set configurations.",
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "Automatic feedback filtering and classification based on preset tags",
                    "Configurable settings depending on use case",
                    "Dynamic scoring based on tag importance",
                ]
            }
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
    {
        id: 3,
        title: "KaQuizz!",
        description: "A Multiplayer Online Quiz Platform",
        technologies: ["React", "JavaScript", "Express", "Firebase"],
        thumbnail: "kaquizz_logo.jpg",
        media: [
            {
                type: "image",
                src: "kaquizz1.png"
            },
            {
                type: "image",
                src: "kaquizz2.png"
            }
        ],
        longDescription: [
            {
                type: "simple",
                title: "Project Description",
                text: "KaQuizz! is a multiplayer quiz application similar to Kahoot! but only for the web. Users can setup custom quizzes and rules, which they can share to other users to play in real-time.",
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "User customizable quizzes and quiz formats",
                    "Supports multiple players at a time",
                    "Dynamic scoring based on correct answers and time to answer",
                ]
            }
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
    {
        id: 4,
        title: "Cryptocurrency K-Line Downloader",
        description: "A cryptocurrency historical data downloader",
        technologies: ["React", "TypeScript", "Electron", "Vite", "TailwindCSS", "ShadCN"],
        thumbnail: "cryptodw1.png",
        media: [
            {
                type: "image",
                src: "cryptodw1.png"
            },
            {
                type: "image",
                src: "cryptodw2.png"
            },
            {
                type: "image",
                src: "cryptodw3.png"
            },
            {
                type: "image",
                src: "cryptodw4.png"
            },
        ],
        longDescription: [
            {
                type: "simple",
                title: "Project Description",
                text: "This desktop application utilizes the Bybit API to fetch historical cryptocurrency data and exports it into a csv file. Technical indicators can also be applied to the data fetched and be added as additional columns to the dataset.",
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "Selectable Linear, Spot, or Inverse market data",
                    "Multiple available time intervals",
                    "Customizable start and end date range of historical data to fetch",
                    "Tons of technical indicators to choose and apply to the data fetched",
                    "Live preview of the data fetched and modified",
                    "Finalized dataset can be exported to CSV format"
                ]
            }
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
];