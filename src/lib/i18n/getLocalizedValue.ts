// src/lib/i18n/getLocalizedValue.ts

export const getLocalizedValue = (
  field: { _key: string; language: string; value?: string }[] | undefined,
  lang = 'ja-latn'
) => {
  console.log(
    'available language codes:',
    field?.map((f) => f.language)
  );
  const match = field?.find((f) => f.language === lang)?.value ?? '';
  return match;
};
