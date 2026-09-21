// src/schemas/arrays/portableTextTitle.ts

import { defineType } from 'sanity';

export const portableTextTitle = defineType({
  name: 'portableTextTitle',
  title: 'Title',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [],
      },
    },
  ],
});
