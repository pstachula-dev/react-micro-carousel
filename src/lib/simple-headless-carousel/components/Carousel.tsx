import {
  memo,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
  useEffect,
} from "react";
import { CarouselContext } from "../context/CarouselContext";

type Event = TouchEvent | MouseEvent;

function isMouseEvent(event: Event): event is MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}

const step = 5;

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useContext(CarouselContext);

  const [localIndex, setLocalIndex] = useState(0);
  const [startPosX, setStartPosX] = useState(0);
  const [prevPosX, setPrevPosX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const { total, width, slidesVisible, currentIndex } = state;
  const totalWidth = (100 * total) / slidesVisible;
  const totalWidthPercent = `${totalWidth}%`;

  useEffect(() => {
    requestPosX(-width * currentIndex);
  }, [currentIndex, width, localIndex]);

  const requestPosX = (posX: number) => {
    requestAnimationFrame(() => setPosX(posX));
  };

  const getPageX = (e: Event) => {
    return isMouseEvent(e) ? e.pageX : e.changedTouches[0].pageX;
  };

  const onTouchMove = (e: Event) => {
    if (!isStart || isMoving) return;
    setPrevPosX(getPageX(e));

    const pageX = getPageX(e);
    const isGoRight = prevPosX > pageX;

    requestPosX(isGoRight ? posX - step : posX + step);
  };

  const onTouchStart = (e: Event) => {
    setIsMoving(false);
    setIsStart(true);
    setStartPosX(getPageX(e));
  };

  const onTouchEnd = (e: Event) => {
    if (isMoving) return;

    setIsStart(false);
    setIsMoving(true);

    const pageX = getPageX(e);
    const hasThreshold = Math.abs(startPosX - pageX) > width * 0.05;
    const isGoRight = startPosX > pageX;

    if (hasThreshold) {
      const newIndex = isGoRight ? localIndex + 1 : localIndex - 1;

      if (newIndex < 0 || newIndex >= total) {
        requestPosX(-width * localIndex);
      } else {
        requestPosX(-width * newIndex);
        setLocalIndex(newIndex);
        dispatch({ action: "setCurrentIndex", value: newIndex });
      }
    } else {
      requestPosX(-width * localIndex);
    }
  };

  const onMouseLeave = () => {
    setIsStart(false);
    setIsMoving(true);
    requestPosX(-width * localIndex);
  };

  const transform = `translate3d(${posX}px, 0, 0)`;

  return (
    <div
      className="overflow-hidden  touch-pan-x z-10 cursor-pointer"
      // Touch Events
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // Mouse Events
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseUp={onTouchEnd}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{ width: totalWidthPercent, transform }}
        className="flex-row transition-transform duration-300 flex relative min-h-[200px]"
      >
        {children}
      </div>
    </div>
  );
});
