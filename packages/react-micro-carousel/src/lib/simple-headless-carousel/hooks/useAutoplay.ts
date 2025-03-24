import { useEffect } from 'react';
import { type CarouselReduceDispatch } from './useCarouselReducer';
import type { CarouselContextProps } from '../context/CarouselContext';

export const useAutoplay = ({
  ctx,
  dispatch,
}: {
  ctx: CarouselContextProps;
  dispatch: CarouselReduceDispatch;
}) => {
  useEffect(() => {
    const { state } = ctx;

    if (state.autoPlay) {
      const intervalId = setInterval(() => {
        if (state.currentIndex === state.total - 1) {
          dispatch({ action: 'setCurrentIndex', value: 0 });
        } else {
          dispatch({ action: 'next' });
        }
      }, state.autoPlayDelay);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [ctx, dispatch]);
};
