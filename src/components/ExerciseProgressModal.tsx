import { X, Award, TrendingUp, Dumbbell, Calendar, Repeat } from 'lucide-react';
import type { Exercise, WorkoutSessionLog, AppSettings } from '../types';
import { ProgressCharts } from './ProgressCharts';

interface ExerciseProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise | null;
  historyLogs: WorkoutSessionLog[];
  settings: AppSettings;
}

export const ExerciseProgressModal: React.FC<ExerciseProgressModalProps> = ({
  isOpen,
  onClose,
  exercise,
  historyLogs,
  settings,
}) => {
  if (!isOpen || !exercise) return null;

  // Extract all sets ever performed for this exercise
  const exerciseEntries: {
    date: string;
    weight: number;
    reps: number;
    oneRepMax: number;
  }[] = [];

  let maxWeight = 0;
  let maxEstimated1RM = 0;
  let totalSetsCount = 0;

  historyLogs.forEach((session) => {
    const foundEx = session.exercises.find((e) => e.exerciseId === exercise.id);
    if (foundEx) {
      foundEx.sets.forEach((set) => {
        if (set.completed && set.weight > 0 && set.reps > 0) {
          totalSetsCount++;
          // Epley Formula for 1RM: Weight * (1 + Reps / 30)
          const e1rm = Math.round(set.weight * (1 + set.reps / 30) * 10) / 10;
          if (set.weight > maxWeight) maxWeight = set.weight;
          if (e1rm > maxEstimated1RM) maxEstimated1RM = e1rm;

          exerciseEntries.push({
            date: session.startTime,
            weight: set.weight,
            reps: set.reps,
            oneRepMax: e1rm,
          });
        }
      });
    }
  });

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden flex items-center justify-center shrink-0">
              {exercise.imageUrl ? (
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Dumbbell className="w-6 h-6 text-neutral-600" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-100">
                {exercise.name}
              </h2>
              <span className="text-xs text-cyan-400 font-medium">
                {exercise.muscleGroup} • {exercise.equipment || 'Gimnasio'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PR & Stats summary cards */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="p-3 bg-neutral-950 border border-amber-500/30 rounded-2xl text-center">
            <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              Récord Peso (PR)
            </span>
            <span className="font-mono text-base font-extrabold text-amber-400">
              {maxWeight > 0 ? `${maxWeight} ${settings.weightUnit}` : '—'}
            </span>
          </div>

          <div className="p-3 bg-neutral-950 border border-emerald-500/30 rounded-2xl text-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              1RM Estimado
            </span>
            <span className="font-mono text-base font-extrabold text-emerald-400">
              {maxEstimated1RM > 0 ? `${maxEstimated1RM} ${settings.weightUnit}` : '—'}
            </span>
          </div>

          <div className="p-3 bg-neutral-950 border border-cyan-500/30 rounded-2xl text-center">
            <Repeat className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">
              Series Totales
            </span>
            <span className="font-mono text-base font-extrabold text-cyan-400">
              {totalSetsCount}
            </span>
          </div>
        </div>

        {/* Exercise Technique Notes */}
        {exercise.notes && (
          <div className="p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-neutral-300 mb-5">
            <span className="text-emerald-400 font-bold block mb-0.5">Indicaciones de técnica:</span>
            {exercise.notes}
          </div>
        )}

        {/* Embedded Interactive Chart */}
        <div className="mb-5">
          <ProgressCharts
            exercises={[exercise]}
            historyLogs={historyLogs}
            settings={settings}
            selectedExerciseId={exercise.id}
          />
        </div>

        {/* Progression History Log */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Historial de Cargas Registradas
          </h3>

          {exerciseEntries.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
              <p className="text-xs">Aún no hay series registradas para este ejercicio.</p>
              <p className="text-[11px] text-neutral-600 mt-1">
                Completa un entrenamiento para ver la evolución de tus pesos y repeticiones.
              </p>
            </div>
          ) : (
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              {exerciseEntries.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-800/80 rounded-xl text-xs font-mono"
                >
                  <span className="text-neutral-500">
                    {formatDate(entry.date)}
                  </span>
                  <span className="text-neutral-200 font-bold">
                    {entry.weight} {settings.weightUnit} × {entry.reps} reps
                  </span>
                  <span className="text-emerald-400 text-[11px]">
                    1RM: {entry.oneRepMax} {settings.weightUnit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
