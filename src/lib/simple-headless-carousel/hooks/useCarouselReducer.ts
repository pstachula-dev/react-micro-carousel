import { useReducer, type Dispatch } from "react";
import { CarouselErrror } from "../services/CarouseError";

type CarouselAction = "next" | "prev" | "setCurrentIndex" | "setConfig";

export type DispatchOpts = {
  action: CarouselAction;
  value?: number;
  config?: Partial<CarouselState>;
};

export type CarouselState = {
  currentIndex: number;
  total: number;
  width: number;
  // optional
  slidesVisible: number;
  step: number;
  autoPlayDelay: number;
  autoPlay: boolean;
  infinite: boolean;
};

export type CarouselReduceDispatch = Dispatch<DispatchOpts>;

export const stateDefaults: CarouselState = {
  currentIndex: 0,
  width: 0,
  total: 0,
  step: 1,
  autoPlayDelay: 2000,
  slidesVisible: 1,
  autoPlay: false,
  infinite: false,
};

export const carouselReducer = (
  state: CarouselState,
  { action, value, config }: DispatchOpts
): CarouselState => {
  const { currentIndex, step, total, infinite } = state;
  const localStep = step || 1;

  switch (action) {
    case "next": {
      if (currentIndex + localStep >= total) {
        if (!infinite) return state;

        return {
          ...state,
          currentIndex: 0,
        };
      }

      return {
        ...state,
        currentIndex: currentIndex + localStep,
      };
    }

    case "prev": {
      if (currentIndex - localStep < 0) {
        if (!infinite) return state;

        return {
          ...state,
          currentIndex: total - localStep,
        };
      }

      return {
        ...state,
        currentIndex: currentIndex - localStep,
      };
    }

    case "setCurrentIndex": {
      if (value === undefined || value < 0 || value >= total) {
        throw new CarouselErrror("setCurrentIndex value out of bounds");
      }

      return {
        ...state,
        currentIndex: value,
      };
    }

    case "setConfig": {
      return {
        ...state,
        ...config,
      };
    }

    default:
      return state;
  }
};

export const useCarouselReducer = (): {
  state: CarouselState;
  dispatch: CarouselReduceDispatch;
} => {
  const [state, dispatch] = useReducer(carouselReducer, {
    currentIndex: 0,
  } as CarouselState);

  return { state, dispatch };
};
