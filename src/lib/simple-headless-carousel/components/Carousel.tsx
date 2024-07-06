import {
  memo,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  useMemo,
} from "react";
import { CarouselContext } from "../context/CarouselContext";
import { getSlideClientX } from "../services/getSliderClientX";
import type { EventMap, SlideEvent } from "../services/types";
import { manageEvents } from "../services/manageEvents";

const threashold = 0.25;

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useContext(CarouselContext);
  const [isMoving, setIsMoving] = useState(true);

  const imgRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const movePayload = useRef({
    startX: 0,
    clientX: 0,
    moveRight: true,
  });

  const { total, width, slidesVisible, currentIndex, infinite } = state;
  const totalWidth = (100 * total) / slidesVisible;
  const totalWidthPercent = `${totalWidth}%`;

  const cancelWrongTarget = (event: SlideEvent) => {
    return event.target !== imgRef.current;
  };

  const setCurrentIndex = useCallback(
    (value: number) => {
      dispatch({ action: "setCurrentIndex", value });
    },
    [dispatch]
  );

  const setTranslateX = useCallback((x: number) => {
    animationRef.current = requestAnimationFrame(() => {
      imgRef.current?.style.setProperty("transform", `translateX(${x}px)`);
    });
  }, []);

  const onMoveStart = useCallback((event: SlideEvent) => {
    if (cancelWrongTarget(event)) return;
    // Important due to blocking onMouseMove
    event.preventDefault();

    setIsMoving(false);
    movePayload.current = {
      clientX: 0,
      startX: getSlideClientX(event),
      moveRight: true,
    };
  }, []);

  const onMove = useCallback(
    (event: SlideEvent) => {
      if (!imgRef.current || isMoving || cancelWrongTarget(event)) return;

      const startPosX = movePayload.current.startX;
      const clientX = getSlideClientX(event);
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
    [currentIndex, width, isMoving, setTranslateX]
  );

  const onMoveEnd = useCallback(
    (event: SlideEvent) => {
      if (cancelWrongTarget(event)) return;

      if (animationRef?.current) {
        cancelAnimationFrame(animationRef.current);
      }

      let finalIndex = currentIndex;

      if (movePayload.current.clientX !== 0) {
        const steps = Math.ceil(Math.abs(movePayload.current.clientX) / width);
        const newIndex = movePayload.current.moveRight
          ? currentIndex - steps
          : currentIndex + steps;

        if (infinite && (newIndex < 0 || newIndex >= total)) {
          finalIndex = newIndex > 0 ? 0 : total - 1;
        } else {
          finalIndex = newIndex;
        }
      }

      setIsMoving(true);
      setTranslateX(-width * finalIndex);
      setCurrentIndex(finalIndex);
    },
    [setCurrentIndex, setTranslateX, currentIndex, infinite, total, width]
  );

  const eventsMap = useMemo(
    (): EventMap => ({
      mousemove: onMove,
      mousedown: onMoveStart,
      mouseup: onMoveEnd,
      touchmove: onMove,
      touchstart: onMoveStart,
      touchend: onMoveEnd,
    }),
    [onMove, onMoveEnd, onMoveStart]
  );

  useEffect(() => {
    setTranslateX(-width * currentIndex);
  }, [setTranslateX, currentIndex, width]);

  useEffect(() => {
    manageEvents({ action: "add", eventsMap });

    return () => {
      manageEvents({ action: "remove", eventsMap });
    };
  }, [eventsMap]);

  return (
    <div className="overflow-hidden z-10 cursor-pointer">
      <div
        ref={imgRef}
        className={[
          "flex flex-row relative min-h-48",
          isMoving && "transition-transform duration-500",
        ].join(" ")}
        style={{ width: totalWidthPercent }}
      >
        {children}
      </div>
    </div>
  );
});
