# React Micro Carousel

![example workflow](https://github.com/pstachula-dev/simple-headless-carousel/actions/workflows/main.yml/badge.svg)

![bundlesize](https://badgen.net/bundlephobia/minzip/react-simple-headless-carousel)

## Component features

- Extremely small package size (gzipped):
  - Javascript: 2.6kB
  - CSS: 1.5kB
- 0 external dependencies
- Full typescript support
- Built in with Tailwind, but you can always customize the styles
- Handling touch/mouse events
- Lazy image loading
- Responsive support

## Documentation

[Simple react carousel docs](https://simple-react-carousel.onrender.com/)

## How to use:

### If you are using Tailwind:

`tailwind.config.ts`

```js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-simple-headless-carousel/**/*.js",
  ],
} satisfies Config;
```

### ...other way?

```js
import 'react-simple-headless-carousel/styles.min.css';
```

### Components markup:

```js
import {
  Carousel,
  CarouselProvider,
  Counter,
  DotsGroup,
  NextButton,
  PrevButton,
  Slide,
} from 'react-simple-headless-carousel';

<CarouselProvider total={2}>
  <Carousel>
    <Slide>
      <img src="..." />
    </Slide>
    <Slide>
      <img src="..." />
    </Slide>
  </Carousel>

  <DotsGroup />
  <NextButton>Next<NextButton />
  <PrevButton>Prev</PrevButton>
</CarouselProvider>
```

## Props documentation:

### `<CarouselProvider />`

Component is used to initialize the carousel context with configuration options and wrap the other components.

| Prop          | Type      | Default | Required |
| ------------- | --------- | ------- | -------- |
| children      | ReactNode |         | Yes      |
| slideHeight   | number    | 0       | Yes      |
| total         | number    | 0       | Yes      |
| autoPlayDelay | number    | false   | No       |
| slidesVisible | number    | 1       | No       |
| step          | number    | 1       | No       |
| threshold     | number    | 0.25    | No       |
| infinite      | boolean   | false   | No       |
| disableTouch  | boolean   | false   | No       |
| lazy          | boolean   | true    | No       |
| autoPlay      | boolean   | false   | No       |

### `<Carousel />`

A carousel that wraps the slides and provides the core functionality, such as scrolling to the next or previous slide.

| Prop              | Type      | Default | Required |
| ----------------- | --------- | ------- | -------- |
| children          | ReactNode |         | Yes      |
| wrapperClassName  | string    |         | No       |
| carouselClassName | string    |         | No       |

### `<Slide />`

A single slide in a carousel.

| Prop      | Type      | Default | Required |
| --------- | --------- | ------- | -------- |
| children  | ReactNode |         | Yes      |
| index     | number    |         | Yes      |
| className | string    |         | No       |

### `<Dot />`

A single dot.

| Prop          | Type     | Default | Required |
| ------------- | -------- | ------- | -------- |
| className     | string   |         | No       |
| colorActive   | string   |         | No       |
| colorInactive | string   |         | No       |
| index         | number   |         | Yes      |
| disabled      | boolean  |         | No       |
| onClick       | Function |         | No       |

### `<DotsGroup />`

A component that renders a group of dots, representing the slides in the carousel.
It provides auto generated dots for the carousel.

| Prop          | Type     | Default | Required |
| ------------- | -------- | ------- | -------- |
| className     | string   |         | No       |
| dotClassName  | string   |         | No       |
| colorActive   | string   |         | No       |
| colorInactive | string   |         | No       |
| onClick       | Function |         | No       |

### `<NextButton />`

| Prop      | Type      | Default | Required |
| --------- | --------- | ------- | -------- |
| className | string    |         | No       |
| children  | ReactNode |         | Yes      |
| onClick   | Function  |         | No       |

### `<PrevButton />`

| Prop      | Type      | Default | Required |
| --------- | --------- | ------- | -------- |
| className | string    |         | No       |
| children  | ReactNode |         | Yes      |
| onClick   | Function  |         | No       |

### `<Counter />`

| Prop      | Type   | Default | Required |
| --------- | ------ | ------- | -------- |
| className | string |         | No       |

### TODO:

- [x] Add beta implementation
- [x] Add stable version
- [x] Setup CI
- [x] DX improvments prettier/eslint
- [x] Add docs
- [x] Context initial props refactoring
- [x] Add unit tests
- [ ] Add examples
- [x] Publish on NPM
- [x] Add counter element
