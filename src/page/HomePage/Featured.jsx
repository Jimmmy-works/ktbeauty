import Button from "@/components/Button";
import React, { useRef } from "react";
import Slider from "react-slick";
import useHome from "./useHome";
import { FEATURED_OPTIONS } from "@/contants/general";
import ProductCard from "@/components/ProductCard";

const Featured = ({ onChangeFeaturedTab, featuerdTab }) => {
  const refFeaturedSlider = useRef(null);
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 600,
    slidesToShow: 4,
    variableWidth: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const images = [
    "product-1.jpg",
    "product-2.jpg",
    "product-3.jpg",
    "product-4.jpg",
    "product-5.jpg",
    "product-6.jpg",
    "product-7.jpg",
    "product-8.jpg",
    "product-9.jpg",
  ];
  const baseURL = `/assets/img/`;
  return (
    <section className="scfeatured pt-section">
      <div className="container">
        <div className="scfeatured__tabs  ">
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.FEATURED ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.FEATURED)}
          >
            Feactured
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.BEST_SELLER ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.BEST_SELLER)}
          >
            Best sellers
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.POPULAR ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.POPULAR)}
          >
            Popular
          </div>
        </div>
        <div className="scfeatured__content">
          <div className={`scfeatured__content-list`}>
            <div
              className="prev"
              onClick={() => refFeaturedSlider?.current?.slickPrev()}
            >
              <div
                className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors rotate-180
            group-hover/hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="md:w-[14px] md:h-[14px] xs:h-[10px] xs:w-[10px]"
                >
                  <path
                    fill="#fff"
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className="next"
              onClick={() => refFeaturedSlider?.current?.slickNext()}
            >
              <div
                className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors 
            group-hover/hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="md:w-[14px] md:h-[14px] xs:h-[10px] xs:w-[10px]"
                >
                  <path
                    fill="#fff"
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
            <Slider ref={refFeaturedSlider} {...settings}>
              {images.map((item, index) => {
                return (
                  <ProductCard
                    className={`item`}
                    key={`${item}${index}`}
                    item={item}
                    baseURL={baseURL}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
