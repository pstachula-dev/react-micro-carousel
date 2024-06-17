import { memo, useContext } from "react";
import { CarouselContext } from "../CarouselProvider";

export const DotsGroup = memo(() => {
  const { state, dispatch } = useContext(CarouselContext);

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: state.total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => dispatch({ action: "setCurrentIndex", value: idx })}
          className={`w-2 h-2 rounded-full ${
            state.currentIndex === idx ? "bg-red-500" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
});
