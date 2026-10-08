import { useState } from 'react';
import {
  X,
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { User } from '../types';
import { getUsersDB, saveUserDB, setCurrentUserDB } from '../utils/db';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const AVATAR_OPTIONS = ['💪', '🦁', '⚡', '🔥', '🦍', '🏋️', '🥊', '🏆'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState('💪');
  const [fitnessGoal, setFitnessGoal] = useState<User['fitnessGoal']>('Hipertrofia');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const allUsers = await getUsersDB();

      if (mode === 'register') {
        if (!name.trim()) {
          setError('El nombre o apodo es obligatorio.');
          return;
        }

        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          return;
        }

        const existing = allUsers.find((u) => u.email.toLowerCase() === trimmedEmail);
        if (existing) {
          setError('Ya existe una cuenta con este correo. Inicia sesión en su lugar.');
          return;
        }

        const newUser: User = {
          id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: name.trim(),
          email: trimmedEmail,
          passwordHash: password, // client hashed/stored
          avatar,
          fitnessGoal,
          weight: weight ? parseFloat(weight) : undefined,
          height: height ? parseFloat(height) : undefined,
          createdAt: new Date().toISOString(),
        };

        await saveUserDB(newUser);
        await setCurrentUserDB(newUser);
        setSuccessMsg('¡Cuenta creada con éxito!');
        setTimeout(() => {
          onLoginSuccess(newUser);
          onClose();
        }, 600);
      } else {
        // Login mode
        const found = allUsers.find(
          (u) => u.email.toLowerCase() === trimmedEmail && u.passwordHash === password
        );

        if (!found) {
          setError('Correo o contraseña incorrectos.');
          return;
        }

        await setCurrentUserDB(found);
        setSuccessMsg(`¡Bienvenido de vuelta, ${found.name}!`);
        setTimeout(() => {
          onLoginSuccess(found);
          onClose();
        }, 500);
      }
    } catch (err) {
      setError('Ocurrió un error al procesar la autenticación.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-neutral-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/10">
            <Dumbbell className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-100">
            {mode === 'register' ? 'Crea tu Cuenta de Atleta' : 'Iniciar Sesión en GymTrack'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {mode === 'register'
              ? 'Guarda tus rutinas, pesos y fotos de forma segura en la nube o en tu móvil'
              : 'Accede a tus rutinas y récords personales desde cualquier lugar'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-neutral-950 rounded-2xl mb-5 border border-neutral-800">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Crear Cuenta
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Iniciar Sesión
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              {/* Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre o Apodo *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej: Bruno, Spartan, etc."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Elige tu Avatar
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {AVATAR_OPTIONS.map((icon) => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setAvatar(icon)}
                      className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-all ${
                        avatar === icon
                          ? 'bg-emerald-500/20 border-2 border-emerald-500 scale-105'
                          : 'bg-neutral-950 border border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="ejemplo@gym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Contraseña *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <>
              {/* Confirm Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Goal & Weight */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Meta Principal
                  </label>
                  <select
                    value={fitnessGoal}
                    onChange={(e) =>
                      setFitnessGoal(e.target.value as User['fitnessGoal'])
                    }
                    className="w-full px-2.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Fuerza">Fuerza</option>
                    <option value="Definición">Definición</option>
                    <option value="Resistencia">Resistencia</option>
                    <option value="Salud General">Salud General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Peso ({weight ? `${weight}kg` : 'kg/lb'})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Estatura (cm) - Opcional
                </label>
                <input
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            {mode === 'register' ? (
              <>
                <Sparkles className="w-4 h-4" /> Registrar Cuenta
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" /> Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* Offline / Guest Mode */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-neutral-200 font-medium"
          >
            Continuar en modo local / sin cuenta
          </button>
        </div>
      </div>
    </div>
  );
};
