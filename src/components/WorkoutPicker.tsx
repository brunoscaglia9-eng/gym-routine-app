import { Play, Dumbbell } from 'lucide-react';
import type { Routine, WorkoutDay } from '../types';

interface WorkoutPickerProps {
  routine: Routine | null;
  onStartDay: (day: WorkoutDay) => void;
  onGoToRoutines: () => void;
}

export const WorkoutPicker: React.FC<WorkoutPickerProps> = ({
  routine,
  onStartDay,
  onGoToRoutines,
}) => {
  if (!routine || routine.days.length === 0) {
    return (
      <div className="text-center py-16 text-neutral-400 space-y-4 max-w-md mx-auto">
        <Dumbbell className="w-12 h-12 mx-auto text-neutral-600" />
        <h2 className="text-lg font-bold text-neutral-200">
          No hay rutina disponible para iniciar
        </h2>
        <p className="text-xs">
          Crea tu rutina y añade los días que vas a entrenar para empezar a registrar pesos y repeticiones.
        </p>
        <button
          onClick={onGoToRoutines}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-sm"
        >
          Ir a Administrar Rutinas
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center">
          <Play className="w-6 h-6 fill-emerald-400" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-100">
          ¿Qué entrenamos hoy?
        </h1>
        <p className="text-xs text-neutral-400">
          Selecciona uno de los días de tu rutina ({routine.name}) para iniciar el registro en vivo:
        </p>
      </div>

      <div className="space-y-3">
        {routine.days.map((day, idx) => (
          <div
            key={day.id}
            onClick={() => onStartDay(day)}
            className="p-4 sm:p-5 bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-emerald-500/30 flex items-center justify-center font-bold text-sm text-neutral-400 group-hover:text-emerald-400 shrink-0 transition-colors">
                {idx + 1}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors truncate">
                    {day.name}
                  </h3>
                  {day.tag && (
                    <span className="px-2 py-0.5 bg-neutral-800 text-cyan-400 text-[10px] font-semibold rounded-md shrink-0">
                      {day.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-0.5 truncate">
                  {day.exercises.map((e) => e.name).join(', ') || 'Sin ejercicios'}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-emerald-500 group-hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 shrink-0 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Comenzar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
