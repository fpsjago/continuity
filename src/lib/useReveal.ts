import { useEffect, type RefObject } from 'react';

/**
 * Per-component reveal: observes [data-reveal] descendants WITHIN this island's
 * own ref and adds `.is-in`. Never a global observer (avoids island-orphan bug).
 */
export function useReveal(ref: RefObject<HTMLElement | null>, opts: { stagger?: number } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal],[data-reveal-clip]'));
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const stagger = opts.stagger ?? 0.07;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = els.filter((s) => s.parentElement === el.parentElement);
          const idx = siblings.indexOf(el);
          el.style.transitionDelay = `${Math.max(0, idx) * stagger}s`;
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref, opts.stagger]);
}
