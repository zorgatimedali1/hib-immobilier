export interface PropertyRecord {
  id: string;
  slug: string;
  status: 'a_vendre' | 'a_louer' | 'vendu' | 'loue';
  type: 'appartement' | 'villa' | 'terrain' | 'bureau' | 'local_commercial';
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
  virtual_tour_url: string | null;
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

export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}
