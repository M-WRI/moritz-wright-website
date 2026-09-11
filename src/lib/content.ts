export const site = {
  name: "Moritz Wright",
  legalName: "Moritz Alexander Wright",
  mark: "MW",
  title: "Software Engineer — AI Applications & Full Stack",
  shortTitle: "Software Engineer / Berlin • Managua",
  location: "Berlin • Managua",
  country: "Germany",
  established: "Est. 1988",
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
  imageOverlays: {
    top: ["Ideas", "Code", "Systems", "People."],
    bottom: "Berlin • Managua",
  },
  primaryCta: { href: "/projects", label: "View Work" },
  secondaryCta: { href: "/contact", label: "Get in Touch" },
} as const;

export const philosophy = {
  lines: ["Better", "Tools", "A Brighter", "Tomorrow."],
  body: "I am a software engineer based in Berlin and Managua. I care about technology, people, and the systems that shape everyday life. I build tools that make complex work simpler — and leave room for a more open world.",
  cta: { href: "/about", label: "More About Me" },
  interests: [
    "Tech",
    "People",
    "Culture",
    "Nature",
    "Solidarity",
    "A More Open World",
  ],
} as const;

export const about = {
  kicker: "About",
  title: "Software first. AI where it helps.",
  body: [
    "I am first and foremost a software engineer. For 6+ years I have built full-stack products — frontend, backend, APIs, and the systems between them.",
    "AI has become part of how I design and ship software. That does not change the foundation. I still start with architecture, interfaces, data, and the constraints that make a product reliable in production.",
    "My current work sits where software engineering, AI applications, and developer experience overlap. I care about how applications use AI, how developers work with coding agents, and how generated code stays maintainable.",
    "I build the product and the environment around it, so the next feature or internal tool does not start from zero.",
  ],
} as const;

export const approach = {
  title: "How I build",
  items: [
    {
      title: "Software first",
      body: "AI should improve software — not replace architecture, testing, or judgment.",
    },
    {
      title: "Build systems, not prompts",
      body: "Reliable AI development comes from context, rules, tools, and evaluation.",
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
  title: "Have a project in mind?",
  body: "I work with companies and teams on custom software, internal tools, AI applications, and developer tooling.",
  cta: "Start a conversation",
} as const;
