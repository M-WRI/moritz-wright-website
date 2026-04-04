import {defineField, defineType} from "sanity";

export const galleryRow = defineType({
  name: "galleryRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      title: "Cells",
      type: "array",
      of: [{type: "galleryCell"}],
      validation: (Rule) =>
        Rule.custom((cells) => {
          if (!cells?.length) {
            return "Add at least one cell";
          }
          const list = cells as {colSpan?: number}[];
          const sum = list.reduce((acc, c) => acc + (c.colSpan ?? 0), 0);
          if (sum !== 5) {
            return `Column spans must sum to 5 (currently ${sum})`;
          }
          return true;
        }),
    }),
  ],
  preview: {
    prepare() {
      return {title: "Row"};
    },
  },
});
