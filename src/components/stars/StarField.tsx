'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    starsRef.current = Array.from({ length: 280 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.2 + Math.random() * 1.2,
      baseOpacity: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0003 + Math.random() * 0.0007,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x * 8;
      const my = mouseRef.current.y * 8;

      for (const star of starsRef.current) {
        const opacity =
          star.baseOpacity * (0.6 + 0.4 * Math.sin(t * star.speed * 60 + star.phase));
        const px = star.x * canvas.width + mx * (1 - star.y);
        const py = star.y * canvas.height + my * (1 - star.x);

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,240,255,${opacity.toFixed(3)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
