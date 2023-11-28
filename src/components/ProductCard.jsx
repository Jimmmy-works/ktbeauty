import React, { useState } from "react";
import Button from "./Button";
import { Rate, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/path";
import styled from "styled-components";
import { formatPriceVND } from "@/utils/formatPrice";
import LoadingSkeleton from "./Loading/LoadingSkeleton";
import { twMerge } from "tailwind-merge";
import { dateVN, localeVN, timeVN } from "@/utils/timeVN";
const StyleRate = styled.div`
  line-height: 20px;
  height: auto;
  margin: 4px 0;
  .ant-rate {
    line-height: 20px;

    .ant-rate-star,
    .ant-rate-star-zero {
      margin-inline-end: 3px;
      font-size: 16px;
    }
  }
`;
const StyleDiscount = styled.div`
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    border-top: 4px solid #c95e52;
    border-left: 4px solid transparent;
  }
`;

const ProductCard = ({
  item,
  className,
  isProductDetail = false,
  imageloading,
  onLoadingImage,
  onAddToCart,
}) => {
  const { _id, name, price, rating, image, discount, countInStock, createdAt } =
    item || {};

  if (isProductDetail) {
    return (
      <div
        className={`card relative ${
          className ?? ""
        } transition-all duration-400   `}
      >
        {discount > 0 && (
          <StyleDiscount
            className="absolute top-3 left-[-3px] w-[50px] h-[16px] 
                    border border-red-200 text-xs tracking-wider  flex justify-center
                    bg-primary items-center z-50 text-white font-om "
          >
            {`-${Math.round((discount / price) * 100)}%`}
          </StyleDiscount>
        )}
        <div className="relative group/img overflow-hidden  group/addtocart ">
          <Link
            to={`${PATHS.SHOP.INDEX}/${item?._id}`}
            className="block   relative  h-0 pb-[100%] "
          >
            <img
              onLoad={onLoadingImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/img/error.png";
              }}
              className={twMerge(`center-absolute z-0 object-cover transition-all duration-400 group-hover/img:scale-105  
                h-full w-full ${!imageloading ? "opacity-100" : "opacity-0"}`)}
              src={image?.length ? image?.[0] : "/assets/img/error.png"}
              alt={name}
            />

            {/* {discount > 0 && (
              <span
                className="absolute xs:top-4 md:top-3 left-3 xs:w-[30px] md:w-[40px] xs:h-[30px] md:h-[40px] border-dashed
                    border border-red-200 rounded-[50%] text-xs tracking-wider  flex justify-center
                    bg-primary items-center z-50 text-white font-om"
              >
                {`-${Math.round((discount / price) * 100)}%`}
              </span>
            )} */}
          </Link>

          <div
            onClick={() => onAddToCart(item)}
            className="h-[50px] w-[100%] bg-[rgba(0,0,0,0.03)] absolute bottom-0 translate-y-[100%]
            flex gap-[16px] items-center justify-center  group-hover/addtocart:translate-y-0 overflow-hidden 
            transition-all duration-400 z-[100]"
          >
            <Tooltip placement="top" title="Thêm vào giỏ" color={`#999`}>
              <div
                className="cart  md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                   cursor-pointer group/hover max-h-[38px]"
              >
                <svg className=" w-[16px] h-[16px]" viewBox="0 0 24 24">
                  <path
                    className="group-hover/hover:fill-primary duration-400 transition-colors  fill-grey-999"
                    d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 8h-14v-4h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v4z"
                  />
                </svg>
              </div>
            </Tooltip>
            <Tooltip placement="top" color="#999" title="Yêu thích">
              <div
                className="whitelist  md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                cursor-pointer group/hover max-h-[38px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="  w-[16px] h-[16px] fill-black-555"
                >
                  <path
                    className="group-hover/hover:fill-primary duration-400 transition-colors fill-grey-999"
                    d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                  />
                </svg>
              </div>
            </Tooltip>
            <Tooltip placement="top" color="#999" title="Chia sẻ">
              <div
                className="share md:p-[8px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                 cursor-pointer group/hover max-h-[38px]"
              >
                <svg
                  className="group-hover/hover:fill-primary duration-400 transition-colors h-[16px]
                                 w-[16px]"
                  fill="#999"
                  viewBox="0 0 310 310"
                >
                  <g>
                    <path
                      d="M165.9,125.903c0,2.761,2.238,5,5,5h51.15c2.762,0,5-2.239,5-5v-19.404
                                        c0-39.761-32.321-72.107-72.049-72.107c-39.732,0-72.055,32.347-72.055,72.107v95.274c0,6.009-4.887,10.898-10.893,10.898
                                        c-6.01,0-10.898-4.89-10.898-10.898v-42.338c0-2.761-2.238-5-5-5H5c-2.762,0-5,2.239-5,5v44.066
                                        c0,39.761,32.323,72.107,72.055,72.107c39.728,0,72.049-32.347,72.049-72.107v-97.002c0-6.005,4.889-10.891,10.898-10.891
                                        c6.01,0,10.898,4.886,10.898,10.891V125.903z"
                    />
                    <path
                      d="M305,155.3h-51.152c-2.762,0-5,2.239-5,5v43.201c0,6.009-4.889,10.898-10.898,10.898
                                        c-6.01,0-10.898-4.89-10.898-10.898V160.3c0-2.761-2.238-5-5-5H170.9c-2.762,0-5,2.239-5,5v43.201
                                        c0,39.761,32.321,72.107,72.049,72.107c39.729,0,72.051-32.347,72.051-72.107V160.3C310,157.539,307.762,155.3,305,155.3z"
                    />
                  </g>
                </svg>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="pt-[20px]">
          <Link
            to={`${PATHS.SHOP.INDEX}/${item?._id}`}
            className="font-osb text-[15px] uppercase text-black-555 
                    leading-[18px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors min-h-[36px]"
          >
            {name || ""}
          </Link>
          <StyleRate>
            <Rate />
          </StyleRate>
          <div
            className=" text-sm text-primary md:items-center font-osb flex md:flex-row xs:flex-col xs:gap-[4px]
           md:gap-2 mt-[8px] leading-[18px] "
          >
            <span className=" text-[15px] text-primary ">
              {formatPriceVND(price - discount)}
            </span>
            {discount > 0 ? (
              <span className="line-through text-black-555">
                {formatPriceVND(price)}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`card shadow-header   ${
        className ?? ""
      } transition-all duration-400`}
    >
      {discount > 0 && (
        <StyleDiscount
          className="absolute top-3 left-[-3px] w-[50px] h-[16px] 
                    border border-red-200 text-xs tracking-wider  flex justify-center
                    bg-primary items-center z-50 text-white font-om "
        >
          {`-${Math.round((discount / price) * 100)}%`}
        </StyleDiscount>
      )}
      <Link
        to={`${PATHS.SHOP.INDEX}/${item?._id}`}
        className={`block relative h-0 pb-[100%] 
        group overflow-hidden shine  transition-all duration-400`}
      >
        <img
          onLoad={onLoadingImage}
          className={twMerge(
            `center-absolute z-0 object-cover  group-hover:scale-105  transition-all duration-400
             group-hover:opacity-100 group-hover:visible  ${
               !imageloading ? "opacity-100" : "opacity-0"
             }
          `
          )}
          src={image?.length ? image?.[0] : "/assets/img/error.png"}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/img/error.png";
          }}
        />
        {image?.length > 1 && (
          <img
            onLoad={onLoadingImage}
            className={twMerge(
              `center-absolute z-0 object-cover  group-hover:scale-105  transition-all duration-400
               group-hover:opacity-0 group-hover:invisible  ${
                 !imageloading ? "opacity-100" : "opacity-0"
               }
            `
            )}
            src={image?.length ? image?.[1] : "/assets/img/error.png"}
            alt=""
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/img/error.png";
            }}
          />
        )}

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
      </Link>
      <div className="text-center p-[20px_12px_14px]">
        <Link
          to={`${PATHS.SHOP.INDEX}/${item?._id}`}
          className="font-osb text-sm uppercase text-black-555 
                    leading-[18px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors  min-h-[36px]"
        >
          {name}
        </Link>
        <div
          className="font-osb text-sm items-center justify-center flex md:flex-row xs:flex-col xs:gap-[4px]
           md:gap-2
         text-primary mt-[6px] xs:mb-[4px] md:mb-[10px] leading-[18px] "
        >
          <span className=" text-[15px] text-primary ">
            {formatPriceVND(price - discount)}
          </span>
          <span className="line-through text-black-555">
            {formatPriceVND(price)}
          </span>
        </div>

        <Button
          onClick={() => onAddToCart(item)}
          outStock={countInStock === 0 && true}
          className={`md:px-[30.35px] md:py-[10px] xs:px-[17px] xs:py-[5px] md:text-sm
          xs:text-xs`}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
