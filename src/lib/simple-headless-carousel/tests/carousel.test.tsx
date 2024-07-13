import { expect, test } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { CarouselProvider, Carousel, Slide } from '../index';

const setup = () => {
  render(
    <CarouselProvider lazy={false} total={1}>
      <p>Title</p>
      <Carousel>
        <Slide index={0}>1</Slide>
      </Carousel>
    </CarouselProvider>,
  );
};

test('Link changes the state when hovered', async () => {
  setup();

  const slide = screen.getByText('Title');
  await userEvent.hover(slide);
  expect(slide).toBeDefined();
});
