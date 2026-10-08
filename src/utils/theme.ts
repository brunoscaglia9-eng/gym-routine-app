import type { ThemeType } from '../types';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  badge: string;
  primaryColor: string;
  bgHex: string;
  cardHex: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'emerald',
    name: 'Neon Emerald',
    badge: 'Verde Neón (Clásico)',
    primaryColor: '#10b981',
    bgHex: '#09090b',
    cardHex: '#18181b',
  },
  {
    id: 'cyan',
    name: 'Electric Cyan',
    badge: 'Cian & Azul',
    primaryColor: '#06b6d4',
    bgHex: '#050c14',
    cardHex: '#0c1726',
  },
  {
    id: 'crimson',
    name: 'Iron Crimson',
    badge: 'Rojo Furia',
    primaryColor: '#ef4444',
    bgHex: '#120709',
    cardHex: '#1f0d11',
  },
  {
    id: 'amber',
    name: 'Gold Champion',
    badge: 'Dorado / Ámbar',
    primaryColor: '#f59e0b',
    bgHex: '#120e06',
    cardHex: '#211808',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    badge: 'Violeta Neón',
    primaryColor: '#a855f7',
    bgHex: '#0e0818',
    cardHex: '#1a102b',
  },
  {
    id: 'light',
    name: 'Daylight High-Vis',
    badge: 'Modo Claro Deportivo',
    primaryColor: '#0284c7',
    bgHex: '#f8fafc',
    cardHex: '#ffffff',
  },
];

export function applyTheme(theme: ThemeType): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.setAttribute('data-theme', theme);

  if (theme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    document.body.style.backgroundColor = '#f8fafc';
    document.body.style.color = '#0f172a';
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    const selected = THEMES.find((t) => t.id === theme) || THEMES[0];
    document.body.style.backgroundColor = selected.bgHex;
    document.body.style.color = '#f3f4f6';
  }
}
