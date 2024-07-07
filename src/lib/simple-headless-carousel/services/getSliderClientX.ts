import type { SlideEvent } from './types';

export const getSlideClientX = (event: SlideEvent) => event instanceof MouseEvent
    ? event.clientX
    : event.changedTouches[0].clientX;
