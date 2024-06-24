import React, {
  memo,
  useContext,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { CarouselContext } from "../context/CarouselContext";
import { useDebounce } from "../hooks/useDebounce";

type Point = {
  x: number;
  y: number;
  width: number;
};

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useContext(CarouselContext);
  const sliderPositionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<{ threshold: boolean }>({ threshold: false });
  const prevXRef = useRef<number>(0);
  const animationTrigger = useRef<boolean>(false);
  const diffRef = useRef<number>(0);
  const [isPending, startTransition] = useTransition();
  const [elementPos, setElementPos] = useState<undefined | Point>();
  const [elWidthDiff, setElWidthDiff] = useState<number | null>(null);

  const { total, currentIndex, slidesVisible } = state;
  const itemX = 100 / total;
  const totalX = itemX * -currentIndex;
  const totalWidth = (100 * total) / slidesVisible;

  const onMouseMove = (event: React.MouseEvent) => {
    if (!elementPos) return;
    if (animationTrigger.current) return;

    const { pageX } = event;

    if (!prevXRef.current) {
      prevXRef.current = pageX;
    }

    const isLeft = prevXRef.current < pageX;
    const diff = pageX - prevXRef.current;
    const widthPercent = (Math.abs(diff) * 100) / elementPos.width;

    // console.log("pageX:", pageX);
    // console.log("prev", prevXRef.current);
    // console.log("isLeft", isLeft);
    // console.log("------------------------------------------");

    startTransition(() => {
      diffRef.current = isLeft ? diff : diff - currentIndex * elementPos.width;
      setElWidthDiff(isLeft ? diff : diff - currentIndex * elementPos.width);
    });
  };

  const onMouseDown = () => {
    animationTrigger.current = false;
    sliderRef.current.threshold = false;
    const x = sliderPositionRef?.current?.offsetLeft;
    const y = sliderPositionRef?.current?.offsetTop;
    const width = sliderPositionRef?.current?.clientWidth;

    if (!x || !y || !width) return;

    setElementPos({ x, y, width });
    setElWidthDiff(0);
  };

  const onMouseOff = () => {
    sliderRef.current.threshold = true;
    prevXRef.current = 0;
    setElementPos(undefined);
    setElWidthDiff(0);
  };

  const width = `${totalWidth}%`;

  const transform = diffRef.current
    ? `translate3d(${diffRef.current}px, 0, 0)`
    : `translate3d(${totalX}%, 0, 0)`;

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
        className="flex-row transition-transform duration-500 flex relative min-h-[200px]"
      >
        {children}
      </div>
    </div>
  );
});
