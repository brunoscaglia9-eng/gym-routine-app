import { useState, useEffect } from 'react';
import type {
  Routine,
  WorkoutDay,
  Exercise,
  WorkoutSessionLog,
  AppSettings,
  User,
} from './types';
import {
  getRoutinesDB,
  saveRoutineDB,
  deleteRoutineDB,
  getExercisesDB,
  saveExerciseDB,
  deleteExerciseDB,
  getWorkoutHistoryDB,
  saveWorkoutSessionDB,
  deleteWorkoutSessionDB,
  getSettingsDB,
  saveSettingsDB,
  getCurrentUserDB,
  setCurrentUserDB,
  saveUserDB,
} from './utils/db';
import { applyTheme } from './utils/theme';
import { DEFAULT_EXERCISES, DEFAULT_ROUTINES } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { RoutineManager } from './components/RoutineManager';
import { ActiveWorkout } from './components/ActiveWorkout';
import { WorkoutPicker } from './components/WorkoutPicker';
import { WorkoutHistory } from './components/WorkoutHistory';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { ExerciseModal } from './components/ExerciseModal';
import { DayEditorModal } from './components/DayEditorModal';
import { ExerciseProgressModal } from './components/ExerciseProgressModal';
import { BackupModal } from './components/BackupModal';
import { ProgressCharts } from './components/ProgressCharts';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

export function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [activeRoutineId, setActiveRoutineId] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [historyLogs, setHistoryLogs] = useState<WorkoutSessionLog[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    weightUnit: 'kg',
    soundEnabled: true,
    vibrationEnabled: true,
    defaultRestTime: 90,
    theme: 'emerald',
  });

  const [currentTab, setCurrentTab] = useState<'routines' | 'workout' | 'history' | 'library' | 'charts'>('routines');
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<WorkoutDay | null>(null);

  // Modals state
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const [isDayEditorModalOpen, setIsDayEditorModalOpen] = useState(false);
  const [editingDay, setEditingDay] = useState<WorkoutDay | null>(null);

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressExercise, setProgressExercise] = useState<Exercise | null>(null);

  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Apply theme when settings change
  useEffect(() => {
    applyTheme(settings.theme || 'emerald');
  }, [settings.theme]);

  // Load data from IndexedDB on startup
  const loadAllData = async (activeUser?: User | null) => {
    try {
      const user = activeUser !== undefined ? activeUser : await getCurrentUserDB();
      setCurrentUser(user);

      let loadedRoutines = await getRoutinesDB(user?.id);
      let loadedExercises = await getExercisesDB();
      const loadedHistory = await getWorkoutHistoryDB(user?.id);
      const loadedSettings = await getSettingsDB();

      // If first launch, initialize with rich defaults
      if (loadedRoutines.length === 0) {
        for (const ex of DEFAULT_EXERCISES) {
          await saveExerciseDB(ex);
        }
        for (const r of DEFAULT_ROUTINES) {
          await saveRoutineDB(user ? { ...r, userId: user.id } : r);
        }
        loadedRoutines = DEFAULT_ROUTINES;
        loadedExercises = DEFAULT_EXERCISES;
      } else {
        // Automatically sync new default exercises into existing storage
        const existingMap = new Map(loadedExercises.map((e) => [e.id, e]));
        let hasNew = false;
        const mergedExercises = [...loadedExercises];

        for (const defaultEx of DEFAULT_EXERCISES) {
          const existing = existingMap.get(defaultEx.id);
          if (!existing) {
            await saveExerciseDB(defaultEx);
            mergedExercises.push(defaultEx);
            hasNew = true;
          } else if (!existing.imageUrl && defaultEx.imageUrl) {
            const updated = { ...existing, imageUrl: defaultEx.imageUrl };
            await saveExerciseDB(updated);
            const idx = mergedExercises.findIndex((e) => e.id === defaultEx.id);
            if (idx !== -1) mergedExercises[idx] = updated;
            hasNew = true;
          }
        }
        if (hasNew) {
          loadedExercises = mergedExercises;
        }
      }

      setRoutines(loadedRoutines);
      setActiveRoutineId(loadedRoutines[0]?.id || '');
      setExercises(loadedExercises);
      setHistoryLogs(loadedHistory);
      setSettings(loadedSettings);
      applyTheme(loadedSettings.theme || 'emerald');
    } catch (err) {
      console.error('Error loading initial data', err);
      setRoutines(DEFAULT_ROUTINES);
      setActiveRoutineId(DEFAULT_ROUTINES[0].id);
      setExercises(DEFAULT_EXERCISES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const currentRoutine = routines.find((r) => r.id === activeRoutineId) || routines[0] || null;

  // Handle Routine updates
  const handleSaveRoutine = async (updatedRoutine: Routine) => {
    const routineWithUser = currentUser ? { ...updatedRoutine, userId: currentUser.id } : updatedRoutine;
    const updated = routines.map((r) => (r.id === routineWithUser.id ? routineWithUser : r));
    setRoutines(updated);
    await saveRoutineDB(routineWithUser);
  };

  const handleCreateRoutine = async () => {
    const name = prompt('Nombre de la nueva rutina:', `Rutina ${routines.length + 1}`);
    if (!name?.trim()) return;

    const newRoutine: Routine = {
      id: `routine-${Date.now()}`,
      userId: currentUser?.id,
      name: name.trim(),
      description: 'Rutina personalizada dividida por días',
      days: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...routines, newRoutine];
    setRoutines(updated);
    setActiveRoutineId(newRoutine.id);
    await saveRoutineDB(newRoutine);
  };

  const handleDeleteRoutine = async (routineId: string) => {
    if (confirm('¿Seguro que deseas eliminar esta rutina completa?')) {
      const remaining = routines.filter((r) => r.id !== routineId);
      setRoutines(remaining);
      setActiveRoutineId(remaining[0]?.id || '');
      await deleteRoutineDB(routineId);
    }
  };

  // Handle Day operations
  const handleOpenDayEditor = (day?: WorkoutDay) => {
    setEditingDay(day || null);
    setIsDayEditorModalOpen(true);
  };

  const handleSaveDay = async (savedDay: WorkoutDay) => {
    if (!currentRoutine) return;

    let updatedDays: WorkoutDay[];
    const dayExists = currentRoutine.days.some((d) => d.id === savedDay.id);

    if (dayExists) {
      updatedDays = currentRoutine.days.map((d) => (d.id === savedDay.id ? savedDay : d));
    } else {
      updatedDays = [...currentRoutine.days, savedDay];
    }

    const updatedRoutine: Routine = {
      ...currentRoutine,
      days: updatedDays,
      updatedAt: new Date().toISOString(),
    };

    await handleSaveRoutine(updatedRoutine);
  };

  const handleDeleteDay = async (dayId: string) => {
    if (!currentRoutine) return;
    if (confirm('¿Eliminar este día de la rutina?')) {
      const updatedDays = currentRoutine.days.filter((d) => d.id !== dayId);
      const updatedRoutine: Routine = {
        ...currentRoutine,
        days: updatedDays,
        updatedAt: new Date().toISOString(),
      };
      await handleSaveRoutine(updatedRoutine);
    }
  };

  const handleDuplicateDay = async (dayToDup: WorkoutDay) => {
    if (!currentRoutine) return;
    const duplicatedDay: WorkoutDay = {
      ...dayToDup,
      id: `day-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${dayToDup.name} (Copia)`,
    };
    const updatedDays = [...currentRoutine.days, duplicatedDay];
    const updatedRoutine: Routine = {
      ...currentRoutine,
      days: updatedDays,
      updatedAt: new Date().toISOString(),
    };
    await handleSaveRoutine(updatedRoutine);
  };

  // Handle Exercise operations
  const handleOpenExerciseModal = (exercise?: Exercise) => {
    setEditingExercise(exercise || null);
    setIsExerciseModalOpen(true);
  };

  const handleSaveExercise = async (savedExercise: Exercise) => {
    const exists = exercises.some((e) => e.id === savedExercise.id);
    let updatedExercises: Exercise[];

    if (exists) {
      updatedExercises = exercises.map((e) => (e.id === savedExercise.id ? savedExercise : e));
    } else {
      updatedExercises = [savedExercise, ...exercises];
    }
    setExercises(updatedExercises);
    await saveExerciseDB(savedExercise);

    // Also update in routine days
    const updatedRoutines = routines.map((r) => {
      const newDays = r.days.map((d) => {
        const newExs = d.exercises.map((ex) => (ex.id === savedExercise.id ? savedExercise : ex));
        return { ...d, exercises: newExs };
      });
      return { ...r, days: newDays };
    });

    setRoutines(updatedRoutines);
    for (const r of updatedRoutines) {
      await saveRoutineDB(r);
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
    await deleteExerciseDB(exerciseId);

    const updatedRoutines = routines.map((r) => {
      const newDays = r.days.map((d) => ({
        ...d,
        exercises: d.exercises.filter((ex) => ex.id !== exerciseId),
      }));
      return { ...r, days: newDays };
    });

    setRoutines(updatedRoutines);
    for (const r of updatedRoutines) {
      await saveRoutineDB(r);
    }
  };

  const handleSyncDefaultExercises = async () => {
    const existingIds = new Set(exercises.map((e) => e.id));
    const toAdd = DEFAULT_EXERCISES.filter((e) => !existingIds.has(e.id));
    if (toAdd.length === 0) {
      alert('¡Tu biblioteca ya tiene todos los ejercicios predeterminados disponibles!');
      return;
    }
    for (const ex of toAdd) {
      await saveExerciseDB(ex);
    }
    setExercises((prev) => [...prev, ...toAdd]);
    alert(`Se agregaron ${toAdd.length} nuevos ejercicios a tu biblioteca.`);
  };

  // Workout Session Flow
  const handleStartWorkout = (day: WorkoutDay) => {
    setActiveWorkoutDay(day);
    setCurrentTab('workout');
  };

  const handleFinishWorkout = async (session: WorkoutSessionLog) => {
    const sessionWithUser: WorkoutSessionLog = {
      ...session,
      userId: currentUser?.id,
    };
    setHistoryLogs((prev) => [sessionWithUser, ...prev]);
    await saveWorkoutSessionDB(sessionWithUser);
    setActiveWorkoutDay(null);
    setCurrentTab('history');
  };

  const handleCancelWorkout = () => {
    if (confirm('¿Seguro que deseas descartar el entrenamiento actual sin guardar?')) {
      setActiveWorkoutDay(null);
      setCurrentTab('routines');
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    setHistoryLogs((prev) => prev.filter((s) => s.id !== sessionId));
    await deleteWorkoutSessionDB(sessionId);
  };

  const handleUpdateSettings = async (newSettings: AppSettings) => {
    setSettings(newSettings);
    await saveSettingsDB(newSettings);
  };

  const handleResetDefaults = async () => {
    for (const ex of DEFAULT_EXERCISES) {
      await saveExerciseDB(ex);
    }
    for (const r of DEFAULT_ROUTINES) {
      await saveRoutineDB(r);
    }
    await loadAllData(currentUser);
  };

  // User Auth Flow
  const handleLoginSuccess = async (user: User) => {
    setCurrentUser(user);
    await loadAllData(user);
  };

  const handleLogout = async () => {
    await setCurrentUserDB(null);
    setCurrentUser(null);
    await loadAllData(null);
  };

  const handleUpdateUser = async (updated: User) => {
    setCurrentUser(updated);
    await saveUserDB(updated);
    await setCurrentUserDB(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-neutral-400">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-sm font-semibold text-neutral-300">Cargando GymTrack...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        activeWorkoutDay={activeWorkoutDay}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-12">
        {/* Tab 1: Routines */}
        {currentTab === 'routines' && (
          <RoutineManager
            routines={routines}
            activeRoutineId={activeRoutineId}
            onSelectRoutine={setActiveRoutineId}
            onStartWorkout={handleStartWorkout}
            onEditDay={handleOpenDayEditor}
            onDeleteDay={handleDeleteDay}
            onDuplicateDay={handleDuplicateDay}
            onAddNewDay={() => handleOpenDayEditor()}
            onCreateRoutine={handleCreateRoutine}
            onDeleteRoutine={handleDeleteRoutine}
            onEditExercise={handleOpenExerciseModal}
          />
        )}

        {/* Tab 2: Live Workout */}
        {currentTab === 'workout' && (
          <>
            {activeWorkoutDay ? (
              <ActiveWorkout
                day={activeWorkoutDay}
                routineId={activeRoutineId}
                settings={settings}
                historyLogs={historyLogs}
                onFinishWorkout={handleFinishWorkout}
                onCancelWorkout={handleCancelWorkout}
                exerciseLibrary={exercises}
              />
            ) : (
              <WorkoutPicker
                routine={currentRoutine}
                onStartDay={handleStartWorkout}
                onGoToRoutines={() => setCurrentTab('routines')}
              />
            )}
          </>
        )}

        {/* Tab 3: Interactive Progress Charts */}
        {currentTab === 'charts' && (
          <ProgressCharts
            exercises={exercises}
            historyLogs={historyLogs}
            settings={settings}
          />
        )}

        {/* Tab 4: History & Personal Records */}
        {currentTab === 'history' && (
          <WorkoutHistory
            historyLogs={historyLogs}
            settings={settings}
            onDeleteSession={handleDeleteSession}
          />
        )}

        {/* Tab 5: Exercise Library */}
        {currentTab === 'library' && (
          <ExerciseLibrary
            exercises={exercises}
            onCreateExercise={() => handleOpenExerciseModal()}
            onEditExercise={handleOpenExerciseModal}
            onDeleteExercise={handleDeleteExercise}
            onSyncDefaults={handleSyncDefaultExercises}
            onSelectExerciseProgress={(ex) => {
              setProgressExercise(ex);
              setIsProgressModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Bottom Nav on Mobile */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        activeWorkoutDay={activeWorkoutDay}
      />

      {/* Modals */}
      <ExerciseModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onSave={handleSaveExercise}
        initialExercise={editingExercise}
      />

      <DayEditorModal
        isOpen={isDayEditorModalOpen}
        onClose={() => setIsDayEditorModalOpen(false)}
        onSave={handleSaveDay}
        initialDay={editingDay}
        exerciseLibrary={exercises}
        onCreateNewExercise={() => {
          setIsDayEditorModalOpen(false);
          handleOpenExerciseModal();
        }}
      />

      <ExerciseProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        exercise={progressExercise}
        historyLogs={historyLogs}
        settings={settings}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataChanged={loadAllData}
        onResetDefaults={handleResetDefaults}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}

export default App;
