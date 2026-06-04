export type Language = 'fr' | 'ar';
export type Direction = 'ltr' | 'rtl';

export type PropertyStatus = 'sale' | 'rent';
export type PropertyType = 'apartment' | 'villa' | 'commercial' | 'land' | 'penthouse' | 'duplex';

export interface Property {
  id: string;
  slug: string;
  title: { fr: string; ar: string };
  location: { fr: string; ar: string };
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceUnit: 'total' | 'month';
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  description: { fr: string; ar: string };
  amenities: string[];
  images: string[];
  featured: boolean;
  virtualTourUrl?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: { fr: string; ar: string };
  role: { fr: string; ar: string };
  content: { fr: string; ar: string };
  avatar: string;
  rating: number;
}

export interface Service {
  id: string;
  icon: string;
  title: { fr: string; ar: string };
  description: { fr: string; ar: string };
}

export interface Stat {
  id: string;
  icon: string;
  value: number;
  suffix: string;
  label: { fr: string; ar: string };
  color: 'magenta' | 'green';
}

export interface NavLink {
  path: string;
  label: { fr: string; ar: string };
}
