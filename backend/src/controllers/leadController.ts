import { Request, Response } from 'express';
import { createWhatsappLead as createWhatsappLeadService } from '../services/leadService';

export const createWhatsappLead = async (req: Request, res: Response) => {
  const { property_id, detected_lang } = req.body;

  if (!detected_lang) {
    return res.status(400).json({ error: 'detected_lang is required' });
  }

  const lead = await createWhatsappLeadService({
    property_id: typeof property_id === 'string' ? property_id : null,
    detected_lang,
    clicked_at: new Date().toISOString()
  });

  return res.status(201).json({ data: lead });
};
