// src/schemas/documents/baseArticle.ts

import { defineField, defineType } from 'sanity';
import { localizedTextField } from '../../lib/fields';

export const baseArticle = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    localizedTextField(),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
