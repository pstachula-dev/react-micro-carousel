import { memo, useContext, useRef, type ReactNode } from 'react';
import { clsx } from '../services/clsx';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CarouselContext } from '../context/CarouselContext';

type SlideProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A single slide in a carousel.
 *
 * @component
 * @param {ReactNode} children - The content of the slide.
 * @param {string} className - Additional CSS classes for the slide.
 */
export const Slide = memo(({ children, className }: SlideProps) => {
  const { state } = useContext(CarouselContext);
  const isVisible = useRef(false);
  const intersectionRef = useRef(null);
  const { entry } = useIntersectionObserver({
    ref: intersectionRef,
    opts: {
      root: null,
      threshold: 0.5,
    },
  });

  if (!isVisible.current && entry?.isIntersecting) {
    isVisible.current = entry.isIntersecting;
  }

  const showLazy = state.lazy ? isVisible.current : true;

  return (
    <div
      ref={intersectionRef}
      className={clsx('pointer-events-none relative w-full', className)}
    >
      {showLazy && children}
    </div>
  );
});
