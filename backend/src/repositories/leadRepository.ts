import { supabase } from '../config/supabase';
import { WhatsappLeadRecord } from '../types';

export const fetchWhatsappLeads = async (): Promise<WhatsappLeadRecord[]> => {
  const { data, error } = await supabase
    .from('whatsapp_leads')
    .select('*')
    .order('clicked_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data as WhatsappLeadRecord[];
};

export const insertWhatsappLead = async (payload: Partial<WhatsappLeadRecord>): Promise<WhatsappLeadRecord> => {
  const { data, error } = await supabase
    .from('whatsapp_leads')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as WhatsappLeadRecord;
};
