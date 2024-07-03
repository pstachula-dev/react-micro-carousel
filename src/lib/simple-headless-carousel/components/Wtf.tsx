/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

const colors = {
  0: "bg-slate-700",
  1: "bg-slate-800",
  2: "bg-slate-900",
  3: "bg-slate-950",
};

const Slide = ({ title, index }) => {
  return (
    <div
      className={clsx(
        "w-[50%] h-[100px] z-0 pointer-events-none",
        colors[index]
      )}
    ></div>
  );
};

const width = 500;
const total = 4;
const threashold = 0.25;

type Event = TouchEvent | MouseEvent;

const isMouseEvent = (event: Event): event is MouseEvent => {
  return event instanceof MouseEvent;
};

const getPageX = (e: Event) => {
  return isMouseEvent(e) ? e.clientX : e.changedTouches[0].clientX;
};

export const Test = () => {
  const [isMoving, setIsMoving] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startPosX, setStartPosX] = useState(0);

  const movePayload = useRef({ x: 0, moveRight: true });
  const imgRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const setTranslateX = useCallback((x: number) => {
    animationRef.current = requestAnimationFrame(() => {
      imgRef.current?.style.setProperty("transform", `translateX(${x}px)`);
    });
  }, []);

  const moveBySteps = useCallback(() => {
    if (animationRef?.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsMoving(true);

    if (movePayload.current.x !== 0) {
      const steps = Math.ceil(Math.abs(movePayload.current.x) / width);
      const newIndex = movePayload.current.moveRight
        ? currentIndex - steps
        : currentIndex + steps;

      if (newIndex < 0 || newIndex >= total) {
        if (newIndex < 0) {
          setTranslateX(0);
          setCurrentIndex(0);
        } else {
          setTranslateX(-width * (total - 1));
          setCurrentIndex(total - 1);
        }
      } else {
        setTranslateX(-width * newIndex);
        setCurrentIndex(newIndex);
      }
    } else {
      setTranslateX(-width * currentIndex);
      setCurrentIndex(currentIndex);
    }
  }, [currentIndex, movePayload, setTranslateX]);

  const onTouchStart = useCallback((event: Event) => {
    if (event.target !== imgRef.current) return;

    movePayload.current = { x: 0, moveRight: true };
    setIsMoving(false);
    setStartPosX(getPageX(event));
  }, []);

  const handler = useCallback(
    (event: Event) => {
      if (!imgRef.current || isMoving) return;

      const clientX = getPageX(event);
      const hasThreshold = Math.abs(startPosX - clientX) > width * threashold;
      const xDiff = startPosX ? clientX - startPosX : 0;
      const stepsWidth = width * -currentIndex;

      setTranslateX(xDiff + stepsWidth);

      if (hasThreshold) {
        movePayload.current = { x: xDiff, moveRight: xDiff > 0 };
      }
    },
    [currentIndex, isMoving, setTranslateX, startPosX]
  );

  useEffect(() => {
    document.addEventListener("mousedown", onTouchStart);
    document.addEventListener("mousemove", handler);
    document.addEventListener("mouseup", moveBySteps);
    // touch
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", handler);
    document.addEventListener("touchend", moveBySteps);

    return () => {
      document.removeEventListener("mousedown", onTouchStart);
      document.removeEventListener("mousemove", handler);
      document.removeEventListener("mouseup", moveBySteps);
      // touch
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", handler);
      document.removeEventListener("touchend", moveBySteps);
    };
  }, [moveBySteps, onTouchStart, handler]);

  return (
    <div>
      <div className="overflow-hidden z-10 cursor-pointer">
        <div
          ref={imgRef}
          className={clsx(
            "flex",
            isMoving && "transition-transform duration-500"
          )}
          style={{ width: "400%" }}
        >
          <Slide title="Slide 1" index={0} />
          <Slide title="Slide 2" index={1} />
          <Slide title="Slide 3" index={2} />
          <Slide title="Slide 4" index={3} />
        </div>
      </div>
    </div>
  );
};
