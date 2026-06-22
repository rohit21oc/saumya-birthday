import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  type: 'heart' | 'petal' | 'sparkle' | 'butterfly';
  color: string;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Colors matching the pastel pink, rose gold, lavender & white theme
    const colors = [
      '#ffb7c5', // pastel pink
      '#ffa3aa', // rose gold pink
      '#e8ccd7', // lavender mist
      '#f1b3c4', // lavender pink
      '#ff6e7a', // warm rose
      '#ffd1d4', // light rose gold
      '#ffffff', // glowing white
    ];

    const types: ('heart' | 'petal' | 'sparkle' | 'butterfly')[] = [
      'heart',
      'petal',
      'sparkle',
      'butterfly',
    ];

    // Generate initial particles
    const initialParticles: Particle[] = Array.from({ length: 25 }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        x: Math.random() * 100, // percentage of screen width
        y: Math.random() * 100, // percentage of screen height
        size: Math.random() * (type === 'sparkle' ? 6 : 22) + (type === 'sparkle' ? 4 : 10),
        speedY: -(Math.random() * 0.7 + 0.3), // upward drift speed
        speedX: Math.random() * 0.4 - 0.2, // slight horizontal drift
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.3,
        type,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setParticles(initialParticles);

    // Animation interval
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let nextY = p.y + p.speedY;
          let nextX = p.x + p.speedX;
          let nextRotation = p.rotation + p.rotSpeed;

          // Wrap around if particle goes off screen
          if (nextY < -10) {
            nextY = 110;
            nextX = Math.random() * 100;
          }
          if (nextX < -5 || nextX > 105) {
            nextX = nextX < -5 ? 105 : -5;
          }

          return {
            ...p,
            y: nextY,
            x: nextX,
            rotation: nextRotation,
          };
        })
      );
    }, 30);

    // Periodically spawn sparks/particles dynamically
    const spawner = setInterval(() => {
      setParticles((prev) => {
        if (prev.length > 50) return prev; // Limit max particles for performance
        const type = types[Math.floor(Math.random() * types.length)];
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: 110, // Start just off screen at the bottom
          size: Math.random() * (type === 'sparkle' ? 6 : 20) + (type === 'sparkle' ? 4 : 10),
          speedY: -(Math.random() * 0.6 + 0.4),
          speedX: Math.random() * 0.4 - 0.2,
          rotation: Math.random() * 360,
          rotSpeed: Math.random() * 1.5 - 0.75,
          opacity: Math.random() * 0.5 + 0.3,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        return [...prev, newParticle];
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(spawner);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      {particles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.type === 'sparkle' ? 1 : 1})`,
            }}
          >
            {p.type === 'heart' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill={p.color}
                style={{ filter: `drop-shadow(0 0 4px ${p.color}aa)` }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {p.type === 'petal' && (
              <svg
                width={p.size}
                height={p.size * 1.3}
                viewBox="0 0 24 24"
                fill={p.color}
                style={{ filter: `drop-shadow(0 1px 3px rgba(0,0,0,0.05))` }}
              >
                {/* Elegant teardrop rose petal shape */}
                <path d="M12,2 C12,2 4,10 4,15 C4,19 8,22 12,22 C16,22 20,19 20,15 C20,10 12,2 12,2 Z" />
              </svg>
            )}

            {p.type === 'sparkle' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={p.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 6px ${p.color})` }}
              >
                <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M18.4 5.6l-2.1 2.1M8.3 15.7l-2.1 2.1" />
              </svg>
            )}

            {p.type === 'butterfly' && (
              <svg
                width={p.size + 4}
                height={p.size}
                viewBox="0 0 24 24"
                fill={p.color}
                className="animate-[wave_3s_infinite_ease-in-out]"
                style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.05))` }}
              >
                {/* Sweet stylized butterfly wing wings */}
                <path d="M12,12 C14,8 18,3 21,5 C24,7 21,12 16,13 C21,14 24,19 21,21 C18,23 14,18 12,14 C10,18 6,23 3,21 C0,19 3,14 8,13 C3,12 0,7 3,5 C6,3 10,8 12,12 Z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
