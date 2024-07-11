import { DotsGroup } from './lib/simple-headless-carousel';
import { CarouselProvider } from './lib/simple-headless-carousel/context/CarouselProvider';
import { Carousel } from './lib/simple-headless-carousel/components/Carousel';
import { NextButton } from './lib/simple-headless-carousel/components/NextButton';
import { PrevButton } from './lib/simple-headless-carousel/components/PrevButton';
import { Slide } from './lib/simple-headless-carousel/components/Slide';
import { Counter } from './lib/simple-headless-carousel/components/Counter';

function App() {
  return (
    <div className="h-dvh w-full bg-gray-800 font-bold  text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 pt-10 text-center">
        <h1 className="my-6 text-3xl">React Simple Headless Carousel Demo</h1>

        <CarouselProvider
          autoPlayDelay={2000}
          autoPlay={false}
          slidesVisible={1}
          lazy={false}
          infinite
          step={1}
          total={5}
        >
          <Carousel>
            <Slide>
              <img alt="" src="/imgs/img1.jpg" />
            </Slide>
            <Slide>
              <img alt="" src="/imgs/img2.jpg" />
            </Slide>
            <Slide>
              <img alt="" src="/imgs/img3.jpg" />
            </Slide>
            <Slide>
              <img alt="" src="/imgs/img4.jpg" />
            </Slide>
            <Slide>
              <img alt="" src="/imgs/img5.jpg" />
            </Slide>
          </Carousel>

          <div className="flex justify-center">
            <DotsGroup />
          </div>

          <div className="flex justify-center gap-2">
            <span>Counter:</span>
            <Counter />
          </div>
          <div className="flex justify-center gap-4">
            <PrevButton className="rounded-md border px-4 py-1">
              Prev
            </PrevButton>
            <NextButton className="rounded-md border px-4 py-1">
              Next
            </NextButton>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
}

export default App;
