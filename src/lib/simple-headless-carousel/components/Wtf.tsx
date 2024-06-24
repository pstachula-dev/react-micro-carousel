import clsx from "clsx";
import { useState, TouchEvent } from "react";

const Slide = ({ title }) => {
  return <div className="border w-[50%] bg-slate-800 h-[100px]">{title}</div>;
};

const step = 5;
const width = 500;
const total = 4;

export const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevPosX, setPrevPosX] = useState(0);
  const [posX, setPosX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const getPageX = (e: TouchEvent) => e.changedTouches[0].pageX;

  const onTouchMove = (e: TouchEvent) => {
    const pageX = getPageX(e);
    const isGoRight = prevPosX > pageX;

    setIsMoving(false);
    setPosX(isGoRight ? posX - step : posX + step);
  };

  const onTouchStart = (e: TouchEvent) => {
    setPrevPosX(getPageX(e));
  };

  const onTouchEnd = (e: TouchEvent) => {
    const pageX = getPageX(e);
    const hasThreshold = Math.abs(prevPosX - pageX) > width * 0.1;
    const isGoRight = prevPosX > pageX;

    setIsMoving(true);

    if (hasThreshold) {
      const newIndex = isGoRight ? currentIndex + 1 : currentIndex - 1;

      if (newIndex < 0 || newIndex >= total) {
        setPosX(-width * currentIndex);
      } else {
        setPosX(-width * newIndex);
        setCurrentIndex(newIndex);
      }
    } else {
      setPosX(-width * currentIndex);
    }
  };

  const transform = `translate3d(${posX}px, 0, 0)`;

  return (
    <div>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="overflow-hidden  touch-pan-x z-10 cursor-pointer"
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
