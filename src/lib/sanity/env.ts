// Next loads `.env.local` from the app root only — not `studio/.env*`.
export const sanityProjectId =
  process.env.SANITY_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  "";

export const sanityDataset =
  process.env.SANITY_DATASET ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";
