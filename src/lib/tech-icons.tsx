import { FaReact, FaNodeJs, FaVuejs, FaAngular, FaPython, FaPhp } from "react-icons/fa"
import { SiTypescript, SiRedux, SiFirebase, SiExpo, SiMongodb, SiExpress, SiNextdotjs, SiVuedotjs, SiRubyonrails, SiDjango } from "react-icons/si"

export function getTechIcon(tech: string) {
  switch (tech.toLowerCase()) {
    case "react":
    case "react native":
      return <FaReact className="text-blue-500" />
    case "typescript":
      return <SiTypescript className="text-blue-600" />
    case "node.js":
      return <FaNodeJs className="text-green-500" />
    case "redux":
      return <SiRedux className="text-purple-500" />
    case "firebase":
      return <SiFirebase className="text-orange-500" />
    case "expo":
      return <SiExpo className="text-gray-800 dark:text-gray-200" />
    case "mongodb":
      return <SiMongodb className="text-green-600" />
    case "express":
      return <SiExpress className="text-gray-800 dark:text-gray-200" />
    case "next.js":
      return <SiNextdotjs className="text-black dark:text-white" />
    case "vue.js":
    case "vuex":
      return <FaVuejs className="text-green-500" />
    case "angular":
      return <FaAngular className="text-red-600" />
    case "ruby on rails":
      return <SiRubyonrails className="text-red-700" />
    case "python":
      return <FaPython className="text-blue-500" />
    case "django":
      return <SiDjango className="text-green-700" />
    case "php":
      return <FaPhp className="text-purple-600" />
    default:
      return null
  }
}

