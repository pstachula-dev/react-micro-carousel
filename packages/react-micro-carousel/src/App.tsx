import { ExampleCarousel } from './examples/singleStep';

function App() {
  return (
    <div className="h-lvh w-full bg-gray-800 font-bold text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 pt-10 text-center">
        <h1 className="my-6 text-3xl">React Micro Carousel Demo</h1>

        {/* example start */}
        <div className="my-4">
          <h2 className="my-2 text-2xl">Basic example</h2>
          <ExampleCarousel infinite lazy />
        </div>
        {/* example end */}
      </div>
    </div>
  );
}

export default App;
