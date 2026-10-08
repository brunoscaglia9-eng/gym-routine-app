import { useState } from 'react';
import {
  TrendingUp,
  Award,
  Layers,
  Repeat,
  Scale,
} from 'lucide-react';
import type { Exercise, WorkoutSessionLog, AppSettings } from '../types';

interface ProgressChartsProps {
  exercises: Exercise[];
  historyLogs: WorkoutSessionLog[];
  settings: AppSettings;
  selectedExerciseId?: string;
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({
  exercises,
  historyLogs,
  settings,
  selectedExerciseId,
}) => {
  const [currentExId, setCurrentExId] = useState<string>(
    selectedExerciseId || exercises[0]?.id || ''
  );
  const [chartMetric, setChartMetric] = useState<'weight' | 'reps' | '1rm' | 'volume'>('weight');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedExercise = exercises.find((e) => e.id === currentExId) || exercises[0];

  // Extract chronological data points for this exercise
  const dataPoints: {
    date: string;
    formattedDate: string;
    weight: number;
    reps: number;
    oneRepMax: number;
    volume: number;
  }[] = [];

  // Sort history ascending by date for chart timeline
  const sortedHistory = [...historyLogs].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  sortedHistory.forEach((session) => {
    if (!selectedExercise) return;
    const found = session.exercises.find((e) => e.exerciseId === selectedExercise.id);
    if (found) {
      const completedSets = found.sets.filter((s) => s.completed && s.reps > 0);
      if (completedSets.length > 0) {
        // Max weight in this session
        const maxSet = completedSets.reduce((prev, curr) =>
          curr.weight > prev.weight ? curr : prev
        );
        // Max reps in this session
        const maxRepSet = completedSets.reduce((prev, curr) =>
          curr.reps > prev.reps ? curr : prev
        );
        // Session volume for this exercise
        const sessionVolume = completedSets.reduce(
          (sum, s) => sum + s.weight * s.reps,
          0
        );
        // Estimated 1RM
        const e1rm = Math.round(maxSet.weight * (1 + maxSet.reps / 30) * 10) / 10;

        const dateObj = new Date(session.startTime);
        const formattedDate = dateObj.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
        });

        dataPoints.push({
          date: session.startTime,
          formattedDate,
          weight: maxSet.weight,
          reps: maxRepSet.reps,
          oneRepMax: e1rm,
          volume: sessionVolume,
        });
      }
    }
  });

  // Calculate metrics
  const values = dataPoints.map((d) => {
    if (chartMetric === 'weight') return d.weight;
    if (chartMetric === 'reps') return d.reps;
    if (chartMetric === '1rm') return d.oneRepMax;
    return d.volume;
  });

  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const firstValue = values[0] || 0;
  const lastValue = values[values.length - 1] || 0;
  const progressDiff = lastValue - firstValue;

  // Chart coordinates
  const width = 500;
  const height = 220;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartInnerWidth = width - paddingX * 2;
  const chartInnerHeight = height - paddingTop - paddingBottom;

  const yRange = maxValue === minValue ? (maxValue > 0 ? maxValue : 10) : maxValue - minValue;
  const effectiveMinY = Math.max(0, minValue - yRange * 0.1);
  const effectiveMaxY = maxValue + yRange * 0.1;
  const totalYSpan = effectiveMaxY - effectiveMinY || 1;

  const points = dataPoints.map((d, index) => {
    const val =
      chartMetric === 'weight'
        ? d.weight
        : chartMetric === 'reps'
        ? d.reps
        : chartMetric === '1rm'
        ? d.oneRepMax
        : d.volume;

    const x =
      dataPoints.length === 1
        ? width / 2
        : paddingX + (index / (dataPoints.length - 1)) * chartInnerWidth;

    const y =
      paddingTop +
      chartInnerHeight -
      ((val - effectiveMinY) / totalYSpan) * chartInnerHeight;

    return { x, y, value: val, data: d };
  });

  const pathD =
    points.length > 1
      ? points.reduce((acc, pt, i) => {
          return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
        }, '')
      : '';

  const areaD =
    points.length > 1
      ? `${pathD} L ${points[points.length - 1].x} ${
          paddingTop + chartInnerHeight
        } L ${points[0].x} ${paddingTop + chartInnerHeight} Z`
      : '';

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Exercise Selector & Metric Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-neutral-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Gráfica de Progresión
          </h3>
          <p className="text-xs text-neutral-400">
            Evolución histórica de cargas, repeticiones y volumen
          </p>
        </div>

        {/* Exercise Dropdown */}
        <div className="sm:w-60">
          <select
            value={currentExId}
            onChange={(e) => setCurrentExId(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name} ({ex.muscleGroup})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metric Selector Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setChartMetric('weight')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            chartMetric === 'weight'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          Peso Máximo ({settings.weightUnit})
        </button>

        <button
          onClick={() => setChartMetric('reps')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            chartMetric === 'reps'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          Repeticiones
        </button>

        <button
          onClick={() => setChartMetric('1rm')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            chartMetric === '1rm'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          1RM Estimado
        </button>

        <button
          onClick={() => setChartMetric('volume')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            chartMetric === 'volume'
              ? 'bg-purple-500 text-black shadow-md shadow-purple-500/20'
              : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Volumen de Sesión
        </button>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-2xl text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">
            Récord (PR)
          </span>
          <span className="font-mono text-base font-black text-emerald-400">
            {maxValue > 0 ? maxValue : '—'}{' '}
            <span className="text-xs text-neutral-400 font-normal">
              {chartMetric === 'reps' ? 'reps' : settings.weightUnit}
            </span>
          </span>
        </div>

        <div className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-2xl text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">
            Último Registro
          </span>
          <span className="font-mono text-base font-black text-cyan-400">
            {lastValue > 0 ? lastValue : '—'}{' '}
            <span className="text-xs text-neutral-400 font-normal">
              {chartMetric === 'reps' ? 'reps' : settings.weightUnit}
            </span>
          </span>
        </div>

        <div className="p-3 bg-neutral-950 border border-neutral-800/80 rounded-2xl text-center">
          <span className="text-[10px] uppercase font-bold text-neutral-500 block">
            Progresión
          </span>
          <span
            className={`font-mono text-base font-black ${
              progressDiff >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {dataPoints.length > 1
              ? `${progressDiff >= 0 ? '+' : ''}${progressDiff} ${
                  chartMetric === 'reps' ? 'reps' : settings.weightUnit
                }`
              : '—'}
          </span>
        </div>
      </div>

      {/* SVG Interactive Line Chart */}
      <div className="relative w-full h-64 bg-neutral-950 border border-neutral-800/80 rounded-2xl p-2 flex items-center justify-center overflow-hidden">
        {dataPoints.length === 0 ? (
          <div className="text-center text-neutral-500 space-y-1 p-4">
            <TrendingUp className="w-8 h-8 mx-auto opacity-30 mb-1" />
            <p className="text-xs font-semibold">
              Sin datos de entrenamiento para este ejercicio
            </p>
            <p className="text-[11px] text-neutral-600">
              Inicia un entrenamiento y registra tus series para ver aquí la gráfica de progreso en tiempo real.
            </p>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full select-none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.33, 0.66, 1].map((pct) => {
              const y = paddingTop + chartInnerHeight * pct;
              const val = Math.round(effectiveMaxY - totalYSpan * pct);
              return (
                <g key={pct}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#262626"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 6}
                    y={y + 3}
                    fill="#737373"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Area under curve */}
            {areaD && <path d={areaD} fill="url(#chartGradient)" />}

            {/* Line curve */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Dots */}
            {points.map((pt, i) => (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIndex === i ? 7 : 4.5}
                  fill={hoveredIndex === i ? '#ffffff' : '#10b981'}
                  stroke="#09090b"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* X-axis date labels */}
                <text
                  x={pt.x}
                  y={height - 12}
                  fill={hoveredIndex === i ? '#10b981' : '#737373'}
                  fontSize="9"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  fontWeight={hoveredIndex === i ? 'bold' : 'normal'}
                >
                  {pt.data.formattedDate}
                </text>
              </g>
            ))}

            {/* Active Tooltip Popover */}
            {hoveredIndex !== null && points[hoveredIndex] && (
              <g
                transform={`translate(${points[hoveredIndex].x}, ${Math.max(
                  30,
                  points[hoveredIndex].y - 32
                )})`}
              >
                <rect
                  x="-45"
                  y="-22"
                  width="90"
                  height="26"
                  rx="6"
                  fill="#18181b"
                  stroke="#3f3f46"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-5"
                  fill="#10b981"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {points[hoveredIndex].value}{' '}
                  {chartMetric === 'reps' ? 'reps' : settings.weightUnit}
                </text>
              </g>
            )}
          </svg>
        )}
      </div>
    </div>
  );
};
