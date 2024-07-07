export class CarouselErrror extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HeadlessCarouselError';
  }
}
