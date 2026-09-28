export const site = {
  name: "Moritz Wright",
  legalName: "Moritz Alexander Wright",
  mark: "MW",
  title: "Software Engineer — AI Applications & Full Stack",
  shortTitle: "Software Engineer / Berlin • Managua",
  location: "Berlin • Managua",
  country: "Germany",
  coordinates: "52.5200° N / 13.4050° E",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moritzwright.com",
  metadata: {
    title: {
      default: "Moritz Wright | Software Engineer",
      template: "%s | Moritz Wright",
    },
    description:
      "Moritz Alexander Wright — software engineer based in Berlin and Managua. I build useful things: AI applications, full-stack products, and tools for real problems.",
  },
  email: "me@moritzwright.com",
  socials: {
    github: "https://github.com/M-WRI",
    linkedin: "https://www.linkedin.com/in/moritz-wright/",
  },
} as const;

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const hero = {
  lines: ["Build", "Useful", "Things."],
  specialties:
    "Software Engineer / AI Applications / Full Stack Development / Tools for Real Problems",
  primaryCta: { href: "/projects", label: "View Work" },
  secondaryCta: { href: "/contact", label: "Get in Touch" },
} as const;

export const philosophy = {
  lines: ["Better", "Tools", "A Brighter", "Tomorrow."],
  body: "I am a software engineer based in Berlin and Managua. I care about technology, people, and the systems that shape everyday life. I build tools that make complex work simpler — and leave room for a more open world.",
  cta: { href: "/about", label: "More About Me" },
} as const;

export const about = {
  lines: ["Software First.", "Ai With Intent."],
  intro:
    "I build software, internal tools, and AI applications that solve real problems and deliver measurable outcomes.",
  aboutMeLabel: "About Me",
  aboutMe: [
    "I have 6+ years of experience as a software engineer, building full-stack products, internal tools, and AI-powered applications.",
    "My work sits at the intersection of software engineering and applied AI. I care about how AI meaningfully changes workflows, how developer environments can be extended, and how software remains maintainable as complexity grows.",
  ],
  stats: [
    { value: "6+ Years", label: "Professional Experience" },
    {
      value: "Full-Stack",
      label: "Frontend, Backend, APIs, Infrastructure",
    },
    {
      value: "AI Applications",
      label: "Products, Internal Tools, AI Integrations",
    },
  ],
  cta: {
    kicker: "Let's Work Together",
    title: "Open to Select Projects.",
    href: "/contact",
    label: "Get in Touch",
  },
} as const;

export const approach = {
  title: "Principles",
  items: [
    {
      title: "Software First",
      body: "AI should serve the product, not the other way around.",
    },
    {
      title: "Build Systems, Not Prompts",
      body: "Reliable AI development comes from context, rules, tools, and evaluation.",
    },
    {
      title: "Simple Architecture",
      body: "Prefer systems that are easy to understand, change, and hand over.",
    },
    {
      title: "Automate Repetition",
      body: "If work has to be done again, it should become a tool, workflow, or shared foundation.",
    },
  ],
} as const;

export const services = {
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
      body: "Applications that replace spreadsheets, manual processes, or fragmented tools.",
    },
    {
      slug: "ai-applications",
      title: "AI applications",
      body: "AI features inside existing or new products: LLM workflows, transcription, classification, summarization, and agents.",
    },
    {
      slug: "ai-infrastructure",
      title: "AI development infrastructure",
      body: "Help engineering teams use coding agents effectively: project rules, skills, templates, and evaluation.",
    },
    {
      slug: "automation",
      title: "Automation & integrations",
      body: "Connect systems and remove repetitive work through APIs and custom software.",
    },
    {
      slug: "prototyping",
      title: "Rapid prototyping",
      body: "Take an idea to a working prototype or MVP quickly, on a foundation that can still become production software.",
    },
  ],
} as const;

export const contact = {
  lines: ["Let's", "Talk"],
  body: "I'm always open to interesting projects, collaborations or just a good conversation about software, AI, or ideas that create real impact.",
  topics: [
    "Website",
    "Web Application",
    "Mobile Application",
    "AI Application",
    "AI Implementation",
    "Internal Tool / Dashboard",
    "Automation & Integrations",
    "Other / Not sure yet",
  ],
} as const;
