import {defineField, defineType} from "sanity";

export const galleryCell = defineType({
  name: "galleryCell",
  title: "Cell",
  type: "object",
  fields: [
    defineField({
      name: "colSpan",
      title: "Column span",
      description: "5-column grid; spans in a row must add up to 5.",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{type: "post"}],
    }),
  ],
  preview: {
    select: {colSpan: "colSpan", title: "post.title"},
    prepare({colSpan, title}) {
      return {
        title: `${colSpan ?? "?"} col — ${title ?? "No post"}`,
      };
    },
  },
});
