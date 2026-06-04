import type { Property } from '@/types';

export interface ApiPropertyRecord {
  id: string;
  slug: string;
  status: 'a_vendre' | 'a_louer' | 'vendu' | 'loue';
  type: 'appartement' | 'villa' | 'terrain' | 'bureau' | 'local_commercial';
  price: number | null;
  total_area: number;
  typology: string | null;
  location_fr: string;
  location_ar: string;
  title_fr: string;
  title_ar: string;
  description_fr: string;
  description_ar: string;
  is_featured: boolean;
  amenities: string[];
  created_at: string;
  property_images?: { image_url: string; is_cover: boolean; display_order: number }[];
}

const STATUS_MAP: Record<string, Property['status']> = {
  a_vendre: 'sale',
  a_louer: 'rent',
  vendu: 'sale',
  loue: 'rent',
};

const TYPE_MAP: Record<string, Property['type']> = {
  appartement: 'apartment',
  villa: 'villa',
  terrain: 'land',
  bureau: 'commercial',
  local_commercial: 'commercial',
};

export function mapApiProperty(data: ApiPropertyRecord): Property {
  const images = data.property_images
    ?.sort((a, b) => a.display_order - b.display_order)
    .map((img) => img.image_url) ?? [];

  if (!images.length) {
    images.push('/images/hero-1.jpg');
  }

  return {
    id: data.slug || data.id,
    slug: data.slug || data.id,
    title: { fr: data.title_fr || '', ar: data.title_ar || '' },
    location: { fr: data.location_fr || '', ar: data.location_ar || '' },
    type: TYPE_MAP[data.type] || 'apartment',
    status: STATUS_MAP[data.status] || 'sale',
    price: data.price ?? 0,
    priceUnit: 'total',
    surface: data.total_area || 0,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: { fr: data.description_fr || '', ar: data.description_ar || '' },
    amenities: data.amenities || [],
    images,
    featured: data.is_featured ?? false,
    createdAt: data.created_at || '',
  };
}

export function mapApiProperties(list: ApiPropertyRecord[]): Property[] {
  return list.map(mapApiProperty);
}
