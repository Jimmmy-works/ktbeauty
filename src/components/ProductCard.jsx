import { PATHS } from "@/contants/path";
import { formatPriceVND } from "@/utils/formatPrice";
import { Rate, Tooltip, Image, Space } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useWindowSize from "@/utils/windowResize";
import ImageCustom from "./ImageCustom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const StyleRate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
  max-height: 22px;
  .ant-rate {
    .ant-rate-star-second {
      display: flex;
      align-items: center;
      justify-items: center;
    }
    .ant-rate-star,
    .ant-rate-star-zero {
      margin-inline-end: 6px;
      font-size: 12px;
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
  const { width } = useWindowSize();
  if (isProductDetail) {
    return (
      <div
        className={`card cursor-pointer rounded-[10px] hover:shadow-card hover:transform-3d-card relative ${
          className ?? ""
        } transition-all duration-300  group/addtocart`}
      >
        <div className="relative rounded-tl-[10px] rounded-tr-[10px]  group/img overflow-hidden ">
          {discount > 0 ? (
            <StyleDiscount
              className="absolute top-3 left-[-3px] w-[50px] h-[16px] 
                    border border-red-200 text-xs tracking-wider  flex justify-center
                    bg-secondary items-center z-50 text-white font-om "
            >
              {`-${Math.round((discount / price) * 100)}%`}
            </StyleDiscount>
          ) : (
            ""
          )}
          <Link to={`${PATHS.SHOP.INDEX}/${item?._id}`} className="">
            <LazyLoadImage
              wrapperClassName="block relative h-0 pb-[100%] w-full"
              loading="lazy"
              key={_id}
              className={twMerge(`center-absolute z-10 object-cover 
                    h-full w-full `)}
              alt={image?.[0]}
              effect="blur"
              src={image?.[0]}
            />
          </Link>
          <div
            onClick={() => onAddToCart(item)}
            className="py-[5px] w-[100%] bg-[rgba(0,0,0,0.03)] absolute bottom-0 translate-y-[100%]
            flex gap-[16px] items-center justify-center  group-hover/addtocart:translate-y-0 overflow-hidden 
            transition-all duration-400 z-[100]"
          >
            <Tooltip placement="top" title="Thêm vào giỏ" color={`#999`}>
              <div
                className="cart xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                   cursor-pointer group/hover max-h-[38px] hover:bg-primary duration-300 transition-colors"
              >
                <svg className=" w-[13px] h-[13px]" viewBox="0 0 24 24">
                  <path
                    className="group-hover/hover:fill-white duration-300 transition-colors  fill-grey-999"
                    d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 8h-14v-4h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v4z"
                  />
                </svg>
              </div>
            </Tooltip>
            <Tooltip placement="top" color="#999" title="Yêu thích">
              <div
                className="whitelist xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                cursor-pointer group/hover hover:bg-primary duration-300 transition-colors max-h-[38px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[13px] h-[13px] fill-black-555"
                >
                  <path
                    className="group-hover/hover:fill-white duration-300 transition-colors fill-grey-999"
                    d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                  />
                </svg>
              </div>
            </Tooltip>
            <Tooltip placement="top" color="#999" title="Chia sẻ">
              <div
                className="share xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                 cursor-pointer group/hover max-h-[38px] hover:bg-primary duration-300 transition-colors"
              >
                <svg
                  className="group-hover/hover:fill-white duration-300 transition-colors h-[13px] w-[13px]"
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
        <div className="xs:p-[10px] md:p-[10px_14px] ">
          <Link
            to={`${PATHS.SHOP.INDEX}/${item?._id}`}
            className="text-center font-om text-15px capitalize text-black-555 
                    xs:leading-[16px] md:leading-[18px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors xs:min-h-[32px] md:min-h-[36px]"
          >
            {name || ""}
          </Link>

          <div className="flex justify-center items-center font-osb  xs:gap-[4px] md:gap-2 my-[6px]  ">
            <span className="text-sm  text-black leading-[18px]">
              {formatPriceVND(price - discount)}
            </span>
            {discount > 1000 && width >= 388 ? (
              <span className="line-through text-sm font-om text-black-be  leading-[18px]">
                {formatPriceVND(price)}
              </span>
            ) : (
              ""
            )}
          </div>
          <StyleRate>
            <Rate
              value={rating}
              disabled
              style={{ color: "#555", fontSize: "16px" }}
            />
            <p className="font-osr text-sm text-black-555">({rating})</p>
          </StyleRate>
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
      {discount > 1000 && (
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
        group overflow-hidden shine  transition-all duration-400 ${
          !imageloading ? "opacity-100" : "opacity-0"
        } `}
      >
        <div
          className="absolute w-full h-full top-1/2 left-1/2 bg-[rgba(0,0,0,0.1)]
             -translate-x-1/2 -translate-y-1/2 z-[9]"
        ></div>
        <LazyLoadImage
          loading="lazy"
          wrapperClassName={`block relative h-0 pb-[100%] 
                group overflow-hidden shine  transition-all duration-400`}
          className={twMerge(
            `center-absolute z-[10] object-cover  group-hover:scale-105  transition-all duration-400
             group-hover:opacity-100 group-hover:visible 
          `
          )}
          alt={name}
          effect="blur"
          src={image?.[1]}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/img/error.png";
          }}
        />
        {/* <img
          onLoad={onLoadingImage}
          className={twMerge(
            `center-absolute z-0 object-cover  group-hover:scale-105  transition-all duration-400
             group-hover:opacity-100 group-hover:visible  ${
               !imageloading ? "opacity-100" : "opacity-0"
             }
          `
          )}
          src={image?.length ? image?.[1] : "/assets/img/error.png"}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/img/error.png";
          }}
        /> */}
        {image?.length > 1 && (
          <img
            onLoad={onLoadingImage}
            className={twMerge(
              `center-absolute z-[10] object-cover  group-hover:scale-105  transition-all duration-400
               group-hover:opacity-0 group-hover:invisible  ${
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
        )}
        <button className="absolute z-[100] xs:top-6 md:top-9 right-5 group/hover">
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
                    md:leading-[18px] xs:leading-[16px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors  xs:min-h-[32px] md:min-h-[36px]"
        >
          {name}
        </Link>
        <div
          className={`font-osb text-sm items-center justify-center flex xs:gap-[4px]
           md:gap-2 text-primary mt-[6px] xs:mb-[4px] md:mb-[10px] 
          leading-[18px] `}
        >
          <span className={`text-15px text-primary`}>
            {formatPriceVND(price - discount)}
          </span>
          {discount > 1000 && width >= 388 ? (
            <span className="line-through text-[14px] text-black-555">
              {formatPriceVND(price)}
            </span>
          ) : (
            ""
          )}
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
