import { forwardRef, useMemo, useRef, useEffect, useCallback, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';

// Shared animation frame manager — all instances share ONE rAF loop
const sharedRAF = (() => {
  const callbacks = new Set<() => void>();
  let frameId = 0;
  let running = false;

  function loop() {
    callbacks.forEach(cb => cb());
    if (callbacks.size > 0) {
      frameId = requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }

  return {
    add(cb: () => void) {
      callbacks.add(cb);
      if (!running) {
        running = true;
        frameId = requestAnimationFrame(loop);
      }
    },
    remove(cb: () => void) {
      callbacks.delete(cb);
      if (callbacks.size === 0 && running) {
        cancelAnimationFrame(frameId);
        running = false;
      }
    }
  };
})();

// Shared mouse position — all instances share ONE set of listeners
const sharedMouse = (() => {
  const pos = { x: -9999, y: -9999 };
  let listeners = 0;

  const handleMouseMove = (ev: MouseEvent) => { pos.x = ev.clientX; pos.y = ev.clientY; };
  const handleTouchMove = (ev: TouchEvent) => { const t = ev.touches[0]; pos.x = t.clientX; pos.y = t.clientY; };

  return {
    get() { return pos; },
    subscribe() {
      if (listeners++ === 0) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
      }
    },
    unsubscribe() {
      if (--listeners === 0) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
    }
  };
})();

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isVisible = useRef(false);
  const smoothPos = useRef({ x: -9999, y: -9999 });
  const spanRef = useRef<HTMLSpanElement | null>(null);
  // Cache letter positions, invalidate on scroll/resize
  const letterPositions = useRef<{ cx: number; cy: number }[]>([]);
  const positionsDirty = useRef(true);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr.split(',').map(s => s.trim()).map(s => {
          const [name, value] = s.split(' ');
          return [name.replace(/['"]/g, ''), parseFloat(value)] as [string, number];
        })
      );
    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis, fromValue, toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const radiusSq = radius * radius;

  const calculateFalloff = useCallback((distSq: number) => {
    const dist = Math.sqrt(distSq);
    const norm = 1 - dist / radius;
    if (norm <= 0) return 0;
    switch (falloff) {
      case 'exponential': return norm * norm;
      case 'gaussian': return Math.exp(-((dist / (radius * 0.5)) ** 2) * 0.5);
      default: return norm;
    }
  }, [radius, falloff]);

  const buildSettings = useCallback((falloffValue: number) => {
    let s = '';
    for (let i = 0; i < parsedSettings.length; i++) {
      const { axis, fromValue, toValue } = parsedSettings[i];
      if (i > 0) s += ', ';
      s += `'${axis}' ${fromValue + (toValue - fromValue) * falloffValue}`;
    }
    return s;
  }, [parsedSettings]);

  const tick = useCallback(() => {
    if (!isVisible.current || !containerRef?.current) return;

    const rawMouse = sharedMouse.get();
    const containerRect = containerRef.current.getBoundingClientRect();
    const mx = rawMouse.x - containerRect.left;
    const my = rawMouse.y - containerRect.top;

    // Lerp smoothing
    smoothPos.current.x += (mx - smoothPos.current.x) * 0.15;
    smoothPos.current.y += (my - smoothPos.current.y) * 0.15;
    const sx = smoothPos.current.x;
    const sy = smoothPos.current.y;

    // Rebuild cached positions if dirty
    if (positionsDirty.current) {
      letterPositions.current = letterRefs.current.map(el => {
        if (!el) return { cx: 0, cy: 0 };
        const r = el.getBoundingClientRect();
        return {
          cx: r.left + r.width * 0.5 - containerRect.left,
          cy: r.top + r.height * 0.5 - containerRect.top
        };
      });
      positionsDirty.current = false;
    }

    const letters = letterRefs.current;
    const positions = letterPositions.current;
    for (let i = 0; i < letters.length; i++) {
      const el = letters[i];
      if (!el) continue;
      const pos = positions[i];
      const dx = sx - pos.cx;
      const dy = sy - pos.cy;
      const distSq = dx * dx + dy * dy;

      if (distSq >= radiusSq) {
        el.style.fontVariationSettings = fromFontVariationSettings;
      } else {
        el.style.fontVariationSettings = buildSettings(calculateFalloff(distSq));
      }
    }
  }, [containerRef, radius, radiusSq, falloff, fromFontVariationSettings, parsedSettings, buildSettings, calculateFalloff]);

  // Intersection Observer: only animate when visible
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible.current;
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          positionsDirty.current = true;
          sharedRAF.add(tick);
        } else if (!entry.isIntersecting && wasVisible) {
          sharedRAF.remove(tick);
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);

    sharedMouse.subscribe();

    return () => {
      observer.disconnect();
      sharedRAF.remove(tick);
      sharedMouse.unsubscribe();
    };
  }, [tick]);

  // Invalidate position cache on scroll/resize
  useEffect(() => {
    const markDirty = () => { positionsDirty.current = true; };
    window.addEventListener('scroll', markDirty, { passive: true });
    window.addEventListener('resize', markDirty, { passive: true });
    return () => {
      window.removeEventListener('scroll', markDirty);
      window.removeEventListener('resize', markDirty);
    };
  }, []);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={(el) => {
        spanRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as MutableRefObject<HTMLSpanElement | null>).current = el;
      }}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: '"Roboto Flex", sans-serif',
        ...style
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const idx = letterIndex++;
            return (
              <span
                key={idx}
                ref={el => { letterRefs.current[idx] = el; }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                  letterSpacing: '0.01em'
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
