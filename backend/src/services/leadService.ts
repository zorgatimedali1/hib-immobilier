import { fetchWhatsappLeads, insertWhatsappLead } from '../repositories/leadRepository';
import { WhatsappLeadRecord } from '../types';

interface CreateWhatsappLeadPayload {
  property_id: string | null;
  detected_lang: string;
  clicked_at: string;
}

export const createWhatsappLead = async (
  payload: CreateWhatsappLeadPayload
): Promise<WhatsappLeadRecord> => {
  return insertWhatsappLead(payload);
};

export const getWhatsappLeads = async (): Promise<WhatsappLeadRecord[]> => {
  return fetchWhatsappLeads();
};
