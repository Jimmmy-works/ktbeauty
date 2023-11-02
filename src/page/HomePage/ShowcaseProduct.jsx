import Button from "@/components/Button";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import LoadingSpin from "@/components/Loading/LoadingSpin";
import ProductCard from "@/components/ProductCard";
import Textbox from "@/components/Textbox";
import { CATEGORIES_OPTIONS } from "@/contants/general";
import React, { useRef, useState } from "react";
import { Navigation, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ShowcaseProduct = ({
  onChangeCategoryTab,
  categoryTab,
  products,
  categories,
  statusGetProduct,
  imageloading,
  onImageLoading,
}) => {
  return (
    <section className="scshowcaseproduct pt-section">
      <div className="container">
        <Textbox title={`Sản phẩm`}>
          <div
            className="scshowcaseproduct__top-category flex items-center justify-center gap-3
          lg:flex-nowrap xs:flex-wrap"
          >
            {categories?.length
              ? categories?.map((cate) => {
                  const { _id, name } = cate || {};
                  return (
                    <Button
                      key={_id}
                      variant="outline"
                      className={`py-[5px] px-[10px] uppercase`}
                      isActive={categoryTab === name ? true : false}
                      onClick={() => onChangeCategoryTab(name)}
                    >
                      {name}
                    </Button>
                  );
                })
              : ["Face", "Skin", "Body", "Supplement", "Other"].map(
                  (item, index) => {
                    return (
                      <Button
                        key={`${item}${index}`}
                        variant="outline"
                        className={`py-[5px] px-[10px] uppercase`}
                        isActive={categoryTab === item ? true : false}
                        onClick={() => onChangeCategoryTab(item)}
                      >
                        {item}
                      </Button>
                    );
                  }
                )}
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
            {products?.length > 0 ? (
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
                {products.map((item, index) => {
                  return (
                    <SwiperSlide key={`${item?._id}`}>
                      {statusGetProduct ? (
                        <ProductCard
                          className={`item`}
                          item={item}
                          onLoadingImage={onImageLoading}
                          imageloading={imageloading}
                        />
                      ) : (
                        <LoadingSkeleton
                          isArray={1}
                          isLoading={statusGetProduct}
                          isParagraph={3}
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
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
                {Array(9)
                  ?.fill("")
                  ?.map((item, index) => (
                    <SwiperSlide key={`${item}${index}`}>
                      <LoadingSkeleton
                        isClassName={` duration-700 transition-all`}
                        isArray={1}
                        isLoading={statusGetProduct}
                        isParagraph={4}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseProduct;
