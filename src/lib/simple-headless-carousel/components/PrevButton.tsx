import { memo, useContext } from "react";
import { CarouselContext } from "../CarouselProvider";
import { SliderButton } from "./SliderButton";

export const PrevButton = memo(({ onClick }: { onClick?: () => void }) => {
  const { dispatch } = useContext(CarouselContext);

  return (
    <SliderButton
      action={() => dispatch({ action: "prev" })}
      title="Prev"
      onClick={onClick}
    />
  );
});
