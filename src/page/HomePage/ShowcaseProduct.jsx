import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES_OPTIONS } from "@/contants/general";
import React, { useRef } from "react";
import Slider from "react-slick";

const ShowcaseProduct = ({ onChangeCategoryTab, categoryTab }) => {
  const refShowcaseProductSlider = useRef(null);
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 600,
    slidesToShow: 4,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
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
    "product-9.jpg",
    "product-8.jpg",
    "product-7.jpg",
    "product-6.jpg",
    "product-5.jpg",
    "product-4.jpg",
    "product-3.jpg",
    "product-2.jpg",
    "product-1.jpg",
  ];
  const baseURL = `/assets/img/`;
  return (
    <section className="scshowcaseproduct pt-section">
      <div className="container">
        <div
          className="scshowcaseproduct__top border-b-[1px] border-dashed
          border-primary pb-[15px] xs:mb-[30px] lg:mb-[50px] flex items-center justify-between
          xs:flex-col xs:gap-5 lg:gap-0 lg:flex-row "
        >
          <div className="heading-section flex items-center gap-3  ">
            <svg className="w-[32px] h-[32px]" viewBox="0 0 347 511.82">
              <path
                fill="#ff887b"
                d="M129.03 270.69 8.31 259.3c-5.04-.47-8.74-4.95-8.27-9.99.11-1.12.41-2.18.88-3.14L110.71 5.39c1.53-3.37 4.86-5.35 8.34-5.36L269.88 0c5.08 0 9.2 4.12 9.2 9.2 0 2.06-.67 3.95-1.81 5.49l-77.26 125.3 138.81 15.28c5.04.55 8.68 5.09 8.12 10.13a9.097 9.097 0 0 1-2.46 5.31L62.93 508.52c-3.23 3.89-9.01 4.42-12.9 1.18-3.04-2.52-4.03-6.6-2.77-10.12l81.77-228.89z"
              />
            </svg>
            <h3 className="font-mab text-black-333 text-lg uppercase">
              product
            </h3>
          </div>
          <div
            className="scshowcaseproduct__top-category flex items-center justify-center gap-3
          md:flex-nowrap xs:flex-wrap"
          >
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={
                categoryTab === CATEGORIES_OPTIONS.LIPSTICK ? true : false
              }
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.LIPSTICK)}
            >
              Lipstick
            </Button>
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={
                categoryTab === CATEGORIES_OPTIONS.EYESHADOW ? true : false
              }
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.EYESHADOW)}
            >
              Eye Shadow
            </Button>
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={
                categoryTab === CATEGORIES_OPTIONS.MASCARA ? true : false
              }
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.MASCARA)}
            >
              Mascara
            </Button>
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={
                categoryTab === CATEGORIES_OPTIONS.EYELINER ? true : false
              }
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.EYELINER)}
            >
              Eyeliner
            </Button>
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={categoryTab === CATEGORIES_OPTIONS.CHEER ? true : false}
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.CHEER)}
            >
              Cheer color
            </Button>
            <Button
              variant="outline"
              className={`py-[5px] px-[10px] `}
              isActive={categoryTab === CATEGORIES_OPTIONS.NAIL ? true : false}
              onClick={() => onChangeCategoryTab(CATEGORIES_OPTIONS.NAIL)}
            >
              Nail color
            </Button>
          </div>
        </div>
        <div className="scshowcaseproduct__bottom">
          <div className="scshowcaseproduct__bottom-list">
            <div
              className="prev "
              onClick={() => refShowcaseProductSlider?.current?.slickPrev()}
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
              onClick={() => refShowcaseProductSlider?.current?.slickNext()}
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
            <Slider ref={refShowcaseProductSlider} {...settings}>
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

export default ShowcaseProduct;
