# React Simple Headless Carousel

## Component features

- Extremely small package size (gzipped):
  - Javascript: 2.5kB
  - CSS: 1.5kB
- 0 external dependencies
- Full typescript support
- Built in with Tailwind, but you can always customize the styles
- Handling touch/mouse events
- Lazy image loading
- Responsive support

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

| Prop          | Type    | Default | Required |
| ------------- | ------- | ------- | -------- |
| total         | number  | 0       | Yes      |
| autoPlayDelay | number  | false   | No       |
| slidesVisible | number  | 1       | No       |
| step          | number  | 1       | No       |
| threshold     | number  | 0.25    | No       |
| infinite      | boolean | false   | No       |
| disableTouch  | boolean | false   | No       |
| lazy          | boolean | true    | No       |
| autoPlay      | boolean | false   | No       |

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

| Prop      | Type     | Default | Required |
| --------- | -------- | ------- | -------- |
| className | string   |         | No       |
| title     | string   |         | No       |
| onClick   | Function |         | No       |

### `<PrevButton />`

| Prop      | Type     | Default | Required |
| --------- | -------- | ------- | -------- |
| className | string   |         | No       |
| title     | string   |         | No       |
| onClick   | Function |         | No       |

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
- [ ] Context initial props refactoring
- [ ] Add unit tests
- [ ] Add examples
- [x] Publish on NPM
- [x] Add counter element
