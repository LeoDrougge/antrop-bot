import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useBorderAnimation() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.svg-border')
    );

    const initPath = (path: SVGPathElement) => {
      if (path.dataset.borderInit === 'true') return;

      const length = path.getTotalLength();
      const dashValue = path.getAttribute('data-dash') || '6 4';

      path.dataset.borderInit = 'true';
      path.dataset.borderLength = `${length}`;

      gsap.set(path, {
        strokeDasharray: dashValue,
        strokeDashoffset: length,
        visibility: 'visible',
        opacity: 1,
      });
    };

    const animate = (element: HTMLElement) => {
      const path = element.querySelector<SVGPathElement>('.frame-path');
      if (!path) return;

      initPath(path);

      gsap.fromTo(
        path,
        {
          strokeDashoffset:
            Number(path.dataset.borderLength) || path.getTotalLength(),
        },
        {
          strokeDashoffset: 0,
          duration:
            parseFloat(
              getComputedStyle(element).getPropertyValue(
                '--border-draw-duration'
              )
            ) || 1.4,
          ease: 'power1.out',
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => {
      const path = element.querySelector<SVGPathElement>('.frame-path');
      if (path) {
        initPath(path);
      }

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        requestAnimationFrame(() => animate(element));
      } else {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}

