import { useEffect, useRef, useState, useCallback } from 'react';

// Interactive Rumi logo — demonstrates the KIND of thing Rive makes trivial:
//   • Eyes follow the cursor (pointer tracking)
//   • Smile reacts to hover (state machine: idle → happy)
//   • Blink on click (state machine: trigger)
//   • Smooth blending between states
//
// In Rive, this would be a 15KB .riv file with a visual state machine.
// Here we rebuild it in Canvas to prove the concept.

const NAVY = '#0d1b2a';
const GOLD = '#d4a843';
const CREAM = '#fcf8f0';

export default function RumiAlive() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({
    mouseX: 0.5,       // normalized 0-1
    mouseY: 0.5,
    isHovering: false,
    blinkTimer: 0,
    isBlinking: false,
    blinkPhase: 0,     // 0 = open, 1 = closed
    smileAmount: 0,    // 0 = resting, 1 = big grin
    eyeScale: 1,       // for squint on smile
    breathPhase: 0,    // subtle idle breathing
    sparkles: [],      // gold sparkle particles on click
  });

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.mouseX = (e.clientX - rect.left) / rect.width;
    stateRef.current.mouseY = (e.clientY - rect.top) / rect.height;
  }, []);

  const handleMouseEnter = useCallback(() => {
    stateRef.current.isHovering = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.isHovering = false;
    stateRef.current.mouseX = 0.5;
    stateRef.current.mouseY = 0.5;
  }, []);

  const handleClick = useCallback(() => {
    const s = stateRef.current;
    s.isBlinking = true;
    s.blinkPhase = 0;
    // Spawn sparkles
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
      s.sparkles.push({
        x: 0.5,
        y: 0.45,
        vx: Math.cos(angle) * (0.008 + Math.random() * 0.006),
        vy: Math.sin(angle) * (0.008 + Math.random() * 0.006),
        life: 1,
        size: 2 + Math.random() * 3,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Random blink timer
    let nextBlink = 2000 + Math.random() * 3000;
    let lastTime = performance.now();

    function draw(now) {
      const dt = now - lastTime;
      lastTime = now;
      const s = stateRef.current;

      ctx.clearRect(0, 0, width, height);

      // Center coordinates
      const cx = width * 0.5;
      const cy = height * 0.48;
      const scale = Math.min(width, height) * 0.0035;

      // --- State blending ---
      // Smile eases toward target
      const smileTarget = s.isHovering ? 1 : 0;
      s.smileAmount += (smileTarget - s.smileAmount) * 0.06;

      // Eye squint when smiling
      const eyeSquintTarget = s.isHovering ? 0.7 : 1;
      s.eyeScale += (eyeSquintTarget - s.eyeScale) * 0.06;

      // Breathing
      s.breathPhase += 0.002;
      const breathOffset = Math.sin(s.breathPhase * Math.PI * 2) * scale * 0.5;

      // Random blink
      nextBlink -= dt;
      if (nextBlink <= 0 && !s.isBlinking) {
        s.isBlinking = true;
        s.blinkPhase = 0;
        nextBlink = 2000 + Math.random() * 4000;
      }

      // Blink animation
      if (s.isBlinking) {
        s.blinkPhase += 0.08;
        if (s.blinkPhase >= 1) {
          s.isBlinking = false;
          s.blinkPhase = 0;
        }
      }
      const blinkAmount = s.isBlinking
        ? (s.blinkPhase < 0.5
          ? s.blinkPhase * 2       // closing
          : (1 - s.blinkPhase) * 2) // opening
        : 0;

      // --- Eye tracking ---
      const lookX = (s.mouseX - 0.5) * scale * 5;
      const lookY = (s.mouseY - 0.5) * scale * 3;

      // Eye positions
      const eyeSpacing = scale * 22;
      const eyeY = cy - scale * 6 + breathOffset;
      const eyeRadius = scale * 8;

      // -- Draw eyes --
      for (const side of [-1, 1]) {
        const ex = cx + side * eyeSpacing;
        const ey = eyeY;

        ctx.save();
        ctx.translate(ex, ey);

        // Eye white (subtle, mostly for the dark pupil to sit on)
        // Actually, Rumi logo has solid dark circles, not white eyes
        // So we draw dark circles with a highlight that shifts

        // Outer eye circle
        const currentEyeH = eyeRadius * 2 * Math.max(0.05, 1 - blinkAmount) * s.eyeScale;
        ctx.beginPath();
        ctx.ellipse(0, 0, eyeRadius, currentEyeH / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = NAVY;
        ctx.fill();

        // Pupil highlight (follows cursor) — gives the "alive" feeling
        if (blinkAmount < 0.8) {
          const hlX = lookX * 0.5;
          const hlY = lookY * 0.3 * s.eyeScale;
          const hlRadius = eyeRadius * 0.3;

          // Main highlight
          ctx.beginPath();
          ctx.arc(hlX - eyeRadius * 0.15, hlY - eyeRadius * 0.2, hlRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.fill();

          // Small secondary highlight
          ctx.beginPath();
          ctx.arc(hlX + eyeRadius * 0.25, hlY + eyeRadius * 0.1, hlRadius * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.fill();
        }

        ctx.restore();
      }

      // --- Draw smile ---
      const smileY = cy + scale * 12 + breathOffset;
      const smileWidth = eyeSpacing + scale * (4 + s.smileAmount * 6);
      const smileCurve = scale * (10 + s.smileAmount * 8);
      const lineWidth = scale * 2.5;

      ctx.beginPath();
      ctx.moveTo(cx - smileWidth, smileY - scale * 2);
      ctx.quadraticCurveTo(cx, smileY + smileCurve, cx + smileWidth, smileY - scale * 2);
      ctx.strokeStyle = NAVY;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Smile end dots (like the Rumi logo)
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(cx + side * smileWidth, smileY - scale * 2, lineWidth * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = NAVY;
        ctx.fill();
      }

      // --- Sparkles (on click) ---
      for (let i = s.sparkles.length - 1; i >= 0; i--) {
        const sp = s.sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.0002; // gravity
        sp.life -= 0.015;

        if (sp.life <= 0) {
          s.sparkles.splice(i, 1);
          continue;
        }

        const sx = sp.x * width;
        const sy = sp.y * height;
        const ss = sp.size * sp.life;

        // Gold sparkle star
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(sp.life * Math.PI * 2);
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const a = (j / 4) * Math.PI * 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * ss * 2, Math.sin(a) * ss * 2);
        }
        ctx.strokeStyle = `rgba(212, 168, 67, ${sp.life * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, ss * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${sp.life})`;
        ctx.fill();
        ctx.restore();
      }

      // --- Hover state label ---
      if (s.isHovering && s.smileAmount > 0.5) {
        const labelAlpha = Math.min(1, (s.smileAmount - 0.5) * 2);
        ctx.font = `${scale * 4}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(122, 138, 154, ${labelAlpha * 0.6})`;
        ctx.fillText('state: happy', cx, cy + scale * 32);
      }

      animRef.current = requestAnimationFrame(draw);
    }

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
    <div className="relative w-full flex flex-col items-center">
      <div
        className="relative w-full max-w-[320px] aspect-square cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        />
      </div>
      <div className="text-center mt-2 space-y-1">
        <p className="text-text-muted text-xs font-ui">
          Move your cursor over Rumi. Click for sparkles.
        </p>
        <p className="text-text-muted text-[10px] font-ui opacity-60">
          Eyes track cursor · Smile reacts to hover · Blinks randomly · Click triggers sparkles
        </p>
      </div>
    </div>
  );
}
