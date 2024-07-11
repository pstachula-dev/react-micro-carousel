import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { SliderButton, type SliderButtonProps } from './SliderButton';

/**
 * A button component that allows the user to navigate to the next slide in the carousel.
 *
 * @component
 * @example
 * <NextButton onClick={handleNextButtonClick} className="custom-class" title="Skip to next slide" />
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 * @param {string} className - An optional class name to be applied to the button.
 * @param {string} title - An optional title to be displayed on the button.
 */
export const NextButton = memo(
  ({ onClick, className, children }: SliderButtonProps) => {
    const { dispatch } = useContext(CarouselContext);

    return (
      <SliderButton
        className={className}
        action={() => dispatch({ action: 'next' })}
        onClick={onClick}
      >
        {children}
      </SliderButton>
    );
  },
);
