import React, {
  memo,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CarouselContext } from "../context/CarouselContext";

type Point = {
  x: number;
  y: number;
  width: number;
};

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useContext(CarouselContext);
  const sliderPositionRef = useRef<HTMLDivElement>(null);
  const thresholdRef = useRef(false);
  const prevXRef = useRef<number>(0);
  const animationRef = useRef<boolean>(false);
  const translateXRef = useRef<number>(0);

  const { total, currentIndex, slidesVisible } = state;
  // const itemX = 100 / total;
  // const totalX = itemX * -currentIndex;
  const totalWidth = (100 * total) / slidesVisible;

  const onMouseMove = ({ pageX }: React.MouseEvent) => {
    if (!elementPos || !animationRef.current || thresholdRef.current) {
      return;
    }

    if (!prevXRef.current) {
      prevXRef.current = pageX;
    }

    const isLeft = prevXRef.current < pageX;
    const diff = pageX - elementPos.x;
    const widthFragment = elementPos.width * (1 / total);
    const actualWidth = widthFragment * -currentIndex;
    const widthPercent = (Math.abs(diff) * 100) / (elementPos.width / total);

    console.log({ pageX, elementPos: elementPos.x, diff });
    // console.log("pageX:", pageX);
    // console.log("prev", prevXRef.current);
    // console.log("isLeft", isLeft);
    // console.log("------------------------------------------");

    if (widthPercent > 111) {
      thresholdRef.current = true;

      requestAnimationFrame(() => {
        if (isLeft && currentIndex === 0) {
          translateXRef.current = (total - 1) * -widthFragment;
        } else if (!isLeft && currentIndex === total - 1) {
          translateXRef.current = 0;
        } else {
          translateXRef.current = isLeft
            ? actualWidth + widthFragment
            : actualWidth - widthFragment;
        }
      });

      dispatch({ action: isLeft ? "prev" : "next" });
      return;
    }

    translateXRef.current = isLeft ? diff : -diff;

    setElWidthDiff(isLeft ? diff : diff - currentIndex * elementPos.width);
  };

  const onMouseDown = () => {
    animationRef.current = true;
    thresholdRef.current = false;

    const x = sliderPositionRef?.current?.offsetLeft;
    const y = sliderPositionRef?.current?.offsetTop;
    const width = sliderPositionRef?.current?.clientWidth;

    if (!x || !y || !width) return;

    // translateXRef.current = 0;
    prevXRef.current = 0;
    setElementPos({ x, y, width });
    setElWidthDiff(0);
  };

  const onMouseOff = () => {
    animationRef.current = false;
    setElWidthDiff(0);
    if (elementPos?.width) {
      translateXRef.current = elementPos.width * currentIndex;
    }
  };

  const width = `${totalWidth}%`;

  const transform = `translate3d(${translateXRef.current}px, 0, 0)`;

  // const transform = translateXRef.current
  //   ? `translate3d(${translateXRef.current}px, 0, 0)`
  //   : `translate3d(${totalX}%, 0, 0)`;

  // const transform = `translate3d(${totalX}%, 0, 0)`;

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseOff}
      onMouseLeave={onMouseOff}
      className="overflow-hidden touch-pan-x z-10 cursor-pointer"
    >
      <div
        ref={sliderPositionRef}
        style={{ width, transform }}
        className="flex-row transition-transform duration-300 flex relative min-h-[200px]"
      >
        {children}
      </div>
    </div>
  );
});
