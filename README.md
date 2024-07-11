# Simple Headless Carousel React

## Featues

- Extremely small package size: 2kB gzipped
- 0 external dependencies
- Full typescript support
- Built in with Tailwind, but you can always customize the styles
- Handling touch/mouse events
- Lazy image loading
- Responsive support

## How to use:

```
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

| Prop              | Type      | Default | Required |
| ----------------- | --------- | ------- | -------- |
| children          | ReactNode |         | Yes      |
| wrapperClassName  | string    |         | No       |
| carouselClassName | string    |         | No       |

### `<Carousel />`

| Prop      | Type      | Default | Required |
| --------- | --------- | ------- | -------- |
| children  | ReactNode |         | Yes      |
| className | string    |         | No       |

### `<Dot />`

| Prop          | Type     | Default | Required |
| ------------- | -------- | ------- | -------- |
| className     | string   |         | No       |
| colorActive   | string   |         | No       |
| colorInactive | string   |         | No       |
| index         | number   |         | Yes      |
| disabled      | boolean  |         | No       |
| onClick       | Function |         | No       |

### `<DotsGroup />`

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
- [ ] Add extra option props
- [x] Add stable version
- [x] Setup CI
- [x] DX improvments prettier/eslint
- [x] Add docs
- [ ] Add unit tests
- [ ] Add examples
- [x] Publish on NPM
- [x] Add counter element
