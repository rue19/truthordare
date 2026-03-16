import { useEffect, useRef } from 'react';

export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Dynamic import to avoid SSR issues
      const initLenis = async () => {
        try {
          const { default: Lenis } = await import('lenis');
          const lenis = new Lenis();

          lenisRef.current = lenis;

          function raf(time: number) {
            if (lenisRef.current) {
              lenisRef.current.raf(time);
              requestAnimationFrame(raf);
            }
          }

          requestAnimationFrame(raf);
        } catch (error) {
          console.warn('Lenis initialization failed:', error);
        }
      };

      initLenis();

      return () => {
        if (lenisRef.current?.destroy) {
          lenisRef.current.destroy();
        }
      };
    } catch (error) {
      console.warn('Lenis hook error:', error);
    }
  }, []);

  return lenisRef.current;
}

