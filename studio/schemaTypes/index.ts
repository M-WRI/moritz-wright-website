import type {SchemaTypeDefinition} from "sanity";
import {gallery} from "./gallery";
import {galleryCell} from "./galleryCell";
import {galleryRow} from "./galleryRow";
import {post} from "./post";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  galleryCell,
  galleryRow,
  gallery,
];
