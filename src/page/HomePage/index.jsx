import React from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import useHome from "./useHome";
import Brand from "./Brand";
import ShowcaseProduct from "./ShowcaseProduct";
import Countdown from "./Countdown";
import Advertising from "./Advertising";

const HomePage = () => {
  const { featuredProps, categoryProps, countDownProps } = useHome();

  return (
    <main className="text-3xl text-green-400">
      <Hero />
      {/* <Outstanding /> */}
      <Advertising />
      <Featured {...featuredProps} />
      <Brand />
      <Countdown {...countDownProps} />
      <ShowcaseProduct {...categoryProps} />
    </main>
  );
};

export default HomePage;
