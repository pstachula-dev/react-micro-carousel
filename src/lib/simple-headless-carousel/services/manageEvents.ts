import type { EventMap, SlideEventUnion } from './types';

export const manageEvents = ({
  action,
  eventsMap,
}: {
  action: 'add' | 'remove';
  eventsMap: EventMap;
}) => {
  for (const [event, fn] of Object.entries(eventsMap)) {
    if (action === 'add') {
      document.addEventListener(event as SlideEventUnion, fn);
    } else {
      document.removeEventListener(event as SlideEventUnion, fn);
    }
  }
};
