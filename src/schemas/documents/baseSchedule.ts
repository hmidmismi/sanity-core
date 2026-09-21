// src/schemas/documents/baseSchedule.ts

import { defineField, defineType } from 'sanity';
import { localizedTextField } from '../../lib/fields';

export const baseSchedule = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'document',
  fields: [
    localizedTextField(),
    defineField({
      name: 'dateTime',
      title: 'Date and Time',
      type: 'flexibleSchedule',
    }),
    defineField({ name: 'body', type: 'internationalizedArrayPortableTextBody' }),
  ],
});
