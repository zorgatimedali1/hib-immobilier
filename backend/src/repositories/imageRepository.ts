import { supabase } from '../config/supabase';
import { PropertyImageRecord } from '../types';

export const insertPropertyImages = async (images: Partial<PropertyImageRecord>[]) => {
  const { data, error } = await supabase
    .from('property_images')
    .insert(images)
    .select();

  if (error) {
    throw error;
  }

  return data as PropertyImageRecord[];
};

export const getMaxDisplayOrder = async (propertyId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('property_images')
    .select('display_order', { count: 'exact', head: false })
    .eq('property_id', propertyId)
    .order('display_order', { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return 0;
  }

  return data[0].display_order ?? 0;
};
