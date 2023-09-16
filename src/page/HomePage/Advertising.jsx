import Button from "@/components/Button";
import Textbox from "@/components/Textbox";
import React from "react";

const Advertising = () => {
  return (
    <section className="scadvertising pt-section">
      <div className="container ">
        <Textbox title={`Advertising`} />
        <div className="scadvertising__list flex items-center lg:flex-nowrap xs:flex-wrap gap-[30px] md:-mx-[15px]">
          <div className="scadvertising__list-item xs:w-full lg:w-1/2 relative">
            <div className="relative h-0 overflow-hidden pb-[66.6669%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-2.jpg"
                alt=""
              />
            </div>
            <div className="content center-absolute w-full">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider"
              >
                skincaer night
              </h3>
              <p className="font-gvr text-lg leading-none min-h-[60px] text-white text-center truncate line-clamp-2 whitespace-normal">
                Lorem ipsum dolor sit amet.
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <Button>Shop Now</Button>
              </div>
            </div>
          </div>
          <div className="scadvertising__list-item xs:w-full md:w-[calc(50%-15px)] lg:w-1/4 relative">
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-1.gif"
                alt=""
              />
            </div>
            <div className="content center-absolute w-full">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider"
              >
                skincaer night
              </h3>
              <p className="font-gvr text-lg leading-none min-h-[60px] text-white text-center truncate line-clamp-2 whitespace-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, sunt.
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <Button>Shop Now</Button>
              </div>
            </div>
          </div>
          <div className="scadvertising__list-item xs:w-full md:w-[calc(50%-15px)] lg:w-1/4 relative">
            <div className="relative h-0 overflow-hidden xs:pb-[66.6669%] md:pb-[133.336%]">
              <img
                className="center-absolute w-full h-full object-cover"
                src="/assets/img/advertising-banner-3.jpg"
                alt=""
              />
            </div>
            <div className="content center-absolute w-full">
              <h3
                className=" relative text-md font-mab uppercase text-white pb-[10px] mb-[20px] mx-auto w-fit
              before:h-[5px] before:w-full before:absolute before:top-[40px] before:left-0 before:bg-primary
              tracking-wider"
              >
                skincaer night
              </h3>
              <p className="font-gvr text-lg leading-none min-h-[60px] text-white text-center truncate line-clamp-2 whitespace-normal">
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
