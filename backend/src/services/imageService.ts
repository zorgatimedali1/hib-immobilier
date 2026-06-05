import { supabase } from '../config/supabase';
import { insertPropertyImages, getMaxDisplayOrder } from '../repositories/imageRepository';
import { PropertyImageRecord } from '../types';

const MEDIA_BUCKET = 'property-media';

const normalizeFileName = (filename: string) => {
  return filename.replace(/[^a-zA-Z0-9.-_]/g, '-');
};

export const uploadImages = async (
  propertyId: string,
  files: { buffer: Buffer; originalname: string; mimetype: string }[]
): Promise<PropertyImageRecord[]> => {
  const nextOrder = await getMaxDisplayOrder(propertyId);

  const results = await Promise.all(
    files.map(async (file, index) => {
      const filename = `${Date.now()}-${normalizeFileName(file.originalname)}`;
      const path = `properties/${propertyId}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file.buffer, {
          cacheControl: '3600',
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const publicUrlResponse = supabase.storage
        .from(MEDIA_BUCKET)
        .getPublicUrl(path);

      return {
        property_id: propertyId,
        image_url: publicUrlResponse.data.publicUrl,
        display_order: nextOrder + index + 1,
        is_cover: false,
      } as Partial<PropertyImageRecord>;
    })
  );

  const inserted = await insertPropertyImages(results);
  return inserted;
};

export const deletePropertyMedia = async (propertyId: string): Promise<void> => {
  const folder = `properties/${propertyId}`;
  const { data: listing, error: listError } = await supabase.storage.from(MEDIA_BUCKET).list(folder, { limit: 1000, offset: 0, sortBy: { column: 'name', order: 'asc' } });

  if (listError) {
    throw listError;
  }

  if (!listing || listing.length === 0) {
    return;
  }

  const paths = listing.map((item) => `${folder}/${item.name}`);
  const { error: removeError } = await supabase.storage.from(MEDIA_BUCKET).remove(paths);

  if (removeError) {
    throw removeError;
  }
};