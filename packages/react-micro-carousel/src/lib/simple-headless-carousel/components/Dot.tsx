import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { clsx } from '../services/clsx';

type DotProps = {
  index: number;
  className?: string;
  colorActive?: string;
  colorInactive?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

/**
 * Dot component for the carousel.
 *
 * @param {number} index - The index of the dot.
 * @param {string} className - The class name for the dot.
 * @param {string} colorActive - The class name for the active dot.
 * @param {string} colorInactive - The class name for the inactive dot.
 * @param {boolean} disabled - Whether the dot is disabled.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 */
export const Dot = memo(
  ({
    index,
    disabled,
    onClick,
    colorActive,
    colorInactive,
    className,
  }: DotProps) => {
    const { dispatch, state } = useContext(CarouselContext);
    const color =
      state.currentIndex === index
        ? colorActive || 'bg-black'
        : colorInactive || 'bg-white';

    const handleClick = (event: React.MouseEvent) => {
      dispatch({ action: 'setCurrentIndex', value: index });
      onClick?.(event);
    };

    return (
      <button
        type="button"
        aria-label="Dot icon"
        disabled={disabled}
        onClick={handleClick}
        className={clsx('size-3 rounded-full', color, className)}
      />
    );
  },
);
