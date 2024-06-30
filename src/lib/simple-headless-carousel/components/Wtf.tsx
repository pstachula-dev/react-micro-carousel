import clsx from "clsx";
import { useState, type MouseEvent, type TouchEvent } from "react";

const Slide = ({ title }) => {
  return <div className="border w-[50%] bg-slate-800 h-[100px]">{title}</div>;
};

const step = 5;
const width = 300;
const total = 4;

type Event = TouchEvent | MouseEvent;

function isMouseEvent(event: Event): event is MouseEvent {
  return event.nativeEvent instanceof MouseEvent || event instanceof MouseEvent;
}

export const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startPosX, setStartPosX] = useState(0);
  const [prevPosX, setPrevPosX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isStart, setIsStart] = useState(false);

  function requestPosX(posX: number) {
    requestAnimationFrame(() => setPosX(posX));
  }

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
    const hasThreshold = Math.abs(startPosX - pageX) > width * 0.1;
    const isGoRight = startPosX > pageX;

    if (hasThreshold) {
      const newIndex = isGoRight ? currentIndex + 1 : currentIndex - 1;

      if (newIndex < 0 || newIndex >= total) {
        requestPosX(-width * currentIndex);
      } else {
        requestPosX(-width * newIndex);
        setCurrentIndex(newIndex);
      }
    } else {
      requestPosX(-width * currentIndex);
    }
  };

  const onMouseLeave = () => {
    setIsStart(false);
    setIsMoving(true);
    requestPosX(-width * currentIndex);
  };

  const transform = `translate3d(${posX}px, 0, 0)`;

  return (
    <div>
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
          className={clsx(
            "flex hover:cursor-grab transition-transform",
            isMoving && "duration-500"
          )}
          style={{ width: "400%", transform }}
        >
          <Slide title="Slide 1" />
          <Slide title="Slide 2" />
          <Slide title="Slide 3" />
          <Slide title="Slide 4" />
        </div>
      </div>
    </div>
  );
};
