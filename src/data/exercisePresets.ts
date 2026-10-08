// SVG Data URIs for pre-built exercise illustrations with highlighted muscle anatomy

function createSvgDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

export const EXERCISE_IMAGES: Record<string, string> = {
  bench_press: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="chestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Bench -->
      <rect x="40" y="95" width="120" height="10" rx="3" fill="#3f3f46" />
      <rect x="55" y="105" width="10" height="25" fill="#27272a" />
      <rect x="135" y="105" width="10" height="25" fill="#27272a" />
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Human Figure on Bench -->
      <!-- Head -->
      <circle cx="65" cy="88" r="8" fill="#a1a1aa" />
      <!-- Torso / Chest highlighted -->
      <rect x="75" y="86" width="40" height="10" rx="4" fill="url(#chestGrad)" />
      <!-- Legs bent -->
      <path d="M 115 90 L 135 90 L 140 125" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Arms pushing barbell -->
      <path d="M 90 88 L 90 55" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 100 88 L 100 55" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Barbell & Plates -->
      <line x1="60" y1="52" x2="130" y2="52" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="65" y="38" width="6" height="28" rx="2" fill="#ef4444" />
      <rect x="119" y="38" width="6" height="28" rx="2" fill="#ef4444" />
      <!-- Muscle Badge -->
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#10b981" opacity="0.2" />
      <text x="39" y="24" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PECHO</text>
    </svg>
  `),

  incline_press: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="inclineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#34d399" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Incline Bench -->
      <line x1="50" y1="110" x2="115" y2="70" stroke="#3f3f46" stroke-width="8" stroke-linecap="round" />
      <rect x="50" y="105" width="25" height="8" rx="2" fill="#3f3f46" />
      <rect x="65" y="113" width="8" height="20" fill="#27272a" />
      <rect x="105" y="80" width="8" height="53" fill="#27272a" />
      <!-- Figure -->
      <circle cx="108" cy="60" r="8" fill="#a1a1aa" />
      <line x1="60" y1="102" x2="100" y2="68" stroke="url(#inclineGrad)" stroke-width="9" stroke-linecap="round" />
      <!-- Dumbbells / Arms -->
      <path d="M 85 75 L 80 48" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <rect x="72" y="42" width="16" height="6" rx="2" fill="#06b6d4" />
      <!-- Badge -->
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#10b981" opacity="0.2" />
      <text x="39" y="24" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PECHO</text>
    </svg>
  `),

  squat: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="legGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Floor -->
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Squatting figure -->
      <circle cx="95" cy="50" r="8" fill="#a1a1aa" />
      <!-- Torso tilted -->
      <line x1="95" y1="58" x2="85" y2="85" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Thighs / Quadriceps highlighted -->
      <line x1="85" y1="85" x2="115" y2="90" stroke="url(#legGrad)" stroke-width="9" stroke-linecap="round" />
      <!-- Calves / Lower legs -->
      <line x1="115" y1="90" x2="110" y2="128" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Barbell on back -->
      <line x1="60" y1="56" x2="135" y2="56" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="65" y="40" width="6" height="32" rx="2" fill="#3b82f6" />
      <rect x="124" y="40" width="6" height="32" rx="2" fill="#3b82f6" />
      <!-- Arms holding bar -->
      <path d="M 88 65 L 82 56 L 90 56" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  deadlift: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="backGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Figure standing ready -->
      <circle cx="102" cy="42" r="8" fill="#a1a1aa" />
      <!-- Back highlighted -->
      <line x1="102" y1="50" x2="98" y2="82" stroke="url(#backGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Legs straight / slight bend -->
      <line x1="98" y1="82" x2="98" y2="128" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Arms holding bar down -->
      <line x1="102" y1="58" x2="108" y2="92" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Barbell at mid-thigh / knees -->
      <line x1="70" y1="92" x2="145" y2="92" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="76" y="74" width="6" height="36" rx="2" fill="#f59e0b" />
      <rect x="133" y="74" width="6" height="36" rx="2" fill="#f59e0b" />
      <!-- Badge -->
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  pullups: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="latsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Pull-up Bar Structure -->
      <line x1="30" y1="28" x2="170" y2="28" stroke="#52525b" stroke-width="5" stroke-linecap="round" />
      <line x1="45" y1="28" x2="45" y2="135" stroke="#3f3f46" stroke-width="4" />
      <line x1="155" y1="28" x2="155" y2="135" stroke="#3f3f46" stroke-width="4" />
      <!-- Figure Hanging -->
      <circle cx="100" cy="46" r="8" fill="#a1a1aa" />
      <!-- V-Taper Back / Lats -->
      <path d="M 88 56 L 112 56 L 105 88 L 95 88 Z" fill="url(#latsGrad)" />
      <!-- Bent Arms reaching to bar -->
      <path d="M 90 56 L 78 35 L 75 28" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 110 56 L 122 35 L 125 28" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Legs crossed hanging -->
      <path d="M 100 88 L 98 120 L 104 125" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  barbell_row: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="rowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Figure Bent Over 45 deg -->
      <circle cx="120" cy="50" r="8" fill="#a1a1aa" />
      <line x1="116" y1="56" x2="88" y2="80" stroke="url(#rowGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Legs bent -->
      <path d="M 88 80 L 100 102 L 95 128" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Arms rowing barbell up to abdomen -->
      <path d="M 104 65 L 105 82 L 96 86" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Barbell -->
      <line x1="72" y1="88" x2="130" y2="88" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <circle cx="78" cy="88" r="9" fill="#eab308" />
      <circle cx="124" cy="88" r="9" fill="#eab308" />
      <!-- Badge -->
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  shoulder_press: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="deltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="40" y1="130" x2="160" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Figure Standing straight -->
      <circle cx="100" cy="52" r="8" fill="#a1a1aa" />
      <line x1="100" y1="60" x2="100" y2="94" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Shoulders highlighted -->
      <circle cx="88" cy="64" r="5" fill="url(#deltGrad)" />
      <circle cx="112" cy="64" r="5" fill="url(#deltGrad)" />
      <!-- Arms pressing overhead -->
      <path d="M 88 64 L 84 45 L 86 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 112 64 L 116 45 L 114 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Barbell overhead -->
      <line x1="65" y1="26" x2="135" y2="26" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="70" y="16" width="5" height="20" rx="2" fill="#a855f7" />
      <rect x="125" y="16" width="5" height="20" rx="2" fill="#a855f7" />
      <!-- Legs -->
      <line x1="96" y1="94" x2="93" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="104" y1="94" x2="107" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#a855f7" opacity="0.2" />
      <text x="44.5" y="24" fill="#a855f7" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">HOMBROS</text>
    </svg>
  `),

  lateral_raises: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="deltLatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <circle cx="100" cy="46" r="8" fill="#a1a1aa" />
      <line x1="100" y1="54" x2="100" y2="92" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Arms spread sideways with dumbbells -->
      <path d="M 94 60 L 62 62" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 106 60 L 138 62" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Dumbbells at ends -->
      <circle cx="58" cy="62" r="5" fill="#a855f7" />
      <circle cx="142" cy="62" r="5" fill="#a855f7" />
      <!-- Shoulders highlighted -->
      <circle cx="92" cy="60" r="5" fill="url(#deltLatGrad)" />
      <circle cx="108" cy="60" r="5" fill="url(#deltLatGrad)" />
      <!-- Legs -->
      <line x1="97" y1="92" x2="94" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="103" y1="92" x2="106" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#a855f7" opacity="0.2" />
      <text x="44.5" y="24" fill="#a855f7" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">HOMBROS</text>
    </svg>
  `),

  biceps_curl: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="bicepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" />
          <stop offset="100%" stop-color="#be185d" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <circle cx="90" cy="46" r="8" fill="#a1a1aa" />
      <line x1="90" y1="54" x2="90" y2="96" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Arm flexing dumbbell -->
      <path d="M 94 62 L 98 84 L 115 65" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Biceps peak highlighted -->
      <circle cx="103" cy="74" r="6" fill="url(#bicepGrad)" />
      <!-- Dumbbell -->
      <rect x="110" y="58" width="14" height="6" rx="2" fill="#f43f5e" />
      <rect x="110" y="68" width="14" height="6" rx="2" fill="#f43f5e" />
      <line x1="117" y1="58" x2="117" y2="74" stroke="#e4e4e7" stroke-width="2" />
      <!-- Legs -->
      <line x1="88" y1="96" x2="85" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="93" y1="96" x2="96" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#ec4899" opacity="0.2" />
      <text x="42" y="24" fill="#ec4899" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">BÍCEPS</text>
    </svg>
  `),

  triceps_pushdown: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="tricepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Cable Machine pulley -->
      <circle cx="130" cy="25" r="7" fill="#3f3f46" stroke="#71717a" stroke-width="2" />
      <line x1="130" y1="25" x2="115" y2="78" stroke="#94a3b8" stroke-width="2" />
      <!-- Figure standing at cable -->
      <circle cx="95" cy="46" r="8" fill="#a1a1aa" />
      <line x1="95" y1="54" x2="90" y2="96" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Arm extending downwards -->
      <path d="M 98 62 L 102 78 L 115 80" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Triceps horseshoe highlighted -->
      <circle cx="97" cy="70" r="5" fill="url(#tricepGrad)" />
      <!-- Cable attachment handle -->
      <line x1="110" y1="80" x2="120" y2="80" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" />
      <!-- Legs -->
      <line x1="88" y1="96" x2="85" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="93" y1="96" x2="96" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#3b82f6" opacity="0.2" />
      <text x="42" y="24" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">TRÍCEPS</text>
    </svg>
  `),

  leg_press: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="legPressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Machine frame -->
      <line x1="40" y1="120" x2="160" y2="120" stroke="#27272a" stroke-width="6" stroke-linecap="round" />
      <!-- Sled Rails 45 deg -->
      <line x1="80" y1="110" x2="155" y2="40" stroke="#3f3f46" stroke-width="4" stroke-linecap="round" />
      <!-- Seat -->
      <rect x="45" y="90" width="30" height="8" rx="2" transform="rotate(-30 45 90)" fill="#52525b" />
      <!-- Person seated -->
      <circle cx="58" cy="74" r="7" fill="#a1a1aa" />
      <line x1="60" y1="82" x2="72" y2="102" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Legs pressing platform -->
      <path d="M 72 102 L 105 82 L 125 65" fill="none" stroke="url(#legPressGrad)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Foot platform with weights -->
      <rect x="120" y="50" width="8" height="30" rx="2" transform="rotate(45 124 65)" fill="#e2e8f0" />
      <circle cx="138" cy="52" r="10" fill="#ef4444" />
      <!-- Badge -->
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  abs_plank: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#ca8a04" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="30" y1="125" x2="170" y2="125" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Head -->
      <circle cx="62" cy="80" r="7" fill="#a1a1aa" />
      <!-- Forearms on ground -->
      <line x1="70" y1="88" x2="70" y2="122" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Body plank straight / Core highlighted -->
      <line x1="70" y1="88" x2="135" y2="105" stroke="url(#coreGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Feet on ground -->
      <line x1="135" y1="105" x2="148" y2="123" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <!-- Badge -->
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#eab308" opacity="0.2" />
      <text x="39" y="24" fill="#eab308" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CORE</text>
    </svg>
  `),
};

export const PRESET_OPTIONS = [
  { key: 'bench_press', label: 'Press de Banca', muscle: 'Pecho', url: EXERCISE_IMAGES.bench_press },
  { key: 'incline_press', label: 'Press Inclinado', muscle: 'Pecho', url: EXERCISE_IMAGES.incline_press },
  { key: 'squat', label: 'Sentadillas', muscle: 'Piernas', url: EXERCISE_IMAGES.squat },
  { key: 'deadlift', label: 'Peso Muerto', muscle: 'Espalda', url: EXERCISE_IMAGES.deadlift },
  { key: 'pullups', label: 'Dominadas / Jalón', muscle: 'Espalda', url: EXERCISE_IMAGES.pullups },
  { key: 'barbell_row', label: 'Remo con Barra', muscle: 'Espalda', url: EXERCISE_IMAGES.barbell_row },
  { key: 'shoulder_press', label: 'Press Militar', muscle: 'Hombros', url: EXERCISE_IMAGES.shoulder_press },
  { key: 'lateral_raises', label: 'Elevaciones Laterales', muscle: 'Hombros', url: EXERCISE_IMAGES.lateral_raises },
  { key: 'biceps_curl', label: 'Curl de Bíceps', muscle: 'Bíceps', url: EXERCISE_IMAGES.biceps_curl },
  { key: 'triceps_pushdown', label: 'Extensión de Tríceps', muscle: 'Tríceps', url: EXERCISE_IMAGES.triceps_pushdown },
  { key: 'leg_press', label: 'Prensa de Piernas', muscle: 'Piernas', url: EXERCISE_IMAGES.leg_press },
  { key: 'abs_plank', label: 'Plancha / Core', muscle: 'Abdomen / Core', url: EXERCISE_IMAGES.abs_plank },
];
