import type { ThemeType } from '../types';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  bg: string;
  card: string;
  subcard: string;
  border: string;
  borderHover: string;
  text: string;
  textMuted: string;
  textSecondary: string;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  badge: string;
  primaryColor: string;
  bgHex: string;
  cardHex: string;
  colors: ThemeColors;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'emerald',
    name: 'Neon Emerald',
    badge: 'Verde Neón (Clásico)',
    primaryColor: '#10b981',
    bgHex: '#09090b',
    cardHex: '#18181b',
    colors: {
      primary: '#10b981',
      primaryHover: '#34d399',
      primaryLight: '#6ee7b7',
      accent: '#06b6d4',
      bg: '#09090b',
      card: '#18181b',
      subcard: '#121215',
      border: '#27272a',
      borderHover: '#3f3f46',
      text: '#f4f4f5',
      textMuted: '#a1a1aa',
      textSecondary: '#d4d4d8',
    },
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    badge: 'Cian & Azul Eléctrico',
    primaryColor: '#06b6d4',
    bgHex: '#040911',
    cardHex: '#0c1726',
    colors: {
      primary: '#06b6d4',
      primaryHover: '#22d3ee',
      primaryLight: '#67e8f9',
      accent: '#3b82f6',
      bg: '#040911',
      card: '#0c1726',
      subcard: '#08101c',
      border: '#1a2a40',
      borderHover: '#2a3f5f',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      textSecondary: '#cbd5e1',
    },
  },
  {
    id: 'crimson',
    name: 'Iron Crimson',
    badge: 'Rojo Furia / Carbón',
    primaryColor: '#ef4444',
    bgHex: '#120709',
    cardHex: '#1f0d11',
    colors: {
      primary: '#ef4444',
      primaryHover: '#f87171',
      primaryLight: '#fca5a5',
      accent: '#f97316',
      bg: '#120709',
      card: '#1f0d11',
      subcard: '#17090c',
      border: '#3b1820',
      borderHover: '#57222c',
      text: '#fff1f2',
      textMuted: '#fda4af',
      textSecondary: '#fecdd3',
    },
  },
  {
    id: 'amber',
    name: 'Gold Champion',
    badge: 'Dorado / Ámbar',
    primaryColor: '#f59e0b',
    bgHex: '#120e06',
    cardHex: '#211808',
    colors: {
      primary: '#f59e0b',
      primaryHover: '#fbbf24',
      primaryLight: '#fde047',
      accent: '#eab308',
      bg: '#120e06',
      card: '#211808',
      subcard: '#171206',
      border: '#3d2f11',
      borderHover: '#59441a',
      text: '#fefce8',
      textMuted: '#fde047',
      textSecondary: '#fef08a',
    },
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    badge: 'Violeta Neón',
    primaryColor: '#a855f7',
    bgHex: '#0e0818',
    cardHex: '#1a102b',
    colors: {
      primary: '#a855f7',
      primaryHover: '#c084fc',
      primaryLight: '#d8b4fe',
      accent: '#ec4899',
      bg: '#0e0818',
      card: '#1a102b',
      subcard: '#130b21',
      border: '#331f54',
      borderHover: '#4d2f7d',
      text: '#faf5ff',
      textMuted: '#d8b4fe',
      textSecondary: '#e9d5ff',
    },
  },
  {
    id: 'light',
    name: 'Daylight High-Vis',
    badge: 'Modo Claro Deportivo',
    primaryColor: '#0284c7',
    bgHex: '#f1f5f9',
    cardHex: '#ffffff',
    colors: {
      primary: '#0284c7',
      primaryHover: '#0369a1',
      primaryLight: '#38bdf8',
      accent: '#0284c7',
      bg: '#f1f5f9',
      card: '#ffffff',
      subcard: '#f8fafc',
      border: '#e2e8f0',
      borderHover: '#cbd5e1',
      text: '#0f172a',
      textMuted: '#64748b',
      textSecondary: '#334155',
    },
  },
];

export function applyTheme(theme: ThemeType): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const selected = THEMES.find((t) => t.id === theme) || THEMES[0];
  const c = selected.colors;

  root.setAttribute('data-theme', theme);

  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }

  // 1. Direct Tailwind v4 variable mapping for emerald and neutral palettes
  root.style.setProperty('--color-emerald-500', c.primary);
  root.style.setProperty('--color-emerald-400', c.primaryHover);
  root.style.setProperty('--color-emerald-300', c.primaryLight);
  root.style.setProperty('--color-emerald-600', c.primary);
  root.style.setProperty('--color-cyan-400', c.accent);
  root.style.setProperty('--color-cyan-500', c.primary);

  // Backgrounds & Surface Cards
  root.style.setProperty('--color-neutral-950', c.bg);
  root.style.setProperty('--color-neutral-900', c.card);
  root.style.setProperty('--color-neutral-850', c.subcard);
  root.style.setProperty('--color-neutral-800', c.border);
  root.style.setProperty('--color-neutral-700', c.borderHover);

  // Texts
  root.style.setProperty('--color-neutral-100', c.text);
  root.style.setProperty('--color-neutral-200', c.textSecondary);
  root.style.setProperty('--color-neutral-300', c.textSecondary);
  root.style.setProperty('--color-neutral-400', c.textMuted);
  root.style.setProperty('--color-neutral-500', c.textMuted);

  // Body inline styling
  document.body.style.backgroundColor = c.bg;
  document.body.style.color = c.text;
}
