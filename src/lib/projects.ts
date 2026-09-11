import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectTech = {
  name: string;
  detail: string;
};

export type ProjectScreenshot = {
  src: string;
  label: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  oneLiner: string;
  category: string;
  stackLabel: string;
  tags: string[];
  year: string;
  featured: boolean;
  placeholder: boolean;
  image: string;
  heroImage: string;
  logoText?: string;
  darkThumb?: boolean;
  github: string | null;
  demo: string | null;
  overlayText: string;
  aboutHeading: string;
  aboutBody: string;
  features: ProjectFeature[];
  technologies: ProjectTech[];
  screenshots: ProjectScreenshot[];
};

type ProjectFrontmatter = {
  title: string;
  number: string;
  tagline: string;
  category: string;
  stack: string;
  tags?: string[];
  year?: string | number;
  featured?: boolean;
  placeholder?: boolean;
  image: string;
  heroImage: string;
  logoText?: string;
  darkThumb?: boolean;
  github?: string | null;
  demo?: string | null;
  overlay: string;
  aboutHeading: string;
  features?: ProjectFeature[];
  tech?: ProjectTech[];
  screenshots?: ProjectScreenshot[];
};

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

function parseBody(markdown: string): { oneLiner: string; aboutBody: string } {
  const parts = markdown.trim().split(/^##\s+About\s*$/m);
  const oneLiner = (parts[0] ?? "").trim();
  const aboutBody = (parts[1] ?? "").trim();
  return { oneLiner, aboutBody };
}

function loadProjectFile(filename: string): Project {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ProjectFrontmatter;
  const { oneLiner, aboutBody } = parseBody(content);

  if (!frontmatter.title || !frontmatter.number || !oneLiner) {
    throw new Error(`Invalid project markdown: ${filename}`);
  }

  return {
    slug,
    number: String(frontmatter.number).padStart(2, "0"),
    title: frontmatter.title,
    tagline: frontmatter.tagline,
    oneLiner,
    category: frontmatter.category,
    stackLabel: frontmatter.stack,
    tags: frontmatter.tags ?? [],
    year: String(frontmatter.year ?? new Date().getFullYear()),
    featured: frontmatter.featured ?? true,
    placeholder: frontmatter.placeholder ?? false,
    image: frontmatter.image,
    heroImage: frontmatter.heroImage,
    logoText: frontmatter.logoText,
    darkThumb: frontmatter.darkThumb ?? false,
    github: frontmatter.github ?? null,
    demo: frontmatter.demo ?? null,
    overlayText: frontmatter.overlay,
    aboutHeading: frontmatter.aboutHeading,
    aboutBody,
    features: frontmatter.features ?? [],
    technologies: frontmatter.tech ?? [],
    screenshots: frontmatter.screenshots ?? [],
  };
}

export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map(loadProjectFile)
    .sort((a, b) => a.number.localeCompare(b.number));
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function featuredProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}
