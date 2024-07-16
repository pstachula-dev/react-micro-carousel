import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import {
  CarouselProvider,
  Carousel,
  Slide,
  NextButton,
  PrevButton,
  type CarouselState,
} from '../index';
import * as manageEventsModule from '../services/manageEvents';

vi.spyOn(manageEventsModule, 'manageEvents');

const setup = ({
  autoPlayDelay,
  autoPlay,
  slidesVisible,
  infinite,
  step,
  disableTouch,
  lazy,
  threshold,
  currentIndex,
}: Partial<CarouselState> = {}) => {
  render(
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
      total={3}
    >
      <Carousel>
        <Slide index={0}>
          <img src="/example.png" alt="slide1" />
        </Slide>
        <Slide index={1}>
          <img src="/example.png" alt="slide2" />
        </Slide>
        <Slide index={2}>
          <img src="/example.png" alt="slide3" />
        </Slide>
      </Carousel>

      <PrevButton className="rounded-md border px-4 py-1">Prev</PrevButton>
      <NextButton className="rounded-md border px-4 py-1">Next</NextButton>
    </CarouselProvider>,
  );
};

const expectIsSelected = (id: string, selected: boolean) => {
  expect(screen.getByTestId(id)).toHaveAttribute(
    'aria-selected',
    `${selected}`,
  );
};

describe('Basic movement and hiding logic', () => {
  it('Should hide first and show second slide when user click next', async () => {
    setup();

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', false);

    await userEvent.click(screen.getByText('Next'));

    expectIsSelected('slide-0', false);
    expectIsSelected('slide-1', true);
  });

  it('Should hide first and when user click next, and show when user click prev', async () => {
    setup();

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', false);

    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Prev'));

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', false);
  });
});

describe('Check infinite logic', () => {
  it('Should go to first slide when `infinite` is ON and current post is last', async () => {
    setup({ infinite: true });

    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Next'));
    expectIsSelected('slide-0', true);
  });

  it('Should go to last post when `infinite` is ON and current post is first', async () => {
    setup({ infinite: true });

    await userEvent.click(screen.getByText('Prev'));
    expectIsSelected('slide-2', true);
  });
});

describe('Check disableTouch logic', () => {
  it('Should enable `manageEvents`', () => {
    setup({ disableTouch: false });

    expect(manageEventsModule.manageEvents).toHaveBeenCalled();
  });

  it('Should not enable `manageEvents`', () => {
    setup({ disableTouch: true });

    expect(manageEventsModule.manageEvents).not.toHaveBeenCalled();
  });
});

// describe('Check onMove finalIndex logic', () => {});

// describe('Check lazy loading logic', () => {});

// describe('Check autoPlay logic', () => {});

// describe('Check step logic', () => {});

// // describe('Check slidesVisible logic', () => {});
