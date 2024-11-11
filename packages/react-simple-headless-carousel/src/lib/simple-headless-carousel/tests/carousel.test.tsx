import { expect, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
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
      slideHeight={400}
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
  // @ts-expect-error:next-line
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

describe('Check slidesVisible logic', () => {
  it('Should show the first two slides', () => {
    setup({ slidesVisible: 2 });

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', true);
    expectIsSelected('slide-2', false);
  });

  it('Should show the second and third slides', async () => {
    setup({ slidesVisible: 2 });

    await userEvent.click(screen.getByText('Next'));

    expectIsSelected('slide-0', false);
    expectIsSelected('slide-1', true);
    expectIsSelected('slide-2', true);
  });

  it('Should show the first and second slides', async () => {
    setup({ slidesVisible: 2 });

    await userEvent.click(screen.getByText('Next'));
    await userEvent.click(screen.getByText('Prev'));

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', true);
    expectIsSelected('slide-2', false);
  });
});

describe('Check step logic', () => {
  it('Should move by 2 steps', async () => {
    setup({ step: 2 });

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', false);

    await userEvent.click(screen.getByText('Next'));

    expectIsSelected('slide-0', false);
    expectIsSelected('slide-1', false);
    expectIsSelected('slide-2', true);
  });

  it('Should move by 2 steps when 2 slides visible', async () => {
    setup({ slidesVisible: 2, step: 2 });

    expectIsSelected('slide-0', true);
    expectIsSelected('slide-1', true);
    expectIsSelected('slide-2', false);

    await userEvent.click(screen.getByText('Next'));

    expectIsSelected('slide-0', false);
    expectIsSelected('slide-1', false);
    expectIsSelected('slide-2', true);
  });
});

describe('Check autoPlay logic', () => {
  it('Should start auto play', async () => {
    setup({ autoPlay: true, autoPlayDelay: 50 });

    expectIsSelected('slide-0', true);

    await waitFor(() => {
      expectIsSelected('slide-0', false);
      expectIsSelected('slide-1', true);
    });
  });
});
