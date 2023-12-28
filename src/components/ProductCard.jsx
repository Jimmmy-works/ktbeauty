import { LOCAL_STORAGE } from "@/contants/localStorage";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { updateCart } from "@/store/reducer/cartReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import useWindowSize from "@/utils/windowResize";
import { Rate, Tooltip, message } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { useMainContext } from "./MainContext";
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
    bottom: -5px;
    border-top: 5px solid #ff887b;
    border-left: 5px solid transparent;
  }
`;

const ProductCard = ({
  item,
  className,
  isProductDetail = false,
  imageloading,
  onLoadingImage,
}) => {
  const { _id, name, price, rating, image, discount, countInStock, createdAt } =
    item || {};
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { updateStatusUpdateCart, cartInfo } = useSelector(
    (state) => state.cart
  );
  const { onAuthenModal } = useMainContext();
  const onAddToCart = async () => {
    const payload = item;
    const _token = localStorage.getItem(LOCAL_STORAGE.token);
    try {
      if (_token) {
        if (payload?._id && updateStatusUpdateCart !== THUNK_STATUS.pending) {
          let cartPayload = {};
          const matchIndex = cartInfo?.products?.findIndex(
            (productMatched) => productMatched?.product_id === payload?._id
          );
          let newProductPayload = cartInfo?.products?.map((product) => product);
          if (cartInfo?._id) {
            if (matchIndex > -1) {
              if (newProductPayload[matchIndex]?.quantity >= 20) {
                return message.error(
                  `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
                );
              } else {
                newProductPayload[matchIndex] = {
                  ...newProductPayload[matchIndex],
                  quantity: newProductPayload[matchIndex]?.quantity + 1,
                };
                message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
              }
            } else {
              newProductPayload.push({
                ...payload,
                quantity: 1,
                product_id: payload?._id,
              });
              message.success(`+1 ${payload?.name}`);
            }
            cartPayload = {
              ...cartInfo,
              products: newProductPayload,
            };
          } else {
            cartPayload = {
              ...cartInfo,
              products: newProductPayload,
            };
            if (matchIndex > -1) {
              if (newProductPayload[matchIndex]?.quantity >= 20) {
                return message.error(
                  `Không thể thêm > 20sp, vui lòng liên hệ shop để mua số lượng lớn`
                );
              } else {
                newProductPayload[matchIndex] = {
                  ...newProductPayload[matchIndex],
                  quantity: newProductPayload[matchIndex]?.quantity + 1,
                };
                message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
              }
            } else {
              newProductPayload.push({
                ...payload,
                quantity: 1,
                product_id: payload?._id,
              });
              message.success(`+1 ${newProductPayload[matchIndex]?.name}`);
            }
          }
          dispatch(updateCart(cartPayload));
        }
      } else {
        onAuthenModal("login");
        return message.error(`Xin vui lòng đăng nhập để thêm sản phẩm`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
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
              className="absolute top-4 left-[-3px] w-[50px] h-[16px] 
                    border border-red-200 text-xs tracking-wider  flex justify-center
                    bg-primary items-center z-50 text-white font-om "
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
            onClick={onAddToCart}
            className="py-[6px] w-[100%] bg-[rgba(0,0,0,0.03)] absolute bottom-0 translate-y-[100%]
            flex gap-[16px] items-center justify-center  group-hover/addtocart:translate-y-0 overflow-hidden 
            transition-all duration-400 z-[100]"
          >
            <Tooltip placement="top" title="Thêm vào giỏ" color={`#333`}>
              <div
                className="cart xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                   cursor-pointer group/hover max-h-[38px] hover:bg-black-333 duration-300 transition-colors"
              >
                <svg className=" w-[13px] h-[13px]" viewBox="0 0 24 24">
                  <path
                    className="group-hover/hover:fill-white duration-300 transition-colors  fill-grey-999"
                    d="M16 6v-2c0-2.209-1.791-4-4-4s-4 1.791-4 4v2h-5v18h18v-18h-5zm-7-2c0-1.654 1.346-3 3-3s3 1.346 3 3v2h-6v-2zm10 8h-14v-4h3v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h3v4z"
                  />
                </svg>
              </div>
            </Tooltip>
            <Tooltip placement="top" color="#333" title="Yêu thích">
              <div
                className="whitelist xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                cursor-pointer group/hover hover:bg-black-333 duration-300 transition-colors max-h-[38px]"
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
            <Tooltip placement="top" color="#333" title="Chia sẻ">
              <div
                className="share xs:p-[6px] md:p-[6px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                                 cursor-pointer group/hover max-h-[38px] hover:bg-black-333 duration-300 transition-colors"
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
            className="text-center font-ossb text-15px capitalize text-black-555 
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
      className={`card shadow-header rounded-[10px]   ${
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
        className={`block relative h-0 pb-[100%] rounded-tl-[10px] rounded-tr-[10px]
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
                group overflow-hidden shine  transition-all duration-400 `}
          className={twMerge(
            ` center-absolute z-[10] object-cover w-full h-full  group-hover:scale-105  transition-all duration-400
             group-hover:opacity-100 group-hover:visible 
          `
          )}
          alt={name}
          effect="blur"
          src={image?.[0]}
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

        {image?.length >= 1 && (
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
      <div className="text-center p-[16px_12px_14px]">
        <Link
          to={`${PATHS.SHOP.INDEX}/${item?._id}`}
          className="font-ossb text-sm capitalize text-black-555 
                    md:leading-[18px] xs:leading-[16px] truncate whitespace-normal line-clamp-2 hover:text-primary
                    duration-400 transition-colors  xs:min-h-[32px] md:min-h-[36px]"
        >
          {name}
        </Link>
        <div className="flex justify-center items-center font-osb  xs:gap-[4px] md:gap-2 mt-[8px]  ">
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
        <div
          className={`relative cursor-pointer pt-[8px] font-ossb text-sm  capitalize flex 
            items-center justify-center gap-[6px] group hover:text-primary duration-300 transition-all ${
              countInStock === 0
                ? "pointer-events-none text-black-be"
                : "pointer-events-auto text-black-555"
            } group underline`}
          onClick={onAddToCart}
        >
          {countInStock !== 0 ? (
            <div className="text-md ">
              <svg className="h-[14px] w-[14px]" viewBox="0 0 491.00 491.00">
                <path
                  className="duration-300 group-hover:fill-primary fill-black-555"
                  d="M484.058,112.28c-7.247-10.404-19.144-16.614-31.816-16.614h-94.624c13.291,2.775,24.603,11.714,29.943,24.615 c1.063,2.569,1.761,5.212,2.283,7.869h62.396c2.063,0,3.997,1.015,5.155,2.67c1.175,1.698,1.444,3.862,0.73,5.791 l-44.992,121.107c-0.905,2.451-3.267,4.102-5.887,4.102H154.939L114.734,90.314c-5.01-21.286-23.772-36.153-45.631-36.153H24.361 C10.912,54.161,0,65.065,0,78.522s10.912,24.362,24.361,24.362h43.286l54.131,230.919c4.914,20.864,23.058,35.479,44.36,36.042 c-12.532,9.103-20.764,23.765-20.764,40.436c0,27.662,22.429,50.078,50.09,50.078c27.662,0,50.072-22.416,50.072-50.078 c0-16.605-8.17-31.212-20.623-40.326h93.421c-12.454,9.114-20.634,23.721-20.634,40.326c0,27.662,22.428,50.078,50.083,50.078 c27.646,0,50.072-22.416,50.072-50.078c0-16.605-8.187-31.212-20.634-40.326h22.714c13.448,0,24.361-10.901,24.361-24.361 c0-13.457-10.913-24.361-24.361-24.361h-231.07l-6.313-26.931h244.693c16.113,0,30.703-10.143,36.338-25.256l44.994-121.118 C492.986,136.046,491.305,122.732,484.058,112.28z"
                />
                <path
                  className="duration-300 group-hover:fill-primary fill-black-555"
                  d="M275.701,209.63c1.776,1.785,4.109,2.673,6.437,2.673c2.334,0,4.667-0.888,6.426-2.673l67.007-66.987 c2.621-2.609,3.396-6.525,1.986-9.935c-0.923-2.221-3.986-5.64-8.422-5.64c-6.472,0-25.886,0-25.886,0V95.665v-55.89 c-0.017-5.035-4.094-9.137-9.138-9.137h-63.964c-5.044,0-9.12,4.102-9.12,9.12v55.908v31.412c0,0-19.408,0-25.878,0 c-4.144,0-7.473,3.332-8.424,5.622c-1.41,3.41-0.635,7.334,1.962,9.943L275.701,209.63z"
                />
              </svg>
            </div>
          ) : (
            ""
          )}
          <div>{countInStock === 0 ? "Hết hàng" : " Thêm vào giỏ hàng"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
