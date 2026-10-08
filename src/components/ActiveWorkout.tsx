import { useState, useEffect } from 'react';
import {
  Check,
  Plus,
  Trash2,
  Clock,
  Flame,
  Award,
  Dumbbell,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type {
  WorkoutDay,
  Exercise,
  WorkoutSessionLog,
  WorkoutExerciseLog,
  WorkoutSetLog,
  AppSettings,
} from '../types';
import { RestTimer } from './RestTimer';
import { playSetComplete } from '../utils/audio';

interface ActiveWorkoutProps {
  day: WorkoutDay;
  routineId?: string;
  settings: AppSettings;
  historyLogs: WorkoutSessionLog[];
  onFinishWorkout: (session: WorkoutSessionLog) => void;
  onCancelWorkout: () => void;
  exerciseLibrary: Exercise[];
}

export const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
  day,
  routineId,
  settings,
  historyLogs,
  onFinishWorkout,
  onCancelWorkout,
  exerciseLibrary,
}) => {
  // Initialize exercises and sets from the day definition
  const [exercises, setExercises] = useState<WorkoutExerciseLog[]>(() => {
    return day.exercises.map((ex) => {
      // Find previous workout performance for this exercise if available
      const sets: WorkoutSetLog[] = [];
      const defaultSetsCount = ex.targetSets || 4;

      for (let i = 1; i <= defaultSetsCount; i++) {
        sets.push({
          id: `set-${ex.id}-${i}-${Date.now()}`,
          setNumber: i,
          type: 'normal',
          weight: 0,
          reps: parseInt(ex.targetReps) || 10,
          completed: false,
        });
      }

      return {
        exerciseId: ex.id,
        exerciseName: ex.name,
        muscleGroup: ex.muscleGroup,
        imageUrl: ex.imageUrl,
        sets,
      };
    });
  });

  // Elapsed workout time
  const [startTime] = useState<Date>(new Date());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Rest timer state
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [restDuration, setRestDuration] = useState(90);

  // Finish confirmation modal
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');

  // Add extra exercise picker
  const [showAddExtraExercise, setShowAddExtraExercise] = useState(false);
  const [extraSearch, setExtraSearch] = useState('');

  // Track workout duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins < 10 ? '0' : ''}${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Find previous records for an exercise from past history logs
  const getPreviousPerformance = (exerciseId: string) => {
    for (const log of historyLogs) {
      const foundEx = log.exercises.find((e) => e.exerciseId === exerciseId);
      if (foundEx && foundEx.sets.length > 0) {
        const completedSets = foundEx.sets.filter((s) => s.completed);
        if (completedSets.length > 0) {
          // Return summary of the best or first completed set
          const bestSet = completedSets.reduce((prev, curr) =>
            curr.weight > prev.weight ? curr : prev
          );
          return `${bestSet.weight}${settings.weightUnit} × ${bestSet.reps}`;
        }
      }
    }
    return null;
  };

  // Update a set
  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSetLog,
    value: unknown
  ) => {
    setExercises((prev) => {
      const updated = [...prev];
      const targetEx = { ...updated[exerciseIndex] };
      const updatedSets = [...targetEx.sets];
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [field]: value,
      };
      targetEx.sets = updatedSets;
      updated[exerciseIndex] = targetEx;
      return updated;
    });
  };

  // Toggle set completion and trigger sound/rest timer
  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    const currentSet = exercises[exerciseIndex].sets[setIndex];
    const willBeCompleted = !currentSet.completed;

    updateSet(exerciseIndex, setIndex, 'completed', willBeCompleted);

    if (willBeCompleted) {
      if (settings.soundEnabled) {
        playSetComplete();
      }
      // Look up target rest seconds for this exercise
      const exDef = day.exercises.find(
        (e) => e.id === exercises[exerciseIndex].exerciseId
      );
      const rest = exDef?.restSeconds || settings.defaultRestTime || 90;
      setRestDuration(rest);
      setIsRestTimerOpen(true);
    }
  };

  // Add set to an exercise
  const addSet = (exerciseIndex: number) => {
    setExercises((prev) => {
      const updated = [...prev];
      const targetEx = { ...updated[exerciseIndex] };
      const lastSet = targetEx.sets[targetEx.sets.length - 1];
      const newSetNumber = targetEx.sets.length + 1;

      targetEx.sets = [
        ...targetEx.sets,
        {
          id: `set-${targetEx.exerciseId}-${newSetNumber}-${Date.now()}`,
          setNumber: newSetNumber,
          type: 'normal',
          weight: lastSet ? lastSet.weight : 0,
          reps: lastSet ? lastSet.reps : 10,
          completed: false,
        },
      ];
      updated[exerciseIndex] = targetEx;
      return updated;
    });
  };

  // Remove set from an exercise
  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setExercises((prev) => {
      const updated = [...prev];
      const targetEx = { ...updated[exerciseIndex] };
      targetEx.sets = targetEx.sets
        .filter((_, i) => i !== setIndex)
        .map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      updated[exerciseIndex] = targetEx;
      return updated;
    });
  };

  // Add extra exercise to current workout
  const handleAddExtraExercise = (ex: Exercise) => {
    const newExLog: WorkoutExerciseLog = {
      exerciseId: ex.id,
      exerciseName: ex.name,
      muscleGroup: ex.muscleGroup,
      imageUrl: ex.imageUrl,
      sets: [
        {
          id: `set-${ex.id}-1-${Date.now()}`,
          setNumber: 1,
          type: 'normal',
          weight: 0,
          reps: parseInt(ex.targetReps) || 10,
          completed: false,
        },
        {
          id: `set-${ex.id}-2-${Date.now()}`,
          setNumber: 2,
          type: 'normal',
          weight: 0,
          reps: parseInt(ex.targetReps) || 10,
          completed: false,
        },
        {
          id: `set-${ex.id}-3-${Date.now()}`,
          setNumber: 3,
          type: 'normal',
          weight: 0,
          reps: parseInt(ex.targetReps) || 10,
          completed: false,
        },
      ],
    };

    setExercises((prev) => [...prev, newExLog]);
    setShowAddExtraExercise(false);
  };

  // Calculate live volume & completed sets
  let totalVolume = 0;
  let totalSetsCompleted = 0;
  let totalSetsCount = 0;

  exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      totalSetsCount++;
      if (s.completed) {
        totalSetsCompleted++;
        totalVolume += s.weight * s.reps;
      }
    });
  });

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }

    const session: WorkoutSessionLog = {
      id: `session-${Date.now()}`,
      routineId,
      dayId: day.id,
      dayName: day.name,
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      exercises,
      totalVolume,
      totalSetsCompleted,
      notes: sessionNotes.trim() || undefined,
    };

    onFinishWorkout(session);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-24">
      {/* Rest Timer Component */}
      <RestTimer
        isOpen={isRestTimerOpen}
        initialSeconds={restDuration}
        onClose={() => setIsRestTimerOpen(false)}
        soundEnabled={settings.soundEnabled}
      />

      {/* Top Sticky Workout Header */}
      <div className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 -mx-4 px-4 py-3 sm:mx-0 sm:px-5 sm:rounded-2xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-base sm:text-lg font-bold text-neutral-100 truncate">
                {day.name}
              </h1>
            </div>
            <p className="text-xs text-neutral-400">
              {day.tag && <span className="text-emerald-400 font-semibold">{day.tag} • </span>}
              Progreso: {totalSetsCompleted} de {totalSetsCount} series completadas
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl font-mono text-sm font-bold text-emerald-400">
              <Clock className="w-4 h-4 text-emerald-500" />
              {formatDuration(elapsedSeconds)}
            </div>

            {/* Finish Button */}
            <button
              onClick={() => setShowFinishModal(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Terminar
            </button>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-800/80 text-center">
          <div className="p-1.5 bg-neutral-900/60 rounded-lg">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
              Volumen Total
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-cyan-400">
              {totalVolume.toLocaleString()} {settings.weightUnit}
            </span>
          </div>
          <div className="p-1.5 bg-neutral-900/60 rounded-lg">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
              Series Hechas
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
              {totalSetsCompleted} / {totalSetsCount}
            </span>
          </div>
          <div className="p-1.5 bg-neutral-900/60 rounded-lg">
            <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
              Descanso
            </span>
            <button
              onClick={() => {
                setRestDuration(settings.defaultRestTime || 90);
                setIsRestTimerOpen(true);
              }}
              className="font-mono text-xs sm:text-sm font-bold text-amber-400 hover:underline"
            >
              Abrir Reloj
            </button>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-5">
        {exercises.map((exLog, exIdx) => {
          const previousBest = getPreviousPerformance(exLog.exerciseId);
          const exDef = day.exercises.find((e) => e.id === exLog.exerciseId);

          return (
            <div
              key={`${exLog.exerciseId}-${exIdx}`}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4"
            >
              {/* Exercise Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Exercise Image Thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden shrink-0 flex items-center justify-center">
                    {exLog.imageUrl ? (
                      <img
                        src={exLog.imageUrl}
                        alt={exLog.exerciseName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Dumbbell className="w-7 h-7 text-neutral-600" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-100">
                      {exLog.exerciseName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 bg-neutral-800 text-cyan-400 text-[11px] font-medium rounded-md">
                        {exLog.muscleGroup}
                      </span>
                      {exDef?.targetReps && (
                        <span className="text-xs text-neutral-400">
                          Meta: {exDef.targetSets} × {exDef.targetReps} reps
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Previous record badge */}
                {previousBest && (
                  <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-right shrink-0">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">
                      Último
                    </span>
                    <span className="font-mono text-xs font-semibold text-neutral-200">
                      {previousBest}
                    </span>
                  </div>
                )}
              </div>

              {/* Notes if any */}
              {exDef?.notes && (
                <div className="px-3 py-2 bg-neutral-950/70 border border-neutral-800/60 rounded-xl text-xs text-neutral-400 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">Nota:</span>
                  <span>{exDef.notes}</span>
                </div>
              )}

              {/* Table of Sets */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-[11px] font-semibold text-neutral-400 px-2 uppercase tracking-wider">
                  <div className="col-span-2 text-center">Serie</div>
                  <div className="col-span-3 text-center">Tipo</div>
                  <div className="col-span-3 text-center">
                    Peso ({settings.weightUnit})
                  </div>
                  <div className="col-span-2 text-center">Reps</div>
                  <div className="col-span-2 text-center">Listo</div>
                </div>

                {exLog.sets.map((set, sIdx) => {
                  return (
                    <div
                      key={set.id}
                      className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                        set.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-neutral-950 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      {/* Set Number */}
                      <div className="col-span-2 text-center font-mono font-bold text-xs text-neutral-300">
                        {set.setNumber}
                      </div>

                      {/* Set Type Selector */}
                      <div className="col-span-3">
                        <select
                          value={set.type}
                          onChange={(e) =>
                            updateSet(
                              exIdx,
                              sIdx,
                              'type',
                              e.target.value as WorkoutSetLog['type']
                            )
                          }
                          className="w-full bg-neutral-900 border border-neutral-800 text-[11px] rounded-lg px-1.5 py-1 text-neutral-300 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="warmup">Calentam.</option>
                          <option value="failure">Al Fallo</option>
                          <option value="dropset">Dropset</option>
                        </select>
                      </div>

                      {/* Weight Input */}
                      <div className="col-span-3">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          placeholder="0"
                          value={set.weight === 0 ? '' : set.weight}
                          onChange={(e) =>
                            updateSet(
                              exIdx,
                              sIdx,
                              'weight',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1.5 text-center font-mono text-sm font-bold text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Reps Input */}
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={set.reps === 0 ? '' : set.reps}
                          onChange={(e) =>
                            updateSet(
                              exIdx,
                              sIdx,
                              'reps',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1.5 text-center font-mono text-sm font-bold text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Complete Checkbox & Delete */}
                      <div className="col-span-2 flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleSetComplete(exIdx, sIdx)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            set.completed
                              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105'
                              : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-500 border border-neutral-700'
                          }`}
                          title={set.completed ? 'Completado' : 'Marcar serie completada'}
                        >
                          <Check
                            className={`w-5 h-5 stroke-[3] ${
                              set.completed ? 'text-black' : 'text-neutral-500'
                            }`}
                          />
                        </button>
                        {exLog.sets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSet(exIdx, sIdx)}
                            className="p-1 text-neutral-600 hover:text-red-400"
                            title="Borrar serie"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Set Button */}
              <button
                type="button"
                onClick={() => addSet(exIdx)}
                className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 border border-dashed border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-semibold text-neutral-400 hover:text-neutral-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                Añadir Serie
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Extra Exercise Button */}
      <div className="pt-2">
        {showAddExtraExercise ? (
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-200">
                Selecciona un ejercicio extra para esta sesión:
              </span>
              <button
                onClick={() => setShowAddExtraExercise(false)}
                className="text-xs text-neutral-500 hover:text-neutral-300"
              >
                Cancelar
              </button>
            </div>
            <input
              type="text"
              placeholder="Buscar ejercicio en la biblioteca..."
              value={extraSearch}
              onChange={(e) => setExtraSearch(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <div className="max-h-48 overflow-y-auto space-y-1.5">
              {exerciseLibrary
                .filter((ex) =>
                  ex.name.toLowerCase().includes(extraSearch.toLowerCase()) ||
                  ex.muscleGroup.toLowerCase().includes(extraSearch.toLowerCase())
                )
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      {ex.imageUrl ? (
                        <img
                          src={ex.imageUrl}
                          alt={ex.name}
                          className="w-8 h-8 rounded-lg object-cover bg-neutral-900"
                        />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-neutral-500" />
                      )}
                      <div>
                        <span className="text-xs font-semibold text-neutral-200 block">
                          {ex.name}
                        </span>
                        <span className="text-[10px] text-cyan-400">
                          {ex.muscleGroup}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddExtraExercise(ex)}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg"
                    >
                      + Añadir
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddExtraExercise(true)}
            className="w-full py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-300 flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            Añadir Ejercicio Adicional a la Sesión
          </button>
        )}
      </div>

      {/* Bottom Actions: Cancel or Finish */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
        <button
          onClick={onCancelWorkout}
          className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-xl transition-all"
        >
          Descartar Sesión
        </button>
        <button
          onClick={() => setShowFinishModal(true)}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          Finalizar y Guardar
        </button>
      </div>

      {/* Finish Workout Summary Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-neutral-100">
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center mb-3">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-neutral-100">
                ¡Gran Entrenamiento!
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Resumen de tu sesión de hoy: {day.name}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-5 text-center">
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Duración
                </span>
                <span className="font-mono text-sm font-extrabold text-neutral-100">
                  {formatDuration(elapsedSeconds)}
                </span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Volumen
                </span>
                <span className="font-mono text-sm font-extrabold text-neutral-100">
                  {totalVolume} {settings.weightUnit}
                </span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Layers className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Series
                </span>
                <span className="font-mono text-sm font-extrabold text-neutral-100">
                  {totalSetsCompleted}
                </span>
              </div>
            </div>

            {/* Optional Notes */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Notas / Sensaciones de la sesión (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej: Buena congestión, subí peso en sentadillas, energía al 100%..."
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-semibold text-xs rounded-xl transition-all"
              >
                Continuar Entrenando
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                Guardar en Historial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
