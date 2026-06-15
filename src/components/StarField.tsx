"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STAR_COUNT = 240;
const TRAIL_LENGTH = 20;
const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 55;

interface StarConfig {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  drift: boolean;
  bright: boolean;
  sparkle: boolean;
}

function createRandomStars(count: number): StarConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 96 + 2,
    top: Math.random() * 94 + 3,
    size: 3 + Math.floor(Math.random() * 6),
    delay: Math.random() * 6,
    duration: 2 + Math.random() * 4,
    drift: Math.random() < 0.25,
    bright: Math.random() < 0.12,
    sparkle: Math.random() < 0.08,
  }));
}

interface MeteorConfig {
  id: string;
  showerId: number;
  top: number;
  left: number;
  length: number;
  angle: number;
  delay: number;
  cycle: number;
}

function createMeteorShowers(): MeteorConfig[] {
  const meteors: MeteorConfig[] = [];
  const SHOWER_COUNT = 7;
  const CYCLE = 28;

  for (let s = 0; s < SHOWER_COUNT; s += 1) {
    const count = 4 + Math.floor(Math.random() * 4);
    const showerDelay = s * 4 + Math.random() * 2;

    for (let m = 0; m < count; m += 1) {
      meteors.push({
        id: `${s}-${m}`,
        showerId: s,
        top: Math.random() * 16 - 3,
        left: 55 + Math.random() * 45,
        length: 100 + Math.random() * 160,
        angle: 128 + Math.random() * 14,
        delay: showerDelay + m * (0.12 + Math.random() * 0.18),
        cycle: CYCLE,
      });
    }
  }

  return meteors;
}

function computeRepel(
  starLeftPct: number,
  starTopPct: number,
  mouseX: number,
  mouseY: number,
): { x: number; y: number } {
  const starX = (starLeftPct / 100) * window.innerWidth;
  const starY = (starTopPct / 100) * window.innerHeight;
  const dx = starX - mouseX;
  const dy = starY - mouseY;
  const dist = Math.hypot(dx, dy);

  if (dist >= REPEL_RADIUS || dist === 0) {
    return { x: 0, y: 0 };
  }

  const ratio = 1 - dist / REPEL_RADIUS;
  const force = ratio * ratio * REPEL_STRENGTH;
  return {
    x: (dx / dist) * force,
    y: (dy / dist) * force,
  };
}

export function StarField() {
  const [stars, setStars] = useState<StarConfig[]>([]);
  const [meteors, setMeteors] = useState<MeteorConfig[]>([]);

  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const starsRef = useRef<StarConfig[]>([]);
  const wrapperRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const offsetRef = useRef<{ x: number; y: number }[]>([]);
  const trailPosRef = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -9999, y: -9999 })),
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const generated = createRandomStars(STAR_COUNT);
    starsRef.current = generated;
    offsetRef.current = generated.map(() => ({ x: 0, y: 0 }));
    setStars(generated);
    setMeteors(createMeteorShowers());
  }, []);

  const tick = useCallback(() => {
    const { x: mx, y: my, active } = mouseRef.current;
    const currentStars = starsRef.current;

    currentStars.forEach((star, i) => {
      const target = active
        ? computeRepel(star.left, star.top, mx, my)
        : { x: 0, y: 0 };
      const offset = offsetRef.current[i];
      if (!offset) return;

      offset.x += (target.x - offset.x) * 0.18;
      offset.y += (target.y - offset.y) * 0.18;

      const el = wrapperRefs.current[i];
      if (el) {
        el.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
      }
    });

    const trail = trailPosRef.current;
    if (active) {
      trail[0].x += (mx - trail[0].x) * 0.45;
      trail[0].y += (my - trail[0].y) * 0.45;
    }

    for (let i = 1; i < TRAIL_LENGTH; i += 1) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.32;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.32;
    }

    trailRefs.current.forEach((el, i) => {
      if (!el) return;
      const p = trail[i];
      const size = Math.max(3, 14 - i * 0.55);
      const opacity = active ? Math.max(0, 1 - i / TRAIL_LENGTH) * 0.9 : 0;

      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = String(opacity);
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {stars.map((star, index) => (
          <span
            key={star.id}
            ref={(el) => {
              wrapperRefs.current[index] = el;
            }}
            className="star-wrapper"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
          >
            <span
              className={[
                "star",
                star.drift && "star-drift",
                star.bright && "star-bright",
                star.sparkle && "star-sparkle",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          </span>
        ))}

        {meteors.map((meteor) => (
          <span
            key={meteor.id}
            className="meteor-unit"
            style={{
              top: `${meteor.top}%`,
              left: `${meteor.left}%`,
              animationDuration: `${meteor.cycle}s`,
              animationDelay: `${meteor.delay}s`,
            }}
          >
            <span
              className="meteor-streak"
              style={{
                width: meteor.length,
                ["--meteor-angle" as string]: `${meteor.angle}deg`,
              }}
            />
          </span>
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[20]" aria-hidden>
        {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
          <span
            key={`trail-${i}`}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className={`cursor-trail-dot ${i === 0 ? "cursor-trail-head" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
