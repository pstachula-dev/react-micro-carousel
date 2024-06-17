import type { CarouselReduceDispatch } from "./hooks/useCarousel";

export type CarouselState = {
  // required
  currentIndex: number;
  total: number;

  // optional
  slidesVisible?: number;

  // opts
  infinite?: false;
  autoPlay?: false;
};

export type CarouselContextProps = {
  dispatch: CarouselReduceDispatch;
  state: CarouselState;
};
