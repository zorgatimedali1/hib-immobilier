import { useQuery } from '@tanstack/react-query';
import { fetchProperties, fetchPropertyBySlug, fetchSimilarProperties } from './api';

export function useProperties(filters?: { featured?: boolean; type?: string }) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 60 * 1000, // 1 minute - refresh after 1 minute of inactivity
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
}

export function useProperty(slug: string | undefined) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: () => fetchPropertyBySlug(slug!),
    enabled: !!slug,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
}

export function useSimilarProperties(id: string | undefined) {
  return useQuery({
    queryKey: ['similarProperties', id],
    queryFn: () => fetchSimilarProperties(id!),
    enabled: !!id,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
}
