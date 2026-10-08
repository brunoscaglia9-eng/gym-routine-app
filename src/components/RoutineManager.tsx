import { useState } from 'react';
import {
  Calendar,
  Plus,
  Play,
  Edit2,
  Trash2,
  Copy,
  Dumbbell,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Routine, WorkoutDay, Exercise } from '../types';

interface RoutineManagerProps {
  routines: Routine[];
  activeRoutineId: string;
  onSelectRoutine: (routineId: string) => void;
  onStartWorkout: (day: WorkoutDay) => void;
  onEditDay: (day: WorkoutDay) => void;
  onDeleteDay: (dayId: string) => void;
  onDuplicateDay: (day: WorkoutDay) => void;
  onAddNewDay: () => void;
  onCreateRoutine: () => void;
  onDeleteRoutine: (routineId: string) => void;
  onEditExercise: (exercise: Exercise) => void;
}

export const RoutineManager: React.FC<RoutineManagerProps> = ({
  routines,
  activeRoutineId,
  onSelectRoutine,
  onStartWorkout,
  onEditDay,
  onDeleteDay,
  onDuplicateDay,
  onAddNewDay,
  onCreateRoutine,
  onDeleteRoutine,
  onEditExercise,
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({
    'day-1': true,
    'day-2': true,
    'day-3': true,
    'day-4': true,
  });

  const currentRoutine =
    routines.find((r) => r.id === activeRoutineId) || routines[0];

  const toggleDayExpanded = (dayId: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayId]: !prev[dayId],
    }));
  };

  if (!currentRoutine) {
    return (
      <div className="text-center py-16 text-neutral-400 space-y-4">
        <Dumbbell className="w-12 h-12 mx-auto text-neutral-600" />
        <h2 className="text-lg font-bold">No tienes ninguna rutina creada</h2>
        <p className="text-xs">Comienza creando tu primera rutina semanal o personalizada.</p>
        <button
          onClick={onCreateRoutine}
          className="px-5 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-sm"
        >
          Crear Primera Rutina
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Top Routine Selector & Header */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg">
                Rutina Activa
              </span>
              <span className="text-xs text-neutral-400">
                {currentRoutine.days.length} Días programados
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-100">
              {currentRoutine.name}
            </h1>
            {currentRoutine.description && (
              <p className="text-xs text-neutral-400">
                {currentRoutine.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {routines.length > 1 && (
              <select
                value={activeRoutineId}
                onChange={(e) => onSelectRoutine(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 text-xs text-neutral-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-emerald-500"
              >
                {routines.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            )}

            {routines.length > 1 && (
              <button
                onClick={() => onDeleteRoutine(currentRoutine.id)}
                className="p-2 bg-neutral-800 hover:bg-red-950/40 text-neutral-400 hover:text-red-400 rounded-xl transition-all"
                title="Eliminar rutina actual"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onCreateRoutine}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              Nueva Rutina
            </button>
          </div>
        </div>
      </div>

      {/* Routine Days Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Días de Entrenamiento
          </h2>
          <p className="text-xs text-neutral-400">
            Cada día tiene su propia lista de ejercicios con imágenes y series asignadas
          </p>
        </div>

        <button
          onClick={onAddNewDay}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Añadir Día
        </button>
      </div>

      {/* Days List */}
      <div className="space-y-4">
        {currentRoutine.days.map((day, dIdx) => {
          const isExpanded = expandedDays[day.id] ?? true;

          return (
            <div
              key={day.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Day Card Header */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900 border-b border-neutral-800/80">
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => toggleDayExpanded(day.id)}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold shrink-0 text-sm">
                    {dIdx + 1}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-100 truncate">
                        {day.name}
                      </h3>
                      {day.tag && (
                        <span className="px-2 py-0.5 bg-neutral-800 text-cyan-400 text-[10px] font-semibold rounded-md shrink-0">
                          {day.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">
                      {day.exercises.length} ejercicios • {day.exercises.reduce((acc, curr) => acc + (curr.targetSets || 0), 0)} series totales
                    </p>
                  </div>
                </div>

                {/* Day Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {/* Start Workout Button */}
                  <button
                    onClick={() => onStartWorkout(day)}
                    className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Entrenar Hoy
                  </button>

                  <button
                    onClick={() => onEditDay(day)}
                    className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-xl transition-all"
                    title="Editar día y ejercicios"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDuplicateDay(day)}
                    className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-xl transition-all"
                    title="Duplicar día"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {currentRoutine.days.length > 1 && (
                    <button
                      onClick={() => onDeleteDay(day.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-all"
                      title="Eliminar día"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleDayExpanded(day.id)}
                    className="p-2 text-neutral-400 hover:text-neutral-200 rounded-xl transition-all"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Day Description if any */}
              {day.description && isExpanded && (
                <div className="px-5 py-2 bg-neutral-950/40 border-b border-neutral-800/40 text-xs text-neutral-400">
                  {day.description}
                </div>
              )}

              {/* Day Exercises List */}
              {isExpanded && (
                <div className="p-3 sm:p-4 space-y-2.5 bg-neutral-950/30">
                  {day.exercises.length === 0 ? (
                    <div className="p-6 text-center text-neutral-500 space-y-2">
                      <p className="text-xs">Este día no tiene ejercicios todavía.</p>
                      <button
                        onClick={() => onEditDay(day)}
                        className="px-3 py-1.5 bg-neutral-800 text-cyan-400 text-xs font-semibold rounded-lg hover:bg-neutral-700"
                      >
                        + Configurar y Agregar Ejercicios
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {day.exercises.map((exercise, eIdx) => (
                        <div
                          key={`${exercise.id}-${eIdx}`}
                          className="flex items-center justify-between p-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Image Thumbnail with zoom on click */}
                            <div className="relative w-12 h-12 rounded-lg bg-neutral-950 border border-neutral-700/80 overflow-hidden shrink-0 flex items-center justify-center">
                              {exercise.imageUrl ? (
                                <img
                                  src={exercise.imageUrl}
                                  alt={exercise.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                />
                              ) : (
                                <Dumbbell className="w-6 h-6 text-neutral-600" />
                              )}
                            </div>

                            <div className="truncate">
                              <h4 className="text-xs sm:text-sm font-bold text-neutral-100 truncate group-hover:text-emerald-400 transition-colors">
                                {exercise.name}
                              </h4>
                              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5">
                                <span className="text-cyan-400 font-medium">
                                  {exercise.muscleGroup}
                                </span>
                                <span>•</span>
                                <span className="font-mono text-neutral-300 font-semibold">
                                  {exercise.targetSets} × {exercise.targetReps}
                                </span>
                                <span>•</span>
                                <span className="text-amber-400 font-mono">
                                  {exercise.restSeconds}s
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onEditExercise(exercise)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg shrink-0 opacity-0 group-hover:opacity-100 transition-all"
                            title="Editar ejercicio e imagen"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
