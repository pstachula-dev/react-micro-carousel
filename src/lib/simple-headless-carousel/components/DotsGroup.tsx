import { memo, useContext, useId } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { Dot } from './Dot';
import { clsx } from '../services/clsx';

type DotsGroupProps = {
  className?: string;
};

/**
 * DotsGroup component for the carousel.
 *
 * @param {string} [className] - The class name for the dots group.
 */
export const DotsGroup = memo(({ className }: DotsGroupProps) => {
  const id = useId();
  const { state } = useContext(CarouselContext);
  const { total, slidesVisible } = state;
  const dotsLength = total / slidesVisible;

  return (
    <div className={clsx('flex justify-center space-x-2', className)}>
      {Array.from({ length: dotsLength }).map((_, idx) => (
        <Dot key={id + idx} index={idx * slidesVisible} />
      ))}
    </div>
  );
});
