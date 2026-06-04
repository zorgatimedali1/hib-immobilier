import { mapApiProperty, mapApiProperties } from './mapper';
import type { Property } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/public`
  : '/api/public';

export async function fetchProperties(filters?: { featured?: boolean; type?: string }): Promise<Property[]> {
  const params = new URLSearchParams();
  if (filters?.featured) params.set('featured', 'true');
  if (filters?.type) params.set('type', filters.type);

  const url = `${API_BASE}/properties${params.toString() ? `?${params}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch properties');
  const json = await res.json();
  return mapApiProperties(json.data);
}

export async function fetchPropertyBySlug(slug: string): Promise<Property | null> {
  const res = await fetch(`${API_BASE}/properties/${slug}`);
  if (!res.ok) return null;
  const json = await res.json();
  return mapApiProperty(json.data);
}
