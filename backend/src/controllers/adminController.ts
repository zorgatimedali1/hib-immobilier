import { Request, Response } from 'express';
import * as propertyService from '../services/propertyService';
import { getWhatsappLeads } from '../services/leadService';
import { translateToArabic } from '../services/translationService';
import { invalidateCache } from '../middleware/cache';
import { UploadedFile } from '../types';

export const listProperties = async (_req: Request, res: Response) => {
  try {
    const result = await propertyService.getProperties({});
    return res.status(200).json({ data: result.data });
  } catch (error) {
    console.error('Error listing properties:', error);
    return res.status(500).json({ error: 'Failed to list properties' });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await propertyService.getPropertyById(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    return res.status(200).json({ data: property });
  } catch (error) {
    console.error('Error getting property by id:', error);
    return res.status(500).json({ error: 'Failed to get property' });
  }
};

export const listLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await getWhatsappLeads();
    return res.status(200).json({ data: leads });
  } catch (error) {
    console.error('Error listing leads:', error);
    return res.status(500).json({ error: 'Failed to list leads' });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const property = await propertyService.createProperty(payload);
    // Invalidate all property-related caches
    invalidateCache('/api/public/properties');
    invalidateCache('/api/public'); // Also clear the root cache
    return res.status(201).json({ data: property });
  } catch (error) {
    console.error('Error creating property:', error);
    return res.status(500).json({ error: 'Failed to create property' });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const updated = await propertyService.updateProperty(id, payload);

    if (!updated) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Invalidate all property-related caches
    invalidateCache('/api/public/properties');
    invalidateCache('/api/public'); // Also clear the root cache
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.error('Error updating property:', error);
    return res.status(500).json({ error: 'Failed to update property' });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await propertyService.deleteProperty(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Invalidate all property-related caches
    invalidateCache('/api/public/properties');
    invalidateCache('/api/public'); // Also clear the root cache
    return res.status(200).json({ data: { id } });
  } catch (error) {
    console.error('Error deleting property:', error);
    return res.status(500).json({ error: 'Failed to delete property' });
  }
};

export const translateFields = async (req: Request, res: Response) => {
  try {
    const { title_fr, description_fr, location_fr } = req.body;
    const result = await translateToArabic({ title_fr, description_fr, location_fr });
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error translating fields:', error);
    return res.status(500).json({ error: 'Failed to translate fields' });
  }
};

export const uploadPropertyImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = Array.isArray(req.files) ? req.files as UploadedFile[] : [];

    if (!files.length) {
      return res.status(400).json({ error: 'No images were uploaded' });
    }

    const images = await propertyService.uploadPropertyImagesForProperty(id, files);
    invalidateCache('/api/public/properties');
    return res.status(201).json({ data: images });
  } catch (error) {
    console.error('Error uploading property images:', error);
    return res.status(500).json({ error: 'Failed to upload images' });
  }
};