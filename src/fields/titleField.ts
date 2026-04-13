import { defineField } from 'sanity';

export const titleField = (overrides: Record<string, any> = {}) =>
  defineField({
    name: 'title',
    title: 'Title',
    type: 'internationalizedArrayString',
    ...overrides,
  });
