import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { SliderButton, type SliderButtonProps } from './SliderButton';

/**
 * A button component that allows the user to navigate to the prev slide in the carousel.
 *
 * @component
 * @example
 * <PrevButton onClick={handlePrevButtonClick} className="custom-class">Prev</PrevButton>
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 * @param {string} className - An optional class name to be applied to the button.
 */
export const PrevButton = memo(
  ({ onClick, className, children }: SliderButtonProps) => {
    const { dispatch } = useContext(CarouselContext);

    return (
      <SliderButton
        className={className}
        action={() => dispatch({ action: 'prev' })}
        onClick={onClick}
      >
        {children}
      </SliderButton>
    );
  },
);
