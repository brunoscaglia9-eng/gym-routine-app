import { useState } from 'react';
import { X, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { exportAllDataJSON, importDataJSON } from '../utils/db';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
  onResetDefaults: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
  onResetDefaults,
}) => {
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      const json = await exportAllDataJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gym_rutina_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMsg({ text: '¡Respaldo descargado con éxito!', isError: false });
    } catch (e) {
      setStatusMsg({ text: 'Error al exportar los datos.', isError: true });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const ok = await importDataJSON(text);
        if (ok) {
          setStatusMsg({ text: '¡Datos importados y restaurados con éxito!', isError: false });
          onDataChanged();
        } else {
          setStatusMsg({ text: 'El archivo JSON no tiene un formato válido.', isError: true });
        }
      } catch (err) {
        setStatusMsg({ text: 'Error al procesar el archivo.', isError: true });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <h2 className="text-base font-bold text-neutral-100">
            Respaldo y Restauración de Datos
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMsg && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMsg.isError
                ? 'bg-red-950/60 text-red-300 border border-red-800'
                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
            }`}
          >
            {statusMsg.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <Check className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="mt-5 space-y-3.5">
          {/* Export */}
          <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-200">Exportar Datos</h3>
              <p className="text-[11px] text-neutral-400">
                Guarda tus rutinas, fotos y registros en un archivo .JSON
              </p>
            </div>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Descargar
            </button>
          </div>

          {/* Import */}
          <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-200">Importar Datos</h3>
              <p className="text-[11px] text-neutral-400">
                Restaura un respaldo guardado previamente
              </p>
            </div>
            <label className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              Cargar Archivo
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImport}
              />
            </label>
          </div>

          {/* Reset */}
          <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-200">Restablecer Rutina Inicial</h3>
              <p className="text-[11px] text-neutral-400">
                Vuelve a cargar la rutina recomendada de 4 días
              </p>
            </div>
            <button
              onClick={() => {
                if (
                  confirm(
                    '¿Deseas restablecer la rutina de ejemplo de 4 días? Tus rutinas actuales se mantendrán.'
                  )
                ) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-amber-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restablecer
            </button>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 rounded-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
