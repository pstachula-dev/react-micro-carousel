import { DotsGroup } from './lib/simple-headless-carousel';
import { CarouselProvider } from './lib/simple-headless-carousel/context/CarouselProvider';
import { Carousel } from './lib/simple-headless-carousel/components/Carousel';
import { NextButton } from './lib/simple-headless-carousel/components/NextButton';
import { PrevButton } from './lib/simple-headless-carousel/components/PrevButton';
import { Slide } from './lib/simple-headless-carousel/components/Slide';
import { Counter } from './lib/simple-headless-carousel/components/Counter';

function Box({ index }: { index: number }) {
  return (
    <div className="z-0 flex h-full items-center justify-center border-4 border-gray-900 bg-gray-800">
      {index}
    </div>
  );
}

function App() {
  return (
    <div className="h-dvh w-full bg-gray-700">
      <div className="mx-auto max-w-3xl pt-10">
        <CarouselProvider
          autoPlayDelay={2000}
          autoPlay={false}
          slidesVisible={1}
          lazy
          infinite
          step={1}
          total={4}
        >
          <Carousel>
            <Slide>
              <img
                alt=""
                src="https://cdn.brumly.pl/carsmarket/images/2024/5/clxarh1n9000hzfnpruix36ka/f030c788-4419-486e-b165-11d7f10766ee-1024x580.webp"
              />
            </Slide>
            <Slide>
              <img
                alt=""
                src="https://cdn.brumly.pl/carsmarket/images/2024/5/clxar7na90000zfnp982l5a0o/232c7e10-36e9-4c5c-8515-3dc0f038f949-1024x580.webp"
              />
            </Slide>
            <Slide>
              <Box index={2} />
            </Slide>
            <Slide>
              <Box index={3} />
            </Slide>
          </Carousel>

          <div className="my-4">
            <DotsGroup />
          </div>

          <div className="my-4">
            <span>Couner:</span>
            <Counter />
          </div>

          <div className="mx-4 flex gap-4">
            <PrevButton />
            <NextButton />
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}

export default App;
