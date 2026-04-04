import { DesktopScrollLayout } from "@/components/DesktopScrollLayout";
import { loadGalleryForHome } from "@/lib/sanity/loadGallery";

export async function Portfolio() {
  const { rows } = await loadGalleryForHome();
  return <DesktopScrollLayout galleryRows={rows} />;
}
