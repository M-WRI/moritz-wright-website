import {defineField, defineType} from "sanity";
import {GalleryRowsInput} from "../components/GalleryRowsInput";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Home gallery",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{type: "galleryRow"}],
      components: {
        input: GalleryRowsInput,
      },
    }),
  ],
  preview: {
    select: {title: "title"},
    prepare({title}) {
      return {title: title ?? "Gallery"};
    },
  },
});
