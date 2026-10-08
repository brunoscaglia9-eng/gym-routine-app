import { useState } from 'react';
import {
  History,
  Calendar,
  Clock,
  Flame,
  Layers,
  ChevronDown,
  ChevronUp,
  Trash2,
  Dumbbell,
  Search,
} from 'lucide-react';
import type { WorkoutSessionLog, AppSettings } from '../types';

interface WorkoutHistoryProps {
  historyLogs: WorkoutSessionLog[];
  settings: AppSettings;
  onDeleteSession: (sessionId: string) => void;
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({
  historyLogs,
  settings,
  onDeleteSession,
}) => {
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDuration = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs}h ${remMins}m`;
    }
    return `${mins} min ${secs > 0 ? `${secs}s` : ''}`;
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Lifetime Stats
  const totalWorkouts = historyLogs.length;
  const lifetimeVolume = historyLogs.reduce((acc, curr) => acc + curr.totalVolume, 0);
  const lifetimeSets = historyLogs.reduce((acc, curr) => acc + curr.totalSetsCompleted, 0);

  const filteredLogs = historyLogs.filter(
    (log) =>
      log.dayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.exercises.some((e) =>
        e.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
          <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase text-neutral-400 block">
            Entrenamientos
          </span>
          <span className="font-mono text-lg sm:text-2xl font-extrabold text-neutral-100">
            {totalWorkouts}
          </span>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
          <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase text-neutral-400 block">
            Volumen Total
          </span>
          <span className="font-mono text-lg sm:text-2xl font-extrabold text-amber-400 truncate block">
            {lifetimeVolume.toLocaleString()} {settings.weightUnit}
          </span>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
          <Layers className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase text-neutral-400 block">
            Series Hechas
          </span>
          <span className="font-mono text-lg sm:text-2xl font-extrabold text-emerald-400">
            {lifetimeSets}
          </span>
        </div>
      </div>

      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            Historial de Entrenamientos
          </h2>
          <p className="text-xs text-neutral-400">
            Registro detallado de pesos, repeticiones y marcas personales logradas
          </p>
        </div>

        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por día o ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* History Session Cards */}
      {filteredLogs.length === 0 ? (
        <div className="p-12 text-center text-neutral-500 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl space-y-2">
          <History className="w-10 h-10 mx-auto opacity-30" />
          <p className="text-sm font-semibold">No hay entrenamientos registrados</p>
          <p className="text-xs text-neutral-600">
            {searchTerm
              ? 'No coincide ningún registro con la búsqueda.'
              : 'Completa tu primer entrenamiento para verlo guardado aquí con todos sus pesos y series.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const isExpanded = expandedSessionId === log.id;

            return (
              <div
                key={log.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg transition-all"
              >
                {/* Session Summary Bar */}
                <div
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-neutral-850/50 transition-colors"
                  onClick={() =>
                    setExpandedSessionId(isExpanded ? null : log.id)
                  }
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-100">
                        {log.dayName}
                      </h3>
                      <span className="text-xs text-neutral-500 font-mono">
                        {formatDate(log.startTime)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1">
                      <span className="flex items-center gap-1 font-mono text-emerald-400">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(log.durationSeconds)}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-cyan-400">
                        {log.totalVolume.toLocaleString()} {settings.weightUnit}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-neutral-300">
                        {log.totalSetsCompleted} series completadas
                      </span>
                    </div>

                    {log.notes && (
                      <p className="text-xs text-neutral-400 italic mt-1.5 line-clamp-1">
                        "{log.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          confirm('¿Estás seguro de eliminar este entrenamiento del historial?')
                        ) {
                          onDeleteSession(log.id);
                        }
                      }}
                      className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-all"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedSessionId(isExpanded ? null : log.id)
                      }
                      className="p-2 text-neutral-400 hover:text-neutral-100 rounded-xl"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Session Details */}
                {isExpanded && (
                  <div className="p-4 bg-neutral-950/50 border-t border-neutral-800/80 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {log.exercises.map((ex, exIdx) => (
                        <div
                          key={`${ex.exerciseId}-${exIdx}`}
                          className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-3 space-y-2"
                        >
                          <div className="flex items-center gap-2.5">
                            {ex.imageUrl ? (
                              <img
                                src={ex.imageUrl}
                                alt={ex.exerciseName}
                                className="w-9 h-9 rounded-lg object-cover bg-neutral-950 border border-neutral-700 shrink-0"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                                <Dumbbell className="w-4 h-4 text-neutral-500" />
                              </div>
                            )}
                            <div className="truncate">
                              <h4 className="text-xs font-bold text-neutral-200 truncate">
                                {ex.exerciseName}
                              </h4>
                              <span className="text-[10px] text-cyan-400">
                                {ex.muscleGroup}
                              </span>
                            </div>
                          </div>

                          {/* Sets table */}
                          <div className="space-y-1">
                            {ex.sets
                              .filter((s) => s.completed)
                              .map((set) => (
                                <div
                                  key={set.id}
                                  className="flex items-center justify-between text-xs px-2 py-1 bg-neutral-950/70 rounded-lg font-mono"
                                >
                                  <span className="text-neutral-500 text-[11px]">
                                    Serie {set.setNumber}
                                  </span>
                                  <span className="font-bold text-emerald-400">
                                    {set.weight} {settings.weightUnit} × {set.reps} reps
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
