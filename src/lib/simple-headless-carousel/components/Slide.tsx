import { memo, useContext, useRef, type ReactNode } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { clsx } from '../services/clsx';

type SlideProps = {
  children: ReactNode;
  index: number;
  className?: string;
};

/**
 * A single slide in a carousel.
 *
 * @component
 * @param {ReactNode} children - The content of the slide.
 * @param {number} index - Slide index
 * @param {string} className - Additional CSS classes for the slide.
 */
export const Slide = memo(({ children, index, className }: SlideProps) => {
  const { state, initConfig } = useContext(CarouselContext);
  const isVisible = useRef(false);
  const intersectionRef = useRef(null);
  const { entry } = useIntersectionObserver({
    ref: intersectionRef,
    opts: { threshold: 0.5 },
  });

  const { lazy } = initConfig;
  const { currentIndex } = state;

  if (!isVisible.current && entry?.isIntersecting) {
    isVisible.current = entry.isIntersecting;
  }

  const showLazy = lazy ? isVisible.current : true;
  const showSlide = currentIndex === index || showLazy;

  return (
    <div
      ref={intersectionRef}
      className={clsx('pointer-events-none relative w-full', className)}
      data-index={index}
    >
      {showSlide && children}
    </div>
  );
});
