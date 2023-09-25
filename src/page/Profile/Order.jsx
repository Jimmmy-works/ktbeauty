import useWindowSize from "@/utils/windowResize";
import React, { useState } from "react";

const Order = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();
  const [idOrder, setIdOrder] = useState(0);
  const [toggleOrder, setToggleOrder] = useState(false);
  const onToggleOrder = (id) => {
    setIdOrder(id);
    if (idOrder === id) {
      setToggleOrder(true);
    }
  };
  return (
    <div className="order">
      <h3 className="text-md font-mab text-black-333 my-[20px]">Your Order</h3>
      {images.map((item, index) => {
        return (
          <div key={`${item}${index}`} className="not-firstChild:mt-[20px]">
            <div
              className="flex items-center justify-between
              border-b border-solid border-black-be py-[8px] "
            >
              <div className="flex xs:items-start md:items-center md:flex-row xs:flex-col xs:gap-3  md:gap-5">
                <h3 className="text-[16px] text-black-333 font-mar">
                  ID: {`03a23d39d99o12p${index}`}
                </h3>
                <p className="text-[16px] text-black-333 font-mar">
                  Date: 13:30:{`${index}`} 25/09/2023
                </p>
              </div>
              <div
                className={`p-[12px] rounded-[50%] cursor-pointer group/hover
                  hover:bg-primary duration-400 transition-colors
                   ${idOrder === index ? "bg-primary" : "bg-gray-300 "}`}
                onClick={() => onToggleOrder(index)}
              >
                <svg
                  className={`h-[12px] w-[12px] duration-400 transition-transform
                   ${idOrder === index ? "rotate-[-180deg]" : "rotate-0"}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={` group-hover/hover:fill-white duration-400 transition-colors
                    ${idOrder === index ? "fill-white" : "fill-black-333"}`}
                    d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className={`transition-all duration-700 overflow-hidden ${
                idOrder === index ? "max-h-[3000px] " : "max-h-0 "
              }`}
            >
              <table className="cartpage__table mt-[10px]">
                <thead className="border-b border-solid border-black-be ">
                  <tr>
                    <td className="text-left">Product</td>
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
                            className="flex md:flex-row xs:flex-col items-center gap -[10px] md:gap-0
                      xs:gap-[12px]"
                          >
                            <a
                              className="xs:h-[80px] md:h-[60px] lg:h-[80px] xs:w-[80px] md:w-[60px] lg:w-[80px]"
                              href=""
                            >
                              <img
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
                className="flex justify-between xs:gap-[12px] md:gap-4 border-t border-solid border-black-be py-[14px]
                  md:flex-row xs:flex-col"
              >
                <div className="text-black-555 xs:text-sm lg:text-[16px] font-mam flex flex-col gap-2">
                  <p>Discount:</p>
                  <ul className="flex-col gap-1 flex w-full pl-[3px]">
                    <li className="lg:text-sm xs:text-[12px] flex items-center justify-between gap-1">
                      COUPON20:<span className="text-primary">+$30.00</span>
                    </li>
                    <li className="lg:text-sm xs:text-[12px] flex items-center justify-between gap-1">
                      HAPPY:{" "}
                      <span className="text-primary text-right">+$30.00</span>
                    </li>
                    <li className="lg:text-sm xs:text-[12px] flex items-center justify-between gap-1">
                      SALE10:{" "}
                      <span className="text-primary text-right">+$5.00</span>
                    </li>
                  </ul>
                </div>
                <div className="text-black-555 md:text-sm lg:text-[16px] font-mam flex flex-col gap-2">
                  <p>Shipping:</p>
                  <ul className="flex-col gap-1 flex w-full pl-[3px]">
                    <li className="lg:text-sm xs:text-[12px] flex items-center justify-between gap-1">
                      Express <span className="text-primary">-$30.00</span>
                    </li>
                  </ul>
                </div>
                <div
                  className="text-black-555 md:text-sm lg:text-[16px] font-mam
                   flex  justify-between gap-1"
                >
                  Total Product: <span className="text-primary ">10</span>
                </div>
                <div
                  className="text-black-555 md:text-sm lg:text-[16px] font-mam
                    flex  justify-between gap-1"
                >
                  Total: <span className="text-primary ">$12000</span>
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
