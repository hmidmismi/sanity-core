import { defineField, defineType } from 'sanity';
import { titleField } from '../../fields';

export const baseArticle = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    titleField(),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
