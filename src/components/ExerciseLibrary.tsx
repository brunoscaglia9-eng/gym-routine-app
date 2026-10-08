import { useState } from 'react';
import {
  Search,
  Plus,
  Dumbbell,
  TrendingUp,
  Edit2,
  Trash2,
} from 'lucide-react';
import type { Exercise, MuscleGroup } from '../types';

interface ExerciseLibraryProps {
  exercises: Exercise[];
  onCreateExercise: () => void;
  onEditExercise: (exercise: Exercise) => void;
  onDeleteExercise: (exerciseId: string) => void;
  onSelectExerciseProgress: (exercise: Exercise) => void;
}

const MUSCLE_FILTER_OPTIONS: (MuscleGroup | 'Todos')[] = [
  'Todos',
  'Pecho',
  'Espalda',
  'Piernas',
  'Hombros',
  'Bíceps',
  'Tríceps',
  'Abdomen / Core',
  'Glúteos',
  'Antebrazos',
  'Cardio',
];

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  exercises,
  onCreateExercise,
  onEditExercise,
  onDeleteExercise,
  onSelectExerciseProgress,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'Todos'>('Todos');

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ex.equipment && ex.equipment.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesMuscle =
      selectedMuscle === 'Todos' || ex.muscleGroup === selectedMuscle;

    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-100 flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-emerald-400" />
            Biblioteca de Ejercicios
          </h1>
          <p className="text-xs text-neutral-400">
            Explora o añade ejercicios con imágenes, series y descansos personalizados
          </p>
        </div>

        <button
          onClick={onCreateExercise}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Nuevo Ejercicio
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre, músculo o equipamiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Muscle group filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
          {MUSCLE_FILTER_OPTIONS.map((muscle) => {
            const isSelected = selectedMuscle === muscle;
            return (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {muscle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center text-neutral-500 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
          <Dumbbell className="w-10 h-10 mx-auto opacity-30" />
          <p className="text-sm font-semibold">No se encontraron ejercicios</p>
          <p className="text-xs text-neutral-600">
            Prueba ajustando el filtro de músculo o añade un nuevo ejercicio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700/80 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative w-full h-36 bg-neutral-950 flex items-center justify-center overflow-hidden border-b border-neutral-800">
                  {exercise.imageUrl ? (
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-neutral-600 flex flex-col items-center">
                      <Dumbbell className="w-10 h-10 mb-1 opacity-50" />
                      <span className="text-[11px]">Sin imagen asignada</span>
                    </div>
                  )}

                  {/* Muscle badge on top right */}
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 text-cyan-400 text-[10px] font-bold">
                    {exercise.muscleGroup}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {exercise.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
                    <span className="px-2 py-0.5 bg-neutral-950 rounded-md border border-neutral-800">
                      {exercise.targetSets} series × {exercise.targetReps}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-950 rounded-md border border-neutral-800 text-amber-400 font-mono">
                      {exercise.restSeconds}s descanso
                    </span>
                    {exercise.equipment && (
                      <span className="text-neutral-500">
                        {exercise.equipment}
                      </span>
                    )}
                  </div>

                  {exercise.notes && (
                    <p className="text-[11px] text-neutral-500 line-clamp-2 italic pt-1">
                      "{exercise.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 pt-0 flex items-center justify-between border-t border-neutral-800/60 mt-2 bg-neutral-900">
                <button
                  onClick={() => onSelectExerciseProgress(exercise)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-cyan-400 hover:text-cyan-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
                  title="Ver récord personal e historial de pesos"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Progreso / PR
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditExercise(exercise)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-all"
                    title="Editar ejercicio"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `¿Eliminar el ejercicio "${exercise.name}" de la biblioteca?`
                        )
                      ) {
                        onDeleteExercise(exercise.id);
                      }
                    }}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-all"
                    title="Eliminar ejercicio"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
