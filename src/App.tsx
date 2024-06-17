import dacia from "./assets/dacia.jpg";
import "./App.css";
import {
  Carousel,
  CarouselProvider,
  Dot,
  NextButton,
  PrevButton,
  Slide,
} from "./simple-headless-carousel/SimpleHeadlessCarousel";

const Box = () => {
  return <img src={dacia} alt="Vite logo" />;
};

function App() {
  return (
    <div className="w-[1000px]">
      <CarouselProvider total={3}>
        <Carousel>
          <Slide index={0}>
            <Box />
          </Slide>
          <Slide index={1}>
            <Box />
          </Slide>
          <Slide index={2}>
            <Box />
          </Slide>
        </Carousel>

        <div className="flex justify-center mt-4">
          <Dot index={0} />
          <Dot index={1} />
          <Dot index={2} />
        </div>

        <PrevButton />
        <NextButton />
      </CarouselProvider>
    </div>
  );
}

export default App;
