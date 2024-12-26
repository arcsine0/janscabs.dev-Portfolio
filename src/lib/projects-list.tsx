export const projects = [
    {
        id: 1,
        title: "P2Trust",
        description: "A FinTech Fraud Prevention Mobile App",
        technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Supabase", "NativeWind"],
        thumbnail: "p2trust_logo1.jpg",
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: [
            {
                title: "Project Details",
                text: "P2Trust is a Fin-Tech mobile application that aims to solve online Peer-to-Peer (P2P) fraud through open transactional data sharing. It aims to be a global repository of transactions viewable by any user so that anyone can utilize existing transactional data like proof of payments and transaction histories to determine whether an online seller is trustworthy or not.",
            },
        ],
        requirements: ["Expo 50", "Android 6+", "iOS 13.4+", "Node 18+"]
    },
    {
        id: 2,
        title: "Smart Ticket",
        description: "An Automatic Feedback Organization System",
        technologies: ["React", "JavaScript", "Express", "Firebase", "HuggingFace", "TailwindCSS"],
        thumbnail: "smartticket_logo.jpg",
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: [
            {
                title: "Project Description",
                text: "SmartTicket is a feedback ticketing system that utilizes zero-shot classification machine learning models to automatically organize tickets and provides scores of importance depending on user-set configurations.",
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
    {
        id: 3,
        title: "KaQuizz!",
        description: "A Multiplayer Online Quiz Platform",
        technologies: ["React", "JavaScript", "Express", "Firebase"],
        thumbnail: "kaquizz_logo.jpg",
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: [
            {
                title: "Project Description",
                text: "KaQuizz! is a multiplayer quiz application similar to Kahoot! but only for the web. Users can setup custom quizzes and rules, which they can share to other users to play in real-time.",
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
    {
        id: 4,
        title: "Cryptocurrency K-Line Downloader",
        description: "A cryptocurrency historical data downloader",
        technologies: ["React", "TypeScript", "Electron", "Vite", "TailwindCSS", "ShadCN"],
        thumbnail: "",
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        longDescription: [
            {
                title: "Project Description",
                text: "This desktop application utilizes the Bybit API to fetch historical cryptocurrency data and exports it into a csv file. Technical indicators can also be applied to the data fetched and be added as additional columns to the dataset.",
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"]
    },
];