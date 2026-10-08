import { useState, useEffect } from 'react';
import { X, Calendar, Plus, Trash2, ArrowUp, ArrowDown, Dumbbell, Save } from 'lucide-react';
import type { WorkoutDay, Exercise } from '../types';

interface DayEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (day: WorkoutDay) => void;
  initialDay?: WorkoutDay | null;
  exerciseLibrary: Exercise[];
  onCreateNewExercise: () => void;
}

export const DayEditorModal: React.FC<DayEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDay,
  exerciseLibrary,
  onCreateNewExercise,
}) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchLibrary, setSearchLibrary] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialDay) {
      setName(initialDay.name);
      setTag(initialDay.tag || '');
      setDescription(initialDay.description || '');
      setSelectedExercises([...initialDay.exercises]);
    } else {
      setName('Nuevo Día');
      setTag('Día');
      setDescription('');
      setSelectedExercises([]);
    }
    setError('');
    setIsPickerOpen(false);
  }, [initialDay, isOpen]);

  if (!isOpen) return null;

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...selectedExercises];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setSelectedExercises(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedExercises.length - 1) return;
    const updated = [...selectedExercises];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setSelectedExercises(updated);
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleAddExerciseFromLibrary = (exercise: Exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre del día es requerido.');
      return;
    }

    const day: WorkoutDay = {
      id: initialDay?.id || `day-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      tag: tag.trim() || undefined,
      description: description.trim() || undefined,
      exercises: selectedExercises,
    };

    onSave(day);
    onClose();
  };

  const filteredLibrary = exerciseLibrary.filter((ex) =>
    ex.name.toLowerCase().includes(searchLibrary.toLowerCase()) ||
    ex.muscleGroup.toLowerCase().includes(searchLibrary.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {initialDay ? 'Editar Día de Rutina' : 'Crear Día de Rutina'}
              </h2>
              <p className="text-xs text-neutral-400">
                Define el nombre, etiqueta y organiza los ejercicios para esta sesión
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-950/50 border border-red-800/80 rounded-xl text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Nombre del Día *
              </label>
              <input
                type="text"
                placeholder="Ej: Día 1: Pecho y Tríceps, Lunes, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Etiqueta Corta
              </label>
              <input
                type="text"
                placeholder="Ej: Push, Pierna, Lunes"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Descripción / Objetivo (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Enfoque en hipertrofia y fuerza pesada de torso superior."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Exercises in this Day */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-cyan-400" />
                Ejercicios en este día ({selectedExercises.length})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Añadir de Biblioteca
                </button>
                <button
                  type="button"
                  onClick={onCreateNewExercise}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 hover:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Crear Nuevo
                </button>
              </div>
            </div>

            {/* Exercise Picker Dropdown */}
            {isPickerOpen && (
              <div className="mb-4 p-3 bg-neutral-950 border border-cyan-900/50 rounded-2xl space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-300">
                    Selecciona ejercicios para agregar a este día:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPickerOpen(false)}
                    className="text-neutral-500 hover:text-neutral-300 text-xs"
                  >
                    Cerrar
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Buscar ejercicio o grupo muscular..."
                  value={searchLibrary}
                  onChange={(e) => setSearchLibrary(e.target.value)}
                  className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {filteredLibrary.length === 0 ? (
                    <p className="text-xs text-neutral-500 text-center py-2">
                      No se encontraron ejercicios
                    </p>
                  ) : (
                    filteredLibrary.map((ex) => (
                      <div
                        key={ex.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {ex.imageUrl ? (
                            <img
                              src={ex.imageUrl}
                              alt={ex.name}
                              className="w-8 h-8 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-700"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                              <Dumbbell className="w-4 h-4 text-neutral-500" />
                            </div>
                          )}
                          <div className="truncate">
                            <p className="text-xs font-medium text-neutral-200 truncate">
                              {ex.name}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {ex.muscleGroup} • {ex.targetSets} series × {ex.targetReps}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddExerciseFromLibrary(ex)}
                          className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-lg transition-all shrink-0 ml-2"
                        >
                          + Agregar
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* List of current exercises */}
            {selectedExercises.length === 0 ? (
              <div className="p-8 border border-dashed border-neutral-800 rounded-2xl text-center text-neutral-500">
                <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No hay ejercicios en este día todavía.</p>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Usa los botones arriba para añadir ejercicios desde la biblioteca.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedExercises.map((ex, idx) => (
                  <div
                    key={`${ex.id}-${idx}`}
                    className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-neutral-500 w-4 text-center">
                        {idx + 1}
                      </span>
                      {ex.imageUrl ? (
                        <img
                          src={ex.imageUrl}
                          alt={ex.name}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-900 border border-neutral-700 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                          <Dumbbell className="w-4 h-4 text-neutral-500" />
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-xs font-semibold text-neutral-200 truncate">
                          {ex.name}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          <span className="text-cyan-400">{ex.muscleGroup}</span> • {ex.targetSets} series × {ex.targetReps} • {ex.restSeconds}s
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 rounded"
                        title="Mover arriba"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === selectedExercises.length - 1}
                        className="p-1 text-neutral-500 hover:text-neutral-200 disabled:opacity-20 rounded"
                        title="Mover abajo"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(idx)}
                        className="p-1 text-red-500 hover:text-red-400 hover:bg-red-950/40 rounded transition-all ml-1"
                        title="Quitar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-xl text-sm font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar Día
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
