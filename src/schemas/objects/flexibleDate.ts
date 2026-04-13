// types/flexibleDate.ts
import { defineType } from 'sanity';
import { FlexibleDateInput } from '../../components/FlexibleDateInput';

export const flexibleDate = defineType({
  name: 'flexibleDate',
  title: 'Date',
  type: 'object',
  components: { input: FlexibleDateInput },
  fields: [
    { name: 'precision', type: 'string', options: { list: ['day', 'month', 'year'] } },
    { name: 'value', type: 'string' },
    { name: 'circa', type: 'boolean' },
  ],
  preview: {
    select: { value: 'value', circa: 'circa' },
    prepare({ value, circa }) {
      return { title: circa ? `ca. ${value}` : (value ?? 'No date') };
    },
  },
});
