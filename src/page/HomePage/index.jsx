import React from "react";
import Hero from "./Hero";
import Outstanding from "./Outstanding";
import Featured from "./Featured";
import useHome from "./useHome";
import Marketing from "./Marketing";
import Brand from "./Brand";
import ShowcaseProduct from "./ShowcaseProduct";

const HomePage = () => {
  const { featuredProps, categoryProps, marketingProps } = useHome();

  return (
    <main className="text-3xl text-green-400">
      <Hero />
      {/* <Outstanding /> */}
      <Featured {...featuredProps} />
      <Marketing {...marketingProps} />
      <Brand />
      <ShowcaseProduct {...categoryProps} />
    </main>
  );
};

export default HomePage;
