import type { ReactNode } from 'react';

export type SliderButtonProps = {
  children: ReactNode;
  action?: () => void;
  onClick?: () => void;
  className?: string;
};

/**
 * Renders a slider button component.
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} props.onClick - The click event handler.
 * @param {Function} props.action - The action to be performed when the button is clicked.
 * @param {string} [props.className] - The additional CSS class for the button.
 * @return {JSX.Element} The rendered slider button component.
 */
export function SliderButton({
  onClick,
  action,
  children,
  className,
}: SliderButtonProps) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        action?.();
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
