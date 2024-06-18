import { createContext } from "react";
import {
  stateDefaults,
  type CarouselReduceDispatch,
  type CarouselState,
} from "../hooks/useCarouselReducer";
import { noop } from "../services/noop";

export type CarouselContextProps = {
  dispatch: CarouselReduceDispatch;
  state: CarouselState;
};

export const CarouselContext = createContext<CarouselContextProps>({
  dispatch: noop,
  state: stateDefaults,
});
