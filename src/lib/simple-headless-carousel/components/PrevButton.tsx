import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { SliderButton, type SliderButtonProps } from './SliderButton';

/**
 * A button component that allows the user to navigate to the prev slide in the carousel.
 *
 * @component
 * @example
 * <PrevButton onClick={handlePrevButtonClick} className="custom-class" title="Skip to prev slide" />
 *
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 * @param {string} className - An optional class name to be applied to the button.
 * @param {string} title - An optional title to be displayed on the button.
 */
export const PrevButton = memo(
  ({ onClick, className, title }: SliderButtonProps) => {
    const { dispatch } = useContext(CarouselContext);

    return (
      <SliderButton
        className={className}
        action={() => dispatch({ action: 'prev' })}
        title={title || 'Prev'}
        onClick={onClick}
      />
    );
  },
);
