import { useState, useEffect } from 'react';
import { X, Dumbbell, Save, Clock, Repeat, Layers } from 'lucide-react';
import type { Exercise, MuscleGroup } from '../types';
import { ImageUploadHelper } from './ImageUploadHelper';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
  initialExercise?: Exercise | null;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
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
  'Cuerpo Completo',
];

const EQUIPMENTS = ['Barra', 'Mancuerna', 'Polea', 'Máquina', 'Peso corporal', 'Kettlebell', 'Bandas'];

const REST_PRESETS = [30, 45, 60, 90, 120, 180];

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExercise,
}) => {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('Pecho');
  const [imageUrl, setImageUrl] = useState('');
  const [targetSets, setTargetSets] = useState(4);
  const [targetReps, setTargetReps] = useState('8-12');
  const [restSeconds, setRestSeconds] = useState(90);
  const [notes, setNotes] = useState('');
  const [equipment, setEquipment] = useState('Barra');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialExercise) {
      setName(initialExercise.name);
      setMuscleGroup(initialExercise.muscleGroup);
      setImageUrl(initialExercise.imageUrl || '');
      setTargetSets(initialExercise.targetSets || 4);
      setTargetReps(initialExercise.targetReps || '8-12');
      setRestSeconds(initialExercise.restSeconds || 90);
      setNotes(initialExercise.notes || '');
      setEquipment(initialExercise.equipment || 'Barra');
    } else {
      setName('');
      setMuscleGroup('Pecho');
      setImageUrl('');
      setTargetSets(4);
      setTargetReps('8-12');
      setRestSeconds(90);
      setNotes('');
      setEquipment('Barra');
    }
    setError('');
  }, [initialExercise, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre del ejercicio es obligatorio.');
      return;
    }

    const newExercise: Exercise = {
      id: initialExercise?.id || `ex-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      muscleGroup,
      imageUrl: imageUrl.trim() || undefined,
      targetSets: Number(targetSets) || 4,
      targetReps: targetReps.trim() || '10',
      restSeconds: Number(restSeconds) || 90,
      notes: notes.trim() || undefined,
      equipment,
    };

    onSave(newExercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {initialExercise ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
              </h2>
              <p className="text-xs text-neutral-400">
                Configura los detalles, series objetivo e imagen del ejercicio
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
          {/* Exercise Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Nombre del Ejercicio *
            </label>
            <input
              type="text"
              placeholder="Ej: Press de Banca Plano, Sentadillas, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Muscle Group & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Grupo Muscular
              </label>
              <select
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value as MuscleGroup)}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
              >
                {MUSCLE_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Equipamiento
              </label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
              >
                {EQUIPMENTS.map((eq) => (
                  <option key={eq} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload Component */}
          <div className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl">
            <ImageUploadHelper
              currentImageUrl={imageUrl}
              onImageChange={(url) => setImageUrl(url)}
            />
          </div>

          {/* Target Sets, Reps & Rest */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Series
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={targetSets}
                onChange={(e) => setTargetSets(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-center font-bold text-neutral-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                <Repeat className="w-3.5 h-3.5 text-cyan-400" />
                Reps Obj.
              </label>
              <input
                type="text"
                placeholder="8-12"
                value={targetReps}
                onChange={(e) => setTargetReps(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-center font-bold text-neutral-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Descanso
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="10"
                  max="600"
                  step="5"
                  value={restSeconds}
                  onChange={(e) => setRestSeconds(Math.max(10, parseInt(e.target.value) || 60))}
                  className="w-full px-2 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-center font-bold text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-neutral-500 font-medium">seg</span>
              </div>
            </div>
          </div>

          {/* Quick Rest Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-neutral-400 shrink-0">Descanso rápido:</span>
            {REST_PRESETS.map((sec) => (
              <button
                type="button"
                key={sec}
                onClick={() => setRestSeconds(sec)}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                  restSeconds === sec
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>

          {/* Notes / Tips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Notas de Técnica / Consejos (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Bajar en 3 segundos, retracción escapular, peso moderado..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-xl text-sm font-medium transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar Ejercicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
