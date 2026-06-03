import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
}

export default function DropZone({ onFilesSelected, maxFiles = 12, accept = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] } }: DropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((accepted: File[]) => {
    const next = [...files, ...accepted].slice(0, maxFiles);
    setFiles(next);
    onFilesSelected(next);
  }, [files, maxFiles, onFilesSelected]);

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesSelected(next);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxFiles });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-magenta bg-magenta/5' : 'border-[#E2E8F0] hover:border-magenta/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto size-8 text-[#94A3B8] mb-2" />
        <p className="text-sm text-[#64748B] font-medium">
          {isDragActive ? 'Déposez les fichiers ici' : 'Glissez-déposez vos images ici'}
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">ou cliquez pour parcourir (max {maxFiles} images)</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {files.map((file, i) => (
            <div key={i} className="relative group aspect-square rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
              <img src={URL.createObjectURL(file)} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 size-5 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-1">
                <span className="text-[10px] text-white truncate block">{file.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
