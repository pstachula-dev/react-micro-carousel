import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { clsx } from '../services/clsx';

type DotProps = {
  index: number;
  className?: string;
};

/**
 * Dot component for the carousel.
 *
 * @param {number} props.index - The index of the dot.
 * @param {string} [props.className] - The class name for the dot.
 */
export const Dot = memo(({ index, className }: DotProps) => {
  const { dispatch, state } = useContext(CarouselContext);
  const color = state.currentIndex === index ? 'bg-red-500' : 'bg-gray-500';

  const handleClick = () => {
    dispatch({ action: 'setCurrentIndex', value: index });
  };

  return (
    <button
      type="button"
      aria-label="Dot icon"
      onClick={handleClick}
      className={clsx('h-2 w-2 rounded-full', color, className)}
    />
  );
});
