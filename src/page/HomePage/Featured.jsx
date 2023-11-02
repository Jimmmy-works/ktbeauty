import React, { useRef, useState } from "react";
import { FEATURED_OPTIONS } from "@/contants/general";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
const Featured = ({
  onChangeFeaturedTab,
  featuerdTab,
  products,
  statusGetProduct,
  imageloading,
  onImageLoading,
}) => {
  return (
    <section className="scfeatured mt-section  bg-[#333] lg:py-[80px] md:py-[60px] xs:py-[50px]">
      <div className="container">
        <div className="scfeatured__tabs  ">
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.FEATURED ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.FEATURED)}
          >
            Dành cho bạn
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.BEST_SELLER ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.BEST_SELLER)}
          >
            Bán chạy nhất
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.POPULAR ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.POPULAR)}
          >
            Ưu đãi
          </div>
        </div>
        <div className="scfeatured__content">
          <div className={`scfeatured__content-list`}>
            <div className="prev">
              <div
                className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors rotate-180
            group-hover/hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="md:w-[14px] md:h-[14px] xs:h-[10px] xs:w-[10px]"
                >
                  <path
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary fill-white duration-400 transition-colors"
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
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary fill-white duration-400 transition-colors"
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
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                  },
                }}
                navigation={{
                  prevEl: ".scfeatured .prev",
                  nextEl: ".scfeatured .next",
                }}
                freeMode
                grabCursor={true}
                pagination={false}
                loop={true}
              >
                {products.map((item, index) => {
                  return (
                    <SwiperSlide key={`${item?._id}`}>
                      <ProductCard
                        onLoadingImage={onImageLoading}
                        imageloading={imageloading}
                        isProductDetail
                        className={`item`}
                        item={item}
                      />
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
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    spaceBetween: 30,
                    slidesPerView: 3,
                  },
                }}
                navigation={{
                  prevEl: ".scfeatured .prev",
                  nextEl: ".scfeatured .next",
                }}
                freeMode
                grabCursor={true}
                pagination={false}
                loop={true}
              >
                {Array(9)
                  ?.fill("")
                  ?.map((item) => (
                    <SwiperSlide>
                      <LoadingSkeleton
                        isClassName={`item`}
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

export default Featured;
