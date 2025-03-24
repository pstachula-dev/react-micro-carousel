import { useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';

type CounterProps = {
  className?: string;
};

/**
 * Renders a counter component that displays the current slide number and total number of slides.
 *
 * @param {string} className - The class name for the counter.
 */
export const Counter = ({ className }: CounterProps) => {
  const { state } = useContext(CarouselContext);

  return (
    <div className={className}>
      {state.currentIndex + 1} /{state.total}
    </div>
  );
};
