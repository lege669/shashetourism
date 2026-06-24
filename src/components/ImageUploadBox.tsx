import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Link, Image as ImageIcon, FileWarning } from 'lucide-react';

interface ImageUploadBoxProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUploadBox({
  value,
  onChange,
  label = 'Image Source',
  placeholder = 'Paste URL or drag & drop image file...'
}: ImageUploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Selected file is not an image.');
      return;
    }

    // Validate size (limit to 4MB for localStorage/Base64 safety)
    if (file.size > 4 * 1024 * 1024) {
      setError('Image is too large. Max size is 4MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isBase64 = value.startsWith('data:image/');

  return (
    <div className="space-y-1.5" id={`image-upload-box-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-700">{label}</label>
        {value && (
          <button
            type="button"
            onClick={clearImage}
            className="text-[10px] font-mono text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X className="h-3 w-3" /> Clear Image
          </button>
        )}
      </div>

      {value ? (
        <div className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-between p-3.5 gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/60 flex-shrink-0">
              <img 
                src={value} 
                alt="Uploaded preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {isBase64 ? 'Local Uploaded File' : 'External Web URL'}
              </p>
              <p className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                {isBase64 ? `${(value.length / 1024).toFixed(1)} KB (Base64)` : value}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-rose-600 transition-all cursor-pointer flex-shrink-0"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={triggerFileSelect}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group ${
            isDragging 
              ? 'border-emerald-500 bg-emerald-50/20 scale-[0.99]' 
              : 'border-slate-200 hover:border-emerald-500 hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            className="hidden"
          />
          
          <div className="p-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-100 group-hover:bg-emerald-50 transition-all">
            <Upload className="h-5 w-5" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-700">
              <span className="text-[#0f5132] font-bold group-hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] text-slate-400 font-medium">PNG, JPG, GIF or WEBP (Max 4MB)</p>
          </div>
        </div>
      )}

      {/* Alternative URL Input Field */}
      {!value && (
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Link className="h-3.5 w-3.5" />
          </div>
          <input
            type="url"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132] bg-white text-slate-800 placeholder-slate-400"
          />
        </div>
      )}

      {error && (
        <p className="text-[10px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
          <FileWarning className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
