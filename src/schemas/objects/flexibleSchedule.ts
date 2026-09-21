// src/schemas/objects/flexibleSchedule.ts

import { defineArrayMember, defineField, defineType } from 'sanity';
import { FlexibleScheduleInput } from '../../lib/components/FlexibleScheduleInput';

export const flexibleSchedule = defineType({
  name: 'flexibleSchedule',
  title: 'Schedule',
  type: 'object',
  components: { input: FlexibleScheduleInput },
  fields: [
    defineField({
      name: 'schedule',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'day', type: 'string' }),
            defineField({
              name: 'entries',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'string' }),
                    defineField({ name: 'startTime', type: 'string' }),
                    defineField({ name: 'endTime', type: 'string' }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { schedule: 'schedule' },
    prepare({ schedule }: any) {
      const total =
        schedule?.reduce((acc: number, day: any) => acc + (day.entries?.length ?? 0), 0) ?? 0;
      const days = schedule
        ?.filter((d: any) => d.entries?.length > 0)
        .map((d: any) => d.day)
        .join(', ');
      return { title: days ? `Schedule: ${days}` : 'Empty schedule', subtitle: `${total} entries` };
    },
  },
});
