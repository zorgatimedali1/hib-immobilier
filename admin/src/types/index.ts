export type PropertyStatus = 'a_vendre' | 'a_louer' | 'vendu' | 'loue';

export type PropertyType = 'appartement' | 'villa' | 'terrain' | 'bureau' | 'local_commercial';

export interface PropertyRecord {
  id: string;
  slug: string;
  status: PropertyStatus;
  type: PropertyType;
  price: number | null;
  price_per_meter: number | null;
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
  updated_at: string;
  property_images?: PropertyImageRecord[];
}

export interface PropertyImageRecord {
  id: string;
  property_id: string;
  image_url: string;
  display_order: number;
  is_cover: boolean;
}

export interface WhatsappLeadRecord {
  id: string;
  property_id: string | null;
  detected_lang: string;
  clicked_at: string;
}

export interface PropertyFormData {
  slug: string;
  status: PropertyStatus;
  type: PropertyType;
  price: string;
  total_area: string;
  typology: string;
  location_fr: string;
  location_ar: string;
  title_fr: string;
  title_ar: string;
  description_fr: string;
  description_ar: string;
  is_featured: boolean;
  amenities: string[];
}

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  a_vendre: 'À Vendre',
  a_louer: 'À Louer',
  vendu: 'Vendu',
  loue: 'Loué',
};

export const TYPE_LABELS: Record<PropertyType, string> = {
  appartement: 'Appartement',
  villa: 'Villa',
  terrain: 'Terrain',
  bureau: 'Bureau',
  local_commercial: 'Local Commercial',
};

export const AMENITY_OPTIONS = [
  'Piscine',
  'Terrasse',
  'Jardin',
  'Parking',
  'Ascenseur',
  'Climatisation',
  'Chauffage central',
  'Double vitrage',
  'Alarme',
  'Cheminee',
  'Cave',
  'Dressing',
  'Vue mer',
  'Spa',
  'Fitness',
  'Home cinema',
  'Gardien',
  'Salle de reunion',
  'Kitchenette',
  'Securite 24/7',
];
