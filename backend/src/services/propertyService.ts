import { PropertyRecord } from '../types';
import * as propertyRepository from '../repositories/propertyRepository';
import * as imageService from './imageService';
import { translateToArabic } from './translationService';

interface PropertyFilters {
  featured?: boolean;
  type?: string;
}

export const getProperties = async (filters: PropertyFilters): Promise<PropertyRecord[]> => {
  return propertyRepository.fetchProperties(filters);
};

export const getPropertyBySlug = async (slug: string): Promise<PropertyRecord | null> => {
  return propertyRepository.fetchPropertyBySlug(slug);
};

export const getPropertyById = async (id: string): Promise<PropertyRecord | null> => {
  return propertyRepository.fetchPropertyById(id);
};

export const createProperty = async (payload: Partial<PropertyRecord>): Promise<PropertyRecord> => {
  const needsTranslation = !!(payload.title_fr && (payload.title_ar === undefined || payload.title_ar === null || payload.title_ar === ''));
  let data = { ...payload };

  if (needsTranslation) {
    try {
      const translated = await translateToArabic({
        title_fr: payload.title_fr ?? '',
        description_fr: payload.description_fr ?? '',
        location_fr: payload.location_fr ?? '',
      });
      data = { ...data, ...translated };
    } catch (err) {
      console.error('Translation failed, saving FR only:', err);
    }
  }

  return propertyRepository.insertProperty(data);
};

export const updateProperty = async (id: string, payload: Partial<PropertyRecord>): Promise<PropertyRecord | null> => {
  const needsTranslation = !!(payload.title_fr && (payload.title_ar === undefined || payload.title_ar === null || payload.title_ar === ''));
  let data = { ...payload };

  if (needsTranslation) {
    try {
      const translated = await translateToArabic({
        title_fr: payload.title_fr ?? '',
        description_fr: payload.description_fr ?? '',
        location_fr: payload.location_fr ?? '',
      });
      data = { ...data, ...translated };
    } catch (err) {
      console.error('Translation failed, saving FR only:', err);
    }
  }

  return propertyRepository.updatePropertyRecord(id, data);
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  await imageService.deletePropertyMedia(id);
  return propertyRepository.deletePropertyRecord(id);
};

export const uploadPropertyImagesForProperty = async (
  propertyId: string,
  files: { buffer: Buffer; originalname: string; mimetype: string }[]
) => {
  return imageService.uploadImages(propertyId, files);
};
