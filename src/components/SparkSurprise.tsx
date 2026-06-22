import React, { useEffect, useRef } from 'react';

interface SparkSurpriseProps {
  isActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  shape: 'spark' | 'heart';
}

export default function SparkSurprise({ isActive }: SparkSurpriseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const colors = [
      '#ff4d6d', // bright pink
      '#ff85a1', // soft pink
      '#ffb3c1', // pastel rose
      '#a5a5ff', // lavender light
      '#ffc09f', // rose gold peach
      '#ffee93', // warm soft gold
      '#ffffff', // bright glow white
    ];

    const createFirework = (x: number, y: number) => {
      const particleCount = 100;
      const isHeartShape = Math.random() < 0.6; // 60% chance of creating heart-shaped fireworks!

      for (let i = 0; i < particleCount; i++) {
        let vx = 0;
        let vy = 0;
        let shape: 'spark' | 'heart' = 'spark';

        if (isHeartShape) {
          // Heart math curve:
          // x = 16 * sin^3(t)
          // y = 13 * cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)
          const angle = (i / particleCount) * Math.PI * 2;
          const scale = Math.random() * 0.2 + 0.35; // velocity scaling

          // Parametric heart coordinates
          const hx = 16 * Math.pow(Math.sin(angle), 3);
          const hy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

          vx = hx * scale;
          vy = hy * scale;
          shape = 'heart';
        } else {
          // Classic circular expansion
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }

        particles.push({
          x,
          y,
          vx,
          vy,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + (shape === 'heart' ? 2 : 1),
          gravity: 0.08,
          shape,
        });
      }
    };

    // Auto-launch fireworks at intervals
    let launchTimer = setInterval(() => {
      const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const y = Math.random() * (canvas.height * 0.4) + canvas.height * 0.2;
      createFirework(x, y);
    }, 1200);

    // Initial launch burst
    createFirework(canvas.width / 2, canvas.height * 0.4);
    setTimeout(() => createFirework(canvas.width * 0.3, canvas.height * 0.3), 300);
    setTimeout(() => createFirework(canvas.width * 0.7, canvas.height * 0.35), 600);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(idx, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.shape === 'heart') {
          // Draw heart particle
          ctx.beginPath();
          const size = p.size;
          ctx.moveTo(p.x, p.y + size / 4);
          ctx.bezierCurveTo(p.x, p.y - size / 2, p.x - size, p.y - size / 2, p.x - size, p.y + size / 4);
          ctx.bezierCurveTo(p.x - size, p.y + (size * 3) / 4, p.x, p.y + size * 1.25, p.x, p.y + size * 1.5);
          ctx.bezierCurveTo(p.x, p.y + size * 1.25, p.x + size, p.y + (size * 3) / 4, p.x + size, p.y + size / 4);
          ctx.bezierCurveTo(p.x + size, p.y - size / 2, p.x, p.y - size / 2, p.x, p.y + size / 4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw circular star particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      clearInterval(launchTimer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      id="surprise-fireworks"
    />
  );
}
