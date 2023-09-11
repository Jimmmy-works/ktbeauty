import Button from "@/components/Button";
import Textbox from "@/components/Textbox";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dots, setDots] = useState();
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    arrows: false,
    adaptiveHeight: true,
    dots: true,
    speed: 600,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          dots: false,
        },
      },
    ],
  };
  return (
    <section className="schero relative  w-full h-full ">
      <div className="schero__slider relative">
        <div
          className="schero__slider-prev "
          onClick={() => sliderRef?.current?.slickPrev()}
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
              />
            </svg>
          </div>
        </div>
        <div
          className="schero__slider-next "
          onClick={() => sliderRef?.current?.slickNext()}
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
              />
            </svg>
          </div>
        </div>
        <Slider {...settings} ref={sliderRef}>
          <div className="schero__slider-item">
            <Textbox title={`Mega Store`} desc={`UP TO SALE 70%`}>
              <div className="xs:mt-[20px] lg:mt-[38px] ">
                <Button link={`#`}>Browse Now</Button>
              </div>
            </Textbox>
          </div>
          <div className="schero__slider-item ">
            <Textbox title={`Gift Store Mockup`} desc={`Great shop`}>
              <div className="xs:mt-[20px] lg:mt-[38px] ">
                <Button link={`#`}>Browse Now</Button>
              </div>
            </Textbox>
          </div>
          <div className="schero__slider-item  ">
            <Textbox title={`Kanebo Cosmetic`} desc={`Skincare night`}>
              <div className="xs:mt-[20px] lg:mt-[38px] ">
                <Button link={`#`}>Browse Now</Button>
              </div>
            </Textbox>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
