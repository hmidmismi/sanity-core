// src/schemas/objects/flexibleDate.ts

import { defineArrayMember, defineField, defineType } from 'sanity';
import { FlexibleDateInput } from '../../lib/components/FlexibleDateInput';

export const flexibleDate = defineType({
  name: 'flexibleDate',
  title: 'Date',
  type: 'object',
  components: { input: FlexibleDateInput },
  fields: [
    defineField({ name: 'circa', type: 'boolean' }),
    defineField({ name: 'isRange', type: 'boolean' }),
    defineField({
      name: 'entries',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'date', type: 'string' }),
            defineField({ name: 'endDate', type: 'string' }),
            defineField({ name: 'startTime', type: 'string' }),
            defineField({ name: 'endTime', type: 'string' }),
            defineField({ name: 'allDay', type: 'boolean' }),
            defineField({ name: 'description', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { entries: 'entries', circa: 'circa', isRange: 'isRange' },
    prepare({ entries, circa, isRange }: any) {
      const first = entries?.[0];
      if (!first?.date) return { title: 'No date' };
      const date = new Date(first.date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const prefix = circa ? 'ca. ' : '';
      const suffix =
        isRange && first.endDate
          ? `–${new Date(first.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
          : '';
      return { title: `${prefix}${date}${suffix}` };
    },
  },
});
