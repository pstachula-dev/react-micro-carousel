import { memo, useContext, useId } from "react";
import { CarouselContext } from "../context/CarouselContext";
import { Dot } from "./Dot";

export const DotsGroup = memo(() => {
  const id = useId();
  const { state } = useContext(CarouselContext);
  const { total, slidesVisible } = state;
  const dotsLength = total / slidesVisible;

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: dotsLength }).map((_, idx) => (
        <Dot key={id + idx} index={idx * slidesVisible} />
      ))}
    </div>
  );
});
