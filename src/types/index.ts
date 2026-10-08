export type MuscleGroup = 
  | 'Pecho' 
  | 'Espalda' 
  | 'Piernas' 
  | 'Hombros' 
  | 'Bíceps' 
  | 'Tríceps' 
  | 'Abdomen / Core' 
  | 'Glúteos' 
  | 'Antebrazos' 
  | 'Cardio' 
  | 'Cuerpo Completo';

export type ThemeType = 'emerald' | 'cyan' | 'crimson' | 'amber' | 'violet' | 'light';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  avatar?: string;
  weight?: number; // en kg o lb
  height?: number; // en cm
  fitnessGoal?: 'Hipertrofia' | 'Fuerza' | 'Definición' | 'Resistencia' | 'Salud General';
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  imageUrl?: string; // Data URL or Web URL
  targetSets: number;
  targetReps: string; // e.g. "8-12" or "10"
  restSeconds: number; // default rest between sets (e.g. 90)
  notes?: string;
  equipment?: string; // Mancuerna, Barra, Polea, Máquina, Peso corporal
}

export interface WorkoutDay {
  id: string;
  name: string; // e.g., "Día 1: Pecho y Tríceps"
  tag?: string; // e.g. "Lunes" o "Push"
  description?: string;
  exercises: Exercise[];
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  days: WorkoutDay[];
  createdAt: string;
  updatedAt: string;
  userId?: string; // Isolated per user
}

export interface WorkoutSetLog {
  id: string;
  setNumber: number;
  type: 'normal' | 'warmup' | 'dropset' | 'failure';
  weight: number; // in current weight unit
  reps: number;
  completed: boolean;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  imageUrl?: string;
  sets: WorkoutSetLog[];
}

export interface WorkoutSessionLog {
  id: string;
  userId?: string; // Isolated per user
  routineId?: string;
  dayId?: string;
  dayName: string;
  startTime: string; // ISO
  endTime?: string; // ISO
  durationSeconds: number;
  exercises: WorkoutExerciseLog[];
  totalVolume: number; // sum of (weight * reps)
  totalSetsCompleted: number;
  notes?: string;
}

export interface AppSettings {
  weightUnit: 'kg' | 'lb';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  defaultRestTime: number; // in seconds
  theme: ThemeType;
}
