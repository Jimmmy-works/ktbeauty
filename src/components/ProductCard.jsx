import React from "react";
import Button from "./Button";
import { Rate } from "antd";

const ProductCard = ({ item, baseURL, className, isProductDetail = false }) => {
  if (isProductDetail)
    return (
      <div
        className={`card shadow-header  ${
          className ?? ""
        } transition-all duration-400 hover:shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]`}
      >
        <a
          className="block relative h-0 pb-[100%] group/img overflow-hidden"
          href="#"
        >
          <img
            className="center-absolute z-0 object-cover transition-all duration-400 group-hover/img:scale-105"
            src={`${baseURL}${item}`}
            alt=""
          />
          <span
            className="absolute xs:top-4 md:top-7 left-5 xs:w-[30px] md:w-[40px] xs:h-[30px] md:h-[40px] border-dashed
                    border-[2px] border-primary rounded-[50%] xs:text-xs md:text-sm flex justify-center 
                    bg-transparent items-center z-50"
          >
            Sale
          </span>
          {/* <button className="absolute z-50 xs:top-6 md:top-9 right-5 group/hover">
            <svg
              className="xs:w-[18px] md:w-[22px] xs:h-[18px] md:h-[22px] "
              viewBox="0 0 24 24"
            >
              <path
                className="group-hover/hover:fill-primary duration-300 transition-colors"
                fill="#555"
                d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
              ></path>
            </svg>
          </button> */}
        </a>
        <div className="text-center p-[14px_12px_18px]">
          <a
            href="#"
            className="font-osb text-sm uppercase text-black-555 
                    leading-[18px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors "
          >
            Soy Wax for Container Candles Soy Wax for Container Candles les Soy
            Wax for Container Candles
          </a>

          <p className="font-osb text-sm text-primary mt-[6px] xs:mb-[4px] md:mb-[10px] leading-[18px]">
            $150.00
          </p>
          <div className=" flex gap-[10px] items-center justify-center">
            <div
              className="cart  xs:p-[3px] md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[30px]
                           shadow-[0_5px_5px_0_rgba(0,0,0,0.1)] cursor-pointer group/hover max-h-[30px] flex items-center justify-center
                            duration-400 transition-colors hover:bg-primary"
            >
              <svg
                className=" xs:w-[12px] md:w-[14px]  xs:h-[12px] md:h-[14px]"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#999"
                  className="group-hover/hover:fill-white  duration-400 transition-colors"
                  d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm-16.559 2v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2h-24z"
                />
              </svg>
            </div>
            <div
              className="whitelist xs:p-[3px] md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[30px]
                           shadow-[0_5px_5px_0_rgba(0,0,0,0.1)] cursor-pointer group/hover max-h-[30px] flex items-center justify-center
                            duration-400 transition-colors hover:bg-primary "
            >
              <svg
                className=" xs:w-[12px] md:w-[14px]  xs:h-[12px] md:h-[14px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white  duration-400 transition-colors"
                  fill="#999"
                  d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                />
              </svg>
            </div>
            <div
              className="share xs:p-[3px] md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[30px]
                           shadow-[0_5px_5px_0_rgba(0,0,0,0.1)] cursor-pointer group/hover max-h-[30px] flex items-center justify-center
                            duration-400 transition-colors hover:bg-primary"
            >
              <svg
                className=" xs:w-[12px] md:w-[14px]  xs:h-[12px] md:h-[14px]"
                fill="#999"
                viewBox="0 0 310 310"
              >
                <g>
                  <path
                    className="group-hover/hover:fill-white  duration-400 transition-colors"
                    d="M165.9,125.903c0,2.761,2.238,5,5,5h51.15c2.762,0,5-2.239,5-5v-19.404
                                    c0-39.761-32.321-72.107-72.049-72.107c-39.732,0-72.055,32.347-72.055,72.107v95.274c0,6.009-4.887,10.898-10.893,10.898
                                    c-6.01,0-10.898-4.89-10.898-10.898v-42.338c0-2.761-2.238-5-5-5H5c-2.762,0-5,2.239-5,5v44.066
                                    c0,39.761,32.323,72.107,72.055,72.107c39.728,0,72.049-32.347,72.049-72.107v-97.002c0-6.005,4.889-10.891,10.898-10.891
                                    c6.01,0,10.898,4.886,10.898,10.891V125.903z"
                  />
                  <path
                    className="group-hover/hover:fill-white  duration-400 transition-colors"
                    d="M305,155.3h-51.152c-2.762,0-5,2.239-5,5v43.201c0,6.009-4.889,10.898-10.898,10.898
                                    c-6.01,0-10.898-4.89-10.898-10.898V160.3c0-2.761-2.238-5-5-5H170.9c-2.762,0-5,2.239-5,5v43.201
                                    c0,39.761,32.321,72.107,72.049,72.107c39.729,0,72.051-32.347,72.051-72.107V160.3C310,157.539,307.762,155.3,305,155.3z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className={`card shadow-header  ${
        className ?? ""
      } transition-all duration-400 hover:shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]`}
    >
      <a
        className="block relative h-0 pb-[100%] group/img overflow-hidden"
        href="#"
      >
        <img
          className="center-absolute z-0 object-cover transition-all duration-400 group-hover/img:scale-105"
          src={`${baseURL}${item}`}
          alt=""
        />
        <span
          className="absolute xs:top-4 md:top-7 left-5 xs:w-[30px] md:w-[40px] xs:h-[30px] md:h-[40px] border-dashed
                    border border-[#46d47f] rounded-[50%] xs:text-xs md:text-sm flex justify-center 
                    bg-white items-center z-50"
        >
          Sale
        </span>
        <button className="absolute z-50 xs:top-6 md:top-9 right-5 group/hover">
          <svg
            className="xs:w-[18px] md:w-[22px] xs:h-[18px] md:h-[22px] "
            viewBox="0 0 24 24"
          >
            <path
              className="group-hover/hover:fill-primary duration-300 transition-colors"
              fill="#555"
              d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
            ></path>
          </svg>
        </button>
      </a>
      <div className="text-center p-[20px_12px_14px]">
        <a
          href="#"
          className="font-osb text-sm uppercase text-black-555 
                    leading-[18px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors "
        >
          Soy Wax for Container Candles Soy Wax for Container Candles les Soy
          Wax for Container Candles
        </a>

        <p className="font-osb text-sm text-primary mt-[6px] xs:mb-[4px] md:mb-[10px] leading-[18px]">
          $150.00
        </p>
        <Button
          className={`md:px-[30.35px] md:py-[10px] xs:px-[17px] xs:py-[5px] md:text-sm
          xs:text-xs`}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
