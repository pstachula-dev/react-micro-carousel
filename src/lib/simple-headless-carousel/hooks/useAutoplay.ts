import { useEffect } from "react";
import { useCarouselReducer } from "./useCarouselReducer";
import type { CarouselContextProps } from "../context/CarouselContext";

export const useAutoplay = (ctx: CarouselContextProps) => {
  const { dispatch } = useCarouselReducer();

  useEffect(() => {
    const { state } = ctx;

    if (!state.autoPlay) return;

    const intervalId = setInterval(() => {
      if (state.currentIndex === state.total - 1) {
        dispatch({ action: "setCurrentIndex", value: 0 });
      } else {
        dispatch({ action: "next" });
      }
    }, state.autoPlayDelay);

    return () => clearInterval(intervalId);
  }, [ctx, dispatch]);
};
