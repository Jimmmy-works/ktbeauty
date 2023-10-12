import Button from "@/components/Button";
import Textbox from "@/components/Textbox";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { twMerge } from "tailwind-merge";
const Hero = () => {
  const pagi = Pagination;
  return (
    <section className="schero relative  w-full h-full ">
      <div className="schero__slider relative">
        <div className="schero__slider-prev ">
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
              />
            </svg>
          </div>
        </div>
        <div className="schero__slider-next ">
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
              />
            </svg>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".schero__slider-prev",
            nextEl: ".schero__slider-next",
          }}
          grabCursor={true}
          pagination={{
            horizontalClass: `schero__pagination-horizontal`,
            bulletActiveClass: "active",
            clickable: true,
            bulletClass: "schero__pagination-item",
          }}
          loop={true}
        >
          <SwiperSlide>
            <div className="schero__slider-item bg-slider-1">
              <Textbox textSlider title={`Mega Store`} desc={`UP TO SALE 70%`}>
                <div className="xs:mt-[20px] lg:mt-[38px] ">
                  <Button link={`#`}>Browse Now</Button>
                </div>
              </Textbox>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="schero__slider-item  bg-slider-2">
              <Textbox
                textSlider
                title={`Gift Store Mockup`}
                desc={`Great shop`}
              >
                <div className="xs:mt-[20px] lg:mt-[38px] ">
                  <Button link={`#`}>Browse Now</Button>
                </div>
              </Textbox>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="schero__slider-item bg-slider-3">
              <Textbox
                textSlider
                title={`Kanebo Cosmetic`}
                desc={`Skincare night`}
              >
                <div className="xs:mt-[20px] lg:mt-[38px] ">
                  <Button link={`#`}>Browse Now</Button>
                </div>
              </Textbox>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
