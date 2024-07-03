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

const getPageX = (event: Event) => {
  return isMouseEvent(event) ? event.clientX : event.changedTouches[0].clientX;
};

export const Test = () => {
  const [isMoving, setIsMoving] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imgRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const movePayload = useRef({
    startX: 0,
    clientX: 0,
    moveRight: true,
  });

  const setTranslateX = useCallback((x: number) => {
    animationRef.current = requestAnimationFrame(() => {
      imgRef.current?.style.setProperty("transform", `translateX(${x}px)`);
    });
  }, []);

  const onMoveStart = useCallback((event: Event) => {
    if (event.target !== imgRef.current) return;
    event.preventDefault();

    setIsMoving(false);
    movePayload.current = {
      clientX: 0,
      startX: getPageX(event),
      moveRight: true,
    };
  }, []);

  const onMove = useCallback(
    (event: Event) => {
      if (!imgRef.current || isMoving) return;

      const startPosX = movePayload.current.startX;
      const clientX = getPageX(event);
      const hasThreshold = Math.abs(startPosX - clientX) > width * threashold;
      const xDiff = startPosX ? clientX - startPosX : 0;
      const stepsWidth = width * -currentIndex;
      setTranslateX(xDiff + stepsWidth);

      if (hasThreshold) {
        movePayload.current = {
          ...movePayload.current,
          clientX: xDiff,
          moveRight: xDiff > 0,
        };
      }
    },
    [currentIndex, isMoving, setTranslateX]
  );

  const onMoveEnd = useCallback(() => {
    if (animationRef?.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsMoving(true);

    if (movePayload.current.clientX !== 0) {
      const steps = Math.ceil(Math.abs(movePayload.current.clientX) / width);
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

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMoveStart);
    document.addEventListener("mouseup", onMoveEnd);
    // touch
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchstart", onMoveStart);
    document.addEventListener("touchend", onMoveEnd);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMoveStart);
      document.removeEventListener("mouseup", onMoveEnd);
      // touch
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchstart", onMoveStart);
      document.removeEventListener("touchend", onMoveEnd);
    };
  }, [onMoveEnd, onMoveStart, onMove]);

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
