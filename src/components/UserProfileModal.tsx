import { useState } from 'react';
import {
  X,
  LogOut,
  Palette,
  Save,
  Check,
} from 'lucide-react';
import type { User, AppSettings, ThemeType } from '../types';
import { THEMES, applyTheme } from '../utils/theme';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  onLogout,
  settings,
  onUpdateSettings,
}) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [weight, setWeight] = useState(currentUser?.weight?.toString() || '');
  const [height, setHeight] = useState(currentUser?.height?.toString() || '');
  const [fitnessGoal, setFitnessGoal] = useState<User['fitnessGoal']>(
    currentUser?.fitnessGoal || 'Hipertrofia'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: User = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? parseFloat(height) : undefined,
      fitnessGoal,
    };

    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSelectTheme = (themeId: ThemeType) => {
    applyTheme(themeId);
    onUpdateSettings({
      ...settings,
      theme: themeId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-neutral-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-lg">
              {currentUser?.avatar || '💪'}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-neutral-100 truncate">
                {currentUser ? currentUser.name : 'Mi Perfil de Gimnasio'}
              </h2>
              <p className="text-xs text-neutral-400">
                {currentUser ? currentUser.email : 'Configuración de cuenta y temas'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Selector Section */}
        <div className="my-5 p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              Tema Visual de la Aplicación
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">
              6 estilos deportivos
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {THEMES.map((th) => {
              const isSelected = settings.theme === th.id;
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => handleSelectTheme(th.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-neutral-900 shadow-md ring-1 ring-emerald-500'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: th.primaryColor }}
                  />
                  <div className="truncate">
                    <span className="text-xs font-semibold text-neutral-200 block truncate">
                      {th.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 block truncate">
                      {th.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Details Edit Form (if logged in) */}
        {currentUser ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Peso ({settings.weightUnit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Estatura (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Objetivo de Entrenamiento
                </label>
                <select
                  value={fitnessGoal}
                  onChange={(e) =>
                    setFitnessGoal(e.target.value as User['fitnessGoal'])
                  }
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Hipertrofia">Hipertrofia</option>
                  <option value="Fuerza">Fuerza</option>
                  <option value="Definición">Definición</option>
                  <option value="Resistencia">Resistencia</option>
                  <option value="Salud General">Salud General</option>
                </select>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Perfil actualizado exitosamente.</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Cerrar sesión de esta cuenta?')) {
                    onLogout();
                    onClose();
                  }
                }}
                className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Cerrar Sesión
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <p className="text-xs text-neutral-400">
              Actualmente estás utilizando la app en modo local. Puedes crear una cuenta para guardar tu información en tu perfil.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
