import { Calendar, Play, History, Dumbbell, TrendingUp } from 'lucide-react';
import type { WorkoutDay } from '../types';

interface BottomNavProps {
  currentTab: 'routines' | 'workout' | 'history' | 'library' | 'charts';
  onTabChange: (tab: 'routines' | 'workout' | 'history' | 'library' | 'charts') => void;
  activeWorkoutDay: WorkoutDay | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  activeWorkoutDay,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 px-1 py-1.5">
      <div className="grid grid-cols-5 gap-0.5">
        <button
          onClick={() => onTabChange('routines')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all ${
            currentTab === 'routines'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] tracking-tight">Rutinas</span>
        </button>

        <button
          onClick={() => onTabChange('workout')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all relative ${
            currentTab === 'workout'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <div className="relative">
            <Play className="w-5 h-5 mb-0.5" />
            {activeWorkoutDay && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </div>
          <span className="text-[9px] tracking-tight">
            {activeWorkoutDay ? 'En Vivo' : 'Entrenar'}
          </span>
        </button>

        <button
          onClick={() => onTabChange('charts')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all ${
            currentTab === 'charts'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] tracking-tight">Gráficas</span>
        </button>

        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all ${
            currentTab === 'history'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] tracking-tight">Historial</span>
        </button>

        <button
          onClick={() => onTabChange('library')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all ${
            currentTab === 'library'
              ? 'text-emerald-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Dumbbell className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] tracking-tight">Ejercicios</span>
        </button>
      </div>
    </div>
  );
};
