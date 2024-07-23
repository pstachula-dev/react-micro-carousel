import { ExampleCarousel } from './examples/singleStep';

function App() {
  return (
    <div className="w-full bg-gray-800 font-bold  text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 pt-10 text-center">
        <h1 className="my-6 text-3xl">React Simple Headless Carousel Demo</h1>

        {/* example start */}
        <div className="my-4">
          <h2 className="my-2 text-2xl">Basic example</h2>
          <ExampleCarousel infinite lazy />
          <pre className="my-4 rounded-lg bg-gray-900 p-4 text-left font-mono text-xs font-normal text-gray-400">
            <code>
              {`
<CarouselProvider
  total={5}
>
  <Carousel>
    <Slide index={0}>
      <img src="/imgs/img1.jpg" />
    </Slide>
    <Slide index={1}>
      <img src="/imgs/img2.jpg" />
    </Slide>
    <Slide index={2}>
      <img src="/imgs/img3.jpg" />
    </Slide>
    <Slide index={3}>
      <img src="/imgs/img4.jpg" />
    </Slide>
    <Slide index={4}>
      <img src="/imgs/img5.jpg" />
    </Slide>
  </Carousel>

  <DotsGroup />
  <Counter />
  <PrevButton className="rounded-md border px-4 py-1">Prev</PrevButton>
  <NextButton className="rounded-md border px-4 py-1">Next</NextButton>
</CarouselProvider>`}
            </code>
          </pre>
        </div>
        {/* example end */}
      </div>
    </div>
  );
}

export default App;
