import Button from "@/components/Button";
import Textbox from "@/components/Textbox";
import React from "react";

const Advertising = () => {
  return (
    <section className="scadvertising pt-section">
      <div className="container ">
        <Textbox title={`Advertising`} />
        <div className="scadvertising__list flex items-center lg:flex-nowrap xs:flex-wrap gap-[30px] md:-mx-[15px]">
          <div
            className="scadvertising__list-item xs:w-full lg:w-1/2 relative
           after:w-full after:h-full after:bg-[rgba(0,0,0,0.35)] after:absolute
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 "
          >
            <div className="relative h-0 overflow-hidden pb-[66.6669%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-2.jpg"
                alt=""
              />
            </div>
            <div className="content center-absolute z-10 w-full min-h-[180px] flex flex-col justify-between">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider"
              >
                skincaer night
              </h3>
              <p className="font-om text-md leading-[22px] px-[10px] text-white text-center  whitespace-normal">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <Button>Shop Now</Button>
              </div>
            </div>
          </div>
          <div
            className="scadvertising__list-item xs:w-full md:w-[calc(50%-15px)] lg:w-1/4 relative
          after:w-full after:h-full after:bg-[rgba(0,0,0,0.35)] after:absolute 
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
          >
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-1.gif"
                alt=""
              />
            </div>
            <div className="content z-10 center-absolute w-full min-h-[180px] flex flex-col justify-between">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider "
              >
                skincaer night
              </h3>
              <p
                className="font-om text-md leading-[24px] px-[10px] text-white text-center  whitespace-normal
              "
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, sunt.
              </p>
              <div className="mx-auto w-fit mt-[20px]">
                <Button>Shop Now</Button>
              </div>
            </div>
          </div>
          <div
            className="scadvertising__list-item xs:w-full md:w-[calc(50%-15px)] lg:w-1/4 relative
           after:w-full after:h-full after:bg-[rgba(0,0,0,0.35)] after:absolute 
              after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
          >
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-3.jpg"
                alt=""
              />
            </div>
            <div className="content center-absolute z-10 w-full min-h-[180px] flex flex-col justify-between">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider"
              >
                skincaer night
              </h3>
              <p className="font-om text-md leading-[22px] px-[10px] text-white text-center  whitespace-normal">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <Button>Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertising;
