import Advertising from "./Advertising";
import Brand from "./Brand";
import Countdown from "./Countdown";
import Featured from "./Featured";
import Hero from "./Hero";
import ShowcaseProduct from "./ShowcaseProduct";
import useHome from "./useHome";

const HomePage = () => {
  const { featuredProps, showcaseProductProps } = useHome();
  return (
    <main className=" ">
      <Hero />
      <Advertising />
      <Featured {...featuredProps} />
      <Brand />
      <Countdown />
      <ShowcaseProduct {...showcaseProductProps} />
    </main>
  );
};

export default HomePage;
