import { supabase } from '../config/supabase';
import { PropertyRecord } from '../types';

interface PropertyFilters {
  featured?: boolean;
  type?: string;
  page?: number;
  limit?: number;
}

interface PaginatedResult {
  data: PropertyRecord[];
  total: number;
}

export const fetchProperties = async (filters: PropertyFilters): Promise<PaginatedResult> => {
  const page = filters.page || 1;
  const limit = filters.limit || 50;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('properties')
    .select(`*, property_images(*)`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (filters.featured) {
    query = query.eq('is_featured', true);
  }

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { data: data as PropertyRecord[], total: count ?? 0 };
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

export const fetchSimilarProperties = async (propertyId: string, type: string, location: string, limit: number = 3): Promise<PropertyRecord[]> => {
  // First try to find properties with the same type
  const { data: typeMatches, error: typeError } = await supabase
    .from('properties')
    .select(`*, property_images(*)`)
    .eq('type', type)
    .neq('id', propertyId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (typeError) {
    throw typeError;
  }

  // If we have enough results, return them
  if (typeMatches && typeMatches.length >= limit) {
    return typeMatches as PropertyRecord[];
  }

  // Otherwise, also get properties with similar location
  const remaining = limit - (typeMatches?.length || 0);
  const { data: locationMatches, error: locationError } = await supabase
    .from('properties')
    .select(`*, property_images(*)`)
    .neq('id', propertyId)
    .ilike('location_fr', `%${location}%`)
    .order('created_at', { ascending: false })
    .limit(remaining);

  if (locationError) {
    throw locationError;
  }

  // Combine and deduplicate results
  const allResults = [...(typeMatches || []), ...(locationMatches || [])];
  const uniqueResults = Array.from(
    new Map(allResults.map(p => [p.id, p])).values()
  ).slice(0, limit);

  return uniqueResults as PropertyRecord[];
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
