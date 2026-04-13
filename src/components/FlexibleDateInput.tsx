import { Card, Flex, Select, Stack, Switch, Text, TextInput } from '@sanity/ui';
import type React from 'react';
import { useCallback, useState } from 'react';
import type { ObjectInputProps } from 'sanity';
import { set, unset } from 'sanity';

type Precision = 'day' | 'month' | 'year';
type Mode = 'calendar' | 'partial';

interface FlexibleDateValue {
  precision?: Precision;
  value?: string;
  circa?: boolean;
}

export function FlexibleDateInput(props: ObjectInputProps<FlexibleDateValue>) {
  const { value, onChange, readOnly } = props;

  const [mode, setMode] = useState<Mode>(() => {
    if (!value?.precision || value.precision === 'day') return 'calendar';
    return 'partial';
  });

  const patch = useCallback(
    (next: FlexibleDateValue | null) => {
      onChange(next ? set(next) : unset());
    },
    [onChange]
  );

  const handleModeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.currentTarget.value as Mode;
      setMode(next);
      patch({
        precision: next === 'calendar' ? 'day' : 'year',
        value: '',
        circa: value?.circa ?? false,
      });
    },
    [patch, value]
  );

  const handleCalendarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      patch({ precision: 'day', value: e.currentTarget.value, circa: value?.circa ?? false });
    },
    [patch, value]
  );

  const handlePrecisionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      patch({ ...value, precision: e.currentTarget.value as Precision, value: '' });
    },
    [patch, value]
  );

  const handlePartialChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      patch({ ...value, value: e.currentTarget.value });
    },
    [patch, value]
  );

  const handleCircaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      patch({ ...value, circa: e.currentTarget.checked });
    },
    [patch, value]
  );

  const placeholder =
    value?.precision === 'year' ? 'YYYY' : value?.precision === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD';

  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Text size={1} muted>
          Mode
        </Text>
        <Select value={mode} onChange={handleModeChange} disabled={readOnly} fontSize={1}>
          <option value="calendar">Calendar</option>
          <option value="partial">Partial / Approximate</option>
        </Select>
      </Flex>

      {mode === 'calendar' ? (
        <TextInput
          type="date"
          value={value?.value ?? ''}
          onChange={handleCalendarChange}
          readOnly={readOnly}
        />
      ) : (
        <Flex gap={2} align="center">
          <Select
            value={value?.precision ?? 'year'}
            onChange={handlePrecisionChange}
            disabled={readOnly}
            fontSize={1}
          >
            <option value="year">Year</option>
            <option value="month">Year + Month</option>
            <option value="day">Year + Month + Day</option>
          </Select>
          <TextInput
            value={value?.value ?? ''}
            onChange={handlePartialChange}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </Flex>
      )}

      <Flex gap={2} align="center">
        <Switch checked={value?.circa ?? false} onChange={handleCircaChange} disabled={readOnly} />
        <Text size={1}>Circa / Approximate</Text>
      </Flex>

      {value?.value && (
        <Card padding={2} radius={2} tone="transparent" border>
          <Text size={1} muted>
            {value.circa ? `ca. ${value.value}` : value.value}
          </Text>
        </Card>
      )}
    </Stack>
  );
}
