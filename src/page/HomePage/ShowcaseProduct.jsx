import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Textbox from "@/components/Textbox";
import { CATEGORIES_OPTIONS } from "@/contants/general";
import React, { useRef, useState } from "react";
import { Navigation, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ShowcaseProduct = ({ onChangeCategoryTab, categoryTab }) => {
  const images = [
    "/assets/img/product-9.jpg",
    "/assets/img/product-8.jpg",
    "/assets/img/product-7.jpg",
    "/assets/img/product-6.jpg",
    "/assets/img/product-5.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-1.jpg",
  ];
  return (
    <section className="scshowcaseproduct pt-section">
      <div className="container">
        <Textbox title={`Product`}>
          <div
            className="scshowcaseproduct__top-category flex items-center justify-center gap-3
          lg:flex-nowrap xs:flex-wrap"
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
        </Textbox>
        <div className="scshowcaseproduct__bottom">
          <div className="scshowcaseproduct__bottom-list">
            <div className="prev ">
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
            <div className="next">
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
            <Swiper
              modules={[Navigation, Keyboard]}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                360: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                576: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              navigation={{
                prevEl: ".scshowcaseproduct .prev",
                nextEl: ".scshowcaseproduct .next",
              }}
              freeMode
              grabCursor={true}
              pagination={false}
              loop={true}
            >
              {images.map((item, index) => {
                return (
                  <SwiperSlide key={`${item}${index}`}>
                    <ProductCard className={`item`} item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseProduct;
