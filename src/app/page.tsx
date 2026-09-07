import { HomePage } from "@/components/home/HomePage";
import { site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | Full-Stack Software Engineer`,
  },
  description: site.metadata.description,
};

export default function Home() {
  return <HomePage />;
}
