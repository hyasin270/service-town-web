import { useEffect, useRef } from 'react';

// Tasteful ember-glow animation for "The Forge" section.
// Drifting gold spark particles rise from a pulsing glow point,
// evoking domain expertise being hammered into code.

export default function GlowingForge() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    let width, height;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particle system — gold embers drifting upward
    function spawnParticle() {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * width * 0.3,
        y: height * 0.85,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.5),
        size: 1 + Math.random() * 2,
        life: 1,
        decay: 0.003 + Math.random() * 0.004,
      });
    }

    let pulsePhase = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      pulsePhase += 0.015;

      // Central glow — pulsing warm amber radial gradient (tuned for cream bg)
      const glowRadius = 60 + Math.sin(pulsePhase) * 20;
      const glowAlpha = 0.18 + Math.sin(pulsePhase) * 0.08;
      const glow = ctx.createRadialGradient(
        width * 0.5, height * 0.8, 0,
        width * 0.5, height * 0.8, glowRadius
      );
      glow.addColorStop(0, `rgba(180, 120, 30, ${glowAlpha})`);
      glow.addColorStop(0.5, `rgba(180, 120, 30, ${glowAlpha * 0.35})`);
      glow.addColorStop(1, 'rgba(180, 120, 30, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Spawn new particles occasionally
      if (Math.random() < 0.15) spawnParticle();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(pulsePhase + i) * 0.1;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 100, 20, ${p.life * 0.7})`;
        ctx.fill();

        // Subtle glow around each particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 120, 30, ${p.life * 0.12})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-24 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' }} />
    </div>
  );
}
