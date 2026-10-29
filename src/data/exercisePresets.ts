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
      <rect x="40" y="95" width="120" height="10" rx="3" fill="#3f3f46" />
      <rect x="55" y="105" width="10" height="25" fill="#27272a" />
      <rect x="135" y="105" width="10" height="25" fill="#27272a" />
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <circle cx="65" cy="88" r="8" fill="#a1a1aa" />
      <rect x="75" y="86" width="40" height="10" rx="4" fill="url(#chestGrad)" />
      <path d="M 115 90 L 135 90 L 140 125" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M 90 88 L 90 55" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 100 88 L 100 55" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <line x1="60" y1="52" x2="130" y2="52" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="65" y="38" width="6" height="28" rx="2" fill="#ef4444" />
      <rect x="119" y="38" width="6" height="28" rx="2" fill="#ef4444" />
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
      <line x1="50" y1="110" x2="115" y2="70" stroke="#3f3f46" stroke-width="8" stroke-linecap="round" />
      <rect x="50" y="105" width="25" height="8" rx="2" fill="#3f3f46" />
      <rect x="65" y="113" width="8" height="20" fill="#27272a" />
      <rect x="105" y="80" width="8" height="53" fill="#27272a" />
      <circle cx="108" cy="60" r="8" fill="#a1a1aa" />
      <line x1="60" y1="102" x2="100" y2="68" stroke="url(#inclineGrad)" stroke-width="9" stroke-linecap="round" />
      <path d="M 85 75 L 80 48" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <rect x="72" y="42" width="16" height="6" rx="2" fill="#06b6d4" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#10b981" opacity="0.2" />
      <text x="39" y="24" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PECHO</text>
    </svg>
  `),

  chest_fly: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="flyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Cable posts -->
      <line x1="25" y1="20" x2="25" y2="130" stroke="#3f3f46" stroke-width="4" />
      <line x1="175" y1="20" x2="175" y2="130" stroke="#3f3f46" stroke-width="4" />
      <line x1="25" y1="50" x2="80" y2="75" stroke="#71717a" stroke-width="2" stroke-dasharray="3,3" />
      <line x1="175" y1="50" x2="120" y2="75" stroke="#71717a" stroke-width="2" stroke-dasharray="3,3" />
      <!-- Standing figure -->
      <circle cx="100" cy="48" r="8" fill="#a1a1aa" />
      <line x1="100" y1="56" x2="100" y2="92" stroke="url(#flyGrad)" stroke-width="9" stroke-linecap="round" />
      <!-- Curved arms closing fly -->
      <path d="M 80 75 Q 92 68 98 62" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 120 75 Q 108 68 102 62" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Handles -->
      <circle cx="80" cy="75" r="4" fill="#10b981" />
      <circle cx="120" cy="75" r="4" fill="#10b981" />
      <!-- Legs staggered -->
      <line x1="97" y1="92" x2="92" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="103" y1="92" x2="110" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#10b981" opacity="0.2" />
      <text x="39" y="24" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PECHO</text>
    </svg>
  `),

  chest_dips: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="dipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Parallel bars -->
      <line x1="55" y1="70" x2="145" y2="70" stroke="#52525b" stroke-width="6" stroke-linecap="round" />
      <line x1="65" y1="70" x2="65" y2="135" stroke="#3f3f46" stroke-width="5" />
      <line x1="135" y1="70" x2="135" y2="135" stroke="#3f3f46" stroke-width="5" />
      <!-- Figure leaned forward -->
      <circle cx="108" cy="40" r="7" fill="#a1a1aa" />
      <line x1="108" y1="47" x2="96" y2="80" stroke="url(#dipGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Arms on bars -->
      <path d="M 104 54 L 85 70" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 104 54 L 115 70" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Legs crossed bent -->
      <path d="M 96 80 L 88 105 L 94 112" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#10b981" opacity="0.2" />
      <text x="39" y="24" fill="#10b981" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PECHO</text>
    </svg>
  `),

  pushups: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="125" x2="180" y2="125" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Prone body line -->
      <circle cx="60" cy="75" r="7" fill="#a1a1aa" />
      <line x1="68" y1="80" x2="145" y2="115" stroke="#10b981" stroke-width="8" stroke-linecap="round" />
      <!-- Arms pushing floor -->
      <line x1="72" y1="83" x2="72" y2="125" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Feet on floor -->
      <line x1="145" y1="115" x2="155" y2="125" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
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
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <circle cx="95" cy="50" r="8" fill="#a1a1aa" />
      <line x1="95" y1="58" x2="85" y2="85" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <line x1="85" y1="85" x2="115" y2="90" stroke="url(#legGrad)" stroke-width="9" stroke-linecap="round" />
      <line x1="115" y1="90" x2="110" y2="128" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <line x1="60" y1="56" x2="135" y2="56" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="65" y="40" width="6" height="32" rx="2" fill="#3b82f6" />
      <rect x="124" y="40" width="6" height="32" rx="2" fill="#3b82f6" />
      <path d="M 88 65 L 82 56 L 90 56" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  bulgarian_split_squat: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="splitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#f43f5e" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="130" x2="180" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Bench behind -->
      <rect x="135" y="95" width="30" height="10" rx="2" fill="#3f3f46" />
      <line x1="140" y1="105" x2="140" y2="130" stroke="#27272a" stroke-width="4" />
      <line x1="160" y1="105" x2="160" y2="130" stroke="#27272a" stroke-width="4" />
      <!-- Torso vertical -->
      <circle cx="85" cy="45" r="7" fill="#a1a1aa" />
      <line x1="85" y1="52" x2="85" y2="85" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Front leg lunging -->
      <path d="M 85 85 L 75 105 L 75 130" fill="none" stroke="url(#splitGrad)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Back leg resting on bench -->
      <path d="M 85 85 L 115 105 L 145 95" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Dumbbell in hand -->
      <rect x="92" y="70" width="6" height="14" rx="2" fill="#06b6d4" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  leg_extension: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="quadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Machine seat -->
      <rect x="50" y="70" width="8" height="40" rx="2" fill="#3f3f46" />
      <rect x="50" y="105" width="40" height="8" rx="2" fill="#3f3f46" />
      <!-- Figure seated -->
      <circle cx="62" cy="55" r="7" fill="#a1a1aa" />
      <line x1="62" y1="62" x2="68" y2="100" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Thigh flat on seat -->
      <line x1="68" y1="100" x2="105" y2="100" stroke="url(#quadGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Shin extended forward -->
      <line x1="105" y1="100" x2="140" y2="92" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Roller pad on shins -->
      <circle cx="135" cy="94" r="6" fill="#06b6d4" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  leg_curl: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="hamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Machine prone bench -->
      <line x1="35" y1="95" x2="135" y2="95" stroke="#3f3f46" stroke-width="8" stroke-linecap="round" />
      <!-- Figure lying facedown -->
      <circle cx="45" cy="85" r="6" fill="#a1a1aa" />
      <line x1="52" y1="88" x2="105" y2="88" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Hamstrings highlighted -->
      <line x1="105" y1="88" x2="128" y2="88" stroke="url(#hamGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Lower leg curled upward -->
      <line x1="128" y1="88" x2="118" y2="60" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Roller pad on heel -->
      <circle cx="116" cy="62" r="6" fill="#06b6d4" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  romanian_deadlift: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="rdlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="130" x2="180" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Figure hip hinge -->
      <circle cx="115" cy="55" r="7" fill="#a1a1aa" />
      <line x1="112" y1="62" x2="80" y2="82" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Hamstrings stretched -->
      <line x1="80" y1="82" x2="90" y2="128" stroke="url(#rdlGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Barbell lowered below knees -->
      <line x1="75" y1="102" x2="135" y2="102" stroke="#e4e4e7" stroke-width="3" stroke-linecap="round" />
      <circle cx="80" cy="102" r="7" fill="#06b6d4" />
      <circle cx="130" cy="102" r="7" fill="#06b6d4" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  calf_raises: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="calfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Calf step block -->
      <rect x="70" y="122" width="60" height="10" rx="2" fill="#3f3f46" />
      <!-- Figure standing on tiptoes -->
      <circle cx="100" cy="38" r="7" fill="#a1a1aa" />
      <line x1="100" y1="45" x2="100" y2="85" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Thighs -->
      <line x1="100" y1="85" x2="100" y2="105" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Calves prominent peak -->
      <ellipse cx="100" cy="112" rx="6" ry="10" fill="url(#calfGrad)" />
      <!-- Feet arched up -->
      <line x1="100" y1="120" x2="95" y2="124" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#06b6d4" opacity="0.2" />
      <text x="42" y="24" fill="#06b6d4" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PIERNAS</text>
    </svg>
  `),

  hip_thrust: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="gluteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" />
          <stop offset="100%" stop-color="#e11d48" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="130" x2="180" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Bench behind upper back -->
      <rect x="35" y="90" width="25" height="12" rx="2" fill="#3f3f46" />
      <line x1="42" y1="102" x2="42" y2="130" stroke="#27272a" stroke-width="4" />
      <!-- Figure: head & upper back on bench -->
      <circle cx="50" cy="80" r="7" fill="#a1a1aa" />
      <!-- Torso horizontal at top -->
      <line x1="58" y1="88" x2="98" y2="88" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Glutes highlighted at hip joint -->
      <circle cx="98" cy="88" r="9" fill="url(#gluteGrad)" />
      <!-- Thigh & lower leg at 90 deg -->
      <line x1="98" y1="88" x2="132" y2="88" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <line x1="132" y1="88" x2="132" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Barbell on hips -->
      <circle cx="100" cy="82" r="8" fill="#f43f5e" stroke="#fff" stroke-width="1.5" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#f43f5e" opacity="0.2" />
      <text x="42" y="24" fill="#f43f5e" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">GLÚTEOS</text>
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
      <circle cx="102" cy="42" r="8" fill="#a1a1aa" />
      <line x1="102" y1="50" x2="98" y2="82" stroke="url(#backGrad)" stroke-width="8" stroke-linecap="round" />
      <line x1="98" y1="82" x2="98" y2="128" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <line x1="102" y1="58" x2="108" y2="92" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <line x1="70" y1="92" x2="145" y2="92" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="76" y="74" width="6" height="36" rx="2" fill="#f59e0b" />
      <rect x="133" y="74" width="6" height="36" rx="2" fill="#f59e0b" />
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
      <line x1="30" y1="28" x2="170" y2="28" stroke="#52525b" stroke-width="5" stroke-linecap="round" />
      <line x1="45" y1="28" x2="45" y2="135" stroke="#3f3f46" stroke-width="4" />
      <line x1="155" y1="28" x2="155" y2="135" stroke="#3f3f46" stroke-width="4" />
      <circle cx="100" cy="46" r="8" fill="#a1a1aa" />
      <path d="M 88 56 L 112 56 L 105 88 L 95 88 Z" fill="url(#latsGrad)" />
      <path d="M 90 56 L 78 35 L 75 28" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 110 56 L 122 35 L 125 28" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <path d="M 100 88 L 98 120 L 104 125" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  lat_pulldown: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="pulldownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#ef4444" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Machine beam & pulley -->
      <line x1="50" y1="20" x2="150" y2="20" stroke="#3f3f46" stroke-width="6" />
      <circle cx="100" cy="20" r="6" fill="#52525b" />
      <line x1="100" y1="20" x2="100" y2="45" stroke="#94a3b8" stroke-width="2" />
      <!-- Lat bar -->
      <path d="M 60 47 Q 100 42 140 47" fill="none" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <!-- Seated figure pulling -->
      <circle cx="100" cy="62" r="7" fill="#a1a1aa" />
      <path d="M 90 70 L 110 70 L 104 98 L 96 98 Z" fill="url(#pulldownGrad)" />
      <!-- Arms gripping wide bar -->
      <path d="M 92 70 L 72 48" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 108 70 L 128 48" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Seat & thighs -->
      <rect x="85" y="98" width="30" height="6" rx="2" fill="#3f3f46" />
      <path d="M 100 98 L 105 115 L 105 132" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
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
      <circle cx="120" cy="50" r="8" fill="#a1a1aa" />
      <line x1="116" y1="56" x2="88" y2="80" stroke="url(#rowGrad)" stroke-width="8" stroke-linecap="round" />
      <path d="M 88 80 L 100 102 L 95 128" fill="none" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <path d="M 104 65 L 105 82 L 96 86" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <line x1="72" y1="88" x2="130" y2="88" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <circle cx="78" cy="88" r="9" fill="#eab308" />
      <circle cx="124" cy="88" r="9" fill="#eab308" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  seated_row: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="seatedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Low pulley cable bench -->
      <line x1="30" y1="120" x2="150" y2="120" stroke="#27272a" stroke-width="6" stroke-linecap="round" />
      <rect x="40" y="105" width="20" height="15" fill="#3f3f46" />
      <circle cx="140" cy="105" r="5" fill="#52525b" />
      <line x1="140" y1="105" x2="88" y2="92" stroke="#94a3b8" stroke-width="2" />
      <!-- Seated figure pulling to chest -->
      <circle cx="65" cy="65" r="7" fill="#a1a1aa" />
      <line x1="65" y1="72" x2="62" y2="105" stroke="url(#seatedGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Legs extended to footpegs -->
      <line x1="62" y1="105" x2="135" y2="105" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Arms rowing handle to abdomen -->
      <path d="M 68 76 L 82 88 L 88 92" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  dumbbell_row: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="dbRowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Bench -->
      <rect x="40" y="95" width="80" height="8" rx="2" fill="#3f3f46" />
      <line x1="50" y1="103" x2="50" y2="128" stroke="#27272a" stroke-width="4" />
      <line x1="110" y1="103" x2="110" y2="128" stroke="#27272a" stroke-width="4" />
      <!-- Figure: 1 knee & 1 hand on bench, 1 leg on ground -->
      <circle cx="58" cy="62" r="7" fill="#a1a1aa" />
      <line x1="60" y1="95" x2="60" y2="70" stroke="#a1a1aa" stroke-width="4" />
      <line x1="62" y1="68" x2="110" y2="72" stroke="url(#dbRowGrad)" stroke-width="8" stroke-linecap="round" />
      <path d="M 110 72 L 95 95" stroke="#71717a" stroke-width="5" />
      <line x1="110" y1="72" x2="135" y2="128" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <!-- Rowing arm with dumbbell pulled to hip -->
      <path d="M 85 70 L 92 60 L 94 75" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <rect x="88" y="72" width="12" height="6" rx="2" fill="#f59e0b" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#f59e0b" opacity="0.2" />
      <text x="44.5" y="24" fill="#f59e0b" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ESPALDA</text>
    </svg>
  `),

  face_pull: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Cable post -->
      <line x1="170" y1="20" x2="170" y2="130" stroke="#3f3f46" stroke-width="5" />
      <circle cx="170" cy="45" r="5" fill="#52525b" />
      <line x1="170" y1="45" x2="115" y2="52" stroke="#94a3b8" stroke-width="2" />
      <!-- Figure pulling rope to face -->
      <circle cx="85" cy="50" r="7" fill="#a1a1aa" />
      <line x1="85" y1="57" x2="80" y2="92" stroke="url(#faceGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Arms pulled high and wide -->
      <path d="M 86 62 L 102 54 L 115 52" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <line x1="80" y1="92" x2="75" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="80" y1="92" x2="92" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
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
      <circle cx="100" cy="52" r="8" fill="#a1a1aa" />
      <line x1="100" y1="60" x2="100" y2="94" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <circle cx="88" cy="64" r="5" fill="url(#deltGrad)" />
      <circle cx="112" cy="64" r="5" fill="url(#deltGrad)" />
      <path d="M 88 64 L 84 45 L 86 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 112 64 L 116 45 L 114 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <line x1="65" y1="26" x2="135" y2="26" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" />
      <rect x="70" y="16" width="5" height="20" rx="2" fill="#a855f7" />
      <rect x="125" y="16" width="5" height="20" rx="2" fill="#a855f7" />
      <line x1="96" y1="94" x2="93" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="104" y1="94" x2="107" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#a855f7" opacity="0.2" />
      <text x="44.5" y="24" fill="#a855f7" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">HOMBROS</text>
    </svg>
  `),

  arnold_press: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="arnoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#c084fc" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Seated bench backrest -->
      <rect x="96" y="55" width="8" height="55" rx="2" fill="#3f3f46" />
      <circle cx="100" cy="46" r="7" fill="#a1a1aa" />
      <!-- Delts highlighted -->
      <circle cx="88" cy="58" r="6" fill="url(#arnoldGrad)" />
      <circle cx="112" cy="58" r="6" fill="url(#arnoldGrad)" />
      <!-- Dumbbells pressing up and rotating -->
      <path d="M 88 58 L 80 40 L 82 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 112 58 L 120 40 L 118 28" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <rect x="74" y="24" width="16" height="5" rx="2" fill="#a855f7" />
      <rect x="110" y="24" width="16" height="5" rx="2" fill="#a855f7" />
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
      <path d="M 94 60 L 62 62" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 106 60 L 138 62" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <circle cx="58" cy="62" r="5" fill="#a855f7" />
      <circle cx="142" cy="62" r="5" fill="#a855f7" />
      <circle cx="92" cy="60" r="5" fill="url(#deltLatGrad)" />
      <circle cx="108" cy="60" r="5" fill="url(#deltLatGrad)" />
      <line x1="97" y1="92" x2="94" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="103" y1="92" x2="106" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="65" height="18" rx="9" fill="#a855f7" opacity="0.2" />
      <text x="44.5" y="24" fill="#a855f7" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">HOMBROS</text>
    </svg>
  `),

  rear_delt_fly: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="rearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <circle cx="100" cy="55" r="7" fill="#a1a1aa" />
      <line x1="100" y1="62" x2="100" y2="92" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Rear delts on back of shoulder -->
      <circle cx="90" cy="66" r="6" fill="url(#rearGrad)" />
      <circle cx="110" cy="66" r="6" fill="url(#rearGrad)" />
      <!-- Arms bent out in bird wing raise -->
      <path d="M 90 66 Q 70 70 55 60" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <path d="M 110 66 Q 130 70 145 60" fill="none" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <circle cx="52" cy="58" r="4" fill="#a855f7" />
      <circle cx="148" cy="58" r="4" fill="#a855f7" />
      <line x1="96" y1="92" x2="93" y2="128" stroke="#71717a" stroke-width="5" />
      <line x1="104" y1="92" x2="107" y2="128" stroke="#71717a" stroke-width="5" />
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
      <path d="M 94 62 L 98 84 L 115 65" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="103" cy="74" r="6" fill="url(#bicepGrad)" />
      <rect x="110" y="58" width="14" height="6" rx="2" fill="#f43f5e" />
      <rect x="110" y="68" width="14" height="6" rx="2" fill="#f43f5e" />
      <line x1="117" y1="58" x2="117" y2="74" stroke="#e4e4e7" stroke-width="2" />
      <line x1="88" y1="96" x2="85" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="93" y1="96" x2="96" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#ec4899" opacity="0.2" />
      <text x="42" y="24" fill="#ec4899" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">BÍCEPS</text>
    </svg>
  `),

  hammer_curl: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="hammerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" />
          <stop offset="100%" stop-color="#14b8a6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <circle cx="90" cy="46" r="8" fill="#a1a1aa" />
      <line x1="90" y1="54" x2="90" y2="96" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <!-- Neutral grip dumbbell vertical -->
      <path d="M 94 62 L 98 84 L 115 68" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- Brachialis / outer biceps highlighted -->
      <circle cx="104" cy="76" r="6" fill="url(#hammerGrad)" />
      <!-- Vertical dumbbell -->
      <rect x="114" y="58" width="6" height="18" rx="2" fill="#ec4899" />
      <line x1="88" y1="96" x2="85" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="93" y1="96" x2="96" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#ec4899" opacity="0.2" />
      <text x="42" y="24" fill="#ec4899" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">BÍCEPS</text>
    </svg>
  `),

  preacher_curl: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="preacherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ec4899" />
          <stop offset="100%" stop-color="#db2777" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Scott slant pad -->
      <line x1="75" y1="105" x2="115" y2="75" stroke="#3f3f46" stroke-width="12" stroke-linecap="round" />
      <circle cx="65" cy="65" r="7" fill="#a1a1aa" />
      <!-- Arms on pad curling EZ bar -->
      <line x1="75" y1="75" x2="105" y2="78" stroke="url(#preacherGrad)" stroke-width="6" stroke-linecap="round" />
      <line x1="105" y1="78" x2="100" y2="60" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- EZ bar -->
      <circle cx="98" cy="58" r="6" fill="#ec4899" />
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
      <circle cx="130" cy="25" r="7" fill="#3f3f46" stroke="#71717a" stroke-width="2" />
      <line x1="130" y1="25" x2="115" y2="78" stroke="#94a3b8" stroke-width="2" />
      <circle cx="95" cy="46" r="8" fill="#a1a1aa" />
      <line x1="95" y1="54" x2="90" y2="96" stroke="#71717a" stroke-width="8" stroke-linecap="round" />
      <path d="M 98 62 L 102 78 L 115 80" fill="none" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="97" cy="70" r="5" fill="url(#tricepGrad)" />
      <line x1="110" y1="80" x2="120" y2="80" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" />
      <line x1="88" y1="96" x2="85" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="93" y1="96" x2="96" y2="130" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#3b82f6" opacity="0.2" />
      <text x="42" y="24" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">TRÍCEPS</text>
    </svg>
  `),

  skullcrushers: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="skullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#60a5fa" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Flat bench -->
      <rect x="40" y="95" width="100" height="8" rx="2" fill="#3f3f46" />
      <line x1="50" y1="103" x2="50" y2="130" stroke="#27272a" stroke-width="4" />
      <line x1="130" y1="103" x2="130" y2="130" stroke="#27272a" stroke-width="4" />
      <!-- Figure lying down -->
      <circle cx="60" cy="88" r="7" fill="#a1a1aa" />
      <line x1="68" y1="90" x2="110" y2="90" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Upper arm vertical, elbow bent lowering bar behind head -->
      <line x1="80" y1="90" x2="80" y2="62" stroke="url(#skullGrad)" stroke-width="6" stroke-linecap="round" />
      <line x1="80" y1="62" x2="62" y2="70" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <!-- EZ bar by forehead -->
      <circle cx="60" cy="70" r="5" fill="#3b82f6" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#3b82f6" opacity="0.2" />
      <text x="42" y="24" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">TRÍCEPS</text>
    </svg>
  `),

  overhead_triceps: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="overTricep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#818cf8" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Standing figure facing forward, arms bent back overhead -->
      <circle cx="100" cy="50" r="7" fill="#a1a1aa" />
      <line x1="100" y1="57" x2="98" y2="95" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <!-- Triceps extended overhead -->
      <path d="M 98 62 L 98 35 L 85 45" fill="none" stroke="url(#overTricep)" stroke-width="6" stroke-linecap="round" />
      <!-- Cable rope overhead -->
      <line x1="85" y1="45" x2="65" y2="40" stroke="#94a3b8" stroke-width="2" />
      <line x1="95" y1="95" x2="90" y2="128" stroke="#71717a" stroke-width="5" />
      <line x1="101" y1="95" x2="106" y2="128" stroke="#71717a" stroke-width="5" />
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
      <line x1="40" y1="120" x2="160" y2="120" stroke="#27272a" stroke-width="6" stroke-linecap="round" />
      <line x1="80" y1="110" x2="155" y2="40" stroke="#3f3f46" stroke-width="4" stroke-linecap="round" />
      <rect x="45" y="90" width="30" height="8" rx="2" transform="rotate(-30 45 90)" fill="#52525b" />
      <circle cx="58" cy="74" r="7" fill="#a1a1aa" />
      <line x1="60" y1="82" x2="72" y2="102" stroke="#71717a" stroke-width="7" stroke-linecap="round" />
      <path d="M 72 102 L 105 82 L 125 65" fill="none" stroke="url(#legPressGrad)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="120" y="50" width="8" height="30" rx="2" transform="rotate(45 124 65)" fill="#e2e8f0" />
      <circle cx="138" cy="52" r="10" fill="#ef4444" />
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
      <circle cx="62" cy="80" r="7" fill="#a1a1aa" />
      <line x1="70" y1="88" x2="70" y2="122" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <line x1="70" y1="88" x2="135" y2="105" stroke="url(#coreGrad)" stroke-width="8" stroke-linecap="round" />
      <line x1="135" y1="105" x2="148" y2="123" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#eab308" opacity="0.2" />
      <text x="39" y="24" fill="#eab308" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CORE</text>
    </svg>
  `),

  hanging_leg_raise: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="legRaiseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Bar overhead -->
      <line x1="50" y1="25" x2="150" y2="25" stroke="#52525b" stroke-width="5" stroke-linecap="round" />
      <!-- Figure hanging -->
      <circle cx="100" cy="45" r="7" fill="#a1a1aa" />
      <line x1="95" y1="28" x2="95" y2="52" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <line x1="105" y1="28" x2="105" y2="52" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Torso -->
      <line x1="100" y1="52" x2="100" y2="85" stroke="url(#legRaiseGrad)" stroke-width="7" stroke-linecap="round" />
      <!-- Legs raised 90 degrees -->
      <line x1="100" y1="85" x2="145" y2="85" stroke="#eab308" stroke-width="6" stroke-linecap="round" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#eab308" opacity="0.2" />
      <text x="39" y="24" fill="#eab308" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CORE</text>
    </svg>
  `),

  cable_crunch: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="crunchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#ca8a04" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="128" x2="180" y2="128" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- High pulley -->
      <circle cx="150" cy="25" r="6" fill="#3f3f46" />
      <line x1="150" y1="25" x2="110" y2="70" stroke="#94a3b8" stroke-width="2" />
      <!-- Kneeling figure curling down -->
      <circle cx="95" cy="72" r="7" fill="#a1a1aa" />
      <!-- Curved spine curling forward -->
      <path d="M 95 79 Q 80 92 88 115" fill="none" stroke="url(#crunchGrad)" stroke-width="8" stroke-linecap="round" />
      <!-- Knees on floor -->
      <line x1="88" y1="115" x2="72" y2="128" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#eab308" opacity="0.2" />
      <text x="39" y="24" fill="#eab308" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CORE</text>
    </svg>
  `),

  ab_wheel: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="20" y1="125" x2="180" y2="125" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Ab wheel -->
      <circle cx="145" cy="115" r="10" fill="#eab308" stroke="#ca8a04" stroke-width="2" />
      <!-- Knees on floor -->
      <circle cx="55" cy="120" r="4" fill="#71717a" />
      <!-- Extended body rollout -->
      <path d="M 55 120 L 75 105 L 120 100 L 145 115" fill="none" stroke="url(#wheelGrad)" stroke-width="7" stroke-linecap="round" />
      <circle cx="112" cy="94" r="7" fill="#a1a1aa" />
      <rect x="12" y="12" width="55" height="18" rx="9" fill="#eab308" opacity="0.2" />
      <text x="39" y="24" fill="#eab308" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CORE</text>
    </svg>
  `),

  wrist_curl: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="wristGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14b8a6" />
          <stop offset="100%" stop-color="#0d9488" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Bench surface -->
      <rect x="40" y="85" width="90" height="8" rx="2" fill="#3f3f46" />
      <!-- Forearm resting on bench -->
      <line x1="50" y1="80" x2="115" y2="80" stroke="url(#wristGrad)" stroke-width="9" stroke-linecap="round" />
      <!-- Wrist flexed holding barbell -->
      <path d="M 115 80 L 132 72" stroke="#a1a1aa" stroke-width="5" stroke-linecap="round" />
      <line x1="130" y1="58" x2="130" y2="86" stroke="#e4e4e7" stroke-width="3" />
      <circle cx="130" cy="58" r="5" fill="#14b8a6" />
      <circle cx="130" cy="86" r="5" fill="#14b8a6" />
      <rect x="12" y="12" width="75" height="18" rx="9" fill="#14b8a6" opacity="0.2" />
      <text x="49.5" y="24" fill="#14b8a6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">ANTEBRAZOS</text>
    </svg>
  `),

  treadmill: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="cardioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="100%" stop-color="#f97316" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <!-- Treadmill belt & console -->
      <line x1="40" y1="125" x2="160" y2="120" stroke="#3f3f46" stroke-width="8" stroke-linecap="round" />
      <line x1="140" y1="120" x2="148" y2="70" stroke="#52525b" stroke-width="5" stroke-linecap="round" />
      <rect x="142" y="65" width="16" height="10" rx="2" fill="#ef4444" />
      <!-- Runner figure in sprint -->
      <circle cx="95" cy="52" r="7" fill="#a1a1aa" />
      <line x1="95" y1="59" x2="102" y2="88" stroke="url(#cardioGrad)" stroke-width="7" stroke-linecap="round" />
      <!-- Running legs stride -->
      <path d="M 102 88 L 80 102 L 72 122" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <path d="M 102 88 L 122 95 L 128 118" fill="none" stroke="#71717a" stroke-width="5" stroke-linecap="round" />
      <rect x="12" y="12" width="60" height="18" rx="9" fill="#ef4444" opacity="0.2" />
      <text x="42" y="24" fill="#ef4444" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">CARDIO</text>
    </svg>
  `),

  kettlebell_swing: createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
      <defs>
        <linearGradient id="swingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="#18181b" rx="12" />
      <line x1="30" y1="130" x2="170" y2="130" stroke="#27272a" stroke-width="4" stroke-linecap="round" />
      <!-- Standing figure with hip drive -->
      <circle cx="85" cy="46" r="7" fill="#a1a1aa" />
      <line x1="85" y1="53" x2="88" y2="92" stroke="url(#swingGrad)" stroke-width="8" stroke-linecap="round" />
      <line x1="88" y1="92" x2="84" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <line x1="88" y1="92" x2="94" y2="128" stroke="#71717a" stroke-width="6" stroke-linecap="round" />
      <!-- Arms swinging kettlebell forward -->
      <line x1="85" y1="60" x2="125" y2="60" stroke="#a1a1aa" stroke-width="4" stroke-linecap="round" />
      <!-- Kettlebell ball & handle -->
      <circle cx="132" cy="60" r="8" fill="#8b5cf6" />
      <circle cx="130" cy="54" r="4" fill="none" stroke="#e4e4e7" stroke-width="2" />
      <rect x="12" y="12" width="85" height="18" rx="9" fill="#8b5cf6" opacity="0.2" />
      <text x="54.5" y="24" fill="#8b5cf6" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">FULL BODY</text>
    </svg>
  `),
};

export const PRESET_OPTIONS = [
  // Pecho
  { key: 'bench_press', label: 'Press de Banca Plano', muscle: 'Pecho', url: EXERCISE_IMAGES.bench_press },
  { key: 'incline_press', label: 'Press Inclinado', muscle: 'Pecho', url: EXERCISE_IMAGES.incline_press },
  { key: 'chest_fly', label: 'Cruce de Poleas / Aperturas', muscle: 'Pecho', url: EXERCISE_IMAGES.chest_fly },
  { key: 'chest_dips', label: 'Fondos en Paralelas (Dips)', muscle: 'Pecho', url: EXERCISE_IMAGES.chest_dips },
  { key: 'pushups', label: 'Flexiones de Pecho', muscle: 'Pecho', url: EXERCISE_IMAGES.pushups },

  // Piernas y Glúteos
  { key: 'squat', label: 'Sentadillas con Barra', muscle: 'Piernas', url: EXERCISE_IMAGES.squat },
  { key: 'leg_press', label: 'Prensa de Piernas 45°', muscle: 'Piernas', url: EXERCISE_IMAGES.leg_press },
  { key: 'bulgarian_split_squat', label: 'Sentadilla Búlgara', muscle: 'Piernas', url: EXERCISE_IMAGES.bulgarian_split_squat },
  { key: 'leg_extension', label: 'Extensión de Cuádriceps', muscle: 'Piernas', url: EXERCISE_IMAGES.leg_extension },
  { key: 'leg_curl', label: 'Curl Femoral', muscle: 'Piernas', url: EXERCISE_IMAGES.leg_curl },
  { key: 'romanian_deadlift', label: 'Peso Muerto Rumano', muscle: 'Piernas', url: EXERCISE_IMAGES.romanian_deadlift },
  { key: 'calf_raises', label: 'Elevación de Gemelos', muscle: 'Piernas', url: EXERCISE_IMAGES.calf_raises },
  { key: 'hip_thrust', label: 'Hip Thrust con Barra', muscle: 'Glúteos', url: EXERCISE_IMAGES.hip_thrust },

  // Espalda
  { key: 'deadlift', label: 'Peso Muerto Convencional', muscle: 'Espalda', url: EXERCISE_IMAGES.deadlift },
  { key: 'pullups', label: 'Dominadas', muscle: 'Espalda', url: EXERCISE_IMAGES.pullups },
  { key: 'lat_pulldown', label: 'Jalón al Pecho en Polea', muscle: 'Espalda', url: EXERCISE_IMAGES.lat_pulldown },
  { key: 'barbell_row', label: 'Remo con Barra', muscle: 'Espalda', url: EXERCISE_IMAGES.barbell_row },
  { key: 'seated_row', label: 'Remo Gironda en Polea Baja', muscle: 'Espalda', url: EXERCISE_IMAGES.seated_row },
  { key: 'dumbbell_row', label: 'Remo con Mancuerna (Serrucho)', muscle: 'Espalda', url: EXERCISE_IMAGES.dumbbell_row },
  { key: 'face_pull', label: 'Face Pull con Cuerda', muscle: 'Espalda', url: EXERCISE_IMAGES.face_pull },

  // Hombros
  { key: 'shoulder_press', label: 'Press Militar de Hombros', muscle: 'Hombros', url: EXERCISE_IMAGES.shoulder_press },
  { key: 'arnold_press', label: 'Press Arnold', muscle: 'Hombros', url: EXERCISE_IMAGES.arnold_press },
  { key: 'lateral_raises', label: 'Elevaciones Laterales', muscle: 'Hombros', url: EXERCISE_IMAGES.lateral_raises },
  { key: 'rear_delt_fly', label: 'Pájaros / Deltoides Posterior', muscle: 'Hombros', url: EXERCISE_IMAGES.rear_delt_fly },

  // Bíceps
  { key: 'biceps_curl', label: 'Curl de Bíceps con Mancuernas', muscle: 'Bíceps', url: EXERCISE_IMAGES.biceps_curl },
  { key: 'hammer_curl', label: 'Curl Martillo', muscle: 'Bíceps', url: EXERCISE_IMAGES.hammer_curl },
  { key: 'preacher_curl', label: 'Curl Predicador en Banco Scott', muscle: 'Bíceps', url: EXERCISE_IMAGES.preacher_curl },

  // Tríceps
  { key: 'triceps_pushdown', label: 'Extensión de Tríceps en Polea', muscle: 'Tríceps', url: EXERCISE_IMAGES.triceps_pushdown },
  { key: 'skullcrushers', label: 'Press Francés con Barra Z', muscle: 'Tríceps', url: EXERCISE_IMAGES.skullcrushers },
  { key: 'overhead_triceps', label: 'Extensión Trasnuca en Polea', muscle: 'Tríceps', url: EXERCISE_IMAGES.overhead_triceps },

  // Core / Abdomen
  { key: 'abs_plank', label: 'Plancha Abdominal', muscle: 'Abdomen / Core', url: EXERCISE_IMAGES.abs_plank },
  { key: 'hanging_leg_raise', label: 'Elevación de Piernas Colgado', muscle: 'Abdomen / Core', url: EXERCISE_IMAGES.hanging_leg_raise },
  { key: 'cable_crunch', label: 'Crunch en Polea', muscle: 'Abdomen / Core', url: EXERCISE_IMAGES.cable_crunch },
  { key: 'ab_wheel', label: 'Rueda Abdominal (Ab Wheel)', muscle: 'Abdomen / Core', url: EXERCISE_IMAGES.ab_wheel },

  // Antebrazos
  { key: 'wrist_curl', label: 'Curl de Muñeca con Barra', muscle: 'Antebrazos', url: EXERCISE_IMAGES.wrist_curl },

  // Cardio & Full Body
  { key: 'treadmill', label: 'Cinta de Correr / Cardio', muscle: 'Cardio', url: EXERCISE_IMAGES.treadmill },
  { key: 'kettlebell_swing', label: 'Kettlebell Swing', muscle: 'Cuerpo Completo', url: EXERCISE_IMAGES.kettlebell_swing },
];
