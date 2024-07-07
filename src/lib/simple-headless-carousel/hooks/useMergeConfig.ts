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
  step,
  infinite,
  width,
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
        width,
        total,
      },
    });
  }, [
    dispatch,
    total,
    autoPlay,
    autoPlayDelay,
    slidesVisible,
    infinite,
    width,
    step,
  ]);
};
