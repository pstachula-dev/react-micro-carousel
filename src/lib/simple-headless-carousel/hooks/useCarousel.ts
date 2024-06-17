import { useReducer, type Dispatch } from "react";
import type { CarouselState } from "../Carousel.types";

type DispatchOpts = {
  action: "next" | "prev" | "setCurrentIndex" | "setTotal";
  value?: number;
};

export type CarouselReduceDispatch = Dispatch<DispatchOpts>;

const carouselReducer = (
  state: CarouselState,
  { action, value }: DispatchOpts
): CarouselState => {
  const { currentIndex } = state;

  switch (action) {
    case "next":
      return { ...state, currentIndex: currentIndex + 1 };
    case "prev":
      return { ...state, currentIndex: currentIndex - 1 };
    case "setCurrentIndex":
      return { ...state, currentIndex: value || 0 };
    case "setTotal":
      return { ...state, total: value || 0 };
    default:
      return state;
  }
};

export const useCarousel = (): {
  state: CarouselState;
  dispatch: CarouselReduceDispatch;
} => {
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
    total: 0,
  });

  return { state, dispatch };
};
