import { Dumbbell, Database, Play, Palette, User as UserIcon, TrendingUp } from 'lucide-react';
import type { AppSettings, WorkoutDay, User } from '../types';

interface NavbarProps {
  currentTab: 'routines' | 'workout' | 'history' | 'library' | 'charts';
  onTabChange: (tab: 'routines' | 'workout' | 'history' | 'library' | 'charts') => void;
  activeWorkoutDay: WorkoutDay | null;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onOpenBackup: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  activeWorkoutDay,
  settings,
  onUpdateSettings,
  onOpenBackup,
  currentUser,
  onOpenAuth,
  onOpenProfile,
}) => {
  const toggleUnit = () => {
    onUpdateSettings({
      ...settings,
      weightUnit: settings.weightUnit === 'kg' ? 'lb' : 'kg',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => onTabChange('routines')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-extrabold shadow-md shadow-emerald-500/20">
            <Dumbbell className="w-5 h-5 fill-black" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-neutral-100 flex items-center gap-1">
              GYM<span className="text-emerald-400">TRACK</span>
            </span>
            <span className="hidden sm:block text-[10px] text-neutral-500 -mt-1 font-medium">
              Rutinas, Pesos & Repeticiones
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/90 p-1 rounded-2xl border border-neutral-800">
          <button
            onClick={() => onTabChange('routines')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'routines'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            📋 Mis Rutinas
          </button>
          <button
            onClick={() => onTabChange('workout')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'workout'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            ⚡ Modo Entrenar
            {activeWorkoutDay && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => onTabChange('charts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              currentTab === 'charts'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Gráficas
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'history'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            📊 Historial & PRs
          </button>
          <button
            onClick={() => onTabChange('library')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'library'
                ? 'bg-neutral-800 text-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            📚 Ejercicios
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {/* Active Workout Quick Jump Button */}
          {activeWorkoutDay && currentTab !== 'workout' && (
            <button
              onClick={() => onTabChange('workout')}
              className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500/20 transition-all animate-pulse"
              title="Volver a la sesión en vivo"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
              <span className="hidden sm:inline">En curso:</span> {activeWorkoutDay.tag || 'Activo'}
            </button>
          )}

          {/* Unit Toggle KG / LB */}
          <button
            onClick={toggleUnit}
            className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-mono font-bold text-neutral-300 hover:text-neutral-100 transition-all"
            title="Cambiar unidad de peso (KG o LB)"
          >
            {settings.weightUnit.toUpperCase()}
          </button>

          {/* Theme Picker shortcut */}
          <button
            onClick={onOpenProfile}
            className="p-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 rounded-xl transition-all"
            title="Temas visuales y apariencia"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Backup / Restore Modal Trigger */}
          <button
            onClick={onOpenBackup}
            className="p-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 rounded-xl transition-all"
            title="Copia de seguridad y exportar datos"
          >
            <Database className="w-4 h-4" />
          </button>

          {/* User Account / Profile Button */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 pl-2 pr-3 py-1 bg-neutral-900 border border-emerald-500/40 hover:border-emerald-500 rounded-xl text-xs font-bold text-neutral-200 transition-all"
              title={`Perfil de ${currentUser.name}`}
            >
              <span className="text-base">{currentUser.avatar || '💪'}</span>
              <span className="hidden sm:inline truncate max-w-[80px]">
                {currentUser.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Cuenta</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
