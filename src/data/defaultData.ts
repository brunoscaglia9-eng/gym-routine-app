import type { Exercise, Routine } from '../types';
import { EXERCISE_IMAGES } from './exercisePresets';

export const DEFAULT_EXERCISES: Exercise[] = [
  {
    id: 'ex-bench-press',
    name: 'Press de Banca Plano',
    muscleGroup: 'Pecho',
    imageUrl: EXERCISE_IMAGES.bench_press,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Retracción escapular, bajar la barra al esternón con control.',
    equipment: 'Barra',
  },
  {
    id: 'ex-incline-press',
    name: 'Press Inclinado con Mancuernas',
    muscleGroup: 'Pecho',
    imageUrl: EXERCISE_IMAGES.incline_press,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 90,
    notes: 'Inclinación de banco a 30 grados para enfocar el haz clavicular.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-squat',
    name: 'Sentadilla con Barra',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.squat,
    targetSets: 4,
    targetReps: '6-8',
    restSeconds: 120,
    notes: 'Romper el paralelo, rodillas alineadas con la punta de los pies.',
    equipment: 'Barra',
  },
  {
    id: 'ex-deadlift',
    name: 'Peso Muerto Convencional',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.deadlift,
    targetSets: 3,
    targetReps: '6-8',
    restSeconds: 120,
    notes: 'Mantener columna neutra, activar dorsal y empujar el suelo.',
    equipment: 'Barra',
  },
  {
    id: 'ex-pullups',
    name: 'Dominadas / Jalón al Pecho',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.pullups,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Rango de movimiento completo, pecho hacia la barra.',
    equipment: 'Peso corporal',
  },
  {
    id: 'ex-barbell-row',
    name: 'Remo con Barra',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.barbell_row,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Espalda a 45 grados, tirar los codos hacia atrás.',
    equipment: 'Barra',
  },
  {
    id: 'ex-shoulder-press',
    name: 'Press Militar de Hombros',
    muscleGroup: 'Hombros',
    imageUrl: EXERCISE_IMAGES.shoulder_press,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Glúteos y core firmes, no arquear la zona lumbar.',
    equipment: 'Barra',
  },
  {
    id: 'ex-lateral-raises',
    name: 'Elevaciones Laterales',
    muscleGroup: 'Hombros',
    imageUrl: EXERCISE_IMAGES.lateral_raises,
    targetSets: 4,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Codos ligeramente flexionados, levantar en el plano escapular.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-biceps-curl',
    name: 'Curl de Bíceps con Mancuernas',
    muscleGroup: 'Bíceps',
    imageUrl: EXERCISE_IMAGES.biceps_curl,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Supinación al subir, sin balanceo de hombros.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-triceps-pushdown',
    name: 'Extensión de Tríceps en Polea',
    muscleGroup: 'Tríceps',
    imageUrl: EXERCISE_IMAGES.triceps_pushdown,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Codos pegados al torso, extensión total abajo.',
    equipment: 'Polea',
  },
  {
    id: 'ex-leg-press',
    name: 'Prensa de Piernas 45°',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.leg_press,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 90,
    notes: 'No bloquear rodillas arriba, bajar controlado.',
    equipment: 'Máquina',
  },
  {
    id: 'ex-abs-plank',
    name: 'Plancha Abdominal',
    muscleGroup: 'Abdomen / Core',
    imageUrl: EXERCISE_IMAGES.abs_plank,
    targetSets: 3,
    targetReps: '45-60s',
    restSeconds: 60,
    notes: 'Contracción isométrica activa de glúteos y abdomen.',
    equipment: 'Peso corporal',
  },
];

export const DEFAULT_ROUTINES: Routine[] = [
  {
    id: 'routine-standard-split',
    name: 'Rutina Frecuencia 2 / 4 Días',
    description: 'División clásica Push - Pull - Legs - Torso para hipertrofia y fuerza.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    days: [
      {
        id: 'day-1',
        name: 'Día 1: Empuje (Pecho, Hombro, Tríceps)',
        tag: 'Push',
        description: 'Énfasis en pectoral, deltoides anterior/lateral y tríceps.',
        exercises: [
          DEFAULT_EXERCISES[0], // Press Banca
          DEFAULT_EXERCISES[1], // Incline Press
          DEFAULT_EXERCISES[6], // Shoulder Press
          DEFAULT_EXERCISES[7], // Lateral Raises
          DEFAULT_EXERCISES[9], // Triceps Pushdown
        ],
      },
      {
        id: 'day-2',
        name: 'Día 2: Tirón (Espalda y Bíceps)',
        tag: 'Pull',
        description: 'Énfasis en dorsales, trapecios, romboides y flexores de codo.',
        exercises: [
          DEFAULT_EXERCISES[4], // Pullups
          DEFAULT_EXERCISES[5], // Barbell Row
          DEFAULT_EXERCISES[3], // Deadlift
          DEFAULT_EXERCISES[8], // Biceps Curl
        ],
      },
      {
        id: 'day-3',
        name: 'Día 3: Piernas y Abdomen',
        tag: 'Legs',
        description: 'Trabajo completo de tren inferior y estabilidad del core.',
        exercises: [
          DEFAULT_EXERCISES[2], // Squat
          DEFAULT_EXERCISES[10], // Leg Press
          DEFAULT_EXERCISES[11], // Plank
        ],
      },
      {
        id: 'day-4',
        name: 'Día 4: Torso & Brazos',
        tag: 'Upper',
        description: 'Sesión complementaria de volumen para torso completo y brazos.',
        exercises: [
          DEFAULT_EXERCISES[1], // Incline Press
          DEFAULT_EXERCISES[4], // Pullups
          DEFAULT_EXERCISES[7], // Lateral Raises
          DEFAULT_EXERCISES[8], // Biceps Curl
          DEFAULT_EXERCISES[9], // Triceps Pushdown
        ],
      },
    ],
  },
];
