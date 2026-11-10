"use client";

import { type ReactNode, useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article";
};

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || !("IntersectionObserver" in window) || !node.animate) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const stopMotion = () => { if (motion.matches) animation?.cancel(); };
    motion.addEventListener("change", stopMotion);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!motion.matches) {
            animation = node.animate(
              [{ opacity: 0, transform: "translate3d(0, 28px, 0)" }, { opacity: 1, transform: "translate3d(0, 0, 0)" }],
              { duration: 650, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
            );
          }
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -24px 0px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener("change", stopMotion);
    };
  }, [delay]);

  return (
    <Tag className={className} ref={(node) => { ref.current = node; }}>
      {children}
    </Tag>
  );
}
