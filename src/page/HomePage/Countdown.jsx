import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import React, { useEffect, useState } from "react";

const Countdown = () => {
  /// Marketing
  const [currentTime, setCurrentTime] = useState(Date.now());
  const targetTime = new Date("2023-10-11").getTime();
  const timeBetween = targetTime - currentTime;
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(timeBetween / (1000 * 60 * 60 * 24 * 7));

  useEffect(() => {
    const countDown = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(countDown);
  }, []);
  // const countDownProps = { seconds, minutes, hours, days, weeks };
  return (
    <section
      className="sccountdown bg-marketing-banner mt-section xs:py-[40px] md:py-[75px] bg-no-repeat bg-center bg-cover
    bg-fixed"
    >
      <div className="container flex lg:flex-row xs:flex-col lg:gap-0 gap-7 items-center justify-between">
        <div className="sccountdown__left x:w-full md:w-1/2 text-center ">
          <h3
            className="sccountdown__left-heading text-md text-white font-mab uppercase mb-[20px]
            relative w-fit mx-auto before:absolute before:bg-primary  before:-bottom-2 before:-left-0
            before:w-full before:h-[5px]"
          >
            sale up to 40%
          </h3>
          <p
            className="sccountdown__left-title text-lg text-white font-gvr mb-[20px] truncate
          line-clamp-3 whitespace-normal "
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            eos provident aspernatur quidem consequuntur ex voluptatem officia
            amet. Consectetur.
          </p>
          <Button link={`${PATHS.SHOP.INDEX}`}>Shop Now</Button>
        </div>
        <div className="sccountdown__right x:w-full">
          <div className="sccountdown__right-list flex items-center justify-center ">
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] xs:w-[56px] xs:h-[56px] md:w-[70px] md:h-[70px] bg-white"
            >
              <p className=" font-osb xs:text-[24px] md:text-lg xs:leading-[26px] md:leading-[36px] text-primary">
                {weeks}
              </p>
              <p className="font-osr font-bold xs:text-xs md:text-sm leading-[16px] uppercase text-primary">
                weeks
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] xs:w-[56px] xs:h-[56px] md:w-[70px] md:h-[70px] bg-white"
            >
              <p className=" font-osb xs:text-[24px] md:text-lg xs:leading-[26px] md:leading-[36px] text-primary">
                {days}
              </p>
              <p className=" font-osr font-bold xs:text-xs md:text-sm leading-[16px] uppercase text-primary">
                days
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] xs:w-[56px] xs:h-[56px] md:w-[70px] md:h-[70px] bg-white"
            >
              <p className=" font-osb xs:text-[24px] md:text-lg xs:leading-[26px] md:leading-[36px] text-primary">
                {hours}
              </p>
              <p className=" font-osr font-bold xs:text-xs md:text-sm leading-[16px] uppercase text-primary">
                hours
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] xs:w-[56px] xs:h-[56px] md:w-[70px] md:h-[70px] bg-white"
            >
              <p className=" font-osb xs:text-[24px] md:text-lg xs:leading-[26px] md:leading-[36px] text-primary">
                {minutes}
              </p>
              <p className=" font-osr font-bold xs:text-xs md:text-sm leading-[16px] uppercase text-primary">
                min
              </p>
            </div>
            <div
              className="item text-center uppercase pt-[5px] m-[15px_10px] shadow-[0_0_0_15px_rgba(255,255,255,0.2)] 
            rounded-[50%] xs:w-[56px] xs:h-[56px] md:w-[70px] md:h-[70px] bg-white"
            >
              <p className=" font-osb xs:text-[24px] md:text-lg xs:leading-[26px] md:leading-[36px] text-primary">
                {seconds}
              </p>
              <p className=" font-osr font-bold xs:text-xs md:text-sm leading-[16px] uppercase text-primary">
                sec
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
