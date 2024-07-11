import { useEffect } from 'react';
import {
  stateDefaults,
  type CarouselReduceDispatch,
  type CarouselState,
} from './useCarouselReducer';

export const useMergeConfig = ({
  dispatch,
  autoPlay,
  autoPlayDelay,
  slidesVisible,
  threshold,
  disableTouch,
  step,
  lazy,
  infinite,
  total,
}: Partial<CarouselState> & { dispatch: CarouselReduceDispatch }) => {
  useEffect(() => {
    dispatch({
      action: 'setConfig',
      config: {
        autoPlayDelay: autoPlayDelay || stateDefaults.autoPlayDelay,
        slidesVisible: slidesVisible || stateDefaults.slidesVisible,
        autoPlay: autoPlay || stateDefaults.autoPlay,
        step: step || stateDefaults.step,
        infinite: infinite || stateDefaults.infinite,
        lazy: lazy || stateDefaults.lazy,
        threshold: threshold || stateDefaults.threshold,
        disableTouch: disableTouch || stateDefaults.disableTouch,
        total,
      },
    });
  }, [
    dispatch,
    total,
    autoPlay,
    autoPlayDelay,
    threshold,
    slidesVisible,
    infinite,
    lazy,
    step,
    disableTouch,
  ]);
};
