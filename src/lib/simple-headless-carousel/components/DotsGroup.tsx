import { memo, useContext, useId } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { Dot } from './Dot';
import { clsx } from '../services/clsx';

type DotsGroupProps = {
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

/**
 * DotsGroup component for the carousel.
 *
 * @param {string} [className] - The class name for the dots group.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 */
export const DotsGroup = memo(({ onClick, className }: DotsGroupProps) => {
  const id = useId();
  const { state } = useContext(CarouselContext);
  const { total, slidesVisible } = state;
  const dotsLength = total / slidesVisible;

  return (
    <div className={clsx('flex space-x-2', className)}>
      {Array.from({ length: dotsLength }).map((_, idx) => (
        <Dot onClick={onClick} key={id + idx} index={idx * slidesVisible} />
      ))}
    </div>
  );
});
