import {
  Carousel,
  CarouselProvider,
  Slide,
} from 'react-simple-headless-carousel';

export const Karuzelka = () => {
  return (
    <CarouselProvider total={2}>
      <Carousel>
        <Slide index={0}>
          <img src="/imgs/img1.jpg" />
        </Slide>
        <Slide index={1}>
          <img src="/imgs/img2.jpg" />
        </Slide>
      </Carousel>
    </CarouselProvider>
  );
};
