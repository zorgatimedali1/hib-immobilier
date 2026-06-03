import translate from 'google-translate-api-x';

interface TranslationInput {
  title_fr: string;
  description_fr: string;
  location_fr: string;
}

interface TranslationOutput {
  title_ar: string;
  description_ar: string;
  location_ar: string;
}

export async function translateToArabic(input: TranslationInput): Promise<TranslationOutput> {
  const [titleResult, descriptionResult, locationResult] = await Promise.all([
    input.title_fr ? translate(input.title_fr, { from: 'fr', to: 'ar' }) : Promise.resolve({ text: '' }),
    input.description_fr ? translate(input.description_fr, { from: 'fr', to: 'ar' }) : Promise.resolve({ text: '' }),
    input.location_fr ? translate(input.location_fr, { from: 'fr', to: 'ar' }) : Promise.resolve({ text: '' }),
  ]);

  return {
    title_ar: titleResult.text || input.title_fr,
    description_ar: descriptionResult.text || input.description_fr,
    location_ar: locationResult.text || input.location_fr,
  };
}
