import { HomePage } from "@/components/home/HomePage";
import { site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${site.legalName} | Software Engineer`,
  },
  description: site.metadata.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.legalName} | Software Engineer`,
    description: site.metadata.description,
    url: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
