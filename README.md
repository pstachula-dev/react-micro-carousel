# Simple Headless Carousel React

- Extremely small package size: 2kB gzipped
- 0 external dependencies
- Full typescript support
- Built in with Tailwind, but you can always customize the styles
- Handling touch/mouse events
- Lazy image loading
- Responsive support

### How to use:

```
<CarouselProvider total={3}>
  <Carousel>
    <Slide>
      <Img />
    </Slide>
    <Slide>
      <Img />
    </Slide>
    <Slide>
      <Img />
    </Slide>
  </Carousel>

  <DotsGroup />
  <PrevButton />
  <NextButton />
</CarouselProvider>
```

### TODO:

- [x] Add beta implementation
- [ ] Add extra option props
- [ ] Add stable version
- [x] Setup CI
- [x] DX improvments prettier/eslint
- [ ] Add docs
- [ ] Add unit tests
- [ ] Add examples
- [x] Publish on NPM
- [ ] Add counter element
