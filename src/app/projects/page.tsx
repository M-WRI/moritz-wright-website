import { WorkArchive } from "@/components/work/WorkArchive";
import { getProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A collection of software, AI, desktop, web and experimental projects.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  return <WorkArchive projects={projects} />;
}
