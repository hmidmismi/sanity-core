// packages/sanity-core/src/components/ReferenceRadioInput.tsx

'use client';

import { Flex, Radio, Stack, Text } from '@sanity/ui';
import { useEffect, useState } from 'react';
import type { ReferenceInputProps } from 'sanity';
import { set, useClient } from 'sanity';

interface Props extends ReferenceInputProps {
  query: string;
}

export function ReferenceRadioInput({ onChange, value, query }: Props) {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [options, setOptions] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    client.fetch(query).then(setOptions);
  }, [client, query]);

  return (
    <Stack space={3}>
      {options.map((opt) => (
        <Flex key={opt._id} align="center" gap={3}>
          <Radio
            checked={value?._ref === opt._id}
            onChange={() => onChange(set({ _type: 'reference', _ref: opt._id }))}
          />
          <Text>{opt.name}</Text>
        </Flex>
      ))}
    </Stack>
  );
}
