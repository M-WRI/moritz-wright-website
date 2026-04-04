import {createClient, type SanityClient} from "@sanity/client";
import {sanityDataset, sanityProjectId} from "./env";

export const sanityClient: SanityClient | null = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;
