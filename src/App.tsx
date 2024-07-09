import { DotsGroup } from './lib/simple-headless-carousel';
import { CarouselProvider } from './lib/simple-headless-carousel/context/CarouselProvider';
import { Carousel } from './lib/simple-headless-carousel/components/Carousel';
import { NextButton } from './lib/simple-headless-carousel/components/NextButton';
import { PrevButton } from './lib/simple-headless-carousel/components/PrevButton';
import { Slide } from './lib/simple-headless-carousel/components/Slide';
import { Counter } from './lib/simple-headless-carousel/components/Counter';

function App() {
  return (
    <div className="h-dvh w-full bg-gray-700">
      <div className="mx-auto max-w-3xl pt-10">
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
