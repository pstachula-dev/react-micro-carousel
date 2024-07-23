import { useEffect } from 'react';
import {
  stateDefaults,
  type CarouselReduceDispatch,
  type CarouselState,
} from './useCarouselReducer';

const isDefined = <T>(prop: T) => prop !== undefined;

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
        autoPlayDelay: isDefined(autoPlayDelay)
          ? autoPlayDelay
          : stateDefaults.autoPlayDelay,
        slidesVisible: isDefined(slidesVisible)
          ? slidesVisible
          : stateDefaults.slidesVisible,
        autoPlay: isDefined(autoPlay) ? autoPlay : stateDefaults.autoPlay,
        step: isDefined(step) ? step : stateDefaults.step,
        infinite: isDefined(infinite) ? infinite : stateDefaults.infinite,
        lazy: isDefined(lazy) ? lazy : stateDefaults.lazy,
        threshold: isDefined(threshold) ? threshold : stateDefaults.threshold,
        disableTouch: isDefined(disableTouch)
          ? disableTouch
          : stateDefaults.disableTouch,
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
