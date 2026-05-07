import { defineField, defineType } from 'sanity';
import { titleField } from '../../fields';

export const basePerson = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    titleField(),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const match = doc.title?.find((t: any) => t._key === 'en' || t.language === 'en');
          return match?.value ?? '';
        },
      },
    }),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
