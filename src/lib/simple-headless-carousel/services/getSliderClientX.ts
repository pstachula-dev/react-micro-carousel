import type { SlideEvent } from './types';

export const getSlideClientX = (event: SlideEvent) => {
  return event instanceof MouseEvent
    ? event.clientX
    : event.changedTouches[0].clientX;
};
