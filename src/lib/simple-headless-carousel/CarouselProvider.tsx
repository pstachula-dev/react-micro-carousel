import { createContext, useMemo, useState, type ReactNode } from "react";
import { noop } from "./services/noop";
import type { CarouselContextProps } from "./Carousel.types";
import { useCarousel } from "./hooks/useCarousel";

export const CarouselContext = createContext<CarouselContextProps>({
  state: {
    currentIndex: 0,
    total: 0,
  },
  dispatch: noop,
});

export const CarouselProvider = ({
  children,
  total,
}: {
  children: ReactNode;
  total: number;
}) => {
  // FIXME: remove later
  const [, setState] = useState(0);

  const { dispatch, state } = useCarousel();

  // merge initial state with context provider
  const ctxProvider = useMemo(
    () => ({
      dispatch,
      state,
      total,
    }),
    [state, total, dispatch]
  );

  console.log("ctxProvider", ctxProvider);

  return (
    <CarouselContext.Provider value={ctxProvider}>
      <button onClick={() => setState(Math.random())}>Rerender</button>
      {children}
    </CarouselContext.Provider>
  );
};
