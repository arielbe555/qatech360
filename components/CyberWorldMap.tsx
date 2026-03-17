"use client";

import { motion } from "framer-motion";

// ================================================================
// CONTINENT SVG PATHS — equirectangular projection, viewBox 0 0 1000 500
// Coordinate mapping: longitude [-180,180] -> x [0,1000], latitude [90,-90] -> y [0,500]
// x = (lon + 180) / 360 * 1000
// y = (90 - lat) / 180 * 500
// ================================================================

const NORTH_AMERICA =
  "M 95,55 L 115,50 L 140,48 L 165,52 L 185,58 L 200,65 L 210,75 " +
  "L 215,90 L 210,105 L 205,118 L 198,130 L 190,140 L 182,150 " +
  "L 175,158 L 168,165 L 160,172 L 155,180 L 150,190 L 145,200 " +
  "L 140,208 L 135,215 L 130,225 L 125,232 L 120,240 L 118,250 " +
  "L 120,258 L 125,265 L 130,270 L 135,275 L 140,278 L 148,282 " +
  "L 155,285 L 162,288 L 168,292 L 172,298 L 170,305 L 165,310 " +
  "L 158,315 L 150,318 L 142,320 L 135,322 L 128,320 L 122,316 " +
  "L 116,310 L 110,302 L 105,295 L 100,285 L 95,275 L 90,265 " +
  "L 85,255 L 82,245 L 80,235 L 78,225 L 76,215 L 75,205 " +
  "L 74,195 L 73,185 L 72,175 L 70,165 L 68,155 L 66,145 " +
  "L 64,135 L 62,125 L 60,115 L 58,105 L 57,95 L 58,85 " +
  "L 63,75 L 70,67 L 80,60 Z";

const SOUTH_AMERICA =
  "M 215,265 L 225,258 L 235,255 L 245,255 L 255,258 L 265,263 " +
  "L 272,270 L 278,280 L 282,292 L 284,305 L 284,318 L 282,330 " +
  "L 278,342 L 272,353 L 265,363 L 258,372 L 250,380 L 242,387 " +
  "L 234,393 L 226,398 L 218,402 L 210,405 L 204,407 L 200,408 " +
  "L 196,407 L 192,404 L 188,400 L 185,394 L 182,387 L 180,380 " +
  "L 178,372 L 177,364 L 176,356 L 175,348 L 174,340 L 173,330 " +
  "L 172,320 L 172,310 L 173,300 L 175,290 L 178,280 L 182,272 " +
  "L 187,266 L 195,262 L 205,261 Z";

const EUROPE =
  "M 460,55 L 470,52 L 482,50 L 495,50 L 507,52 L 517,56 " +
  "L 525,62 L 530,68 L 532,75 L 530,82 L 525,88 L 518,93 " +
  "L 520,98 L 525,103 L 528,110 L 526,117 L 520,122 L 512,126 " +
  "L 505,128 L 498,130 L 492,133 L 488,138 L 486,145 L 485,152 " +
  "L 483,158 L 480,163 L 476,167 L 470,170 L 464,172 L 458,172 " +
  "L 452,170 L 447,166 L 443,160 L 440,153 L 438,146 L 437,138 " +
  "L 437,130 L 438,122 L 440,115 L 443,108 L 447,102 L 450,96 " +
  "L 452,89 L 452,82 L 450,75 L 447,68 L 445,61 L 448,56 Z";

const AFRICA =
  "M 468,172 L 480,168 L 492,166 L 504,165 L 516,166 L 526,170 " +
  "L 534,176 L 540,184 L 544,194 L 546,205 L 546,216 L 544,227 " +
  "L 540,238 L 534,248 L 527,257 L 520,265 L 512,272 L 504,278 " +
  "L 498,284 L 494,290 L 492,298 L 492,307 L 493,316 L 496,325 " +
  "L 500,332 L 504,338 L 507,343 L 508,348 L 506,352 L 502,354 " +
  "L 496,354 L 490,352 L 484,348 L 478,342 L 472,334 L 466,324 " +
  "L 461,313 L 457,302 L 454,290 L 452,278 L 451,266 L 451,254 " +
  "L 452,242 L 454,230 L 457,218 L 460,207 L 462,196 L 463,185 " +
  "L 463,175 Z";

const ASIA =
  "M 530,48 L 550,44 L 575,42 L 600,40 L 625,40 L 650,42 " +
  "L 672,45 L 692,50 L 710,56 L 725,62 L 737,70 L 746,78 " +
  "L 752,88 L 755,98 L 755,108 L 752,118 L 746,127 L 738,135 " +
  "L 730,142 L 722,148 L 714,154 L 706,160 L 698,166 L 690,172 " +
  "L 682,178 L 674,184 L 665,190 L 656,196 L 647,201 L 638,206 " +
  "L 629,210 L 620,213 L 611,215 L 602,216 L 593,216 L 584,214 " +
  "L 575,211 L 566,207 L 558,202 L 550,196 L 543,190 L 537,183 " +
  "L 532,176 L 528,168 L 526,160 L 525,152 L 526,144 L 528,136 " +
  "L 531,128 L 534,120 L 536,112 L 536,104 L 534,96 L 531,88 " +
  "L 528,80 L 526,72 L 526,64 L 527,56 Z";

const AUSTRALIA =
  "M 718,285 L 732,278 L 746,274 L 760,272 L 773,273 L 784,277 " +
  "L 793,284 L 800,293 L 804,303 L 805,314 L 803,325 L 798,334 " +
  "L 790,342 L 780,348 L 769,352 L 757,354 L 745,353 L 734,349 " +
  "L 724,343 L 716,335 L 710,326 L 706,316 L 705,306 L 706,296 " +
  "L 710,288 Z";

const ANTARCTICA =
  "M 50,460 L 150,455 L 250,452 L 350,450 L 450,450 L 550,450 " +
  "L 650,451 L 750,453 L 850,456 L 950,460 L 960,470 L 900,475 " +
  "L 800,478 L 700,480 L 600,481 L 500,481 L 400,480 L 300,478 " +
  "L 200,475 L 100,472 L 40,468 Z";

// ================================================================
// LATAM CITY NODES
// City coordinates in (lon, lat) -> SVG (x, y)
// x = (lon + 180) / 360 * 1000
// y = (90 - lat) / 180 * 500
// ================================================================
interface CityNode {
  id: string;
  name: string;
  lon: number;
  lat: number;
  delay: number;
}

const CITY_NODES: CityNode[] = [
  { id: "cdmx",   name: "Ciudad de México",  lon: -99.1,  lat: 19.4,  delay: 0.0 },
  { id: "bogota", name: "Bogotá",            lon: -74.1,  lat: 4.7,   delay: 0.3 },
  { id: "sao",    name: "São Paulo",         lon: -46.6,  lat: -23.5, delay: 0.6 },
  { id: "baires", name: "Buenos Aires",      lon: -58.4,  lat: -34.6, delay: 0.9 },
  { id: "lima",   name: "Lima",              lon: -77.0,  lat: -12.0, delay: 1.2 },
  { id: "stgo",   name: "Santiago",          lon: -70.7,  lat: -33.5, delay: 1.5 },
  { id: "miami",  name: "Miami",             lon: -80.2,  lat: 25.8,  delay: 1.8 },
];

function lonLatToXY(lon: number, lat: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  };
}

// Pre-compute city positions
const cityPositions = CITY_NODES.map((city) => ({
  ...city,
  ...lonLatToXY(city.lon, city.lat),
}));

// ================================================================
// CONNECTION PAIRS between cities
// ================================================================
const CONNECTIONS: Array<[string, string]> = [
  ["cdmx",   "bogota"],
  ["bogota",  "lima"],
  ["bogota",  "sao"],
  ["lima",    "stgo"],
  ["lima",    "baires"],
  ["sao",     "baires"],
  ["cdmx",    "miami"],
  ["miami",   "bogota"],
];

// ================================================================
// GRID LINES (lat/long)
// ================================================================
function buildGridLines() {
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];

  // Longitude lines every 30°
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * 1000;
    lines.push({ x1: x, y1: 0, x2: x, y2: 500, key: `lon-${lon}` });
  }

  // Latitude lines every 30°
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = ((90 - lat) / 180) * 500;
    lines.push({ x1: 0, y1: y, x2: 1000, y2: y, key: `lat-${lat}` });
  }

  return lines;
}

const GRID_LINES = buildGridLines();

// ================================================================
// ANIMATED CONNECTION LINE
// ================================================================
interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

function ConnectionLine({ x1, y1, x2, y2, delay }: ConnectionLineProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgba(0,212,255,0.3)"
      strokeWidth="0.8"
      strokeDasharray={`6 4`}
      strokeLinecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from={length}
        to={-length}
        dur="4s"
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </line>
  );
}

// ================================================================
// CITY NODE — pulsing dot using Framer Motion
// ================================================================
interface CityDotProps {
  x: number;
  y: number;
  name: string;
  delay: number;
}

function CityDot({ x, y, name, delay }: CityDotProps) {
  return (
    <g>
      {/* Outer pulse ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill="none"
        stroke="rgba(0,212,255,0.5)"
        strokeWidth="1"
        animate={{ r: [6, 14, 6], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: "easeOut" }}
      />
      {/* Middle ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={5}
        fill="none"
        stroke="rgba(0,212,255,0.6)"
        strokeWidth="1"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay + 0.2, ease: "easeInOut" }}
      />
      {/* Core dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={3}
        fill="#00D4FF"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 4px #00D4FF)" }}
      />
      {/* City label */}
      <text
        x={x + 6}
        y={y - 5}
        fill="rgba(0,212,255,0.8)"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="0.5"
      >
        {name}
      </text>
    </g>
  );
}

// ================================================================
// MAIN COMPONENT
// ================================================================
export default function CyberWorldMap({ className = "" }: { className?: string }) {
  // Build connection pairs with resolved positions
  const connectionPairs = CONNECTIONS.map(([fromId, toId], i) => {
    const from = cityPositions.find((c) => c.id === fromId)!;
    const to = cityPositions.find((c) => c.id === toId)!;
    return { from, to, delay: i * 0.5 };
  });

  return (
    <svg
      viewBox="0 0 1000 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Background fill ── */}
      <rect width="1000" height="500" fill="#0A0A0A" />

      {/* ── Radial glow centered on LATAM ── */}
      <defs>
        <radialGradient id="latam-glow" cx="24%" cy="58%" r="38%">
          <stop offset="0%"   stopColor="rgba(0,112,243,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="global-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="rgba(0,70,160,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1000" height="500" fill="url(#global-glow)" />
      <rect width="1000" height="500" fill="url(#latam-glow)" />

      {/* ── Grid lines (lat/long) ── */}
      <g opacity="1">
        {GRID_LINES.map((line) => (
          <line
            key={line.key}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(0,112,243,0.15)"
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* ── Continents ── */}
      <g filter="url(#glow-filter)">
        {[
          { d: NORTH_AMERICA, key: "na" },
          { d: SOUTH_AMERICA, key: "sa" },
          { d: EUROPE,        key: "eu" },
          { d: AFRICA,        key: "af" },
          { d: ASIA,          key: "as" },
          { d: AUSTRALIA,     key: "au" },
          { d: ANTARCTICA,    key: "an" },
        ].map(({ d, key }) => (
          <path
            key={key}
            d={d}
            fill="rgba(0,70,160,0.3)"
            stroke="rgba(0,212,255,0.4)"
            strokeWidth="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* ── Connection lines between LATAM cities ── */}
      <g>
        {connectionPairs.map(({ from, to, delay }, i) => (
          <ConnectionLine
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            delay={delay}
          />
        ))}
      </g>

      {/* ── City nodes ── */}
      <g filter="url(#glow-filter)">
        {cityPositions.map((city) => (
          <CityDot
            key={city.id}
            x={city.x}
            y={city.y}
            name={city.name}
            delay={city.delay}
          />
        ))}
      </g>

      {/* ── Equator highlight ── */}
      <line
        x1="0"
        y1="250"
        x2="1000"
        y2="250"
        stroke="rgba(0,212,255,0.2)"
        strokeWidth="1"
        strokeDasharray="8 4"
      />

      {/* ── Tropic of Cancer / Capricorn subtle markers ── */}
      {/* Tropic of Cancer: lat 23.5° -> y = (90-23.5)/180*500 ≈ 184 */}
      <line x1="0" y1="184" x2="1000" y2="184" stroke="rgba(0,112,243,0.1)" strokeWidth="0.5" strokeDasharray="4 6" />
      {/* Tropic of Capricorn: lat -23.5° -> y = (90+23.5)/180*500 ≈ 316 */}
      <line x1="0" y1="316" x2="1000" y2="316" stroke="rgba(0,112,243,0.1)" strokeWidth="0.5" strokeDasharray="4 6" />

      {/* ── Corner scan-line decoration ── */}
      <rect
        x="0" y="0" width="60" height="60"
        fill="none"
        stroke="rgba(0,212,255,0.25)"
        strokeWidth="1.5"
        strokeDasharray="20 40"
      />
      <rect
        x="940" y="440" width="60" height="60"
        fill="none"
        stroke="rgba(0,212,255,0.25)"
        strokeWidth="1.5"
        strokeDasharray="20 40"
      />
    </svg>
  );
}
