import { useEffect, useRef } from 'react';

interface Node { x: number; y: number; vx: number; vy: number; r: number; red: boolean; }

/**
 * Interactive "signal field" — drifting network nodes + proximity links that
 * brighten toward the cursor. Fits the infra theme; pointer-events-none so it
 * never blocks clicks. Static single frame under prefers-reduced-motion;
 * paused when off-screen.
 */
export default function Particles({ density = 0.00009, link = 130, cursor = 165 }: { density?: number; link?: number; cursor?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    if (!ctx || !host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, nodes: Node[] = [], raf = 0, running = true;
    const mouse = { x: -9999, y: -9999 };

    const NODE = 'rgba(20,34,63,0.34)';
    const NODE_RED = 'rgba(204,0,0,0.5)';
    const LINE = (a: number) => `rgba(20,34,63,${a})`;
    const RED = (a: number) => `rgba(204,0,0,${a})`;

    function size() {
      const r = host!.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + 'px'; canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(72, Math.max(22, Math.floor(w * h * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() < 0.14 ? 2.3 : 1.4, red: Math.random() < 0.12,
      }));
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = n.red ? NODE_RED : NODE;
        ctx!.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx!.strokeStyle = LINE(0.13 * (1 - d / link));
            ctx!.lineWidth = 1;
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < cursor) {
          ctx!.strokeStyle = RED(0.4 * (1 - d / cursor));
          ctx!.lineWidth = 1;
          ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(mouse.x, mouse.y); ctx!.stroke();
        }
      }
      if (running && !reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    let rt: number;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { size(); if (reduce) frame(); }, 180); };

    size();
    frame();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running && !reduce) frame();
    }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [density, link, cursor]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}
