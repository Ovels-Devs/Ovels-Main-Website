"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/**
 * Custom scroll-reveal built from scratch on IntersectionObserver.
 * No animation library — the transition lives in globals.css (.rv / .is-in).
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
  className?: string;
  as?: "div" | "section" | "li" | "span" | "h2" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass =
    variant === "left" ? "rv-left" : variant === "right" ? "rv-right" : variant === "scale" ? "rv-scale" : "";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement & HTMLLIElement & HTMLSpanElement & HTMLParagraphElement>}
      className={`rv ${variantClass} ${inView ? "is-in" : ""} ${className}`}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
