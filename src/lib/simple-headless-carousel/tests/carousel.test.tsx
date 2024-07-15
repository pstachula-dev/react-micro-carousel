import { expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import {
  CarouselProvider,
  Carousel,
  Slide,
  NextButton,
  PrevButton,
} from '../index';

const setup = () => {
  render(
    <CarouselProvider total={2}>
      <Carousel>
        <Slide index={0}>
          <img src="/example.png" alt="slide1" />
        </Slide>
        <Slide index={1}>
          <img src="/example.png" alt="slide2" />
        </Slide>
      </Carousel>

      <PrevButton className="rounded-md border px-4 py-1">Prev</PrevButton>
      <NextButton className="rounded-md border px-4 py-1">Next</NextButton>
    </CarouselProvider>,
  );
};

test('Should hide first and show second slide when user click next', async () => {
  setup();

  expect(screen.getByTestId('slide-0')).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(screen.getByTestId('slide-1')).toHaveAttribute(
    'aria-selected',
    'false',
  );

  await userEvent.click(screen.getByText('Next'));

  expect(screen.getByTestId('slide-0')).toHaveAttribute(
    'aria-selected',
    'false',
  );

  expect(screen.getByTestId('slide-1')).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('Should hide first and when user click next, and show when user click prev', async () => {
  setup();

  expect(screen.getByTestId('slide-0')).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(screen.getByTestId('slide-1')).toHaveAttribute(
    'aria-selected',
    'false',
  );

  await userEvent.click(screen.getByText('Next'));

  expect(screen.getByTestId('slide-0')).toHaveAttribute(
    'aria-selected',
    'false',
  );

  expect(screen.getByTestId('slide-1')).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await userEvent.click(screen.getByText('Prev'));

  expect(screen.getByTestId('slide-0')).toHaveAttribute(
    'aria-selected',
    'true',
  );

  expect(screen.getByTestId('slide-1')).toHaveAttribute(
    'aria-selected',
    'false',
  );
});
