import { useEffect, useRef, useCallback, useMemo } from 'react';

interface ParticleFieldProps {
  className?: string;
  count?: number;
  color?: string;
  magnetRadius?: number;
  ringRadius?: number;
  particleSize?: number;
}

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const ParticleField = ({
  className = '',
  count = 80,
  color = '#b8864e',
  magnetRadius = 120,
  ringRadius = 80,
  particleSize = 3,
}: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  // Reduce particle count on lower-end / smaller screens
  const effectiveCount = useMemo(() => {
    if (typeof window === 'undefined') return count;
    if (window.innerWidth < 1024) return Math.min(count, 60);
    return count;
  }, [count]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < effectiveCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        size: particleSize * (0.5 + Math.random() * 0.8),
        alpha: 0.3 + Math.random() * 0.7,
      });
    }
    return particles;
  }, [effectiveCount, particleSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Intersection Observer: pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Debounced resize to avoid excessive reinits
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      // Cap pixel ratio for canvas performance
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener('resize', debouncedResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Skip rendering when not visible on screen
      if (!isVisibleRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < magnetRadius) {
          // Push particles to form a ring around cursor
          const angle = Math.atan2(dy, dx);
          const targetX = mx - Math.cos(angle) * ringRadius;
          const targetY = my - Math.sin(angle) * ringRadius;

          const force = (1 - dist / magnetRadius) * 0.08;
          p.vx += (targetX - p.x) * force;
          p.vy += (targetY - p.y) * force;
        } else {
          // Return home
          p.vx += (p.homeX - p.x) * 0.02;
          p.vy += (p.homeY - p.y) * 0.02;
        }

        // Friction
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glow = Math.min(1, p.alpha + speed * 0.1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = glow;
        ctx.fill();

        // Draw connecting lines — only check nearby particles (skip if too many)
        if (dist < magnetRadius * 1.2 && particlesRef.current.length <= 120) {
          for (let j = particlesRef.current.indexOf(p) + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j];
            const ddx = p.x - p2.x;
            const ddy = p.y - p2.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < 50) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = color;
              ctx.globalAlpha = (1 - d / 50) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });

      ctx.globalAlpha = 1;
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', debouncedResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles, color, magnetRadius, ringRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block' }}
    />
  );
};

export default ParticleField;
