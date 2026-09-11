import { site } from "@/lib/content";
import { getProjects } from "@/lib/projects";

export function JsonLd() {
  const projects = getProjects();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Software Engineer",
    description: site.metadata.description,
    image: `${site.url}/og.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "AI Applications",
      "Desktop Applications",
      "Open Source",
    ],
    sameAs: [site.socials.github, site.socials.linkedin].filter(
      (value): value is NonNullable<typeof value> => Boolean(value),
    ),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.metadata.description,
    publisher: { "@id": `${site.url}/#person` },
    inLanguage: "en",
  };

  const portfolio = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/projects/${project.slug}`,
      name: project.title,
      description: project.oneLiner,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolio) }}
      />
    </>
  );
}
