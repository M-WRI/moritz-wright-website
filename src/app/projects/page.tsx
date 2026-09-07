import { BigTitle } from "@/components/site/BigTitle";
import { ParallaxGallery } from "@/components/site/ParallaxGallery";
import { projects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software, internal tools, AI applications, and developer systems.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-16">
      <BigTitle as="h1">projects</BigTitle>
      <p
        data-reveal
        className="max-w-xl px-5 pb-12 text-sm leading-relaxed text-muted md:px-10"
      >
        Dummy images for now. Case studies will replace these placeholders —
        no invented clients or results.
      </p>
      <ParallaxGallery projects={projects} />
    </div>
  );
}
