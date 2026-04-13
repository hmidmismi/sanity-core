import { colors as defaultColors } from '@hmidmismi/ui';
import React from 'react';
import { BsPalette2 } from 'react-icons/bs';
import { defineType } from 'sanity';

export const portableTextBody = defineType({
  name: 'portableTextBody',
  title: 'Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Blockquote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike Through', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              { name: 'blank', type: 'boolean', initialValue: false },
            ],
          },
          {
            name: 'color',
            type: 'object',
            title: 'Text Color',
            icon: BsPalette2,
            fields: [
              {
                name: 'name',
                title: 'Color',
                type: 'string',
                options: {
                  layout: 'radio',
                  direction: 'vertical',
                  list: defaultColors.map(({ title, value, hex }: any) => ({
                    title: React.createElement(
                      'div',
                      { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                      [
                        React.createElement('div', {
                          key: `${value}-swatch`,
                          style: {
                            width: '36px',
                            height: '36px',
                            borderRadius: '3px',
                            border: '1px solid #ccc',
                            backgroundColor: hex,
                          },
                        }),
                        React.createElement('span', { key: `${value}-label` }, title),
                      ]
                    ),
                    value,
                  })),
                },
              },
            ],
          },
        ],
      },
    },
  ],
});
