import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import useHome from "./useHome";
import Brand from "./Brand";
import ShowcaseProduct from "./ShowcaseProduct";
import Countdown from "./Countdown";
import Advertising from "./Advertising";
import Testermonial from "./Testermonial";

const HomePage = () => {
  const { featuredProps, showcaseProductProps } = useHome();

  return (
    <main className="text-3xl text-green-400">
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
