import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";
import { Radio, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const CartPage = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();
  const [renderValue, setRenderValue] = useState(1);
  const min = 1;
  const max = 100;
  const onInputOnchange = (e) => {
    setRenderValue(e.target.value);
  };
  const onIncrease = () => {
    const value = modifyValue(Number(renderValue) + Number(1));
    console.log("1", value);
    setRenderValue(value);
  };
  const onDecrease = () => {
    console.log("22", 22);
    const value = modifyValue(Number(renderValue) - Number(1));
    setRenderValue(value);
  };
  const modifyValue = (value) => {
    if (value > max) {
      return (value = max);
    } else if (value < min) {
      return (value = min);
    } else {
      return value;
    }
  };
  return (
    <main className="main-wrapper cartpage">
      <div className="container">
        <BreadCrumb>
          <BreadCrumb.Item>
            <Link to={`${PATHS.HOME}`}>Home</Link>
          </BreadCrumb.Item>
          <BreadCrumb.Item isActive>
            <Link>Checkout</Link>
          </BreadCrumb.Item>
        </BreadCrumb>
        <div className="bg-advertising-banner-2 bg-no-repeat bg-cover xs:h-[100px] md:h-[140px] w-full relative ">
          <h3 className="font-mam xs:text-[26px] w-full text-center md:text-[40px] text-white center-absolute z-20">
            Shopping Cart
          </h3>
        </div>
        <table className="table ">
          <thead>
            <tr>
              <td>image</td>
              <td>product</td>
              <td>price</td>
              <td>quantity</td>
              <td>subtotal</td>
            </tr>
          </thead>
          <tbody className="table__body">
            {images?.map((item, index) => {
              return (
                <tr key={`${item}${index}`}>
                  <td className="table__body-row">
                    <a
                      href=""
                      className="img group/hover
                      "
                    >
                      <img
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/error.png";
                        }}
                        className="center-absolute  group-hover/hover:scale-105 md:left-0 md:translate-x-0 "
                        src={item}
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="">
                    <a className="text  hover:text-primary " href="">
                      Lorem ipsum dolor sit amet Lorem ipsum dolor .
                    </a>
                  </td>

                  {width >= 768 ? (
                    <td className="">$100</td>
                  ) : (
                    <td className="">Price: $100</td>
                  )}
                  <td className="">
                    <div
                      className="flex items-center border border-solid border-[#ececec] rounded-md
                        h-[50px] justify-center w-fit mx-auto "
                      onClick={onDecrease}
                    >
                      <div className="px-[14px] cursor-pointer h-full flex items-center justify-center group/hover">
                        <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24">
                          <path
                            className="fill-black-555 duration-300 transition-colors group-hover/hover:fill-primary"
                            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        className="w-[30px] text-[15px] tracking-wider text-center text-black-555 font-osb"
                        type="number"
                        min={min}
                        max={max}
                        value={renderValue}
                        onChange={onInputOnchange}
                      />
                      <div
                        className="px-[14px] cursor-pointer h-full flex items-center justify-center group/hover"
                        onClick={onIncrease}
                      >
                        <svg
                          className="h-[10px] w-[10px] rotate-[180deg]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className="fill-black-555 duration-300 transition-colors group-hover/hover:fill-primary"
                            d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                  {width >= 768 ? (
                    <td className="text-black font-mam">$2000</td>
                  ) : (
                    <td className="text-black font-mam">Subtotal: $2000</td>
                  )}
                  {width >= 768 ? (
                    <td className="">
                      <button
                        className="px-[10px] block xs:text-[12px] lg:text-[14px] text-white rounded-md 
                        py-[6px] hover:bg-red-500
                      bg-black-333 transition-all duration-400 mx-auto"
                      >
                        Remove
                      </button>
                    </td>
                  ) : (
                    <td className="absolute top-0 right-3 w-[22px] p-0">
                      <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                        <path
                          fill="#555"
                          d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                        />
                      </svg>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="cartpage__total flex md:flex-row xs:flex-col items-start justify-start gap-[30px] pt-[30px] mt-[30px]
                  border-t border-solid border-black-be "
        >
          <div className="coupon  xs:w-full md:w-[50%] border border-solid  border-grey-999">
            <h3 className="text-white bg-black-555 font-osb text-[16px] py-[10px] px-[20px]">
              Coupon
            </h3>
            <div className="flex items-center gap-2 p-[20px_20px] ">
              <input
                type="text"
                placeholder="Coupon code"
                className="border border-solid border-grey-999 p-[11px] font-mar text-sm text-black
                  md:max-w-[300px] xs:max-w-[100%] w-full"
              />
              <button
                className="bg-black-555 font-mam font-semibold p-[11.5px] text-[14px] text-white
                tracking-widest duration-400 transition-colors hover:bg-primary"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="  xs:w-full md:w-[50%] border border-solid border-grey-999">
            <h3 className="text-white bg-black-555 font-osb text-[16px] py-[10px] px-[20px]">
              Cart Total
            </h3>
            <div className="flex justify-between items-center p-[16px_20px] ">
              <h4 className="text-[16px] font-mam text-black">Sub Total:</h4>
              <p className="text-[16px] font-mam text-black">$340.00</p>
            </div>

            <div className="flex justify-between items-center p-[16px_20px] ">
              <h4 className="text-[16px] font-mam text-black">Discount:</h4>
              <p className="text-[16px] font-mam text-black">- $340.00</p>
            </div>
            <div className="flex justify-between items-center p-[8px_20px] ">
              <h4 className="text-[16px] font-mam text-black">
                Select Shipping
              </h4>
              <div>
                <Select
                  defaultValue="default"
                  // onChange={handleChange}
                  options={[
                    {
                      value: "default",
                      label: "Select shipping",
                    },
                    {
                      value: "free",
                      label: "Free",
                    },
                    {
                      value: "fast",
                      label: "Fast : $20",
                    },
                    {
                      value: "express",
                      label: "Express : $30",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-between items-center p-[16px_20px] ">
              <h4 className="text-[16px] font-mam text-black">
                &#8658; Shipping:
              </h4>
              <p className="text-[16px] font-mam text-black"> Free</p>
            </div>
            <div
              className="flex justify-between items-center p-[16px_20px] border-t border-solid
              border-grey-999"
            >
              <h4 className="text-[16px] font-mam text-black">Total:</h4>
              <p className="text-[16px] font-mam text-black">$320.00</p>
            </div>
            <div className=" p-[20px] ">
              <Button
                link={PATHS.CHECKOUT}
                className={`block text-center rounded-none w-full  py-[16px]`}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
