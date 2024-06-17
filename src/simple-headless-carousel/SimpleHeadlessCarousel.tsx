import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CarouselState = {
  currentIndex: number;
  total: number;
  next: () => void;
  prev: () => void;
  setCurrentIndex: (idx: number) => void;
};

const noop = () => null;

export const CarouselContext = createContext<CarouselState>({
  currentIndex: 0,
  total: 0,
  next: noop,
  prev: noop,
  setCurrentIndex: noop,
});

export const useCarousel = () => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentIndex: 0,
    total: 0,
    prev: noop,
    next: noop,
    setCurrentIndex: noop,
  });

  const setCurrentIndex = useCallback((index: number) => {
    setCarouselState((prev) => ({
      ...prev,
      currentIndex: index,
    }));
  }, []);

  const next = useCallback(() => {
    setCarouselState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
    }));
  }, []);

  const prev = useCallback(() => {
    setCarouselState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex - 1,
    }));
  }, []);

  return useMemo(
    () => ({
      ...carouselState,
      next,
      prev,
      setCurrentIndex,
    }),
    [carouselState, next, prev, setCurrentIndex]
  );
};

export const CarouselProvider = ({
  children,
  total,
}: {
  children: ReactNode;
  total: number;
}) => {
  const carouselState = useCarousel();

  // merge initial state with context provider
  const ctxProvider = useMemo(
    () => ({
      ...carouselState,
      total,
    }),
    [carouselState, total]
  );

  console.log("ctxProvider", ctxProvider);

  return (
    <CarouselContext.Provider value={ctxProvider}>
      {children}
    </CarouselContext.Provider>
  );
};

export const Carousel = memo(({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-hidden relative min-h-[200px] w-full border border-red-500">
      {children}
    </div>
  );
});

export const Slide = memo(
  ({ children, index }: { children: ReactNode; index: number }) => {
    const { currentIndex } = useContext(CarouselContext);

    return (
      <div
        style={{
          transform: `translateX(${(index - currentIndex) * 100}%)`,
        }}
        className="absolute w-full transition-transform"
      >
        {children}
      </div>
    );
  }
);

export const DotsGroup = memo(() => {
  const { total, currentIndex, setCurrentIndex } = useContext(CarouselContext);

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`w-2 h-2 rounded-full ${
            currentIndex === idx ? "bg-red-500" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
});

export const Dot = memo(({ index }: { index: number }) => {
  const { currentIndex, setCurrentIndex } = useContext(CarouselContext);

  return (
    <button
      onClick={() => setCurrentIndex(index)}
      className={`w-2 h-2 rounded-full ${
        currentIndex === index ? "bg-red-500" : "bg-gray-500"
      }`}
    />
  );
});

export const NextButton = memo(({ onClick }: { onClick?: () => void }) => {
  const { next } = useContext(CarouselContext);

  return (
    <button
      onClick={() => {
        next();
        onClick?.();
      }}
    >
      Next
    </button>
  );
});

export const PrevButton = memo(({ onClick }: { onClick?: () => void }) => {
  const { prev } = useContext(CarouselContext);

  return (
    <button
      onClick={() => {
        prev();
        onClick?.();
      }}
    >
      Prev
    </button>
  );
});
