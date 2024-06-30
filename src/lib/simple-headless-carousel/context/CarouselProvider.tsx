import { useMemo, type ReactNode } from "react";
import {
  useCarouselReducer,
  type CarouselState,
} from "../hooks/useCarouselReducer";
import { CarouselContext } from "./CarouselContext";
import { useAutoplay } from "../hooks/useAutoplay";
import { useMergeConfig } from "../hooks/useMergeConfig";

export const CarouselProvider = ({
  children,
  total,
  width,
  autoPlay,
  autoPlayDelay,
  slidesVisible,
  infinite,
  step,
}: {
  children: ReactNode;
} & Partial<CarouselState>) => {
  const { dispatch, state } = useCarouselReducer();

  const ctx = useMemo(
    () => ({
      dispatch,
      state,
    }),
    [state, dispatch]
  );

  useMergeConfig({
    dispatch,
    total,
    width,
    autoPlay,
    infinite,
    autoPlayDelay,
    slidesVisible,
    step,
  });

  useAutoplay(ctx);

  return (
    <CarouselContext.Provider value={ctx}>{children}</CarouselContext.Provider>
  );
};
