export type SlideEventUnion =
  | "mousemove"
  | "mousedown"
  | "mouseup"
  | "touchmove"
  | "touchstart"
  | "touchend";

export type SlideEvent = TouchEvent | MouseEvent;

export type EventMap = {
  [key in SlideEventUnion]: (event: SlideEvent) => void;
};
