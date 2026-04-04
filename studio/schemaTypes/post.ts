import {defineField, defineType} from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: "title", media: "thumbnail"},
    prepare({title, media}) {
      return {title: title ?? "Untitled", media};
    },
  },
});
