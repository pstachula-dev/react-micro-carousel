import { memo, type ReactNode, useContext } from "react";
import { CarouselContext } from "../CarouselProvider";

export const Slide = memo(
  ({ children, index }: { children: ReactNode; index: number }) => {
    const { state } = useContext(CarouselContext);

    return (
      <div
        style={{
          transform: `translateX(${(index - state.currentIndex) * 100}%)`,
        }}
        className="absolute w-full transition-transform"
      >
        {children}
      </div>
    );
  }
);
