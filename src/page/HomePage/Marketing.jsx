import Button from "@/components/Button";
import React from "react";

const Marketing = ({ seconds, minutes, hours, days, weeks }) => {
  return (
    <section
      className="scmarketing bg-marketing-banner mt-section xs:py-[40px] md:py-[75px] bg-no-repeat bg-center bg-cover
    bg-fixed"
    >
      <div className="container flex lg:flex-row xs:flex-col lg:gap-0 gap-7 items-center justify-between">
        <div className="scmarketing__left x:w-full md:w-1/2 text-center ">
          <h3
            className="scmarketing__left-heading text-md text-white font-mab uppercase mb-[20px]
            relative w-fit mx-auto before:absolute before:bg-primary  before:-bottom-2 before:-left-0
            before:w-full before:h-[5px]"
          >
            sale up to 40%
          </h3>
          <p
            className="scmarketing__left-title text-lg text-white font-gvr mb-[20px] truncate
          line-clamp-3 whitespace-normal "
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            eos provident aspernatur quidem consequuntur ex voluptatem officia
            amet. Consectetur.
          </p>
          <Button>Shop Now</Button>
        </div>
        <div className="scmarketing__right x:w-full md:w-1/2">
          <div className="scmarketing__right-list flex items-center justify-center ">
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] w-[70px] h-[70px] bg-white"
            >
              <p className=" font-osb text-lg leading-[36px] text-primary">
                {weeks}
              </p>
              <p className=" font-osr font-bold text-sm leading-[16px] uppercase text-primary">
                weeks
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] w-[70px] h-[70px] bg-white"
            >
              <p className=" font-osb text-lg leading-[36px] text-primary">
                {days}
              </p>
              <p className=" font-osr font-bold text-sm leading-[16px] uppercase text-primary">
                days
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] w-[70px] h-[70px] bg-white"
            >
              <p className=" font-osb text-lg leading-[36px] text-primary">
                {hours}
              </p>
              <p className=" font-osr font-bold text-sm leading-[16px] uppercase text-primary">
                hours
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] w-[70px] h-[70px] bg-white"
            >
              <p className=" font-osb text-lg leading-[36px] text-primary">
                {minutes}
              </p>
              <p className=" font-osr font-bold text-sm leading-[16px] uppercase text-primary">
                min
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] w-[70px] h-[70px] bg-white"
            >
              <p className=" font-osb text-lg leading-[36px] text-primary">
                {seconds}
              </p>
              <p className=" font-osr font-bold text-sm leading-[16px] uppercase text-primary">
                sec
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketing;
