import { Request, Response } from 'express';
import {
  getProperties as getPropertiesService,
  getPropertyById as getPropertyByIdService,
  uploadPropertyImagesForProperty,
  createProperty as createPropertyService,
  deleteProperty as deletePropertyService,
  updateProperty as updatePropertyService,
} from '../services/propertyService';
import { getWhatsappLeads } from '../services/leadService';
import { translateToArabic } from '../services/translationService';
import { UploadedFile } from '../types';

export const listProperties = async (_req: Request, res: Response) => {
  const properties = await getPropertiesService({});
  return res.status(200).json({ data: properties });
};

export const getPropertyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await getPropertyByIdService(id);
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  return res.status(200).json({ data: property });
};

export const listLeads = async (_req: Request, res: Response) => {
  const leads = await getWhatsappLeads();
  return res.status(200).json({ data: leads });
};

export const createProperty = async (req: Request, res: Response) => {
  const payload = req.body;
  const property = await createPropertyService(payload);
  return res.status(201).json({ data: property });
};

export const updateProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updated = await updatePropertyService(id, payload);

  if (!updated) {
    return res.status(404).json({ error: 'Property not found' });
  }

  return res.status(200).json({ data: updated });
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await deletePropertyService(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Property not found' });
  }

  return res.status(200).json({ data: { id } });
};

export const translateFields = async (req: Request, res: Response) => {
  const { title_fr, description_fr, location_fr } = req.body;
  const result = await translateToArabic({ title_fr, description_fr, location_fr });
  return res.status(200).json({ data: result });
};

export const uploadPropertyImages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const files = Array.isArray(req.files) ? req.files as UploadedFile[] : [];

  if (!files.length) {
    return res.status(400).json({ error: 'No images were uploaded' });
  }

  const images = await uploadPropertyImagesForProperty(id, files);
  return res.status(201).json({ data: images });
};
