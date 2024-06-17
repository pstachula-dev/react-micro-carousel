import { memo } from "react";

export const SliderButton = memo(
  ({
    onClick,
    action,
    title,
  }: {
    title: string;
    action: () => void;
    onClick?: () => void;
  }) => {
    return (
      <button
        type="button"
        onClick={() => {
          action();
          onClick?.();
        }}
      >
        {title}
      </button>
    );
  }
);
