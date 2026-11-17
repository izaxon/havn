/** SVG pieces for the archipelago (Skärgård) extension: sea, lake, gold, ships and the pirate. */

const SEA_COLORS = { sea: "#2a5d73", lake: "#3f8090", gold: "#6b4a1e" };

export function SeaPatterns() {
  return (
    <>
      <pattern id="terrain-sea" width="48" height="24" patternUnits="userSpaceOnUse">
        <rect width="48" height="24" fill={SEA_COLORS.sea} />
        <path d="M0 8 Q12 2 24 8 T48 8" fill="none" stroke="#3d7a90" strokeWidth="2" opacity="0.8" />
        <path d="M0 18 Q12 12 24 18 T48 18" fill="none" stroke="#214b5c" strokeWidth="2" />
      </pattern>
      <pattern id="terrain-lake" width="40" height="22" patternUnits="userSpaceOnUse">
        <rect width="40" height="22" fill={SEA_COLORS.lake} />
        <path d="M2 8 Q10 4 18 8" fill="none" stroke="#7fb8c0" strokeWidth="1.6" opacity="0.8" />
        <path d="M20 17 Q28 13 36 17" fill="none" stroke="#7fb8c0" strokeWidth="1.6" opacity="0.6" />
      </pattern>
      <pattern id="terrain-gold" width="70" height="60" patternUnits="userSpaceOnUse">
        <rect width="70" height="60" fill={SEA_COLORS.gold} />
        <path d="M-6 40 Q18 22 36 36 T76 26" fill="none" stroke="#3f8aa0" strokeWidth="8" />
        <path d="M-6 40 Q18 22 36 36 T76 26" fill="none" stroke="#9ed2dc" strokeWidth="2" opacity="0.7" />
        <polygon points="14,8 20,14 14,20 8,14" fill="#ffd95a" stroke="#fff3c4" strokeWidth="1" />
        <polygon points="52,6 56,10 52,14 48,10" fill="#ffd95a" stroke="#fff3c4" strokeWidth="1" />
        <polygon points="56,46 61,51 56,56 51,51" fill="#ffd95a" stroke="#fff3c4" strokeWidth="1" />
        <circle cx="30" cy="54" r="2" fill="#ffd95a" />
      </pattern>
    </>
  );
}

/** An upright boat at the middle of an edge (upright reads better than rotated on steep edges). */
export function ShipPiece({
  x1,
  y1,
  x2,
  y2,
  fill,
  stroke,
  selected,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fill: string;
  stroke: string;
  selected?: boolean;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g transform={`translate(${mx} ${my + 4}) scale(1.1)`} pointerEvents="none">
      {selected && <circle r="34" fill="none" stroke="#f3efe6" strokeWidth="3" strokeDasharray="6 4" />}
      <ellipse cx="0" cy="14" rx="26" ry="4.5" fill="#0b0907" opacity="0.35" />
      <path d="M-26,2 L26,2 L17,14 L-17,14 Z" fill={fill} stroke={stroke} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M-1,0 L-1,-26 L18,-2 Z" fill="#f3efe6" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-5,0 L-5,-19 L-19,-2 Z" fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

/** The pirate: a black ship with a red pennant, haloed when it must move. */
export function PiratePiece({ x, y, pulse }: { x: number; y: number; pulse?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      {pulse && (
        <circle r="44" fill="none" stroke="#f3efe6" strokeWidth="2.5" strokeDasharray="6 5">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
        </circle>
      )}
      <ellipse cx="0" cy="22" rx="30" ry="5" fill="#0b0907" opacity="0.4" />
      <path d="M-30,8 L30,8 L20,22 L-20,22 Z" fill="#161210" stroke="#c8c2b6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M-2,6 L-2,-30 L22,4 Z" fill="#26201c" stroke="#c8c2b6" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-6,6 L-6,-22 L-24,4 Z" fill="#26201c" stroke="#c8c2b6" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-2,-30 L-16,-36 L-2,-40 Z" fill="#b42318" />
      <circle cx="8" cy="-8" r="4" fill="#efe6d2" />
    </g>
  );
}
