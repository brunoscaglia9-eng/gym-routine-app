import { useState } from 'react';
import { Camera, Image as ImageIcon, Link as LinkIcon, Trash2, Check } from 'lucide-react';
import { PRESET_OPTIONS } from '../data/exercisePresets';

interface ImageUploadHelperProps {
  currentImageUrl?: string;
  onImageChange: (url: string) => void;
}

export const ImageUploadHelper: React.FC<ImageUploadHelperProps> = ({
  currentImageUrl,
  onImageChange,
}) => {
  const [mode, setMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [inputUrl, setInputUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    // Limit to reasonable size ~ 5MB and convert to DataURL
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('La imagen no debe superar los 5MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onImageChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onImageChange(inputUrl.trim());
    setInputUrl('');
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Imagen / Ilustración del Ejercicio
      </label>

      {/* Preview Section */}
      <div className="flex items-center gap-3">
        <div className="relative w-24 h-24 rounded-xl bg-neutral-900 border border-neutral-700 overflow-hidden flex items-center justify-center shrink-0">
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-neutral-500 flex flex-col items-center justify-center text-xs p-1 text-center">
              <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
              <span>Sin imagen</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setMode('presets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'presets'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Ilustraciones
            </button>
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'upload'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Subir Foto
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === 'url'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Link Web
            </button>
            {currentImageUrl && (
              <button
                type="button"
                onClick={() => onImageChange('')}
                className="px-2 py-1.5 rounded-lg text-xs font-medium bg-red-950/60 text-red-400 hover:bg-red-900/60 transition-all flex items-center gap-1"
                title="Quitar imagen"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Quitar
              </button>
            )}
          </div>

          <p className="text-xs text-neutral-400">
            {mode === 'presets' && 'Selecciona una ilustración prediseñada de la biblioteca.'}
            {mode === 'upload' && 'Sube una foto desde tu galería o toma una foto.'}
            {mode === 'url' && 'Pega un enlace directo a una imagen o GIF animado.'}
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-400 bg-red-950/50 p-2 rounded-lg border border-red-800">
          {errorMsg}
        </div>
      )}

      {/* Presets Mode */}
      {mode === 'presets' && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 rounded-xl bg-neutral-900/80 border border-neutral-800">
          {PRESET_OPTIONS.map((preset) => {
            const isSelected = currentImageUrl === preset.url;
            return (
              <button
                type="button"
                key={preset.key}
                onClick={() => onImageChange(preset.url)}
                className={`group relative rounded-lg border p-1 text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/40'
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-600'
                }`}
              >
                <div className="w-full h-16 rounded overflow-hidden bg-neutral-950 flex items-center justify-center">
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-neutral-300 truncate block">
                    {preset.label}
                  </span>
                  {isSelected && (
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* File Upload Mode */}
      {mode === 'upload' && (
        <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 hover:border-emerald-500/50 rounded-xl p-4 cursor-pointer transition-all bg-neutral-950/50 hover:bg-neutral-900">
            <Camera className="w-7 h-7 text-emerald-400 mb-1" />
            <span className="text-xs font-medium text-neutral-200">
              Seleccionar foto o tomar imagen
            </span>
            <span className="text-[10px] text-neutral-500 mt-0.5">
              PNG, JPG o WebP (hasta 5MB)
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}

      {/* URL Link Mode */}
      {mode === 'url' && (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="url"
              placeholder="https://ejemplo.com/ejercicio.gif"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 bg-emerald-500 text-black text-xs font-semibold rounded-xl hover:bg-emerald-400 transition-all shrink-0"
          >
            Aplicar
          </button>
        </form>
      )}
    </div>
  );
};
