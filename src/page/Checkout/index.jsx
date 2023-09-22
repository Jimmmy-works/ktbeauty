import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";
import { Checkbox } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Checkout = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-10.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();
  return (
    <main className="checkout main-wrapper relative">
      {/* <div class="md:block xs:hidden absolute top-0 -left-[40%] bg-[#d6d6d6] w-full h-full"></div> */}
      <div className="container ">
        <div className="relative z-10">
          <BreadCrumb>
            <BreadCrumb.Item>
              <Link to={`${PATHS.HOME}`}>Home</Link>
            </BreadCrumb.Item>
            <BreadCrumb.Item isActive>
              <Link>Checkout</Link>
            </BreadCrumb.Item>
          </BreadCrumb>
          <div class="bg-advertising-banner-2 bg-no-repeat bg-cover xs:h-[100px] md:h-[140px] w-full relative ">
            <h3 class="font-mam xs:text-[26px] w-full text-center md:text-[40px] text-white center-absolute z-20">
              Checkout
            </h3>
          </div>
          <div className="flex lg:flex-row xs:flex-col items-start mt-[30px] gap-[40px]">
            <div className="xs:w-full lg:w-[60%] screen-1200:w-[65%]">
              <form
                className="checkout__information checkout__details pb-[20px] pt-0"
                action=""
              >
                <h3 className="font-mab text-black-333 text-md">
                  Contact Information
                </h3>
                <div className="flex items-center gap-3 md:flex-row xs:flex-col">
                  <div className="checkout__details-wrapper xs:w-full md:w-1/2">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" placeholder="+84" type="text" />
                  </div>
                  <div className="checkout__details-wrapper xs:w-full md:w-1/2">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="abc@gmail.com" type="text" />
                  </div>
                </div>
                <div>
                  <Checkbox>Contact me with news and offers</Checkbox>
                </div>
              </form>
              <form className="checkout__details" action="">
                <h3 className="font-mab text-black-333 text-md">
                  Billing Details
                </h3>
                <div className="flex items-center gap-3 md:flex-row xs:flex-col">
                  <div className="checkout__details-wrapper xs:w-full md:w-1/2">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />
                  </div>
                  <div className="checkout__details-wrapper xs:w-full md:w-1/2">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                  </div>
                </div>

                <div className="flex items-center gap-3 md:flex-row xs:flex-col">
                  <div className="checkout__details-wrapper xs:w-full md:w-1/3">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" />
                  </div>
                  <div className="checkout__details-wrapper xs:w-full md:w-1/3">
                    <label htmlFor="district">District</label>
                    <input type="text" id="district" />
                  </div>
                  <div className="checkout__details-wrapper xs:w-full md:w-1/3">
                    <label htmlFor="ward">Ward</label>
                    <input type="text" id="ward" />
                  </div>
                </div>
                <div className="checkout__details-wrapper">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    placeholder="ID home & Street name"
                    type="text"
                  />
                </div>
                <div className="checkout__details-wrapper">
                  <label htmlFor="note">Note</label>
                  <textarea
                    placeholder="Notes your order"
                    name=""
                    id="note"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </form>
            </div>
            <div
              className="xs:w-full lg:w-[40%] screen-1200:w-[35%] xs:p-[0] md:py-[30px] md:px-[40px] 
             md:bg-[#f9f9f9]"
            >
              {width < 768 && (
                <h3 className="font-mab text-black-333 text-md my-[20px]">
                  Your Order
                </h3>
              )}
              <div className="pb-[20px] border-b border-solid border-[#e2e0e0]">
                {images?.map((item, index) => {
                  return (
                    <div
                      key={`${item}${index}`}
                      className="flex items-center justify-between gap-[15px] not-firstChild:mt-[14px]"
                    >
                      <div className="flex items-center gap-[12px]">
                        <Link
                          className="relative min-w-[64px] min-h-[64px] rounded-[6px] border border-solid
                        border-[#e2e0e0] duration-400 transition-colors hover:border-primary group/hover"
                        >
                          <img
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/img/error.png";
                            }}
                            className="h-full w-full object-cover center-absolute rounded-[6px]"
                            src={item}
                            alt=""
                          />
                          <span
                            to={PATHS.SHOP.DETAIL}
                            class="text-[13px] text-white font-mam rounded-[50%] bg-[#7d7c7c] h-[20px] w-[20px]
                                     flex items-center justify-center absolute right-[-8px] top-[3px] -translate-y-1/2
                                  group-hover/hover:bg-primary duration-400 transition-colors "
                          >
                            {index}
                          </span>
                        </Link>
                        <Link
                          to={PATHS.SHOP.DETAIL}
                          className="text-sm text-black-333 font-mam truncate whitespace-normal line-clamp-4
                         duration-400 transition-colors hover:text-primary"
                        >
                          Lorem ipsum dolor sit amet {index}.
                        </Link>
                      </div>
                      <p className="text-sm text-primary font-mab">$40.00</p>
                    </div>
                  );
                })}
              </div>
              <div
                className="flex items-center gap-2 py-[20px] border-b border-solid
                    border-[#e2e0e0] "
              >
                <input
                  type="text"
                  placeholder="Discount code"
                  className="border border-solid border-grey-999 p-[11px] font-mar text-sm text-black
                  w-full"
                />
                <button
                  className="bg-black-555 font-mam font-semibold p-[11.5px] text-[14px] text-white
                  tracking-widest duration-400 transition-colors hover:bg-primary"
                >
                  Apply
                </button>
              </div>
              <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                <div className="flex items-center justify-between ">
                  <h4 className="font-mab text-sm text-black-333">Subtotal</h4>
                  <p className="font-mab text-sm text-primary">$390.00</p>
                </div>
                {/* <div className="flex items-center justify-between mt-[20px]">
                  <h4 className="font-mab text-sm text-black-333">Shipping</h4>
                  <p className="font-mab text-sm text-primary">Free</p>
                </div> */}
                <div className="flex items-center justify-between mt-[20px]">
                  <h4 className="font-mab text-sm text-black-333">Shipping</h4>
                  <p
                    className="font-mab text-sm text-black-333 relative before:w-full before:h-[1px]
                  before:absolute before:bg-black-333 before:bottom-[-4px] duration-400 transition-colors
                  before:duration-400 before:transition-colors hover:before:bg-primary hover:text-primary
                  cursor-pointer"
                  >
                    Select delivery
                  </p>
                </div>
              </div>
              <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                <div className="flex items-start justify-between">
                  <h4 className="font-mab text-sm text-black-333">Discount</h4>
                  <p className="font-mab text-sm text-primary">-$43.00</p>
                </div>
                <div className="flex items-start justify-between mt-[14px] ">
                  <h4 className="pl-[6px] font-mam text-[12px] text-black-333">
                    COUPON20
                  </h4>
                  <p className="font-mab text-[12px] text-primary">-$20.00</p>
                </div>
                <div className="flex items-start justify-between mt-[14px] ">
                  <h4 className="pl-[6px] font-mam text-[12px] text-black-333">
                    SALEOFF
                  </h4>
                  <p className="font-mab text-[12px] text-primary">-20%</p>
                </div>
              </div>
              <div className=" py-[20px] flex items-center justify-between">
                <h4 className="font-mab text-md text-black-333">Total</h4>
                <p className="font-mab text-md text-primary ">$1000</p>
              </div>
              <div className="mt-[10px]">
                <Button
                  link={PATHS.COMPLETE}
                  className={`block text-center rounded-none w-full py-[16px]`}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
