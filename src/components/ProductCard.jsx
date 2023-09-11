import React from "react";
import Button from "./Button";

const ProductCard = ({ item, baseURL, className }) => {
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
