import { memo, type ReactNode } from "react";
import { clsx } from "../services/clsx";

type SlideProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A single slide in a carousel.
 *
 * @component
 * @param {ReactNode} children - The content of the slide.
 * @param {string} className - Additional CSS classes for the slide.
 */
export const Slide = memo(({ children, className }: SlideProps) => {
  return (
    <div className={clsx("relative w-full pointer-events-none", className)}>
      {children}
    </div>
  );
});
