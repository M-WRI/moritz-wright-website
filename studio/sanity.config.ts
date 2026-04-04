import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./schemaTypes";

const structure = structureTool({
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        S.documentTypeListItem("post").title("Posts"),
        S.documentTypeListItem("gallery").title("Gallery"),
      ]),
});

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

if (!projectId) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID. Copy studio/.env.example to studio/.env and set your project id.",
  );
}

export default defineConfig({
  name: "moritz",
  title: "Moritz",
  projectId,
  dataset,
  plugins: [structure, visionTool()],
  schema: {
    types: schemaTypes,
  },
});
