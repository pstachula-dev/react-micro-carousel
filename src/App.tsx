import { DotsGroup } from './lib/simple-headless-carousel';
import { CarouselProvider } from './lib/simple-headless-carousel/context/CarouselProvider';
import { Carousel } from './lib/simple-headless-carousel/components/Carousel';
import { NextButton } from './lib/simple-headless-carousel/components/NextButton';
import { PrevButton } from './lib/simple-headless-carousel/components/PrevButton';
import { Slide } from './lib/simple-headless-carousel/components/Slide';

function Box({ index }: { index: number }) {
  return (
    <div className="z-0 flex h-full items-center justify-center border-4 border-gray-900 bg-gray-800">
      {index}
    </div>
  );
}

function App() {
  return (
    <div className="mx-auto mt-10 justify-center">
      <CarouselProvider
        autoPlayDelay={2000}
        width={500}
        autoPlay={false}
        slidesVisible={1}
        infinite
        step={1}
        total={4}
      >
        <Carousel>
          <Slide>
            <Box index={0} />
          </Slide>
          <Slide>
            <Box index={1} />
          </Slide>
          <Slide>
            <Box index={2} />
          </Slide>
          <Slide>
            <Box index={3} />
          </Slide>
        </Carousel>

        <div className="mt-4 flex justify-center">
          <DotsGroup />
        </div>

        <PrevButton />
        <NextButton />
      </CarouselProvider>
    </div>
  );
}

export default App;
