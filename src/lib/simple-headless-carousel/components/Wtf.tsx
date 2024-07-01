import clsx from "clsx";
import { get } from "http";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type TouchEvent,
} from "react";
import { useDebounce } from "../hooks/useDebounce";

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
        "border w-[50%] h-[100px] z-0 pointer-events-none",
        colors[index]
      )}
    ></div>
  );
};

const step = 1;
const width = 500;
const total = 4;
const threashold = 0.45;

type Event = TouchEvent | MouseEvent;

function isMouseEvent(event: Event): event is MouseEvent {
  return event.nativeEvent instanceof MouseEvent || event instanceof MouseEvent;
}

export const Test = () => {
  const [isMoving, setIsMoving] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startPosX, setStartPosX] = useState(0);
  const [movePayload, setMovePayload] = useState({ x: 0, moveRight: true });

  const prevVal = useRef<number | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  console.warn("RENDER");

  const getPageX = (e: Event) => {
    return isMouseEvent(e) ? e.pageX : e.changedTouches[0].pageX;
  };

  const setTranslateX = (x: number) => {
    animationRef.current = requestAnimationFrame(() => {
      imgRef.current?.style.setProperty("transform", `translateX(${x}px)`);
    });
  };

  const handler = useCallback(
    (event: MouseEvent) => {
      if (!imgRef.current || isMoving) return;

      const { clientX } = event;
      const hasThreshold = Math.abs(startPosX - clientX) > width * threashold;
      const diff = startPosX ? clientX - startPosX : 0;
      const stepsWidth = width * -currentIndex;

      setTranslateX(diff + stepsWidth);

      if (hasThreshold) {
        setMovePayload({
          x: diff,
          moveRight: diff > 0,
        });
      }
    },
    [currentIndex, isMoving, startPosX]
  );

  const moveBySteps = useCallback(() => {
    if (animationRef?.current) {
      cancelAnimationFrame(animationRef.current);
    }

    console.log(movePayload);

    setIsMoving(true);

    if (movePayload.x !== 0) {
      const steps = Math.ceil(Math.abs(movePayload.x) / width);
      const newIndex = movePayload.moveRight
        ? currentIndex - steps
        : currentIndex + steps;

      console.log({ newIndex, total });

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
    }
  }, [currentIndex, movePayload]);

  useEffect(() => {
    const clickHandler = () => {
      if (isMoving) return;
      moveBySteps();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("mousemove", handler as any);
    window.addEventListener("click", clickHandler);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("mousemove", handler as any);
      window.removeEventListener("click", clickHandler);
    };
  }, [handler, isMoving, moveBySteps]);

  const onTouchStart = (e: Event) => {
    setMovePayload({ x: 0, moveRight: true });
    setIsMoving(false);
    setStartPosX(getPageX(e));
  };

  return (
    <div>
      <div
        className="overflow-hidden z-10 cursor-pointer"
        // Touch Events
        // onTouchStart={onTouchStart}
        // onTouchMove={onTouchMove}
        // onTouchEnd={onTouchEnd}
        // Mouse Events
        onMouseDown={onTouchStart}
        onMouseUp={moveBySteps}
      >
        <div
          ref={imgRef}
          className={clsx("flex", isMoving && "duration-500")}
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
