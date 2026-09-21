// src/lib/fields/textField.ts

import { defineField } from 'sanity';

export const titleField = (overrides: Record<string, any> = {}) =>
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    ...overrides,
  });

export const localizedTitleField = (overrides: Record<string, any> = {}) =>
  defineField({
    name: 'title',
    title: 'Title',
    type: 'internationalizedArrayString',
    ...overrides,
  });

export const textField = (overrides: Record<string, any> = {}) =>
  defineField({
    name: 'text',
    title: 'Text',
    type: 'text',
    ...overrides,
  });

export const localizedTextField = (overrides: Record<string, any> = {}) =>
  defineField({
    name: 'text',
    title: 'Text',
    type: 'internationalizedArrayString',
    ...overrides,
  });
