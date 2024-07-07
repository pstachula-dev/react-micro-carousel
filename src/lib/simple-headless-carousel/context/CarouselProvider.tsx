import { useMemo, type ReactNode } from 'react';
import {
  useCarouselReducer,
  type CarouselState,
} from '../hooks/useCarouselReducer';
import { CarouselContext } from './CarouselContext';
import { useAutoplay } from '../hooks/useAutoplay';
import { useMergeConfig } from '../hooks/useMergeConfig';

/**
 * A provider component for the Carousel context.
 *
 * @param {ReactNode} children - The child components to be wrapped by the Carousel context.
 * @param {number} total - The total number of slides in the carousel.
 * @param {boolean} lazy - Whether the carousel should lazy load images.
 * @param {boolean} autoPlay - Whether the carousel should automatically play.
 * @param {number} autoPlayDelay - The delay between each slide transition in auto play mode.
 * @param {number} slidesVisible - The number of slides visible at a time.
 * @param {boolean} infinite - Whether the carousel should loop infinitely.
 * @param {number} step - The number of slides to move when navigating.
 */
export function CarouselProvider({
  children,
  ...configProps
}: {
  children: ReactNode;
} & Partial<CarouselState>) {
  const { dispatch, state } = useCarouselReducer();
  const ctx = useMemo(() => ({ dispatch, state }), [state, dispatch]);

  useMergeConfig({ dispatch, ...configProps });
  useAutoplay(ctx);

  return (
    <CarouselContext.Provider value={ctx}>{children}</CarouselContext.Provider>
  );
}
