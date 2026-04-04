import imageUrlBuilder from "@sanity/image-url";
import {sanityClient} from "./client";
import {sanityProjectId} from "./env";

export type GalleryCellView = {
  key: string;
  colSpan: number;
  imageUrl: string | null;
  title: string;
};

export type GalleryRowView = {
  key: string;
  cells: GalleryCellView[];
};

type GalleryQuery = {
  rows?: Array<{
    _key: string;
    cells?: Array<{
      _key: string;
      colSpan?: number;
      post?: {
        title?: string;
        thumbnail?: {
          asset?: {_ref?: string};
        };
      } | null;
    }>;
  }>;
};

const galleryQuery = `*[_type == "gallery"][0]{
  rows[]{
    _key,
    cells[]{
      _key,
      colSpan,
      post->{
        title,
        thumbnail
      }
    }
  }
}`;

export async function loadGalleryForHome(): Promise<{rows: GalleryRowView[]}> {
  if (!sanityClient) {
    if (process.env.NODE_ENV === "development" && !sanityProjectId) {
      console.warn(
        "[sanity] Add project id to `.env.local` next to `package.json` (repo root), not only in `studio/`. Use SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_PROJECT_ID, or SANITY_STUDIO_PROJECT_ID.",
      );
    }
    return {rows: []};
  }

  const data = await sanityClient.fetch<GalleryQuery | null>(galleryQuery);
  const rowsIn = data?.rows;
  if (!rowsIn?.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[sanity] No gallery rows returned. Create a “Gallery” document in Studio with at least one row whose cells sum to 5 columns.",
      );
    }
    return {rows: []};
  }

  const builder = imageUrlBuilder(sanityClient);

  const rows: GalleryRowView[] = rowsIn.map((row) => ({
    key: row._key,
    cells: (row.cells ?? []).map((cell) => {
      const post = cell.post;
      const thumbnail = post?.thumbnail;
      let imageUrl: string | null = null;
      if (thumbnail) {
        try {
          imageUrl = builder.image(thumbnail).width(1200).height(1200).fit("crop").url();
        } catch {
          imageUrl = null;
        }
      }

      return {
        key: cell._key,
        colSpan: cell.colSpan ?? 1,
        imageUrl,
        title: post?.title?.trim() || "Project",
      };
    }),
  }));

  return {rows};
}
