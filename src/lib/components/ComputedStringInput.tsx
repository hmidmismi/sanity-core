// src/lib/components/ComputedStringInput.tsx

import { useEffect } from 'react';
import type { StringInputProps } from 'sanity';
import { set, useFormValue } from 'sanity';

interface Props extends StringInputProps {
  fields: string[];
}

export function ComputedStringInput(props: Props) {
  const { fields, value, onChange, renderDefault } = props;

  const values = fields.map((field) => {
    const arr = useFormValue([field]) as any[];
    return arr?.find((t: any) => t._key === 'en' || t.language === 'en')?.value ?? '';
  });

  const computed = values.filter(Boolean).join(' ');

  useEffect(() => {
    if (computed && value !== computed) {
      onChange(set(computed));
    }
  }, [computed]);

  return renderDefault(props);
}
