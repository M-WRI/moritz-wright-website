import { site } from "@/lib/content";
import { getProjects } from "@/lib/projects";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const projects = getProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/about",
    "/contact",
    "/services",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/projects" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
