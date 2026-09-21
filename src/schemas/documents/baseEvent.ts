// src/schemas/documents/baseEvent.ts

import { defineField, defineType } from 'sanity';
import { localizedTextField } from '../../lib/fields';

export const baseEvent = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    localizedTextField({ title: 'Event Title' }),
    defineField({
      name: 'dateTime',
      title: 'Date and Time',
      type: 'flexibleDate',
    }),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
