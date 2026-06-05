/** Global emerald brand palette — single source for UI + charts */
export const brandHex = {
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  teal500: '#14b8a6',
  teal600: '#0d9488',
  green500: '#22c55e',
  green600: '#16a34a',
  cyan500: '#06b6d4',
} as const

export const CHART_PALETTE = [
  brandHex.emerald600,
  brandHex.teal500,
  brandHex.green500,
  brandHex.emerald500,
  brandHex.teal600,
  brandHex.cyan500,
  brandHex.green600,
  '#84cc16',
] as const

export const brandGradient = 'from-emerald-600 via-teal-600 to-green-600'
export const brandGradientLight = 'from-emerald-500 via-teal-500 to-green-500'
export const brandAccentBar = '[--accent-from:#059669] [--accent-to:#14b8a6]'
