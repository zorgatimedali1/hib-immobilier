import { PropertyRecord } from '../types';
import * as propertyRepository from '../repositories/propertyRepository';
import * as imageService from './imageService';

interface PropertyFilters {
  featured?: boolean;
  type?: string;
  page?: number;
  limit?: number;
}

export const getProperties = async (filters: PropertyFilters) => {
  return propertyRepository.fetchProperties(filters);
};

export const getPropertyBySlug = async (slug: string): Promise<PropertyRecord | null> => {
  return propertyRepository.fetchPropertyBySlug(slug);
};

export const getPropertyById = async (id: string): Promise<PropertyRecord | null> => {
  return propertyRepository.fetchPropertyById(id);
};

export const getSimilarProperties = async (propertyId: string, type: string, location: string): Promise<PropertyRecord[]> => {
  return propertyRepository.fetchSimilarProperties(propertyId, type, location);
};

export const createProperty = async (payload: Partial<PropertyRecord>): Promise<PropertyRecord> => {
  return propertyRepository.insertProperty(payload);
};

export const updateProperty = async (id: string, payload: Partial<PropertyRecord>): Promise<PropertyRecord | null> => {
  return propertyRepository.updatePropertyRecord(id, payload);
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
