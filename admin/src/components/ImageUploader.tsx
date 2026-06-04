import { useState, useCallback } from 'react';
import { Upload, X, Loader2, Save } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import api from '@/lib/api';
import { compressImage } from '@/lib/compressImage';

interface ImageUploaderProps {
  propertyId?: string | null;
  existingImages?: { id: string; image_url: string; display_order: number; is_cover: boolean }[];
  onUploaded?: () => void;
}

export default function ImageUploader({ propertyId, existingImages, onUploaded }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [queue, setQueue] = useState<File[]>([]);

  const onDrop = useCallback((accepted: File[]) => {
    setQueue((prev) => [...prev, ...accepted].slice(0, 12));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 12,
  });

  const uploadAll = async () => {
    if (!queue.length) return;
    if (!propertyId) {
      toast.error('Enregistrez d\'abord le bien');
      return;
    }
    setCompressing(true);

    try {
      const compressed = await Promise.all(
        queue.map(async (file) => {
          const blob = await compressImage(file);
          return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
        }),
      );
      setCompressing(false);
      setUploading(true);

      const formData = new FormData();
      compressed.forEach((f) => formData.append('images', f));

      await api.post(`/properties/${propertyId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Images uploadées avec succès');
      setQueue([]);
      onUploaded?.();
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {existingImages && existingImages.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#475569] uppercase tracking-wide mb-2">Images existantes</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {existingImages
              .sort((a, b) => a.display_order - b.display_order)
              .map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
                  <img src={img.image_url} alt="" className="size-full object-cover" />
                  {img.is_cover && (
                    <span className="absolute top-1 left-1 bg-magenta text-white text-[8px] px-1.5 py-0.5 rounded font-semibold">
                      COVER
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-magenta bg-magenta/5' : 'border-[#E2E8F0] hover:border-magenta/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto size-8 text-[#94A3B8] mb-2" />
        <p className="text-sm text-[#64748B] font-medium">
          {isDragActive ? 'Déposez les fichiers' : 'Ajouter des images'}
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">Compression automatique en 1920×1080 max</p>
      </div>

      {queue.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {queue.map((file, i) => (
              <div key={i} className="relative aspect-square rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
                <img src={URL.createObjectURL(file)} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => setQueue((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 size-5 bg-black/60 text-white rounded-full flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={uploadAll}
            disabled={uploading || compressing || !propertyId}
            className="bg-magenta text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-magenta-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
          >
            {!propertyId ? (
              <><Save size={14} /> Enregistrez le bien d'abord</>
            ) : compressing ? (
              <><Loader2 size={14} className="animate-spin" /> Compression en cours...</>
            ) : uploading ? (
              <><Loader2 size={14} className="animate-spin" /> Upload en cours...</>
            ) : (
              `Uploader ${queue.length} image(s)`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
