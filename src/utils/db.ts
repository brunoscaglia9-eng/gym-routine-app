import type { Routine, Exercise, WorkoutSessionLog, AppSettings, User } from '../types';

const DB_NAME = 'GymTrackerDB';
const DB_VERSION = 2;

const STORES = {
  ROUTINES: 'routines',
  EXERCISES: 'exercises',
  HISTORY: 'history',
  SETTINGS: 'settings',
  IMAGES: 'images',
  USERS: 'users',
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORES.ROUTINES)) {
        db.createObjectStore(STORES.ROUTINES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.EXERCISES)) {
        db.createObjectStore(STORES.EXERCISES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.HISTORY)) {
        db.createObjectStore(STORES.HISTORY, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(STORES.IMAGES)) {
        db.createObjectStore(STORES.IMAGES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORES.USERS)) {
        db.createObjectStore(STORES.USERS, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generic IndexedDB helpers
async function getAllFromStore<T>(storeName: string): Promise<T[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`Error getting all from ${storeName}, falling back to localStorage`, err);
    const item = localStorage.getItem(`gym_${storeName}`);
    return item ? JSON.parse(item) : [];
  }
}

async function putInStore<T>(storeName: string, item: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`Error putting into ${storeName}`, err);
  }
}

async function deleteFromStore(storeName: string, key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`Error deleting from ${storeName}`, err);
  }
}

async function clearStore(storeName: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`Error clearing ${storeName}`, err);
  }
}

// User Authentication & Management
export async function getUsersDB(): Promise<User[]> {
  return getAllFromStore<User>(STORES.USERS);
}

export async function saveUserDB(user: User): Promise<void> {
  await putInStore(STORES.USERS, user);
}

export async function getCurrentUserDB(): Promise<User | null> {
  try {
    const stored = localStorage.getItem('gym_active_user');
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export async function setCurrentUserDB(user: User | null): Promise<void> {
  if (user) {
    localStorage.setItem('gym_active_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('gym_active_user');
  }
}

// App Specific Database Operations
export async function getRoutinesDB(userId?: string): Promise<Routine[]> {
  const all = await getAllFromStore<Routine>(STORES.ROUTINES);
  if (!userId) return all;
  const userRoutines = all.filter((r) => !r.userId || r.userId === userId);
  return userRoutines.length > 0 ? userRoutines : all;
}

export async function saveRoutineDB(routine: Routine): Promise<void> {
  await putInStore(STORES.ROUTINES, routine);
}

export async function deleteRoutineDB(id: string): Promise<void> {
  await deleteFromStore(STORES.ROUTINES, id);
}

export async function getExercisesDB(): Promise<Exercise[]> {
  return getAllFromStore<Exercise>(STORES.EXERCISES);
}

export async function saveExerciseDB(exercise: Exercise): Promise<void> {
  await putInStore(STORES.EXERCISES, exercise);
}

export async function deleteExerciseDB(id: string): Promise<void> {
  await deleteFromStore(STORES.EXERCISES, id);
}

export async function getWorkoutHistoryDB(userId?: string): Promise<WorkoutSessionLog[]> {
  const history = await getAllFromStore<WorkoutSessionLog>(STORES.HISTORY);
  const filtered = userId ? history.filter((h) => !h.userId || h.userId === userId) : history;
  // Sort descending by startTime
  return filtered.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
}

export async function saveWorkoutSessionDB(session: WorkoutSessionLog): Promise<void> {
  await putInStore(STORES.HISTORY, session);
}

export async function deleteWorkoutSessionDB(id: string): Promise<void> {
  await deleteFromStore(STORES.HISTORY, id);
}

export async function getSettingsDB(): Promise<AppSettings> {
  const defaults: AppSettings = {
    weightUnit: 'kg',
    soundEnabled: true,
    vibrationEnabled: true,
    defaultRestTime: 90,
    theme: 'emerald',
  };
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.SETTINGS, 'readonly');
      const store = tx.objectStore(STORES.SETTINGS);
      const req = store.get('app_settings');
      req.onsuccess = () => {
        resolve(req.result ? { ...defaults, ...req.result.value } : defaults);
      };
      req.onerror = () => resolve(defaults);
    });
  } catch {
    const local = localStorage.getItem('gym_settings');
    return local ? JSON.parse(local) : defaults;
  }
}

export async function saveSettingsDB(settings: AppSettings): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORES.SETTINGS, 'readwrite');
      const store = tx.objectStore(STORES.SETTINGS);
      const req = store.put({ key: 'app_settings', value: settings });
      req.onsuccess = () => {
        localStorage.setItem('gym_settings', JSON.stringify(settings));
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    localStorage.setItem('gym_settings', JSON.stringify(settings));
  }
}

// Export / Import all data
export async function exportAllDataJSON(): Promise<string> {
  const routines = await getAllFromStore<Routine>(STORES.ROUTINES);
  const exercises = await getExercisesDB();
  const history = await getWorkoutHistoryDB();
  const settings = await getSettingsDB();
  const users = await getUsersDB();

  const backup = {
    version: 2,
    exportedAt: new Date().toISOString(),
    users,
    routines,
    exercises,
    history,
    settings,
  };

  return JSON.stringify(backup, null, 2);
}

export async function importDataJSON(jsonString: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonString);
    if (!data.routines || !data.exercises) {
      throw new Error('Formato de respaldo inválido');
    }

    await clearStore(STORES.ROUTINES);
    await clearStore(STORES.EXERCISES);
    await clearStore(STORES.HISTORY);

    for (const r of data.routines) {
      await putInStore(STORES.ROUTINES, r);
    }
    for (const e of data.exercises) {
      await putInStore(STORES.EXERCISES, e);
    }
    if (Array.isArray(data.history)) {
      for (const h of data.history) {
        await putInStore(STORES.HISTORY, h);
      }
    }
    if (Array.isArray(data.users)) {
      for (const u of data.users) {
        await putInStore(STORES.USERS, u);
      }
    }
    if (data.settings) {
      await saveSettingsDB(data.settings);
    }
    return true;
  } catch (err) {
    console.error('Import error', err);
    return false;
  }
}
