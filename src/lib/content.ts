export const site = {
  name: "Moritz Wright",
  title: "Full-Stack Software Engineer — AI Applications & Developer Experience",
  shortTitle: "Full-Stack & AI Application Engineer",
  metadata: {
    title: {
      default: "Moritz Wright | Full-Stack Software Engineer",
      template: "%s | Moritz Wright",
    },
    description:
      "Full-stack software engineer with 6+ years of experience. I build AI-powered applications, internal tools, and developer systems — software first, AI as part of the engineering process.",
  },
  email: "hello@example.com",
  socials: {
    github: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export const navColumns = [
  {
    title: "work",
    links: [
      { href: "/projects", label: "projects" },
      { href: "/blog", label: "writing" },
    ],
  },
  {
    title: "practice",
    links: [
      { href: "/services", label: "services" },
      { href: "/about", label: "about" },
    ],
  },
  {
    title: "contact",
    links: [
      { href: "/contact", label: "get in touch" },
      { href: "mailto:hello@example.com", label: "email" },
    ],
  },
] as const;

export const hero = {
  kicker: "6+ years of software engineering experience",
  lines: [
    "Full-Stack Software Engineer",
    "AI Applications",
    "Developer Experience",
  ],
  body: "Full-stack software engineer with 6+ years of experience building applications, APIs, and digital products. Today I focus on AI-powered software, internal tools, and developer systems that help teams build and automate with consistent engineering standards.",
  primaryCta: { href: "/projects", label: "View Projects" },
  secondaryCta: { href: "/contact", label: "Work With Me" },
  tertiaryCta: { href: "/blog", label: "Read Blog" },
} as const;

export const positioning =
  "I build software across the full stack, with a focus on AI-powered applications, internal tools, and developer systems. With 6+ years of software engineering experience, I combine engineering fundamentals with modern AI workflows to ship reliable products and help teams develop software more effectively.";

export const whatIDo = {
  kicker: "01",
  title: "What I do",
  intro:
    "AI is an extension of the engineering work — not a replacement for it.",
  items: [
    {
      title: "Full-stack engineering",
      body: "I design and build complete applications across frontend and backend: interfaces, services, APIs, databases, authentication, and integrations. From web and desktop products to the architecture that keeps them maintainable.",
    },
    {
      title: "AI applications",
      body: "I integrate models into real software — assistants, transcription, localization, document processing, structured workflows, and human-in-the-loop systems. The goal is reliable product behavior, not a chatbot bolted on the side.",
    },
    {
      title: "Developer experience & AI engineering",
      body: "I design the environment around AI-assisted development: standards, templates, agent instructions, rules, skills, automation, and tests. So generated software stays consistent, reviewable, and aligned with how the team already builds.",
    },
  ],
} as const;

export const services = {
  kicker: "02",
  title: "What I can build",
  intro:
    "I work with companies and teams that need software shipped — and the systems that keep the next build consistent.",
  items: [
    {
      slug: "custom-software",
      title: "Custom software",
      body: "Full-stack applications tailored to a workflow or product. Frontend, backend, APIs, and the architecture to take them to production.",
    },
    {
      slug: "internal-tools",
      title: "Internal tools",
      body: "Applications that replace spreadsheets, manual processes, or fragmented tools. Dashboards, admin consoles, operations software, localization, and workflow apps.",
    },
    {
      slug: "ai-applications",
      title: "AI applications",
      body: "AI features inside existing or new products: LLM workflows, transcription, classification, summarization, document processing, assistants, and agents.",
    },
    {
      slug: "ai-infrastructure",
      title: "AI development infrastructure",
      body: "Help engineering teams use coding agents effectively: project rules, AGENTS.md, skills, templates, workflows, and ways to evaluate generated code.",
    },
    {
      slug: "automation",
      title: "Automation & integrations",
      body: "Connect systems and remove repetitive work through APIs, custom software, and AI where it is actually the right tool.",
    },
    {
      slug: "prototyping",
      title: "Rapid prototyping",
      body: "Take an idea to a working prototype or MVP quickly, on a foundation that can still become production software.",
    },
  ],
} as const;

export const approach = {
  kicker: "03",
  title: "How I build",
  items: [
    {
      title: "Software first",
      body: "AI should improve software — not replace architecture, testing, or judgment.",
    },
    {
      title: "Build systems, not prompts",
      body: "Reliable AI development comes from context, rules, tools, and evaluation — not one perfect instruction.",
    },
    {
      title: "Simple architecture",
      body: "Prefer systems that are easy to understand, change, and hand over.",
    },
    {
      title: "Automate repetition",
      body: "If work has to be done again, it should become a tool, workflow, or shared foundation.",
    },
  ],
} as const;

export const about = {
  kicker: "04",
  title: "About",
  body: [
    "I am first and foremost a software engineer. For 6+ years I have built full-stack products — frontend, backend, APIs, and the systems between them.",
    "AI has become part of how I design and ship software. That does not change the foundation. I still start with architecture, interfaces, data, and the constraints that make a product reliable in production.",
    "My current work sits where software engineering, AI applications, and developer experience overlap. I am interested in more than calling a model API. I care about how applications use AI, how developers work with coding agents, how engineering standards get encoded into agent instructions, and how generated code stays maintainable.",
    "That is the same job I have always had — building software that holds up — with a broader set of tools. I still review architecture, write the parts that need a human, and decide when AI is the wrong shortcut.",
    "I build the product and the environment around it, so the next feature or internal tool does not start from zero.",
  ],
} as const;

export const contact = {
  kicker: "05",
  title: "Have a project in mind?",
  body: "I work with companies and teams on custom software, internal tools, AI applications, and developer tooling.",
  cta: "Start a conversation",
} as const;

export const projectCategories = [
  "Full Stack",
  "AI",
  "Internal Tools",
  "Developer Tools",
  "Desktop",
  "Automation",
  "Experiments",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
  placeholder: boolean;
  image: string;
  github: string | null;
  demo: string | null;
  overview: string;
  problem: string;
  solution: string;
  engineering: string;
  result: string;
  learned?: string;
};

const caseStudyPlaceholder = {
  overview:
    "Project details will be added here. This page is a placeholder so the case-study structure is in place.",
  problem: "To be documented.",
  solution: "To be documented.",
  engineering: "To be documented.",
  result: "To be documented.",
} as const;

export const projects: Project[] = [
  {
    slug: "placeholder-internal-tool",
    title: "Internal tool",
    oneLiner: "Case study coming soon.",
    category: "Internal Tools",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/01.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
  {
    slug: "placeholder-ai-application",
    title: "AI application",
    oneLiner: "Case study coming soon.",
    category: "AI",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/02.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
  {
    slug: "placeholder-developer-tooling",
    title: "Developer tooling",
    oneLiner: "Case study coming soon.",
    category: "Developer Tools",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/03.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
  {
    slug: "placeholder-automation",
    title: "Automation",
    oneLiner: "Case study coming soon.",
    category: "Automation",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/04.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
  {
    slug: "placeholder-desktop",
    title: "Desktop app",
    oneLiner: "Case study coming soon.",
    category: "Desktop",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/05.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
  {
    slug: "placeholder-full-stack",
    title: "Full-stack product",
    oneLiner: "Case study coming soon.",
    category: "Full Stack",
    technologies: [],
    featured: true,
    placeholder: true,
    image: "/gallery/06.jpg",
    github: null,
    demo: null,
    ...caseStudyPlaceholder,
  },
];

export const blogCategories = [
  "AI Engineering",
  "Software Engineering",
  "Developer Experience",
  "Internal Tools",
  "Agents",
  "Experiments",
  "Architecture",
  "Tauri",
  "TypeScript",
  "React",
  "Backend",
  "Automation",
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: (typeof blogCategories)[number];
  readingTime: string;
  body: string[];
};

/** Published posts only. Empty until real writing is added. */
export const posts: BlogPost[] = [];

export const plannedPosts = [
  "How I structure Cursor rules for real software projects",
  "Rules vs Skills vs AGENTS.md",
  "Building an AI-friendly software repository",
  "Why AI coding still requires software architecture",
  "Building internal tools with AI",
  "Context engineering for software agents",
  "Designing reusable AI development workflows",
  "How I evaluate AI-generated code",
  "Building desktop applications with Tauri",
  "From prompt engineering to agent engineering",
  "How AI is changing developer experience",
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function featuredProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
