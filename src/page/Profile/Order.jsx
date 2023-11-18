import useWindowSize from "@/utils/windowResize";
import React, { useRef, useState } from "react";
import useProfile from "./useProfile";

const Order = () => {
  const { orderInfo } = useProfile();
  console.log("first", orderInfo);
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();
  const refContent = useRef(null);
  const [isActive, setIsActive] = useState(null);

  return (
    <div className="order">
      <h3 className="text-[24px] font-mab text-black-333 xs:my-[16px]">
        Giỏ hàng của bạn
      </h3>
      {images.map((item, index) => {
        return (
          <div key={`${item}${index}`} className="not-firstChild:mt-[20px]">
            <div
              className="flex items-center justify-between p-[0_0_8px_0] cursor-pointer group/hover"
              onClick={() => {
                setIsActive((prev) => (prev === index ? null : index));
              }}
            >
              <div className="flex xs:items-start md:items-center md:flex-row xs:flex-col xs:gap-3  md:gap-5">
                <h3 className="text-sm text-black-333 font-mar">
                  ID: {`03a23d39d99o12p${index}`}
                </h3>
                <p className="text-sm text-black-333 font-mar">
                  Time Order: 13:30:{`${index}`} 25/09/2023
                </p>
              </div>
              <div
                className={`p-[10px] rounded-[50%] cursor-pointer group/hover
                  group-hover/hover:bg-primary duration-400 transition-colors
                   ${isActive === index ? "bg-primary" : "bg-gray-300 "}`}
              >
                <svg
                  className={`h-[12px] w-[12px] duration-400 transition-transform
                   ${isActive === index ? "rotate-[-180deg]" : "rotate-0"}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={` group-hover/hover:fill-white duration-400 transition-colors
                    ${isActive === index ? "fill-white" : "fill-black-333"}`}
                    d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              ref={refContent}
              className={`transition-all duration-500 overflow-hidden`}
              style={{
                maxHeight: `${
                  isActive !== index
                    ? "0px"
                    : `${refContent?.current?.scrollHeight}px`
                }`,
              }}
            >
              <table className="table md:mt-0 xs:mt-[10px]">
                <thead className=" ">
                  <tr>
                    <td className="">Product</td>
                    <td className="">price</td>
                    <td className="">quantity</td>
                    <td className="">Subtotal</td>
                  </tr>
                </thead>
                <tbody>
                  {images?.map((item, index) => {
                    return (
                      <tr key={`${item}${index}`} className="relative">
                        <td className="">
                          <div
                            className="flex md:flex-row xs:flex-col items-center md:gap-[10px]
                              xs:gap-[12px]"
                          >
                            <a
                              className="xs:h-[80px] md:h-[60px] lg:h-[80px] xs:w-[80px] md:w-[60px] lg:w-[80px]
                              border-solid border border-transparent hover:border-primary rounded-md duration-300 
                              transition-colors"
                              href=""
                            >
                              <img
                                className="rounded-md "
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/error.png";
                                }}
                                src={item}
                                alt=""
                              />
                            </a>
                            <a
                              className="block duration-400 transition-colors hover:text-primary leading-normal
                                           lg:max-w-full md:max-w-[150px]"
                              href=""
                            >
                              Lorem ipsum dolor sit amet Lorem ipsum dolor .
                            </a>
                          </div>
                        </td>
                        {/* <td className=""></td> */}

                        {width >= 768 ? (
                          <td className="">$100</td>
                        ) : (
                          <td className="">Price: $100</td>
                        )}
                        {width >= 768 ? (
                          <td className="">3</td>
                        ) : (
                          <td className="">Quantity: 3</td>
                        )}
                        {width >= 768 ? (
                          <td className="text-black font-mam">$2000</td>
                        ) : (
                          <td className="text-black font-mam">
                            Subtotal: $2000
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div
                className="flex xs:gap-3 md:gap-10 border-t border-solid border-black-be py-[14px]
                  md:flex-row xs:flex-col "
              >
                <div className="text-black-555 text-[16px] font-mam xs:w-full md:w-1/3 ">
                  Discount:
                  <span className="pl-[8px] text-primary ">-$34.00</span>
                </div>
                <div className="text-black-555 text-[16px] font-mam  xs:w-full md:w-1/3 ">
                  Shipping:<span className="pl-[8px] text-primary ">Free</span>
                </div>
                <div className="text-black-555 text-[16px] font-mam xs:w-full md:w-1/3 ">
                  Total: <span className="pl-[8px] text-primary ">$11.760</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
