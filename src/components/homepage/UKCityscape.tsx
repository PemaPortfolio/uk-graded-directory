'use client'

interface UKCityscapeProps {
  className?: string
}

/**
 * Appliance Silhouette Background
 *
 * Beautiful layered background featuring graded appliance silhouettes
 * creating an artistic "skyline" effect that's on-brand for the directory.
 *
 * Features:
 * - Washing machines with circular doors
 * - Refrigerators and fridge-freezers
 * - Dishwashers
 * - Ovens and cookers
 * - Tumble dryers
 * - American-style fridges
 * - Range cookers
 * - Layered depth with atmospheric fade
 * - Subtle warm accent lighting
 */
export default function UKCityscape({ className = '' }: UKCityscapeProps) {
  return (
    <svg
      viewBox="0 0 1440 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        {/* Sky gradient with warm tones */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8f6f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#f5f0f0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ede8e8" stopOpacity="0.85" />
        </linearGradient>

        {/* Appliance body gradient for depth */}
        <linearGradient id="applianceShade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>

        {/* Glass/door reflection */}
        <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>

        {/* Washing machine door gradient */}
        <radialGradient id="drumGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
        </radialGradient>

        {/* Atmospheric mist */}
        <linearGradient id="mistLayer" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f0eded" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f0eded" stopOpacity="0" />
        </linearGradient>

        {/* Warm glow for accents */}
        <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e85d4c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e85d4c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background sky wash */}
      <rect x="0" y="0" width="1440" height="480" fill="url(#skyGradient)" />

      {/* Main appliance group */}
      <g transform="translate(0, 140)">

        {/* ========== BACK LAYER - Distant appliances (opacity 0.25) ========== */}
        <g opacity="0.25">
          {/* Large American fridge - far left */}
          <g transform="translate(-30, 80)">
            <rect x="0" y="0" width="90" height="240" rx="4" fill="#d1cccc" />
            <rect x="0" y="0" width="44" height="240" rx="4" fill="#ccc7c7" />
            <line x1="44" y1="10" x2="44" y2="230" stroke="#bab5b5" strokeWidth="2" />
            <rect x="8" y="20" width="28" height="8" rx="2" fill="#bab5b5" />
            <rect x="52" y="20" width="28" height="8" rx="2" fill="#bab5b5" />
          </g>

          {/* Washing machine */}
          <g transform="translate(100, 160)">
            <rect x="0" y="0" width="75" height="80" rx="3" fill="#d1cccc" />
            <circle cx="37.5" cy="45" r="25" fill="#c5c0c0" />
            <circle cx="37.5" cy="45" r="20" fill="#ccc7c7" />
            <rect x="10" y="8" width="55" height="12" rx="2" fill="#c5c0c0" />
          </g>

          {/* Tall fridge */}
          <g transform="translate(220, 60)">
            <rect x="0" y="0" width="70" height="180" rx="3" fill="#d1cccc" />
            <rect x="0" y="0" width="70" height="50" rx="3" fill="#ccc7c7" />
            <line x1="5" y1="50" x2="65" y2="50" stroke="#bab5b5" strokeWidth="1" />
            <rect x="55" y="20" width="8" height="20" rx="2" fill="#bab5b5" />
            <rect x="55" y="80" width="8" height="30" rx="2" fill="#bab5b5" />
          </g>

          {/* Dishwasher */}
          <g transform="translate(340, 170)">
            <rect x="0" y="0" width="70" height="70" rx="3" fill="#d1cccc" />
            <rect x="5" y="8" width="60" height="8" rx="2" fill="#c5c0c0" />
            <rect x="28" y="25" width="14" height="40" rx="2" fill="#ccc7c7" />
          </g>

          {/* Range cooker */}
          <g transform="translate(900, 140)">
            <rect x="0" y="0" width="100" height="100" rx="3" fill="#d1cccc" />
            <rect x="5" y="5" width="90" height="35" rx="2" fill="#c5c0c0" />
            <circle cx="25" cy="70" r="12" fill="#ccc7c7" />
            <circle cx="50" cy="70" r="12" fill="#ccc7c7" />
            <circle cx="75" cy="70" r="12" fill="#ccc7c7" />
          </g>

          {/* Tumble dryer */}
          <g transform="translate(1050, 160)">
            <rect x="0" y="0" width="75" height="80" rx="3" fill="#d1cccc" />
            <circle cx="37.5" cy="45" r="25" fill="#c5c0c0" />
            <circle cx="37.5" cy="45" r="18" fill="#ccc7c7" />
          </g>

          {/* Fridge freezer - far right */}
          <g transform="translate(1180, 70)">
            <rect x="0" y="0" width="65" height="170" rx="3" fill="#d1cccc" />
            <rect x="0" y="0" width="65" height="60" rx="3" fill="#ccc7c7" />
            <line x1="5" y1="60" x2="60" y2="60" stroke="#bab5b5" strokeWidth="1" />
          </g>

          {/* Small fridge */}
          <g transform="translate(1300, 140)">
            <rect x="0" y="0" width="55" height="100" rx="3" fill="#d1cccc" />
            <rect x="45" y="30" width="6" height="20" rx="2" fill="#bab5b5" />
          </g>
        </g>

        {/* ========== MIDDLE LAYER - Mid-ground appliances (opacity 0.4) ========== */}
        <g opacity="0.4">
          {/* Large side-by-side fridge */}
          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="100" height="200" rx="4" fill="#c5c0c0" />
            <rect x="0" y="0" width="48" height="200" rx="4" fill="#bfbaba" />
            <line x1="48" y1="15" x2="48" y2="185" stroke="#b0abab" strokeWidth="2" />
            {/* Handles */}
            <rect x="38" y="80" width="6" height="40" rx="2" fill="#b0abab" />
            <rect x="56" y="80" width="6" height="40" rx="2" fill="#b0abab" />
            {/* Ice dispenser */}
            <rect x="10" y="60" width="28" height="35" rx="3" fill="#b5b0b0" />
            <rect x="15" y="70" width="18" height="15" rx="2" fill="#a8a2a2" />
          </g>

          {/* Washing machine with details */}
          <g transform="translate(180, 130)">
            <rect x="0" y="0" width="85" height="95" rx="4" fill="#c5c0c0" />
            {/* Control panel */}
            <rect x="5" y="5" width="75" height="18" rx="2" fill="#b5b0b0" />
            <circle cx="18" cy="14" r="6" fill="#a8a2a2" />
            <rect x="30" y="10" width="20" height="8" rx="1" fill="#a8a2a2" />
            <circle cx="65" cy="14" r="5" fill="#a8a2a2" />
            {/* Door */}
            <circle cx="42.5" cy="55" r="30" fill="#b5b0b0" />
            <circle cx="42.5" cy="55" r="25" fill="url(#drumGradient)" />
            <circle cx="42.5" cy="55" r="22" fill="#bfbaba" stroke="#a8a2a2" strokeWidth="1" />
            {/* Door handle */}
            <rect x="70" y="45" width="8" height="20" rx="2" fill="#b0abab" />
          </g>

          {/* Oven/Cooker */}
          <g transform="translate(320, 130)">
            <rect x="0" y="0" width="80" height="95" rx="4" fill="#c5c0c0" />
            {/* Hob */}
            <rect x="5" y="5" width="70" height="25" rx="2" fill="#b5b0b0" />
            <circle cx="22" cy="17" r="8" fill="#a8a2a2" />
            <circle cx="42" cy="17" r="8" fill="#a8a2a2" />
            <circle cx="62" cy="17" r="8" fill="#a8a2a2" />
            {/* Oven door */}
            <rect x="8" y="35" width="64" height="50" rx="3" fill="#b5b0b0" />
            <rect x="12" y="40" width="56" height="35" rx="2" fill="#a8a2a2" />
            {/* Handle */}
            <rect x="20" y="80" width="40" height="5" rx="2" fill="#9a9494" />
          </g>

          {/* Dishwasher */}
          <g transform="translate(450, 145)">
            <rect x="0" y="0" width="75" height="80" rx="4" fill="#c5c0c0" />
            {/* Control panel */}
            <rect x="5" y="5" width="65" height="12" rx="2" fill="#b5b0b0" />
            <circle cx="15" cy="11" r="4" fill="#a8a2a2" />
            <circle cx="30" cy="11" r="4" fill="#a8a2a2" />
            <rect x="42" y="8" width="22" height="6" rx="1" fill="#a8a2a2" />
            {/* Door */}
            <rect x="5" y="22" width="65" height="52" rx="2" fill="#b5b0b0" />
            {/* Handle */}
            <rect x="30" y="28" width="15" height="42" rx="2" fill="#a8a2a2" />
          </g>

          {/* Tall larder fridge */}
          <g transform="translate(580, 25)">
            <rect x="0" y="0" width="70" height="200" rx="4" fill="#c5c0c0" />
            <rect x="55" y="60" width="8" height="35" rx="3" fill="#b0abab" />
            {/* Shelves hint */}
            <line x1="8" y1="50" x2="55" y2="50" stroke="#b5b0b0" strokeWidth="1" />
            <line x1="8" y1="90" x2="55" y2="90" stroke="#b5b0b0" strokeWidth="1" />
            <line x1="8" y1="130" x2="55" y2="130" stroke="#b5b0b0" strokeWidth="1" />
          </g>

          {/* Washer-dryer combo */}
          <g transform="translate(700, 125)">
            <rect x="0" y="0" width="85" height="100" rx="4" fill="#c5c0c0" />
            <rect x="5" y="5" width="75" height="20" rx="2" fill="#b5b0b0" />
            <circle cx="20" cy="15" r="6" fill="#a8a2a2" />
            <circle cx="42.5" cy="15" r="6" fill="#a8a2a2" />
            <circle cx="65" cy="15" r="6" fill="#a8a2a2" />
            <circle cx="42.5" cy="60" r="28" fill="#b5b0b0" />
            <circle cx="42.5" cy="60" r="23" fill="#bfbaba" />
          </g>

          {/* Range cooker */}
          <g transform="translate(840, 110)">
            <rect x="0" y="0" width="110" height="115" rx="4" fill="#c5c0c0" />
            {/* Hob area */}
            <rect x="5" y="5" width="100" height="30" rx="2" fill="#b5b0b0" />
            <circle cx="22" cy="20" r="10" fill="#a8a2a2" />
            <circle cx="50" cy="20" r="10" fill="#a8a2a2" />
            <circle cx="78" cy="20" r="10" fill="#a8a2a2" />
            {/* Double oven */}
            <rect x="8" y="40" width="45" height="35" rx="2" fill="#b5b0b0" />
            <rect x="57" y="40" width="45" height="35" rx="2" fill="#b5b0b0" />
            <rect x="8" y="80" width="94" height="28" rx="2" fill="#b5b0b0" />
            {/* Handles */}
            <rect x="18" y="95" width="25" height="4" rx="1" fill="#9a9494" />
            <rect x="67" y="95" width="25" height="4" rx="1" fill="#9a9494" />
          </g>

          {/* Fridge freezer */}
          <g transform="translate(1000, 30)">
            <rect x="0" y="0" width="75" height="195" rx="4" fill="#c5c0c0" />
            {/* Freezer section */}
            <rect x="0" y="0" width="75" height="55" rx="4" fill="#bfbaba" />
            <line x1="5" y1="55" x2="70" y2="55" stroke="#b0abab" strokeWidth="2" />
            {/* Handles */}
            <rect x="60" y="20" width="8" height="25" rx="2" fill="#b0abab" />
            <rect x="60" y="80" width="8" height="40" rx="2" fill="#b0abab" />
          </g>

          {/* Tumble dryer */}
          <g transform="translate(1120, 130)">
            <rect x="0" y="0" width="80" height="95" rx="4" fill="#c5c0c0" />
            <rect x="5" y="5" width="70" height="15" rx="2" fill="#b5b0b0" />
            <circle cx="40" cy="55" r="28" fill="#b5b0b0" />
            <circle cx="40" cy="55" r="22" fill="#bfbaba" />
            {/* Lint filter */}
            <rect x="60" y="78" width="12" height="8" rx="2" fill="#a8a2a2" />
          </g>

          {/* Under-counter fridge */}
          <g transform="translate(1250, 140)">
            <rect x="0" y="0" width="65" height="85" rx="3" fill="#c5c0c0" />
            <rect x="50" y="25" width="8" height="25" rx="2" fill="#b0abab" />
            {/* Shelves */}
            <line x1="8" y1="30" x2="45" y2="30" stroke="#b5b0b0" strokeWidth="1" />
            <line x1="8" y1="55" x2="45" y2="55" stroke="#b5b0b0" strokeWidth="1" />
          </g>

          {/* Chest freezer */}
          <g transform="translate(1350, 165)">
            <rect x="0" y="0" width="100" height="60" rx="3" fill="#c5c0c0" />
            <rect x="5" y="0" width="90" height="10" rx="2" fill="#bfbaba" />
            <rect x="40" y="3" width="20" height="4" rx="1" fill="#a8a2a2" />
          </g>
        </g>

        {/* ========== FRONT LAYER - Closest appliances (opacity 0.6) ========== */}
        <g opacity="0.6">
          {/* Premium American fridge freezer */}
          <g transform="translate(60, 5)">
            <rect x="0" y="0" width="110" height="220" rx="5" fill="#b5b0b0" />
            <rect x="0" y="0" width="54" height="220" rx="5" fill="#b0abab" />
            <line x1="54" y1="15" x2="54" y2="205" stroke="#a5a0a0" strokeWidth="3" />
            {/* Handles */}
            <rect x="42" y="70" width="8" height="50" rx="3" fill="#a5a0a0" />
            <rect x="62" y="70" width="8" height="50" rx="3" fill="#a5a0a0" />
            {/* Ice & water dispenser */}
            <rect x="8" y="50" width="38" height="50" rx="4" fill="#a8a2a2" />
            <rect x="14" y="60" width="26" height="25" rx="3" fill="#9a9494" />
            <rect x="20" y="90" width="14" height="6" rx="2" fill="#8a8484" />
            {/* Digital display */}
            <rect x="62" y="30" width="38" height="20" rx="2" fill="#9a9494" />
          </g>

          {/* Hero washing machine */}
          <g transform="translate(220, 95)">
            <rect x="0" y="0" width="100" height="115" rx="5" fill="#b5b0b0" />
            {/* Control panel */}
            <rect x="5" y="5" width="90" height="25" rx="3" fill="#a8a2a2" />
            <circle cx="22" cy="17" r="8" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            <rect x="38" y="12" width="28" height="10" rx="2" fill="#9a9494" />
            <circle cx="80" cy="17" r="7" fill="#9a9494" />
            {/* Door */}
            <circle cx="50" cy="68" r="36" fill="#a8a2a2" />
            <circle cx="50" cy="68" r="30" fill="url(#drumGradient)" />
            <circle cx="50" cy="68" r="27" fill="#b0abab" stroke="#9a9494" strokeWidth="2" />
            {/* Glass reflection */}
            <path d="M35,50 Q45,45 55,52" stroke="#fff" strokeWidth="2" opacity="0.3" fill="none" />
            {/* Handle */}
            <rect x="85" y="55" width="10" height="26" rx="3" fill="#a5a0a0" />
          </g>

          {/* Premium oven */}
          <g transform="translate(370, 95)">
            <rect x="0" y="0" width="95" height="115" rx="5" fill="#b5b0b0" />
            {/* Hob */}
            <rect x="5" y="5" width="85" height="30" rx="3" fill="#a8a2a2" />
            <circle cx="25" cy="20" r="10" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            <circle cx="50" cy="20" r="10" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            <circle cx="75" cy="20" r="10" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            {/* Oven door with window */}
            <rect x="8" y="40" width="79" height="65" rx="3" fill="#a8a2a2" />
            <rect x="14" y="48" width="67" height="40" rx="2" fill="#9a9494" />
            <rect x="18" y="52" width="59" height="32" rx="2" fill="#8a8484" />
            {/* Handle */}
            <rect x="25" y="95" width="45" height="6" rx="2" fill="#9a9494" />
            {/* Controls */}
            <circle cx="20" cy="40" r="4" fill="#9a9494" />
            <circle cx="35" cy="40" r="4" fill="#9a9494" />
            <circle cx="60" cy="40" r="4" fill="#9a9494" />
            <circle cx="75" cy="40" r="4" fill="#9a9494" />
          </g>

          {/* Dishwasher */}
          <g transform="translate(510, 115)">
            <rect x="0" y="0" width="85" height="95" rx="5" fill="#b5b0b0" />
            {/* Control strip */}
            <rect x="5" y="5" width="75" height="15" rx="2" fill="#a8a2a2" />
            <circle cx="18" cy="12" r="5" fill="#9a9494" />
            <circle cx="35" cy="12" r="5" fill="#9a9494" />
            <rect x="48" y="8" width="26" height="8" rx="2" fill="#9a9494" />
            {/* Door panel */}
            <rect x="5" y="25" width="75" height="62" rx="3" fill="#a8a2a2" />
            {/* Integrated handle */}
            <rect x="32" y="30" width="21" height="52" rx="3" fill="#9a9494" />
            <line x1="42.5" y1="35" x2="42.5" y2="77" stroke="#8a8484" strokeWidth="2" />
          </g>

          {/* Tall fridge */}
          <g transform="translate(640, 0)">
            <rect x="0" y="0" width="80" height="210" rx="5" fill="#b5b0b0" />
            {/* Handle */}
            <rect x="65" y="60" width="10" height="50" rx="3" fill="#a5a0a0" />
            {/* Shelves visible through door */}
            <line x1="10" y1="50" x2="60" y2="50" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="10" y1="90" x2="60" y2="90" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="10" y1="130" x2="60" y2="130" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="10" y1="170" x2="60" y2="170" stroke="#a8a2a2" strokeWidth="1" />
            {/* Brand badge area */}
            <rect x="25" y="15" width="30" height="12" rx="2" fill="#a8a2a2" />
          </g>

          {/* Washer dryer stack suggestion */}
          <g transform="translate(770, 55)">
            {/* Dryer on top */}
            <rect x="0" y="0" width="90" height="75" rx="4" fill="#b5b0b0" />
            <rect x="5" y="5" width="80" height="12" rx="2" fill="#a8a2a2" />
            <circle cx="45" cy="45" r="24" fill="#a8a2a2" />
            <circle cx="45" cy="45" r="19" fill="#b0abab" />
            {/* Washer below */}
            <rect x="0" y="80" width="90" height="85" rx="4" fill="#b5b0b0" />
            <rect x="5" y="85" width="80" height="15" rx="2" fill="#a8a2a2" />
            <circle cx="45" cy="130" r="28" fill="#a8a2a2" />
            <circle cx="45" cy="130" r="23" fill="#b0abab" />
          </g>

          {/* Range cooker */}
          <g transform="translate(910, 80)">
            <rect x="0" y="0" width="120" height="130" rx="5" fill="#b5b0b0" />
            {/* Cooktop */}
            <rect x="5" y="5" width="110" height="35" rx="3" fill="#a8a2a2" />
            <circle cx="25" cy="22" r="12" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            <circle cx="55" cy="22" r="12" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            <circle cx="85" cy="22" r="12" fill="#9a9494" stroke="#8a8484" strokeWidth="1" />
            {/* Double oven */}
            <rect x="8" y="45" width="50" height="40" rx="3" fill="#a8a2a2" />
            <rect x="62" y="45" width="50" height="40" rx="3" fill="#a8a2a2" />
            <rect x="12" y="50" width="42" height="28" rx="2" fill="#9a9494" />
            <rect x="66" y="50" width="42" height="28" rx="2" fill="#9a9494" />
            {/* Warming drawer */}
            <rect x="8" y="90" width="104" height="32" rx="3" fill="#a8a2a2" />
            {/* Handles */}
            <rect x="22" y="108" width="30" height="5" rx="2" fill="#9a9494" />
            <rect x="68" y="108" width="30" height="5" rx="2" fill="#9a9494" />
          </g>

          {/* Fridge freezer */}
          <g transform="translate(1080, 0)">
            <rect x="0" y="0" width="85" height="210" rx="5" fill="#b5b0b0" />
            {/* Freezer */}
            <rect x="0" y="0" width="85" height="65" rx="5" fill="#b0abab" />
            <line x1="5" y1="65" x2="80" y2="65" stroke="#a5a0a0" strokeWidth="2" />
            {/* Handles */}
            <rect x="70" y="22" width="10" height="30" rx="3" fill="#a5a0a0" />
            <rect x="70" y="90" width="10" height="45" rx="3" fill="#a5a0a0" />
            {/* Interior hint */}
            <line x1="10" y1="100" x2="65" y2="100" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="10" y1="140" x2="65" y2="140" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="10" y1="180" x2="65" y2="180" stroke="#a8a2a2" strokeWidth="1" />
          </g>

          {/* Tumble dryer */}
          <g transform="translate(1210, 100)">
            <rect x="0" y="0" width="90" height="105" rx="5" fill="#b5b0b0" />
            {/* Control panel */}
            <rect x="5" y="5" width="80" height="18" rx="2" fill="#a8a2a2" />
            <circle cx="20" cy="14" r="6" fill="#9a9494" />
            <rect x="35" y="10" width="20" height="8" rx="2" fill="#9a9494" />
            <circle cx="70" cy="14" r="6" fill="#9a9494" />
            {/* Door */}
            <circle cx="45" cy="60" r="32" fill="#a8a2a2" />
            <circle cx="45" cy="60" r="26" fill="#b0abab" />
            <circle cx="45" cy="60" r="22" fill="#a8a2a2" opacity="0.5" />
            {/* Vent */}
            <rect x="70" y="88" width="15" height="10" rx="2" fill="#a5a0a0" />
          </g>

          {/* Mini fridge on right edge */}
          <g transform="translate(1340, 120)">
            <rect x="0" y="0" width="70" height="90" rx="4" fill="#b5b0b0" />
            <rect x="55" y="25" width="10" height="30" rx="3" fill="#a5a0a0" />
            <line x1="8" y1="35" x2="50" y2="35" stroke="#a8a2a2" strokeWidth="1" />
            <line x1="8" y1="60" x2="50" y2="60" stroke="#a8a2a2" strokeWidth="1" />
          </g>
        </g>

        {/* ========== ACCENT HIGHLIGHTS - Warm glows ========== */}
        <g>
          {/* Washing machine door glow */}
          <circle cx="270" cy="163" r="40" fill="#e85d4c" opacity="0.08" />

          {/* Oven window glow */}
          <rect x="388" y="147" width="59" height="32" rx="2" fill="#e85d4c" opacity="0.1" />

          {/* Digital displays */}
          <rect x="122" y="35" width="38" height="20" rx="2" fill="#e85d4c" opacity="0.15" />
          <rect x="256" y="107" width="28" height="10" rx="2" fill="#e85d4c" opacity="0.12" />

          {/* Dryer drum glow */}
          <circle cx="1255" cy="160" r="28" fill="#ffd700" opacity="0.08" />

          {/* Random window/display lights */}
          <rect x="680" y="15" width="30" height="12" rx="2" fill="#e85d4c" opacity="0.15" />
          <rect x="945" y="10" width="20" height="8" rx="2" fill="#ffd700" opacity="0.1" />
          <rect x="553" y="123" width="26" height="8" rx="2" fill="#e85d4c" opacity="0.12" />
        </g>

        {/* ========== ATMOSPHERIC MIST ========== */}
        <rect x="0" y="180" width="1440" height="60" fill="url(#mistLayer)" />

        {/* Ground shadow line */}
        <rect x="0" y="236" width="1440" height="4" fill="#c5c0c0" opacity="0.4" />

      </g>{/* End main transform group */}
    </svg>
  )
}
