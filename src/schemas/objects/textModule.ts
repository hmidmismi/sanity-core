import { TextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const textModule = defineType({
  name: 'textModule',
  title: 'Text Module',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'internationalizedArrayPortableTextBody',
    }),
  ],
  preview: {
    select: { text: 'text' },
    prepare({ text }) {
      const plainText = text?.[0]?.children?.[0]?.text ?? 'Text Module';
      return { title: plainText };
    },
  },
});
