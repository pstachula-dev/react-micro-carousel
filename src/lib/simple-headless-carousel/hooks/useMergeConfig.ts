import { useEffect } from "react";
import {
  stateDefaults,
  type CarouselReduceDispatch,
  type CarouselState,
} from "./useCarouselReducer";

export const useMergeConfig = ({
  dispatch,
  autoPlay,
  autoPlayDelay,
  slidesVisible,
  step,
  total,
}: Partial<CarouselState> & { dispatch: CarouselReduceDispatch }) => {
  useEffect(() => {
    dispatch({
      action: "setConfig",
      config: {
        autoPlayDelay: autoPlayDelay || stateDefaults.autoPlayDelay,
        slidesVisible: slidesVisible || stateDefaults.slidesVisible,
        autoPlay: autoPlay || stateDefaults.autoPlay,
        step: step || stateDefaults.step,
        total,
      },
    });
  }, [dispatch, total, autoPlay, autoPlayDelay, slidesVisible, step]);
};
