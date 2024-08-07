import {
  type CarouselState,
  Carousel,
  CarouselProvider,
  Counter,
  DotsGroup,
  NextButton,
  PrevButton,
  Slide,
} from 'react-simple-headless-carousel';

export const CarouselDemo = ({
  autoPlayDelay,
  autoPlay,
  slidesVisible,
  infinite,
  step,
  disableTouch,
  lazy,
  threshold,
  currentIndex,
  showButtons = false,
}: CarouselState & { showButtons?: boolean }) => {
  return (
    <div
      style={{
        width: 760,
        height: 600,
        maxWidth: '100%',
        margin: '50px auto',
      }}
    >
      <CarouselProvider
        autoPlayDelay={autoPlayDelay}
        autoPlay={autoPlay}
        slidesVisible={slidesVisible}
        infinite={infinite}
        step={step}
        disableTouch={disableTouch}
        lazy={lazy}
        threshold={threshold}
        currentIndex={currentIndex}
        total={5}
      >
        <Carousel>
          <Slide index={0}>
            <img alt="" src="/imgs/img1.jpg" />
          </Slide>
          <Slide index={1}>
            <img alt="" src="/imgs/img2.jpg" />
          </Slide>
          <Slide index={2}>
            <img alt="" src="/imgs/img3.jpg" />
          </Slide>
          <Slide index={3}>
            <img alt="" src="/imgs/img4.jpg" />
          </Slide>
          <Slide index={4}>
            <img alt="" src="/imgs/img5.jpg" />
          </Slide>
        </Carousel>

        {showButtons && (
          <>
            <div className="flex justify-center">
              <DotsGroup colorActive="bg-active" colorInactive="bg-default" />
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
          </>
        )}
      </CarouselProvider>
    </div>
  );
};
