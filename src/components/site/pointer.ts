"use client";

import { useCallback, useRef } from "react";

/** Mouse-tracking glow: writes --mx / --my on the element for .card-spotlight. */
export function useSpotlight() {
  return useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

/**
 * Pointer tilt written from scratch with requestAnimationFrame.
 * Writes --tx / --ty / --ts consumed by the .tilt class.
 */
export function useTilt(max = 6) {
  const raf = useRef(0);
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        el.style.setProperty("--ty", `${px * max * 2}deg`);
        el.style.setProperty("--tx", `${-py * max * 2}deg`);
        el.style.setProperty("--ts", "1.015");
      });
    },
    [max]
  );
  const onLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--tx", "0deg");
    el.style.setProperty("--ty", "0deg");
    el.style.setProperty("--ts", "1");
  }, []);
  return { onMove, onLeave };
}
