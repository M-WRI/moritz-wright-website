import type { Project } from "@/lib/projects";

export function sortProjectsLatest(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) =>
      b.year.localeCompare(a.year) || a.number.localeCompare(b.number),
  );
}

export function takeRecentProjects(projects: Project[], limit = 5): Project[] {
  return sortProjectsLatest(projects).slice(0, limit);
}
