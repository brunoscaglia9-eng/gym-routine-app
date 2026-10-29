import type { Exercise, Routine } from '../types';
import { EXERCISE_IMAGES } from './exercisePresets';

export const DEFAULT_EXERCISES: Exercise[] = [
  // --- PECHO ---
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
    id: 'ex-chest-fly',
    name: 'Cruce de Poleas para Pecho',
    muscleGroup: 'Pecho',
    imageUrl: EXERCISE_IMAGES.chest_fly,
    targetSets: 3,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Codos ligeramente flexionados, apretar fuertemente en el punto de máxima contracción.',
    equipment: 'Polea',
  },
  {
    id: 'ex-chest-dips',
    name: 'Fondos en Paralelas (Dips)',
    muscleGroup: 'Pecho',
    imageUrl: EXERCISE_IMAGES.chest_dips,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Inclinar ligeramente el torso hacia adelante para focalizar pectoral inferior.',
    equipment: 'Peso corporal',
  },
  {
    id: 'ex-pushups',
    name: 'Flexiones de Pecho (Push-ups)',
    muscleGroup: 'Pecho',
    imageUrl: EXERCISE_IMAGES.pushups,
    targetSets: 3,
    targetReps: '15-20',
    restSeconds: 60,
    notes: 'Cuerpo en línea recta, activar core y bajar hasta rozar el suelo.',
    equipment: 'Peso corporal',
  },

  // --- ESPALDA ---
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
    name: 'Dominadas Pronas',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.pullups,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Rango de movimiento completo, pecho hacia la barra.',
    equipment: 'Peso corporal',
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Jalón al Pecho en Polea',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.lat_pulldown,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 75,
    notes: 'Traccionar con los codos hacia abajo, no balancear el torso.',
    equipment: 'Polea',
  },
  {
    id: 'ex-barbell-row',
    name: 'Remo con Barra',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.barbell_row,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Espalda a 45 grados, tirar los codos hacia atrás y apretar escápulas.',
    equipment: 'Barra',
  },
  {
    id: 'ex-seated-row',
    name: 'Remo Gironda en Polea Baja',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.seated_row,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 75,
    notes: 'Espalda erguida, llevar el agarre hacia el abdomen bajo.',
    equipment: 'Polea',
  },
  {
    id: 'ex-dumbbell-row',
    name: 'Remo con Mancuerna a una Mano',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.dumbbell_row,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Apoyo en banco, tirar del codo hacia la cadera en arco.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-face-pull',
    name: 'Face Pull con Cuerda',
    muscleGroup: 'Espalda',
    imageUrl: EXERCISE_IMAGES.face_pull,
    targetSets: 4,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Llevar la cuerda hacia la frente rotando externamente los hombros.',
    equipment: 'Polea',
  },

  // --- PIERNAS ---
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
    id: 'ex-leg-press',
    name: 'Prensa de Piernas 45°',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.leg_press,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 90,
    notes: 'No bloquear rodillas arriba, bajar controlado con buena profundidad.',
    equipment: 'Máquina',
  },
  {
    id: 'ex-bulgarian-split-squat',
    name: 'Sentadilla Búlgara con Mancuernas',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.bulgarian_split_squat,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 90,
    notes: 'Pie trasero en banco, tronco con leve inclinación al frente para glúteo.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-leg-extension',
    name: 'Extensión de Cuádriceps',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.leg_extension,
    targetSets: 4,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Pausa de 1 segundo arriba, bajar lento en 2-3 segundos.',
    equipment: 'Máquina',
  },
  {
    id: 'ex-leg-curl',
    name: 'Curl Femoral en Máquina',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.leg_curl,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Contracción sostenida de isquios sin levantar la pelvis del banco.',
    equipment: 'Máquina',
  },
  {
    id: 'ex-romanian-deadlift',
    name: 'Peso Muerto Rumano (RDL)',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.romanian_deadlift,
    targetSets: 4,
    targetReps: '8-10',
    restSeconds: 90,
    notes: 'Bisagra pura de cadera hacia atrás con rodillas semiflexionadas.',
    equipment: 'Barra',
  },
  {
    id: 'ex-calf-raises',
    name: 'Elevación de Gemelos',
    muscleGroup: 'Piernas',
    imageUrl: EXERCISE_IMAGES.calf_raises,
    targetSets: 4,
    targetReps: '15-20',
    restSeconds: 45,
    notes: 'Estirar bien abajo y mantener arriba 2 segundos en contracción.',
    equipment: 'Máquina',
  },

  // --- GLÚTEOS ---
  {
    id: 'ex-hip-thrust',
    name: 'Hip Thrust con Barra',
    muscleGroup: 'Glúteos',
    imageUrl: EXERCISE_IMAGES.hip_thrust,
    targetSets: 4,
    targetReps: '8-12',
    restSeconds: 90,
    notes: 'Apoyo escápulas en banco, empuje de cadera y bloqueo glúteo arriba.',
    equipment: 'Barra',
  },

  // --- HOMBROS ---
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
    id: 'ex-arnold-press',
    name: 'Press Arnold con Mancuernas',
    muscleGroup: 'Hombros',
    imageUrl: EXERCISE_IMAGES.arnold_press,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 75,
    notes: 'Rotación fluida de muñecas durante todo el rango de movimiento.',
    equipment: 'Mancuerna',
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
    id: 'ex-rear-delt-fly',
    name: 'Pájaros para Deltoides Posterior',
    muscleGroup: 'Hombros',
    imageUrl: EXERCISE_IMAGES.rear_delt_fly,
    targetSets: 4,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Torso inclinado a 45 grados, guiar el movimiento con los codos.',
    equipment: 'Mancuerna',
  },

  // --- BÍCEPS ---
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
    id: 'ex-hammer-curl',
    name: 'Curl Martillo',
    muscleGroup: 'Bíceps',
    imageUrl: EXERCISE_IMAGES.hammer_curl,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Agarre neutro continuo, gran trabajo de braquial y antebrazo.',
    equipment: 'Mancuerna',
  },
  {
    id: 'ex-preacher-curl',
    name: 'Curl Predicador en Banco Scott',
    muscleGroup: 'Bíceps',
    imageUrl: EXERCISE_IMAGES.preacher_curl,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Aislamiento total, evitar despegar los codos de la almohadilla.',
    equipment: 'Barra',
  },

  // --- TRÍCEPS ---
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
    id: 'ex-skullcrushers',
    name: 'Press Francés con Barra Z',
    muscleGroup: 'Tríceps',
    imageUrl: EXERCISE_IMAGES.skullcrushers,
    targetSets: 4,
    targetReps: '10-12',
    restSeconds: 75,
    notes: 'Bajar hacia la frente manteniendo los codos fijos y paralelos.',
    equipment: 'Barra',
  },
  {
    id: 'ex-overhead-cable-extension',
    name: 'Extensión Trasnuca en Polea',
    muscleGroup: 'Tríceps',
    imageUrl: EXERCISE_IMAGES.overhead_triceps,
    targetSets: 3,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Énfasis en la cabeza larga del tríceps, abrir la cuerda al final.',
    equipment: 'Polea',
  },

  // --- ABDOMEN / CORE ---
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
  {
    id: 'ex-hanging-leg-raise',
    name: 'Elevación de Piernas Colgado',
    muscleGroup: 'Abdomen / Core',
    imageUrl: EXERCISE_IMAGES.hanging_leg_raise,
    targetSets: 3,
    targetReps: '12-15',
    restSeconds: 60,
    notes: 'Flexionar la pelvis hacia el pecho sin balanceos con inercia.',
    equipment: 'Peso corporal',
  },
  {
    id: 'ex-cable-crunch',
    name: 'Crunch Abdominal en Polea',
    muscleGroup: 'Abdomen / Core',
    imageUrl: EXERCISE_IMAGES.cable_crunch,
    targetSets: 4,
    targetReps: '15-20',
    restSeconds: 45,
    notes: 'De rodillas, enrollar la columna contrayendo el recto abdominal.',
    equipment: 'Polea',
  },
  {
    id: 'ex-ab-wheel',
    name: 'Rueda Abdominal (Ab Wheel)',
    muscleGroup: 'Abdomen / Core',
    imageUrl: EXERCISE_IMAGES.ab_wheel,
    targetSets: 3,
    targetReps: '10-12',
    restSeconds: 60,
    notes: 'Deslizar hacia adelante manteniendo retroversión pélvica.',
    equipment: 'Peso corporal',
  },

  // --- ANTEBRAZOS ---
  {
    id: 'ex-wrist-curl',
    name: 'Curl de Muñeca con Barra',
    muscleGroup: 'Antebrazos',
    imageUrl: EXERCISE_IMAGES.wrist_curl,
    targetSets: 3,
    targetReps: '15-20',
    restSeconds: 45,
    notes: 'Antebrazos apoyados en banco o muslos, rango completo de muñeca.',
    equipment: 'Barra',
  },

  // --- CARDIO & FULL BODY ---
  {
    id: 'ex-treadmill',
    name: 'Cinta de Correr / Cardio',
    muscleGroup: 'Cardio',
    imageUrl: EXERCISE_IMAGES.treadmill,
    targetSets: 1,
    targetReps: '20-30 min',
    restSeconds: 60,
    notes: 'Cardio a ritmo constante o intervalos con inclinación moderada.',
    equipment: 'Máquina',
  },
  {
    id: 'ex-kettlebell-swing',
    name: 'Kettlebell Swing (Balanceo)',
    muscleGroup: 'Cuerpo Completo',
    imageUrl: EXERCISE_IMAGES.kettlebell_swing,
    targetSets: 4,
    targetReps: '15-20',
    restSeconds: 60,
    notes: 'Potente extensión de cadera proyectando el kettlebell hacia adelante.',
    equipment: 'Kettlebell',
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
          DEFAULT_EXERCISES[2], // Cruce Poleas
          DEFAULT_EXERCISES[20], // Shoulder Press
          DEFAULT_EXERCISES[22], // Lateral Raises
          DEFAULT_EXERCISES[27], // Triceps Pushdown
        ],
      },
      {
        id: 'day-2',
        name: 'Día 2: Tirón (Espalda y Bíceps)',
        tag: 'Pull',
        description: 'Énfasis en dorsales, trapecios, romboides y flexores de codo.',
        exercises: [
          DEFAULT_EXERCISES[6], // Dominadas
          DEFAULT_EXERCISES[7], // Jalón al pecho
          DEFAULT_EXERCISES[8], // Remo con barra
          DEFAULT_EXERCISES[5], // Peso muerto
          DEFAULT_EXERCISES[11], // Face pull
          DEFAULT_EXERCISES[24], // Biceps Curl
          DEFAULT_EXERCISES[25], // Hammer Curl
        ],
      },
      {
        id: 'day-3',
        name: 'Día 3: Piernas y Glúteos',
        tag: 'Legs',
        description: 'Trabajo completo de tren inferior, glúteos y estabilidad de core.',
        exercises: [
          DEFAULT_EXERCISES[12], // Squat
          DEFAULT_EXERCISES[19], // Hip Thrust
          DEFAULT_EXERCISES[13], // Prensa
          DEFAULT_EXERCISES[17], // Peso Muerto Rumano
          DEFAULT_EXERCISES[15], // Extensión de Cuádriceps
          DEFAULT_EXERCISES[18], // Gemelos
          DEFAULT_EXERCISES[30], // Plancha
        ],
      },
      {
        id: 'day-4',
        name: 'Día 4: Torso, Brazos & Core',
        tag: 'Upper',
        description: 'Sesión complementaria de volumen para torso completo, brazos y abdomen.',
        exercises: [
          DEFAULT_EXERCISES[1], // Incline Press
          DEFAULT_EXERCISES[9], // Remo Gironda
          DEFAULT_EXERCISES[21], // Arnold Press
          DEFAULT_EXERCISES[26], // Preacher Curl
          DEFAULT_EXERCISES[28], // Skullcrushers
          DEFAULT_EXERCISES[31], // Hanging Leg Raise
        ],
      },
    ],
  },
];
