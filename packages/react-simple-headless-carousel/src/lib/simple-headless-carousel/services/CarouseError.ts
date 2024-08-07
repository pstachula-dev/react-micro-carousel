export class CarouselError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HeadlessCarouselError';
  }
}
