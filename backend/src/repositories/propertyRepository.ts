import { supabase } from '../config/supabase';
import { PropertyRecord } from '../types';

interface PropertyFilters {
  featured?: boolean;
  type?: string;
}

export const fetchProperties = async (filters: PropertyFilters): Promise<PropertyRecord[]> => {
  let query = supabase
    .from('properties')
    .select(`*, property_images(*)`)
    .order('created_at', { ascending: false });

  if (filters.featured) {
    query = query.eq('is_featured', true);
  }

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as PropertyRecord[];
};

export const fetchPropertyBySlug = async (slug: string): Promise<PropertyRecord | null> => {
  const { data, error } = await supabase
    .from('properties')
    .select(`*, property_images(*)`)
    .eq('slug', slug)
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data as PropertyRecord;
};

export const fetchPropertyById = async (id: string): Promise<PropertyRecord | null> => {
  const { data, error } = await supabase
    .from('properties')
    .select(`*, property_images(*)`)
    .eq('id', id)
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data as PropertyRecord;
};

export const insertProperty = async (payload: Partial<PropertyRecord>): Promise<PropertyRecord> => {
  const { data, error } = await supabase
    .from('properties')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as PropertyRecord;
};

export const updatePropertyRecord = async (id: string, payload: Partial<PropertyRecord>): Promise<PropertyRecord | null> => {
  const { data, error } = await supabase
    .from('properties')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data as PropertyRecord;
};

export const deletePropertyRecord = async (id: string): Promise<boolean> => {
  const { data, error } = await supabase.from('properties').delete().eq('id', id).select();

  if (error) {
    throw error;
  }

  if (!data) {
    return false;
  }

  return Array.isArray(data) ? data.length > 0 : true;
};
