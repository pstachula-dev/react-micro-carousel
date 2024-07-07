export type SliderButtonProps = {
  title?: string;
  action?: () => void;
  onClick?: () => void;
  className?: string;
};

/**
 * Renders a slider button component.
 *
 * @param {Object} props - The properties for the slider button.
 * @param {Function} props.onClick - The click event handler.
 * @param {Function} props.action - The action to be performed when the button is clicked.
 * @param {string} props.title - The title to be displayed on the button.
 * @param {string} [props.className] - The additional CSS class for the button.
 * @return {JSX.Element} The rendered slider button component.
 */
export const SliderButton = ({
  onClick,
  action,
  title,
  className,
}: SliderButtonProps) => {
  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        action?.();
        onClick?.();
      }}
    >
      {title}
    </button>
  );
};
