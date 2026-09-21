// src/schemas/documents/basePerson.ts

import { defineField, defineType } from 'sanity';
import { ComputedStringInput } from '../../lib/components';
import { textField } from '../../lib/fields';

export const basePerson = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    textField({
      title: 'Display Name',
      components: {
        input: (props: any) =>
          ComputedStringInput({ ...props, fields: ['nameGiven', 'middleGiven', 'familyName'] }),
      },
    }),
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
    defineField({
      name: 'nameGiven',
      title: 'Given Name',
      type: 'string',
    }),
    defineField({
      name: 'middleGiven',
      title: 'Middle Name',
      type: 'string',
    }),
    defineField({
      name: 'familyName',
      title: 'Family Name',
      type: 'string',
    }),
    defineField({ name: 'Biography', type: 'internationalizedArrayPortableTextBody' }),
  ],
  preview: {
    select: {
      nameGiven: 'nameGiven',
      middleGiven: 'middleGiven',
      familyName: 'familyName',
    },
    prepare({ nameGiven, middleGiven, familyName }: any) {
      const parts = [nameGiven, middleGiven, familyName].filter(Boolean);
      return { title: parts.join(' ') };
    },
  },
});
