import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      stagger = 0,
      duration = 0.8,
      ease = 'power2.out',
      threshold = 0.15,
      delay = 0,
    } = options;

    const targets = stagger > 0 ? el.children : el;

    gsap.set(targets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: `top bottom-=${threshold * 100}%`,
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          delay,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return ref;
}
