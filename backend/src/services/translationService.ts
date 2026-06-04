import translate from 'google-translate-api-x';

interface TranslationInput {
  title_fr?: string;
  description_fr?: string;
  location_fr?: string;
}

interface TranslationOutput {
  title_ar?: string;
  description_ar?: string;
  location_ar?: string;
}

export async function translateToArabic(input: TranslationInput): Promise<TranslationOutput> {
  const result: TranslationOutput = {};

  if (input.title_fr) {
    const { text } = await translate(input.title_fr, { from: 'fr', to: 'ar' });
    result.title_ar = text || input.title_fr;
  }
  if (input.description_fr) {
    const { text } = await translate(input.description_fr, { from: 'fr', to: 'ar' });
    result.description_ar = text || input.description_fr;
  }
  if (input.location_fr) {
    const { text } = await translate(input.location_fr, { from: 'fr', to: 'ar' });
    result.location_ar = text || input.location_fr;
  }

  return result;
}
