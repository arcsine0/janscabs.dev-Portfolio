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
        text: string[];
    }[];
    requirements: string[];
    projectLinks: {
        type: "code" | "demo" | "store";
        url: string;
    }[];
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
                text: [
                    "P2Trust is a Fin-Tech mobile application that aims to solve online Peer-to-Peer (P2P) fraud through open transactional data sharing. It aims to be a global repository of transactions viewable by any user so that anyone can utilize existing transactional data like proof of payments and transaction histories to determine whether an online seller is trustworthy or not.",
                ],
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
            },
            {
                type: "simple",
                title: "Purpose / Story",
                text: [
                    "This project was actually my thesis / capstone project for college. When I was looking for topics to cover, I really wanted to solve a problem. Not just any problem, I wanted to make an actual difference to the industry I am making the application for.",
                    "I was fairly active within the community of buying and selling of accounts or items from video games into real-life cash. These communities are very active in social media platforms like Facebook and Discord, where users advertised their needs to potential customers. With a community like this, transactions and interactions are Peer-to-Peer (P2P) by nature, meaning there aren't a lot of official means of insurance for users to rely on other than trust and reputation. As a result of this, scams are very prevalent and therefore it is on the user's risk and responsibility to make sure that a transaction is safe enough to do so.",
                    "From my time in those communities, I've observed that users are already cautious enough to ask for confirmation to other users if a merchant or a seller is legitimate and to be trusted. The problem I saw however, is that since communities or groups are separate from each other, whether by platform or by group visibility, crucial information shared in one group does not guarantee that other groups are exposed to them. That's the main reason why I thought of developing a solution that puts all of that crucial information in one place. P2Trust is the platform the hosts transaction messaging and acts as a global repository of transaction records for other users to judge and see, therefore assigning reputation of other users based on the information they are provided."
                ],
            },
        ],
        requirements: ["Expo 50", "Android 6+", "iOS 13.4+", "Node 18+"],
        projectLinks: [
            {
                type: "code",
                url: "https://github.com/arcsine0/P2Trust",
            }
        ],
    },
    {
        id: 2,
        title: "Smart Ticket",
        description: "An Automatic Feedback Organization System",
        technologies: ["React", "JavaScript", "Express", "Firebase", "HuggingFace", "TailwindCSS"],
        thumbnail: "smartticket_logo.jpg",
        media: [
            {
                type: "video",
                src: "zPBof4EOLrc"
            },
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
                text: [
                    "SmartTicket is a feedback ticketing system that utilizes zero-shot classification machine learning models to automatically organize tickets and provides scores of importance depending on user-set configurations.",
                ],
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "Automatic feedback filtering and classification based on preset tags",
                    "Configurable settings depending on use case",
                    "Dynamic scoring based on tag importance",
                ]
            },
            {
                type: "simple",
                title: "Purpose / Story",
                text: [
                    "This project was born from a task for our finals of a course in Machine Learning back in college. At that time, I was already exploring machine learning by myself as a hobby and so I was more well-versed in what the latest models are capable of as well as they're limitations and size. I commonly found myself hanging around HuggingFace, testing models and seeing what cool and fun projects I could do with them. So when the time came to pick for topics to go for, I knew that I could take simple and common application of machine learning to the next level and not just at face value.",
                    "The topic I landed on was on sentiment analysis. In the past, I was already thinking of utlizing sentiment analysis to train my personal cryptocurrency price direction model, so I had a decent idea on what I could do with it. As I was exploring through HuggingFace, I came across Zero-shot classification models. These models are capable of classifying strings of texts into either new classes, or pre-defined sets of classes. These models made me think of the automatic tagging bots in Github issues that I come across a lot of times when debugging. This inspired me to combine sentiment analysis with zero-shot classification in organizing support tickets. This was how Smart Ticket came to be."
                ],
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"],
        projectLinks: [
            {
                type: "code",
                url: "https://github.com/arcsine0/SmartTicket",
            }
        ],
    },
    {
        id: 3,
        title: "KaQuizz!",
        description: "A Multiplayer Online Quiz Platform",
        technologies: ["React", "JavaScript", "Express", "Firebase"],
        thumbnail: "kaquizz_logo.jpg",
        media: [],
        longDescription: [
            {
                type: "simple",
                title: "Project Description",
                text: [
                    "KaQuizz! is a multiplayer quiz application similar to Kahoot! but only for the web. Users can setup custom quizzes and rules, which they can share to other users to play in real-time.",
                ],
            },
            {
                type: "list",
                title: "Features",
                text: [
                    "User customizable quizzes and quiz formats",
                    "Supports multiple players at a time",
                    "Dynamic scoring based on correct answers and time to answer",
                ]
            },
            {
                type: "simple",
                title: "Purpose / Story",
                text: [
                    "This project was my first official project to utilize websockets for its main functionality. I was practicing how to use websockets at the time, and when the course I had back then tasked us with a final project / system, I thought to myself 'might as well use it to practice sockets'. Part of the reason why this project is not hosted is because back then, there weren't readily available and easy to use Backend-as-a-Services (BaaS) like what is Firebase right now. I'd have to find services that allow websocket hosting, which admittedly costed a lot more than what I could spend for a small project.",
                    "Most popular applications of websockets, especially at the time, where web-hosted video games like Skribbl.io, so that inspired me to utilize the technology in a game-like format. Of course, the biggest inspiration of KaQuizz would be KaHoot. This served as a good practice application to start my journey with learning the development for real-time applications."
                ],
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"],
        projectLinks: [
            {
                type: "code",
                url: "https://github.com/arcsine0/kaquizz",
            }
        ],
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
                text: [
                    "This desktop application utilizes the Bybit API to fetch historical cryptocurrency data and exports it into a csv file. Technical indicators can also be applied to the data fetched and be added as additional columns to the dataset.",
                ],
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
                ],
            },
            {
                type: "simple",
                title: "Purpose / Story",
                text: [
                    "This project was actually one of the projects I started developing out from personal needs. The second hobby of mine is, weirdly enough, finance and all about finding alternative ways to accumulate wealth. And so, I have this one consistently on-going project of researching and developing a model that predicts cryptocurrency price direction. For my models, I needed the data to feed and train with as a start. Back then, I was able to procure datasets of historiccal transactions through the Binance website, but ever since Binance got blocked in the Philippines, I'm not able to utilize it recently. The only other way I could collect full and up-to-date transactional data is through another platfrom called Bybit that was very similar to Binance. The problem is that in order to get the dataset from Bybit, it must be done through their public API.",
                    "Instead of creating a one-time use quick program to gather the data, I decided that it's more worth it in the long run to just create an application I can reuse as many times as I needed. With that, this project was born.",
                    "Along the way I remembered that I utilized techinical indicators like Moving Averages and such, as features in my dataset as additional context for my model. I used to just create a one-time script for calculating these indicator values using python back then. So I thought, why not incorporate it to the historical transaction downloader I was developing as well."
                ],
            },
        ],
        requirements: ["Node.js 14+", "npm 6+"],
        projectLinks: [
            {
                type: "code",
                url: "https://github.com/arcsine0/Crypto-KLine-Downloader",
            }
        ],
    },
];