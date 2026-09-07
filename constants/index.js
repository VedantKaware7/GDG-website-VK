// Current Date
import {
  ManageAccounts,
  Trophy,
  Campaign,
  ConnectWithoutContact,
  DesignServices,
  Palette,
  Language,
  Mobile2,
  SportsEsports,
  Analytics,
  Hub,
  Link,
  Cloud,
} from "@material-symbols-svg/react/outlined";

export const curDay = new Date().getDay();
export const curYear = new Date().getFullYear();
export const curDate = new Date().getDate();
export const curMonth = new Date().getMonth();
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Contact Links
export const LINKS = {
  instagram: "#",
  discord: "#",
  gmail: "#",
  linkedin: "#",
  x: "#",
};

// Department Details
export const reviews = [
  {
      id: "c21ca066-ab4d-40a3-943c-f170d6312bdc",
      icon: ManageAccounts,
      tone: "#8ab4f8",
      name: "Management",
      description: "The backbone of the organization, turning vision into reality by planning, executing, and improvising. Oversees events, operations, and growth, ensuring smooth functioning, success, and impactful experiences.",
    },
    {
      id: "4499a966-2740-4c36-88dd-8916a909fc77",
      icon: Campaign,
      tone: "#FF7A6B",
      name: "Publicity",
      description: "Drives online presence with creative campaigns, video editing, and storytelling, boosting engagement, promoting events, and showcasing the club to inspire participation and community growth.",
    },
    {
      id: "3936d5a2-acd9-4a98-ac97-42c2c92f5c02",
      icon: ConnectWithoutContact,
      tone: "#FFD45E",
      name: "Outreach",
      description: "Builds partnerships and expands outreach by connecting with communities, sponsors, and collaborators, ensuring diverse opportunities and impactful collaborations both within and beyond campus.",
    },
    {
      id: "e2ed9c2c-c36c-457f-a8bb-cf2e8bc7c2e1",
      icon: DesignServices,
      tone: "#FF7A6B",
      name: "UI/UX",
      description: "Designs visually appealing, user-friendly digital interfaces with a focus on accessibility, usability, and aesthetics, ensuring products provide enjoyable, intuitive, and meaningful user experiences.",
    },
    {
      id: "d3beefc1-f8b0-4202-b26c-36e9804b6636",
      icon: Palette,
      tone: "#FFD45E",
      name: "Design",
      description: "Creates stunning visuals, event posters, and branding materials that capture the organization's identity, ensuring every design communicates creativity, professionalism, and excitement to engage the community.",
    },
    {
      id: "8143de1d-db17-42fa-958d-13b10804f894",
      icon: Language,
      tone: "#8AB4F8",
      name: "Web Dev",
      description: "Designs, develops, and maintains responsive, high-performance websites for projects and events, using modern web technologies to enhance accessibility, user experience, and community engagement online.",
    },
    {
      id: "339f0f8a-72f2-44b9-92ab-2b0d4dcfa0f6",
      icon: Mobile2,
      tone: "#6EE7A0",
      name: "App Dev",
      description: "Builds intuitive, impactful mobile applications, improving accessibility, interaction, and convenience for members and event participants through functional, user-focused design.",
    },
    {
      id: "9055864f-c7dc-44cd-91d5-8759d32a496a",
      icon: SportsEsports,
      tone: "#FF7A6B",
      name: "Game Dev",
      description: "Combines creativity and technical skills to design engaging, entertaining games, giving members hands-on experience with real-world game development tools, engines, and production workflows.",
    },
    {
      id: "c0f3b1d1-ce05-45f6-9e34-ac9443fc5fcb",
      icon: Analytics,
      tone: "#8AB4F8",
      name: "Data Science",
      description: "Applies AI, machine learning, and analytics to transform data into actionable insights, helping solve problems, build predictive models, and inspire innovation across projects.",
    },
    {
      id: "a1d920df-9eb9-49eb-b3a4-e4a3d1245ede",
      icon: Cloud,
      tone: "#FFD45E",
      name: "Cloud & DevOps",
      description: "Explores cloud computing, infrastructure, and automation by building scalable applications, hosting hands-on workshops, and educating members about cloud platforms, containerization, CI/CD pipelines, and DevOps practices.",
    },
    {
      id: "6a89c4e2-7b19-4f32-821e-9821a41b5201",
      icon: Hub,
      tone: "#FF7A6B",
      name: "Blockchain",
      description: "Explores decentralized apps, smart contracts, and Web3 development, giving members hands-on experience with blockchain protocols and tools.",
    },
    {
      id: "3e9ac635-01d4-495e-aa87-a7335a2403c2",
      icon: Trophy,
      tone: "#6EE7A0",
      name: "Competitive Programming",
      description: "Promotes problem-solving skills through coding contests, hackathons, and peer learning, helping members sharpen algorithms, logic, and efficiency while preparing for real-world tech challenges.",
    },
];

// Questionnaire Data
export const QuestionnaireData = [
  {
    department: "App Dev",
    questions: [
      {
        name: "Which platforms have you built for, and what did you use?",
        type: "generic",
        placeholder: "e.g. Android with Kotlin, iOS with Swift, cross-platform with Flutter"
      },
      {
        name: "Describe an app you have built. What did it do, and what was the hardest part?",
        type: "long-text",
        placeholder: "2-3 sentences on the problem, your approach, and what you'd change"
      },
      {
        name: "How do you handle state and data persistence in a mobile app?",
        type: "generic",
        placeholder: "Mention any libraries or patterns you rely on"
      },
      {
        name: "Share a link to an app or repository you are proud of.",
        type: "generic",
        placeholder: "GitHub, Play Store, TestFlight, or a demo video link"
      },
      {
        name: "A user reports the app crashes only on their device. How do you investigate?",
        type: "long-text",
        placeholder: "Walk through the steps you would actually take"
      }
    ],
  },
  {
    department: "Blockchain",
    questions: [
      {
        name: "What got you interested in blockchain, and what have you built or explored so far?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Explain a smart contract you have written or read. What did it do?",
        type: "long-text",
        placeholder: "Describe the logic and any security considerations"
      },
      {
        name: "Which chains, tools or frameworks have you used?",
        type: "short-text",
        placeholder: "e.g. Solidity, Hardhat, Ethers.js, Solana"
      },
      {
        name: "What is one common smart contract vulnerability, and how would you prevent it?",
        type: "long-text",
        placeholder: "e.g. reentrancy, integer overflow, access control"
      }
    ],
  },
  {
    department: "Cloud & DevOps",
    questions: [
      {
        name: "Which cloud providers or tools have you worked with?",
        type: "short-text",
        placeholder: "e.g. AWS, GCP, Docker, GitHub Actions, Terraform"
      },
      {
        name: "Describe a deployment pipeline you have set up or would set up for a web app.",
        type: "generic",
        placeholder: "From commit to production"
      },
      {
        name: "Tell us about a time something broke in an environment you managed. How did you find and fix it?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "How would you reduce the running cost of a small application without hurting reliability?",
        type: "long-text",
        placeholder: "Be specific about what you would measure first"
      }
    ],
  },
  {
    department: "Competitive Programming",
    questions: [
      {
        name: "Which platforms do you compete on, and what are your handles?",
        type: "short-text",
        placeholder: "e.g. Codeforces, LeetCode, CodeChef"
      },
      {
        name: "What is your current rating or rank, if any?",
        type: "short-text",
        placeholder: "Leave blank if you are just starting out"
      },
      {
        name: "Which language do you compete in?",
        type: "short-text",
        placeholder: "e.g. C++, Java, Python"
      },
      {
        name: "Roughly how many problems have you solved?",
        type: "short-text",
        placeholder: "An estimate is fine"
      },
      {
        name: "Describe a problem that took you a long time to solve. What finally clicked?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "How would you help a first-year student who is stuck on their first contest problem?",
        type: "long-text",
        placeholder: "We care about how you explain things"
      }
    ],
  },
  {
    department: "Data Science",
    questions: [
      {
        name: "What data or machine learning projects have you worked on?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "Walk us through how you would approach a dataset you have never seen before.",
        type: "generic",
        placeholder: "From loading it to a first result"
      },
      {
        name: "Explain overfitting to someone who has never trained a model.",
        type: "generic",
        placeholder: "Plain language, no jargon"
      },
      {
        name: "Which libraries and tools do you use?",
        type: "short-text",
        placeholder: "e.g. pandas, scikit-learn, PyTorch, SQL"
      },
      {
        name: "Describe a time your results were misleading. How did you catch it?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Share a link to a notebook, repository or write-up.",
        type: "short-text",
        placeholder: "GitHub, Kaggle, or a blog post"
      },
      {
        name: "What is a problem on campus you think data could help solve?",
        type: "long-text",
        placeholder: "Tell us what data you would need"
      }
    ],
  },
  {
    department: "Design",
    questions: [
      {
        name: "Describe a design you are proud of. What problem was it solving?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Which tools do you work in?",
        type: "short-text",
        placeholder: "e.g. Figma, Illustrator, Photoshop, Blender"
      },
      {
        name: "Share your portfolio or a few sample works.",
        type: "short-text",
        placeholder: "Behance, Dribbble, Drive folder, or Figma link"
      },
      {
        name: "How do you decide between two designs you like equally?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "Pick a poster or app you think is badly designed and explain why.",
        type: "generic",
        placeholder: "Be specific and constructive"
      },
      {
        name: "How do you take feedback on work you are attached to?",
        type: "generic",
        placeholder: "2-3 sentences"
      }
    ],
  },
  {
    department: "Game Dev",
    questions: [
      {
        name: "Which engines or frameworks have you used?",
        type: "short-text",
        placeholder: "e.g. Unity, Unreal, Godot, PyGame"
      },
      {
        name: "What part of game development interests you most?",
        type: "generic",
        placeholder: "e.g. gameplay programming, level design, art, audio"
      },
      {
        name: "Describe a game or prototype you have built. What worked and what didn't?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "How would you make a simple mechanic feel satisfying to play?",
        type: "long-text",
        placeholder: "Think about feedback, timing and juice"
      },
      {
        name: "Tell us about a game you love and one thing you would change about it.",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "How do you keep a project moving when you lose motivation halfway?",
        type: "long-text",
        placeholder: "We would rather hear something honest"
      },
      {
        name: "Share a link to a build, repository or devlog.",
        type: "generic",
        placeholder: "itch.io, GitHub, or a gameplay video"
      }
    ],
  },
  {
    department: "Management",
    questions: [
      {
        name: "Describe an event or project you have organised. What was your role?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "How do you keep a team on track when people are busy with academics?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "Two team members disagree and the deadline is tomorrow. What do you do?",
        type: "generic",
        placeholder: "Walk us through your actual approach"
      },
      {
        name: "Tell us about something you organised that did not go to plan. What did you learn?",
        type: "long-text",
        placeholder: "We value honesty here more than a perfect story"
      },
      {
        name: "What would you want to improve about how student clubs are run?",
        type: "long-text",
        placeholder: "2-3 sentences"
      }
    ],
  },
  {
    department: "Outreach",
    questions: [
      {
        name: "Have you worked with sponsors, communities or other organisations before?",
        type: "generic",
        placeholder: "2-3 sentences, or tell us why you want to start"
      },
      {
        name: "How would you approach a company for event sponsorship?",
        type: "generic",
        placeholder: "What would your first message say?"
      },
      {
        name: "Draft a short outreach message to a speaker you would like to invite.",
        type: "long-text",
        placeholder: "3-4 sentences, as you would actually send it"
      },
      {
        name: "A partner stops responding after showing interest. What next?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Which communities or clubs should we be collaborating with, and why?",
        type: "generic",
        placeholder: "Name a few and explain your reasoning"
      }
    ],
  },
  {
    department: "Publicity",
    questions: [
      {
        name: "How would you promote a technical event to students who think it is not for them?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "Which platforms or tools do you use for content?",
        type: "short-text",
        placeholder: "e.g. Instagram, LinkedIn, Canva, Premiere Pro"
      },
      {
        name: "Write a short caption announcing a hackathon.",
        type: "generic",
        placeholder: "Two lines, in the voice you would actually post in"
      }
    ],
  },
  {
    department: "UI/UX",
    questions: [
      {
        name: "Describe a product whose interface frustrates you. How would you fix it?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Walk us through your process from a blank canvas to a finished screen.",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Which tools do you design in?",
        type: "short-text",
        placeholder: "e.g. Figma, Sketch, Adobe XD"
      },
      {
        name: "How do you find out what users actually need?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "Share your portfolio or a case study.",
        type: "short-text",
        placeholder: "Figma, Behance, or a personal site"
      },
      {
        name: "What does accessibility mean in your work?",
        type: "generic",
        placeholder: "Give a concrete example if you can"
      },
      {
        name: "How would you test whether a design works before it is built?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "How comfortable are you with design systems and components?",
        type: "short-text",
        placeholder: "One line is fine"
      },
      {
        name: "Do you work with code at all?",
        type: "short-text",
        placeholder: "e.g. HTML/CSS, React, or none yet"
      },
      {
        name: "Tell us about feedback that changed how you design.",
        type: "long-text",
        placeholder: "2-3 sentences"
      }
    ],
  },
  {
    department: "Web Dev",
    questions: [
      {
        name: "What have you built for the web? Describe your favourite project.",
        type: "long-text",
        placeholder: "2-3 sentences on what it does and your role"
      },
      {
        name: "Which frameworks and tools do you use?",
        type: "generic",
        placeholder: "e.g. React, Next.js, Node, Tailwind, Postgres"
      },
      {
        name: "Explain the difference between rendering on the server and in the browser.",
        type: "long-text",
        placeholder: "In your own words"
      },
      {
        name: "Describe a bug that took you far too long to find. What was it?",
        type: "long-text",
        placeholder: "2-3 sentences"
      },
      {
        name: "Share a link to a live site or repository.",
        type: "short-text",
        placeholder: "GitHub, Vercel, or your portfolio"
      },
      {
        name: "How would you make a slow-loading page faster?",
        type: "generic",
        placeholder: "Say what you would measure first"
      },
      {
        name: "How do you keep user data safe in an app you build?",
        type: "generic",
        placeholder: "2-3 sentences"
      },
      {
        name: "What do you want to learn next?",
        type: "short-text",
        placeholder: "One line"
      }
    ],
  },
];

// Sample Admin Data
export const sampleAdminHeader = [
  {
    Header: "SrNo",
    accessor: "srno",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Department",
    accessor: "department",
  },
];

// Headers for CSV exports
export const CSV_Header = [
  {
    label: "Name",
    key: "Name",
  },
  {
    label: "Email",
    key: "Email",
  },
  {
    label: "Registration Number",
    key: "RegistrationNumber",
  },
  {
    label: "Phone",
    key: "Phone",
  },
  {
    label: "Department",
    key: "Department",
  },

  {
    label: "Preference",
    key: "Pref",
  },
  {
    label: "Shortlisted",
    key: "shortlisted",
  },
  {
    label: "Questions",
    key: "Questions",
  },
];

// Mailing Templates
export const mailingTemplate = {
  Interview:
    "<p>Edit content</p><br><p>Thank you for applying to Organization Name. We are excited to let you know that you have been shortlisted for joining the #dept Department!</p><p>We look forward to your active participation!</p>",
};

export const technicalCards = [
  {
    title: "Blockchain",
    description:
      "Explores decentralized apps, smart contracts, and Web3 development, giving members hands-on experience with blockchain protocols and tools.",
    color: "#FF7A6B",
    image: "/assets/images/icons/blockchain.svg",
    formLink: "/6a89c4e2-7b19-4f32-821e-9821a41b5201",
  },
  {
    title: "Cloud &\nDevOps",
    description:
      "Explores cloud computing, infrastructure, and automation by building scalable applications, hosting hands-on workshops, and educating members about cloud platforms, containerization, CI/CD pipelines, and DevOps practices.",
    color: "#FBBC04",
    image: "/assets/images/icons/cloud.svg",
    formLink: "/a1d920df-9eb9-49eb-b3a4-e4a3d1245ede", // Cloud & DevOps ID
  },
  {
    title: "Game Dev",
    description:
      "Combines creativity and technical skills to design engaging, entertaining games, giving members hands-on experience with real-world game development tools, engines, and production workflows.",
    color: "#4285F4",
    image: "/assets/images/icons/game-dev.svg",
    formLink: "/9055864f-c7dc-44cd-91d5-8759d32a496a", // App Development ID (placeholder)
  },
  {
    title: "App Dev",
    description:
      "Builds intuitive, impactful mobile applications, improving accessibility, interaction, and convenience for members and event participants through functional, user-focused design.",
    color: "#EA4335",
    image: "/assets/images/icons/app-dev.svg",
    formLink: "/339f0f8a-72f2-44b9-92ab-2b0d4dcfa0f6",
  },
  {
    title: "UI/UX",
    description:
      "Designs visually appealing, user-friendly digital interfaces with a focus on accessibility, usability, and aesthetics, ensuring products provide enjoyable, intuitive, and meaningful user experiences.",
    color: "#0F9D58",
    image: "/assets/images/icons/ui-ux.svg",
    formLink: "/e2ed9c2c-c36c-457f-a8bb-cf2e8bc7c2e1",
  },
  {
    title: "Data\nScience",
    description:
      "Applies AI, machine learning, and analytics to transform data into actionable insights, helping solve problems, build predictive models, and inspire innovation across projects.",
    color: "#EA4335",
    image: "/assets/images/icons/data-science.svg",
    formLink: "/c0f3b1d1-ce05-45f6-9e34-ac9443fc5fcb", // App Development ID (placeholder)
  },
  {
    title: "Competitive Programming",
    description:
      "Promotes problem-solving skills through coding contests, hackathons, and peer learning, helping members sharpen algorithms, logic, and efficiency while preparing for real-world tech challenges.",
    color: "#0F9D58",
    image: "/assets/images/icons/cp.svg",
    formLink: "/3e9ac635-01d4-495e-aa87-a7335a2403c2", // App Development ID (placeholder)
  },
  {
    title: "Web Dev",
    description:
      "Designs, develops, and maintains responsive, high-performance websites for projects and events, using modern web technologies to enhance accessibility, user experience, and community engagement online.",
    color: "#FBBC04",
    image: "/assets/images/icons/web-dev.svg",
    formLink: "/8143de1d-db17-42fa-958d-13b10804f894",
  },
  {
    title: "Open\nSource",
    description:
      "Encourages members to contribute to open-source projects, building collaboration skills, real-world coding experience, and a culture of transparency, learning, and global tech impact.",
    color: "#4285F4",
    image: "/assets/images/icons/open-source.svg",
    formLink: "/ae7db51a-c6db-4f8d-9159-40767c5354cb", // App Development ID (placeholder)
  },
];

export const nonTechnicalCards = [
  {
    title: "Design",
    description:
      "Creates stunning visuals, event posters, and branding materials that capture the organization's identity, ensuring every design communicates creativity, professionalism, and excitement to engage the community.",
    color: "#329A4E",
    image: "/assets/images/icons/design.svg",
    formLink: "/d3beefc1-f8b0-4202-b26c-36e9804b6636",
  },
  {
    title: "Outreach",
    description:
      "Builds partnerships and expands outreach by connecting with communities, sponsors, and collaborators, ensuring diverse opportunities and impactful collaborations both within and beyond campus.",
    color: "#4285F4",
    image: "/assets/images/icons/outreach.svg",
    formLink: "/3936d5a2-acd9-4a98-ac97-42c2c92f5c02", // App Development ID (placeholder)
  },
  {
    title: "Publicity",
    description:
      "Drives online presence with creative campaigns, video editing, and storytelling, boosting engagement, promoting events, and showcasing the club to inspire participation and community growth.",
    color: "#EA4335",
    image: "/assets/images/icons/social-media.svg",
    formLink: "/4499a966-2740-4c36-88dd-8916a909fc77", // App Development ID (placeholder)
  },
  {
    title: "Management",
    description:
      "The backbone of the organization, turning vision into reality by planning, executing, and improvising. Oversees events, operations, and growth, ensuring smooth functioning, success, and impactful experiences.",
    color: "#FBBC04",
    image: "/assets/images/icons/management.svg",
    formLink: "/c21ca066-ab4d-40a3-943c-f170d6312bdc", // App Development ID (placeholder)
  },
];
