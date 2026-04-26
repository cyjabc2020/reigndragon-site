"use client";

import { useEffect, useRef, useState } from "react";

const PIXEL = 7;

const C = {
  body: "#2a8fa8",
  bodyDark: "#13434f",
  bodyLight: "#5cc4dc",
  belly: "#cdeef4",
  bellyShade: "#7bbecc",
  horn: "#f1ead4",
  hornShade: "#8a7e5b",
  spine: "#ffd166",
  spineShade: "#c48a1a",
  eyeWhite: "#ffffff",
  pupil: "#0a0a0f",
  claw: "#0a0a0f",
  fire1: "#fff7d6",
  fire2: "#ffd166",
  fire3: "#ff8a3d",
  fire4: "#ef476f",
};

type Cell = string | 0;

// Dragon faces LEFT, in a perched/sitting pose — head held high on a long
// S-curved neck, slim body, tail curling around the right side. This makes
// the silhouette taller than wide, reading as a serpentine dragon rather
// than a chubby creature.
// 16 cols × 18 rows.
const SPRITE: Cell[][] = (() => {
  const _ = 0 as const;
  const B = C.body;
  const D = C.bodyDark;
  const L = C.bodyLight;
  const Y = C.belly;
  const Z = C.bellyShade;
  const H = C.horn;
  const S = C.hornShade;
  const R = C.spine;
  const Q = C.spineShade;
  const W = C.eyeWhite;
  const P = C.pupil;
  const K = C.claw;
  return [
    /*  0 - horn tips                                                       */
    [_, _, _, _, _, H, _, H, _, _, _, _, _, _, _, _],
    /*  1 - horn bases                                                      */
    [_, _, _, _, H, S, H, S, _, _, _, _, _, _, _, _],
    /*  2 - head crown                                                      */
    [_, _, _, _, D, B, L, B, D, _, _, _, _, _, _, _],
    /*  3 - brow + back of head                                             */
    [_, _, _, D, B, B, B, B, B, D, _, _, _, _, _, _],
    /*  4 - eye row                                                         */
    [_, _, D, B, W, P, B, B, B, D, _, _, _, _, _, _],
    /*  5 - snout, cheek, jaw line                                          */
    [_, D, B, B, W, P, B, B, B, B, D, _, _, _, _, _],
    /*  6 - long snout extending forward; mouth opening (col 0-2)           */
    [D, B, B, B, B, B, B, B, B, B, D, _, _, _, _, _],
    /*  7 - mouth opening + nostril; jaw curve down to neck                 */
    [D, P, _, _, P, B, B, B, B, D, _, _, _, _, _, _],
    /*  8 - chin tucking back; long neck begins (S-curve)                   */
    [_, D, B, B, B, B, B, B, D, _, _, _, _, _, _, _],
    /*  9 - neck slimming, swept back                                       */
    [_, _, D, B, B, B, B, D, _, _, _, _, _, _, _, _],
    /* 10 - shoulder + spine spike on top                                   */
    [_, _, _, D, B, B, B, B, D, _, R, _, _, _, _, _],
    /* 11 - chest + back; spine spikes along the back                       */
    [_, _, D, B, Y, B, B, B, B, R, Q, R, _, _, _, _],
    /* 12 - body widens slightly (chest), tail base                         */
    [_, _, D, B, Y, Y, B, B, B, B, B, B, D, _, _, _],
    /* 13 - belly + tail begins curling up & right                          */
    [_, _, D, B, Y, Y, B, B, B, B, B, D, B, D, _, _],
    /* 14 - underbelly + tail curl                                          */
    [_, _, _, D, B, Y, B, B, B, B, D, B, B, D, R, _],
    /* 15 - haunches + leg tops + tail tip                                  */
    [_, _, _, _, D, B, B, B, B, D, B, B, D, _, R, Q],
    /* 16 - legs                                                            */
    [_, _, _, _, D, B, D, _, D, B, D, D, _, _, _, _],
    /* 17 - claws                                                           */
    [_, _, _, _, K, K, _, _, K, K, _, _, _, _, _, _],
  ];
})();

const ROWS = SPRITE.length;
const COLS = SPRITE[0].length;

// Wing two-frame animation. Anchored to the dragon's back, just behind the
// shoulder. A bat-style membrane: dark "fingers" with lighter membrane between.
const WING_DOWN: Cell[][] = (() => {
  const _ = 0 as const;
  const B = C.body;
  const D = C.bodyDark;
  const L = C.bodyLight;
  // 12 cols × 9 rows — wing folded down/back along the body
  return [
    [D, D, _, _, _, _, _, _, _, _, _, _],
    [D, L, D, D, _, _, _, _, _, _, _, _],
    [D, B, L, B, D, D, _, _, _, _, _, _],
    [D, B, B, L, B, B, D, D, _, _, _, _],
    [D, B, B, B, L, B, B, B, D, D, _, _],
    [_, D, B, B, B, L, B, B, B, B, D, _],
    [_, _, D, B, B, B, L, B, B, B, B, D],
    [_, _, _, D, D, B, B, L, B, B, D, _],
    [_, _, _, _, _, D, D, D, D, D, _, _],
  ];
})();

const WING_UP: Cell[][] = (() => {
  const _ = 0 as const;
  const B = C.body;
  const D = C.bodyDark;
  const L = C.bodyLight;
  // Wing raised up, fingers fanned upward
  return [
    [_, _, D, _, _, D, _, _, D, _, _, _],
    [_, D, B, D, D, B, D, D, B, D, _, _],
    [_, D, B, B, B, L, B, B, B, B, D, _],
    [D, B, B, L, B, B, B, L, B, B, B, D],
    [D, B, L, B, B, L, B, B, B, B, D, _],
    [D, B, B, B, L, B, B, B, B, D, _, _],
    [D, L, B, B, B, B, B, B, D, _, _, _],
    [D, D, B, B, B, B, D, D, _, _, _, _],
    [_, _, D, D, D, D, _, _, _, _, _, _],
  ];
})();

function PixelGrid({
  grid,
  pixel = PIXEL,
}: {
  grid: Cell[][];
  pixel?: number;
}) {
  const w = grid[0].length * pixel;
  const h = grid.length * pixel;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * pixel}
              y={y * pixel}
              width={pixel}
              height={pixel}
              fill={cell}
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function Dragon() {
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [firing, setFiring] = useState(false);
  const [angry, setAngry] = useState(false);
  const [fireKey, setFireKey] = useState(0);
  const fireTimer = useRef<number | null>(null);
  const angryTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("dragon-dismissed") === "1") {
        setDismissed(true);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    return () => {
      if (fireTimer.current) window.clearTimeout(fireTimer.current);
      if (angryTimer.current) window.clearTimeout(angryTimer.current);
    };
  }, []);

  if (dismissed) return null;

  const handleClick = () => {
    // Rapid repeat clicks → angry mode
    if (firing) {
      setAngry(true);
      if (angryTimer.current) window.clearTimeout(angryTimer.current);
      angryTimer.current = window.setTimeout(() => setAngry(false), 1600);
    }

    // Bump the key so each click remounts the fire element and CSS
    // animations restart cleanly. The timeout matches the longest fire-pixel
    // animation: 0.85s base + (count - 1) * 55ms stagger, plus a small buffer.
    setFireKey((k) => k + 1);
    setFiring(true);
    if (fireTimer.current) window.clearTimeout(fireTimer.current);
    fireTimer.current = window.setTimeout(() => setFiring(false), 1200);
  };

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem("dragon-dismissed", "1");
    } catch {
      // ignore
    }
  };

  const spriteW = COLS * PIXEL;
  const spriteH = ROWS * PIXEL;
  const wingW = WING_UP[0].length * PIXEL;
  const wingH = WING_UP.length * PIXEL;
  // Fire breathes from the dragon's mouth on the LEFT (col 0-3, row 7).
  // The fire box sits to the LEFT of the sprite, anchored so its right
  // edge meets the mouth at col 0.
  const fireWidthPx = 14 * PIXEL;
  const fireRight = spriteW; // right edge of fire box = left edge of sprite
  const fireTop = 6 * PIXEL;
  // Wing sits on the dragon's back, anchored at the shoulder.
  const wingTop = 4 * PIXEL;
  const wingLeft = 5 * PIXEL;

  return (
    <div className="dragon-root" role="img" aria-label="ReignDragon mascot">
      <button
        type="button"
        className="dragon-dismiss"
        onClick={dismiss}
        aria-label="Hide dragon"
      >
        ×
      </button>

      <div
        className={`dragon-stage ${hovered ? "is-hover" : ""} ${
          firing ? "is-firing" : ""
        } ${angry ? "is-angry" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Wing — only visible on hover */}
        <div className="dragon-wing">
          <div className="wing-up">
            <PixelGrid grid={WING_UP} pixel={PIXEL} />
          </div>
          <div className="wing-down">
            <PixelGrid grid={WING_DOWN} pixel={PIXEL} />
          </div>
        </div>

        {/* Body */}
        <div className="dragon-body">
          <PixelGrid grid={SPRITE} pixel={PIXEL} />
        </div>

        {/* Fire puff (left of mouth) */}
        {firing && (
          <div
            key={fireKey}
            className={`dragon-fire ${angry ? "is-angry-fire" : ""}`}
          >
            {Array.from({ length: angry ? 9 : 6 }).map((_, i) => (
              <span
                key={i}
                className="fire-pixel"
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .dragon-root {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 50;
          /* Extra width on the LEFT to give the fire puff room */
          width: ${spriteW + fireWidthPx + 24}px;
          height: ${spriteH + 24}px;
          pointer-events: none;
        }

        .dragon-dismiss {
          position: absolute;
          top: 0;
          right: 0;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: var(--surface);
          color: var(--text-tertiary);
          border: 1px solid var(--border);
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease, color 0.2s ease;
          pointer-events: auto;
          z-index: 4;
          font-family: var(--font-sans), sans-serif;
          padding: 0;
        }
        .dragon-root:hover .dragon-dismiss {
          opacity: 1;
        }
        .dragon-dismiss:hover {
          color: var(--foreground);
        }

        .dragon-stage {
          position: absolute;
          right: 0;
          bottom: 0;
          width: ${spriteW}px;
          height: ${spriteH}px;
          cursor: pointer;
          pointer-events: auto;
          animation: dragon-idle 4s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
        }
        .dragon-stage.is-hover {
          animation: dragon-hover 1.5s ease-in-out infinite;
        }
        .dragon-stage.is-angry {
          animation: dragon-shake 0.32s ease-in-out 3;
        }

        .dragon-body {
          position: relative;
          z-index: 2;
        }

        /* Wing positioned on the dragon's back, above the spine ridge */
        .dragon-wing {
          position: absolute;
          top: ${wingTop}px;
          left: ${wingLeft}px;
          width: ${wingW}px;
          height: ${wingH}px;
          opacity: 0;
          transition: opacity 0.18s ease;
          z-index: 1;
        }
        .dragon-stage.is-hover .dragon-wing,
        .dragon-stage.is-firing .dragon-wing {
          opacity: 1;
        }

        .wing-up,
        .wing-down {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .wing-up {
          animation: wing-frame-up 0.3s steps(1, end) infinite;
        }
        .wing-down {
          animation: wing-frame-down 0.3s steps(1, end) infinite;
        }

        /* Fire to the LEFT of the mouth */
        .dragon-fire {
          position: absolute;
          top: ${fireTop}px;
          right: ${fireRight}px;
          width: ${fireWidthPx}px;
          height: ${4 * PIXEL}px;
          pointer-events: none;
          z-index: 3;
        }
        .fire-pixel {
          position: absolute;
          width: ${PIXEL}px;
          height: ${PIXEL}px;
          /* Stagger horizontally; fire moves leftward (away from mouth) */
          right: calc(var(--i) * ${PIXEL}px);
          top: calc(50% - ${PIXEL / 2}px);
          background: ${C.fire2};
          opacity: 0;
          transform: scale(0.6);
          animation: fire-puff 0.85s ease-out forwards;
          animation-delay: calc(var(--i) * 55ms);
          box-shadow: 0 0 ${PIXEL * 1.4}px ${C.fire3};
          border-radius: 1px;
        }
        .fire-pixel:nth-child(3n) {
          background: ${C.fire1};
        }
        .fire-pixel:nth-child(3n + 1) {
          background: ${C.fire3};
        }
        .fire-pixel:nth-child(3n + 2) {
          background: ${C.fire4};
        }
        .is-angry-fire .fire-pixel {
          animation-duration: 1.3s;
          animation-delay: calc(var(--i) * 35ms);
          box-shadow: 0 0 ${PIXEL * 2}px ${C.fire4},
            0 0 ${PIXEL * 3.5}px ${C.fire3};
        }

        @keyframes dragon-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes dragon-hover {
          0%, 100% { transform: translateY(-10px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes dragon-shake {
          0%, 100% { transform: translate(0, -8px); }
          25% { transform: translate(-3px, -8px); }
          75% { transform: translate(3px, -8px); }
        }
        @keyframes wing-frame-up {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes wing-frame-down {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
        @keyframes fire-puff {
          0% {
            opacity: 0;
            transform: scale(0.4) translateX(${PIXEL * 1}px);
          }
          25% {
            opacity: 1;
            transform: scale(1.15) translateX(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateX(-${PIXEL * 2.5}px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dragon-stage,
          .dragon-stage.is-hover,
          .wing-up,
          .wing-down,
          .fire-pixel {
            animation: none !important;
          }
          .dragon-stage.is-hover {
            transform: translateY(-6px);
          }
          .wing-down { opacity: 1; }
        }

        @media (max-width: 640px) {
          .dragon-root {
            right: 12px;
            bottom: 12px;
            transform: scale(0.85);
            transform-origin: bottom right;
          }
        }
      `}</style>
    </div>
  );
}
