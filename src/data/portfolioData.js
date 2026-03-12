export const portfolioData = {
  personalInfo: {
    name: "Sathish G",
    age: 26,
    nationality: "Indian",
    address: "Chennai, Tamil Nadu, India",
    phone: "+91 9150155267",
    email: "sathishganesan.official@gmail.com",
    languages: ["English", "Tamil"],
    summary: "Digital Transformation Engineer with 2+ years of experience specializing in React.js, Next.js, and scaling into Angular with Spring Boot. Expert in AI-native engineering, leveraging AI tools to accelerate development speed and build intelligent, full-stack solutions.",
    social: {
      linkedin: "https://linkedin.com/in/sathish-g",
      github: "https://github.com/sathish-g"
    }
  },
  stats: {
    experience: "2+ Years",
    projects: "4+",
    clients: "3+"
  },
  experience: [
    {
      role: "Digital Transformation Engineer",
      company: "Ideassion Technology Solutions",
      period: "October 2024 – Present",
      location: "Chennai",
      description: "Driving digital acceleration by architecting modern web platforms. Expertly handling React/Next.js and Angular frontends paired with robust Spring Boot backends. Contributing to scalable enterprise architectures."
    },
    {
      role: "Junior Software Developer",
      company: "Phantom Solutions",
      period: "November 2023 – September 2024",
      description: "Collaborated on multi-tenant SaaS products, handling end-to-end development using React and Next.js. Managed complex state requirements and optimized application performance for industrial-scale tools."
    },
    {
      role: "Software Developer Intern",
      company: "Phantom Solutions",
      period: "August 2023 – October 2023",
      description: "Gained hands-on experience in Agile development, contributing to cross-functional teams using Java, Spring Boot, and React. Supported senior developers in building mission-critical modules."
    }
  ],
  education: [
    {
      degree: "B.E Electronics & Communication Engineering",
      institution: "Sri Sairam Engineering College",
      cgpa: "8.07",
      period: "2018 – 2022"
    }
  ],
  skills: {
    frontend: ["React.js", "Next.js", "Angular", "TypeScript", "RxJS", "Zone.js", "JavaScript (ES6+)", "Redux", "Zustand", "Framer Motion", "HTML5", "CSS3"],
    backend: ["Java", "Spring Boot", "REST APIs", "Microservices", "Spring Security", "Hibernate"],
    database: ["SQL", "PostgreSQL", "MySQL", "Supabase", "Firebase"],
    uiLibraries: ["Shadcn UI", "Tailwind CSS v4", "Lucide React", "React Bootstrap", "Material UI"]
  },
  projects: [
    {
      title: "ESYGO EV Charging Application",
      client: "ESY TECH INDIA PVT LTD",
      stack: ["React", "Next.js", "Spring Boot", "PostgreSQL"],
      preview: "https://play.google.com/store/apps/details?id=com.esygo.esyandroid",
      description: "A large-scale EV ecosystem enabling users to locate, book, and pay for charging stations seamlessly. Implemented real-time tracking and payment gateway integration using React and Spring Boot."
    },
    {
      title: "Ackumen Chemical Management",
      client: "Buckman",
      stack: ["React.js", ".NET C#"],
      description: "An enterprise platform for critical chemical management and data visualization, used by global industrial clients to monitor chemical levels and optimize processes."
    },
    {
      title: "NexCall Video Interaction",
      client: "Personal Project",
      stack: ["Next.js", "Clerk", "TailwindCSS", "Shadcn UI"],
      description: "A video conferencing tool optimized for low latency and high-quality interaction, featuring secure authentication and screen sharing."
    },
    {
      title: "AssignR Task Management",
      client: "Personal Project",
      stack: ["Angular", "Spring Boot", "MySQL"],
      description: "Efficiency-focused task management with real-time updates and intuitive UI using Angular RxJS and Spring Boot to streamline team collaborations."
    }
  ],
  // Comprehensive Knowledge Base for the "Custom App Chatbot"
  knowledgeBase: [
    {
      id: "salary",
      keywords: ["salary", "hired", "pay", "rate", "compensation", "package", "expected p", "ctc"],
      answer: "My boss's current CTC is 4 LPA, and his expected CTC is 7 LPA. He is open to negotiation, especially as he has upscale his skills to a full-stack profile (React/Next.js/Angular + Spring Boot) with AI expertise. His notice period is 15 - 30 days."
    },
    {
      id: "relocate",
      keywords: ["relocate", "location", "travel", "move", "city", "onsite"],
      answer: "Yes, my boss is absolutely willing to relocate for the right professional opportunity."
    },
    {
      id: "availability",
      keywords: ["availability", "notice period", "join", "start", "immediate", "when"],
      answer: "My boss's notice period is between 15 to 30 days. He is ready to join and hit the ground running!"
    },
    {
      id: "contact",
      keywords: ["contact", "email", "phone", "reach", "call", "whatsapp", "message"],
      answer: "You can reach Sathish directly at his email: sathishganesan.official@gmail.com or via phone/whatsapp: +91 9150155267. [CONTACT_CARD]"
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "download", "document", "profile pdf"],
      answer: "You can download his official PDF resume from the link at the top of the Resume page, or I can walk you through his specific roles here!"
    },
    {
      id: "strengths",
      keywords: ["strengths", "best at", "good at", "why hire", "benefits", "value", "strong"],
      answer: "Sathish's core strength is bridging the gap between business requirements and scalable technical execution. He is an expert in AI-native engineering using React, Next.js, and Spring Boot. He achieves 2x development speed while maintaining high quality."
    },
    {
      id: "projects_summary",
      keywords: ["total projects", "portfolio", "what he built", "major project", "biggest"],
      answer: "Sathish has successfully delivered 4+ major projects. His biggest professional impact was on the ESYGO EV app (React/Next.js) and the Buckman industrial platform. [PROJECT_CARD: ESYGO]"
    }
  ],
  // Predefined Quick Questions for the Chat UI
  quickQueries: [
    "Introduce yourself",
    "Tell me about your projects",
    "What is your CTC & notice period?",
    "Are you willing to relocate?",
    "Show me your core skills"
  ]
};
