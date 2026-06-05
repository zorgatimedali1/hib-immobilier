import { Request, Response } from 'express';
import * as propertyService from '../services/propertyService';

export const getProperties = async (req: Request, res: Response) => {
  try {
    const filters = {
      featured: req.query.featured === 'true',
      type: typeof req.query.type === 'string' ? req.query.type : undefined,
      page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
    };

    const result = await propertyService.getProperties(filters);
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.status(200).json({ data: result.data, total: result.total });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

export const getPropertyBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const property = await propertyService.getPropertyBySlug(slug);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.status(200).json({ data: property });
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return res.status(500).json({ error: 'Failed to fetch property' });
  }
};

export const getSimilarProperties = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // This is actually a slug or id
    // Try to fetch by slug first (most common case)
    let property = await propertyService.getPropertyBySlug(id);
    
    // If not found by slug, try by id (UUID)
    if (!property) {
      property = await propertyService.getPropertyById(id);
    }

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const locationPart = (property.location_fr || '').split(',')[0].trim();
    const similar = await propertyService.getSimilarProperties(property.id, property.type, locationPart);

    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.status(200).json({ data: similar });
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    return res.status(500).json({ error: 'Failed to fetch similar properties' });
  }
};
