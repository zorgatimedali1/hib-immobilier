import { Request, Response } from 'express';
import {
  getProperties as getPropertiesService,
  getPropertyBySlug as getPropertyBySlugService
} from '../services/propertyService';

export const getProperties = async (req: Request, res: Response) => {
  const filters = {
    featured: req.query.featured === 'true',
    type: typeof req.query.type === 'string' ? req.query.type : undefined
  };

  const properties = await getPropertiesService(filters);
  return res.status(200).json({ data: properties });
};

export const getPropertyBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const property = await getPropertyBySlugService(slug);

  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }

  return res.status(200).json({ data: property });
};
