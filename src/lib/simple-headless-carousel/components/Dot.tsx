import { memo, useContext } from "react";
import { CarouselContext } from "../context/CarouselContext";

export const Dot = memo(({ index }: { index: number }) => {
  const { dispatch, state } = useContext(CarouselContext);

  return (
    <button
      onClick={() => dispatch({ action: "setCurrentIndex", value: index })}
      className={`w-2 h-2 rounded-full ${
        state.currentIndex === index ? "bg-red-500" : "bg-gray-500"
      }`}
    />
  );
});
