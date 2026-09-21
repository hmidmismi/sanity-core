// src/schemas/documents/basePage.ts

import { defineField, defineType } from 'sanity';
import { localizedTextField } from '../../lib/fields';

export const basePage = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    localizedTextField(),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
