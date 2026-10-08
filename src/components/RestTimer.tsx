import { useState, useEffect } from 'react';
import { Play, Pause, Plus, Minus, RotateCcw, X, Minimize2, Maximize2, Bell } from 'lucide-react';
import { playTimerWarning, playTimerComplete } from '../utils/audio';

interface RestTimerProps {
  initialSeconds: number;
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds,
  isOpen,
  onClose,
  soundEnabled,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isOpen && isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (soundEnabled) playTimerComplete();
            // Try navigator vibrate if supported on mobile
            if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
            return 0;
          }
          if (prev <= 4 && prev > 1 && soundEnabled) {
            playTimerWarning();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isRunning, timeLeft, soundEnabled]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = totalSeconds > 0 ? Math.min(100, ((totalSeconds - timeLeft) / totalSeconds) * 100) : 100;

  const addSeconds = (val: number) => {
    setTimeLeft((prev) => Math.max(0, prev + val));
    setTotalSeconds((prev) => Math.max(prev, prev + val));
  };

  const resetTimer = () => {
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  // Minimized floating pill (e.g. at bottom right)
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-neutral-900 border border-amber-500/50 shadow-xl shadow-amber-500/10 px-3 py-2 rounded-full text-neutral-100 animate-in slide-in-from-bottom duration-200">
        <div className={`w-2.5 h-2.5 rounded-full ${timeLeft === 0 ? 'bg-emerald-500 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
        <span className="font-mono text-sm font-bold text-amber-400">
          {formatTime(timeLeft)}
        </span>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-1 hover:text-white text-neutral-400"
          title={isRunning ? 'Pausar' : 'Reanudar'}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => setIsMinimized(false)}
          className="p-1 hover:text-white text-neutral-400"
          title="Maximizar"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:text-red-400 text-neutral-400"
          title="Cerrar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-center">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Bell className="w-4 h-4" />
            Descanso entre Series
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg"
              title="Minimizar"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Countdown Progress */}
        <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-neutral-800 fill-none"
              strokeWidth="7"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`transition-all duration-300 fill-none ${
                timeLeft === 0 ? 'stroke-emerald-400' : 'stroke-amber-400'
              }`}
              strokeWidth="7"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Time digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`font-mono text-4xl font-extrabold tracking-tight ${
                timeLeft === 0 ? 'text-emerald-400 animate-bounce' : 'text-neutral-100'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-neutral-400 font-medium mt-1">
              {timeLeft === 0 ? '¡Listo para la siguiente serie!' : isRunning ? 'Descansando...' : 'En pausa'}
            </span>
          </div>
        </div>

        {/* Quick Add / Sub controls */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <button
            onClick={() => addSeconds(-15)}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
          >
            <Minus className="w-3.5 h-3.5" /> 15s
          </button>
          <button
            onClick={() => addSeconds(15)}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> 15s
          </button>
          <button
            onClick={() => addSeconds(30)}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> 30s
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetTimer}
            className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-2xl active:scale-95 transition-all"
            title="Reiniciar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" /> Pausar
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Reanudar
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-2xl text-xs font-semibold active:scale-95 transition-all"
          >
            Saltar
          </button>
        </div>
      </div>
    </div>
  );
};
