import {
  memo,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { getSlideClientX } from '../services/getSliderClientX';
import type { EventMap, SlideEvent } from '../services/types';
import { manageEvents } from '../services/manageEvents';
import { clsx } from '../services/clsx';
import { useResizeObserver } from '../hooks/useResizeObserver';

type CarouselProps = {
  children: ReactNode;
  wrapperClassName?: string;
  carouselClassName?: string;
};

const fullSize = 100;

/**
 * A simple headless carousel
 *
 * @param {ReactNode} children The children of the carousel
 * @param {string} wrapperClassName An optional class to be applied to the wrapper div
 * @param {string} carouselClassName An optional class to be applied to the carousel div
 */
export const Carousel = memo(
  ({ children, wrapperClassName, carouselClassName }: CarouselProps) => {
    const { state, dispatch } = useContext(CarouselContext);
    const [isMoving, setIsMoving] = useState(true);

    const imgRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const { refWidth } = useResizeObserver(imgRef);
    const movePayload = useRef({
      startX: 0,
      clientX: 0,
      moveRight: true,
    });

    const {
      total,
      slidesVisible,
      currentIndex,
      infinite,
      threshold,
      disableTouch,
    } = state;
    const totalWidth = (fullSize * total) / slidesVisible;
    const totalWidthPercent = `${totalWidth}%`;
    const width = (refWidth || 0) / total;
    const cancelWrongTarget = ({ target }: SlideEvent) => {
      return target !== imgRef.current;
    };

    const setCurrentIndex = useCallback(
      (value: number) => {
        dispatch({ action: 'setCurrentIndex', value });
      },
      [dispatch],
    );

    const setTranslateX = useCallback(
      (x: number) => {
        animationRef.current = requestAnimationFrame(() => {
          const percentX = (x * fullSize) / width / total / slidesVisible;

          imgRef.current?.style.setProperty(
            'transform',
            `translateX(${percentX}%)`,
          );
        });
      },
      [width, total, slidesVisible],
    );

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
        if (!imgRef.current || isMoving) return;

        const startPosX = movePayload.current.startX;
        const clientX = getSlideClientX(event);
        const hasThreshold = Math.abs(startPosX - clientX) > width * threshold;
        const xDiff = startPosX ? clientX - startPosX : 0;
        const stepsWidth = width * currentIndex;
        setTranslateX(xDiff - stepsWidth);

        if (hasThreshold) {
          movePayload.current = {
            ...movePayload.current,
            clientX: xDiff,
            moveRight: xDiff > 0,
          };
        }
      },
      [currentIndex, width, isMoving, setTranslateX, threshold],
    );

    const onMoveEnd = useCallback(() => {
      if (!movePayload.current.startX) return;

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

      movePayload.current = {
        ...movePayload.current,
        clientX: 0,
      };
      setIsMoving(true);
      setTranslateX(-width * finalIndex);
      setCurrentIndex(finalIndex);
    }, [setCurrentIndex, setTranslateX, currentIndex, infinite, total, width]);

    const eventsMap = useMemo(
      (): EventMap => ({
        mousemove: onMove,
        mousedown: onMoveStart,
        mouseup: onMoveEnd,
        touchmove: onMove,
        touchstart: onMoveStart,
        touchend: onMoveEnd,
      }),
      [onMove, onMoveEnd, onMoveStart],
    );

    useEffect(() => {
      setTranslateX(-width * currentIndex);
    }, [setTranslateX, currentIndex, width]);

    useEffect(() => {
      if (disableTouch) return;

      manageEvents({ action: 'add', eventsMap });

      return () => {
        manageEvents({ action: 'remove', eventsMap });
      };
    }, [eventsMap, disableTouch]);

    return (
      <div
        className={clsx(
          'relative z-10 max-w-full cursor-pointer overflow-hidden',
          wrapperClassName,
        )}
      >
        <div
          ref={imgRef}
          className={clsx(
            'relative flex w-full flex-row',
            isMoving && 'transition-transform duration-500',
            carouselClassName,
          )}
          style={{ width: totalWidthPercent }}
        >
          {children}
        </div>
      </div>
    );
  },
);
