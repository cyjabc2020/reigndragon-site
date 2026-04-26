"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#fff7d6", "#ffd166", "#ff8a3d", "#ffb37a"];

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  life: number;
  maxLife: number;
};

export default function HeroSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const sparks: Spark[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (initial = false): Spark => {
      const maxLife = 240 + Math.random() * 360;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.18 + Math.random() * 0.5),
        size: 0.6 + Math.random() * 1.8,
        baseAlpha: 0.4 + Math.random() * 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
      };
    };

    const populate = () => {
      sparks.length = 0;
      const target = Math.min(
        90,
        Math.max(40, Math.floor((width * height) / 18000))
      );
      for (let i = 0; i < target; i++) sparks.push(spawn(true));
    };

    let running = true;

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.twinklePhase += s.twinkleSpeed;
        s.life += 1;

        const ageT = s.life / s.maxLife;
        const fade =
          ageT < 0.15
            ? ageT / 0.15
            : ageT > 0.85
              ? (1 - ageT) / 0.15
              : 1;
        const twinkle = 0.6 + 0.4 * Math.sin(s.twinklePhase);
        const alpha = s.baseAlpha * fade * twinkle;

        // Dead or off-screen → respawn
        if (
          s.life >= s.maxLife ||
          s.y < -20 ||
          s.x < -20 ||
          s.x > width + 20
        ) {
          sparks[i] = spawn();
          continue;
        }

        ctx.beginPath();
        const glow = s.size * 4;
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow);
        gradient.addColorStop(0, withAlpha(s.color, alpha));
        gradient.addColorStop(0.4, withAlpha(s.color, alpha * 0.4));
        gradient.addColorStop(1, withAlpha(s.color, 0));
        ctx.fillStyle = gradient;
        ctx.arc(s.x, s.y, glow, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = withAlpha("#ffffff", alpha * 0.9);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    resize();
    populate();
    if (!reduced) {
      rafRef.current = window.requestAnimationFrame(tick);
    } else {
      // Render one static frame so the layer isn't blank
      tick();
      running = false;
    }

    const onResize = () => {
      resize();
      populate();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      } else if (!reduced) {
        running = true;
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function withAlpha(hex: string, alpha: number): string {
  // Support #rgb, #rrggbb
  let r: number;
  let g: number;
  let b: number;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
