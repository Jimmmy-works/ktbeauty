import Textbox from "@/components/Textbox";
import { PATHS } from "@/contants/path";
import { formatPriceVND } from "@/utils/formatPrice";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
const MenuSpa = () => {
  const optionMenu = [
    {
      firstTitle: "Skin",
      title: "Skin",
      children: [
        {
          name: " Lorem ipsum dolor sit amet",
          price: 100000,
        },
        {
          name: " Lorem ipsum dolor sit amet 2",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 3",
          price: 300000,
        },
        {
          name: " Lorem ipsum dolor sit amet 4",
          price: 325000,
        },
        {
          name: " Lorem ipsum dolor sit amet 5",
          price: 540000,
        },
        {
          name: " Lorem ipsum dolor sit amet 6",
          price: 800000,
        },
        {
          name: " Lorem ipsum dolor sit amet 7",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 8",
          price: 300000,
        },
      ],
    },
    {
      firstTitle: "Lip & Eye",
      title: "Lip & Eye",
      children: [
        {
          name: " Lorem ipsum dolor sit amet",
          price: 100000,
        },
        {
          name: " Lorem ipsum dolor sit amet 2",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 3",
          price: 300000,
        },
        {
          name: " Lorem ipsum dolor sit amet 4",
          price: 325000,
        },
        {
          name: " Lorem ipsum dolor sit amet 5",
          price: 540000,
        },
        {
          name: " Lorem ipsum dolor sit amet 6",
          price: 800000,
        },
        {
          name: " Lorem ipsum dolor sit amet 7",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 8",
          price: 300000,
        },
      ],
    },
    {
      firstTitle: "W",
      title: "More",
      children: [
        {
          name: " Lorem ipsum dolor sit amet",
          price: 100000,
        },
        {
          name: " Lorem ipsum dolor sit amet 2",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 3",
          price: 300000,
        },
        {
          name: " Lorem ipsum dolor sit amet 4",
          price: 325000,
        },
        {
          name: " Lorem ipsum dolor sit amet 5",
          price: 540000,
        },
        {
          name: " Lorem ipsum dolor sit amet 6",
          price: 800000,
        },
        {
          name: " Lorem ipsum dolor sit amet 7",
          price: 250000,
        },
        {
          name: " Lorem ipsum dolor sit amet 8",
          price: 300000,
        },
      ],
    },
  ];
  return (
    <section className="scmenu mt-section p-section bg-menu-banner bg-fixed">
      <div className="container ">
        <Textbox title={`Chăm sóc da`} textColor={`text-white`} />
        <div className="scmenu__list lg:flex-nowrap flex-wrap md:justify-center lg:justify-normal flex xs:gap-[40px] lg:gap-[60px]">
          {optionMenu?.map((item, index) => {
            return (
              <div
                key={item?.title}
                className="scmenu__list-item xs:w-full md:w-[calc(50%-30px)] lg:w-[33.33333%] p-[60px_50px_30px]
               bg-[rgba(96,96,96,0.2)]   overflow-hidden
                shadow-[0_10px_20px_0_rgba(0,0,0,0.2)] hover:bg-[rgba(255,255,255,0.2)] duration-400 transition-all
                border-[1px] border-solid border-[rgba(255,255,255,0.5)] group/scroll"
              >
                <div className="relative">
                  {/* <span
                    className="absolute -left-[25px] -top-[25px] font-gvr text-[52px] group-hover/scroll:text-white
                duration-300 transition-colors"
                  >
                    {item?.firstTitle}
                  </span> */}
                  <h3
                    className="text-center font-gvr  text-[52px] text-white pb-[20px] before:absolute relative
                  before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg-primary before:h-[5px]
                  before:w-[100px] "
                  >
                    {item?.title}
                  </h3>
                </div>
                <div className=" mt-[30px] overflow-hidden ">
                  <ul
                    className={`group-hover/scroll:-translate-y-[66px] max-h-[256px]  duration-500 transition-all`}
                  >
                    {item?.children?.map((child, index) => (
                      <li
                        key={index}
                        className="py-[9px] flex items-start gap-[6px] justify-between text-sm font-osr w-full 
                      not-lastChild:border-b-[1px] not-lastChild:border-solid not-lastChild:border-[rgba(255,255,255,0.2)]"
                      >
                        <p className="text-sm font-osr text-white">
                          {child?.name}
                        </p>{" "}
                        <span className="text-sm font-osb text-white">
                          {formatPriceVND(child?.price)}
                        </span>
                      </li>
                    ))}
                    <li
                      className="group-hover/scroll:opacity-100 group-hover/scroll:visible opacity-0 invisible duration-[500ms]
                    transition-all"
                    >
                      <div
                        className="px-[32.15px] py-[6px] bg-transparent rounded-[20px] w-fit flex items-center gap-[6px] 
                        m-[20px_auto_0px] justify-center
                      hover:bg-primary duration-400  transition-colors group/hover cursor-pointer border-dashed border-[1px]
                       border-primary  
                         "
                      >
                        <Link
                          to={PATHS.CONTACT}
                          className=" block relative font-osr text-md text-primary group-hover/hover:text-white 
                          duration-400 transition-colors "
                        >
                          <span className="">Booking</span>
                        </Link>
                        <div
                          className="relative h-[20px] w-[20px] group-hover/hover:bg-white bg-primary rounded-[50%]
                        duration-400 transition-colors"
                        >
                          <svg
                            className=" center-absolute"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                              fill="#000"
                              className="group-hover/hover:fill-primary duration-400 transition-colors"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuSpa;
