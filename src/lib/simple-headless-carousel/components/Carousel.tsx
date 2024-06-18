import { memo, useContext, type ReactNode } from "react";
import { CarouselContext } from "../context/CarouselContext";

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  const { state } = useContext(CarouselContext);

  const { total, currentIndex, slidesVisible } = state;
  const itemX = 100 / total;
  const totalX = itemX * -currentIndex;
  const totalWidth = (100 * total) / slidesVisible;

  return (
    <div className="overflow-hidden">
      <div
        style={{
          width: `${totalWidth}%`,
          transform: `translateX(${totalX}%)`,
        }}
        className="flex-row transition-transform duration-500 flex relative min-h-[200px]"
      >
        {children}
      </div>
    </div>
  );
});
