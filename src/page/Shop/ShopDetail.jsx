import BreadCrumb from "@/components/BreadCrumb";
import ImageZoom from "@/components/ImageZoom";
import Review from "@/components/Review";
import { Tab, Tabs } from "@/components/Tab/Tab";
import { PATHS } from "@/contants/path";
import { Rate, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Keyboard, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import useShop from "./useShop";
import { formatPriceVND } from "@/utils/formatPrice";
import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import LoadingPage from "@/components/Loading/LoadingPage";
import LoadingSpin from "@/components/Loading/LoadingSpin";
const StyleRate = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 17px 0 12px 0;
  .ant-rate {
    height: 100%;
    display: flex;
    align-items: center;
    .ant-rate-star,
    .ant-rate-star-zero {
      margin-inline-end: 3px;
      font-size: 16px;
      display: block;
    }
  }
`;
const ShopDetail = () => {
  const { productDetail, statusGetProductDetail } = useShop();
  const {
    _id,
    name,
    image,
    rating,
    price,
    description,
    countInStock,
    discount,
    slug,
    category_id,
  } = productDetail || {};
  const {} = useShop();
  const baseURL = `/assets/img/`;
  const max = 100;
  const min = 0;
  const [currentImg, setCurrentImg] = useState();
  const [numbInput, setNumbInput] = useState(1);
  const onIncrease = () => {
    const value = modifyValue(Number(numbInput) + 1);
    setNumbInput(value);
  };
  const onDecrease = () => {
    if (numbInput < min) {
      return setNumbInput(min);
    }
    const value = modifyValue(Number(numbInput) - 1);
    setNumbInput(value);
  };
  const onChangeInput = (e) => {
    setNumbInput(modifyValue(e.target.value));
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
  const [imgLoading, setImgLoading] = useState(true);
  const handleImageLoading = () => {
    setImgLoading(false);
  };
  return (
    <main className="main-wrapper shoppage">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item>
          <Link to={`${PATHS.SHOP.INDEX}`}>Shop</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>{name}</BreadCrumb.Item>
      </BreadCrumb>

      <div className="container ">
        {statusGetProductDetail === THUNK_STATUS.fulfilled ? (
          <>
            <div className="flex md:flex-row xs:flex-col xs:gap-[60px] md:gap-[14px] my-[30px]">
              <div className="shopapge__left xs:w-full md:w-1/2 ">
                <div className="shoppage__left-wrapper flex gap-[10px] ">
                  <div className=" h-fit w-fit relative ">
                    <div
                      className="up cursor-pointer absolute z-10 top-[calc(100%+20px)] left-[8px]  p-[5.5px] group/hover
                   bg-white rounded-[50%] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] duration-300 transition-shadow"
                    >
                      <div className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors  rotate-[-90deg]">
                        <svg viewBox="0 0 24 24" className="h-[10px] w-[10px]">
                          <path
                            fill="#fff"
                            d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="down cursor-pointer absolute z-10 top-[calc(100%+20px)] right-[8px]  p-[5.5px] group/hover
                   bg-white rounded-[50%] hover:shadow-[0_0px_10px_0_rgba(0,0,0,0.2)] duration-300 transition-shadow"
                    >
                      <div className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors rotate-[90deg]">
                        <svg viewBox="0 0 24 24" className="h-[10px] w-[10px]">
                          <path
                            fill="#fff"
                            d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <Swiper
                      grabCursor={true}
                      modules={[Navigation, Keyboard]}
                      keyboard={{ enabled: true }}
                      className="shoppage-swiper"
                      spaceBetween={10}
                      direction={"vertical"}
                      slidesPerView={"auto"}
                      navigation={{
                        prevEl: ".shoppage .up",
                        nextEl: ".shoppage .down",
                      }}
                    >
                      {image?.length &&
                        image?.map((img, index) => {
                          return (
                            <SwiperSlide
                              key={img}
                              className="shoppage-swiper-item"
                            >
                              <a
                                className={`item  ${
                                  currentImg === img ? "active" : ""
                                }`}
                                onClick={() => {
                                  setCurrentImg(img);
                                }}
                              >
                                <img
                                  onLoad={handleImageLoading}
                                  className={`h-full w-full object-cover duration-700 transition-opacity ${
                                    !imgLoading ? "opacity-100" : "opacity-0"
                                  }`}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/img/error.png";
                                  }}
                                  src={img || `/assets/img/error.png`}
                                  alt=""
                                />
                                {!imgLoading && (
                                  <LoadingSpin isloading={imgLoading} />
                                )}
                              </a>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                  <div className="w-full h-full ">
                    {image?.length && (
                      <a className="block relative pb-[100%] h-0 overflow-hidden group/zoom">
                        {!imgLoading && (
                          <LoadingSpin isloading={imgLoading} size={40} />
                        )}
                        <ImageZoom
                          classNameImg={`duration-700 transition-opacity ${
                            !imgLoading ? "opacity-100" : "opacity-0"
                          }`}
                          magnifierHeight="250"
                          magnifierWidth="250"
                          src={`${currentImg || image?.[0]}`}
                        />
                      </a>
                    )}
                    <div className="social flex justify-center items-center gap-[10px] mt-[34px]">
                      <div
                        className="social__fb p-[11px] rounded-[50%] bg-[#4F649F]  hover:scale-[1.05]
                    duration-300 transition-transform cursor-pointer"
                      >
                        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                          <path
                            className="fill-white "
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                          />
                        </svg>
                      </div>
                      <div
                        className="social__twitter p-[11px] rounded-[50%] bg-[#58C5E5] hover:scale-[1.05]
                    duration-300 transition-transform cursor-pointer"
                      >
                        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                          <path
                            className="fill-white"
                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                          />
                        </svg>
                      </div>
                      <div
                        className="social__google p-[11px] rounded-[50%] bg-[#DB4437] hover:scale-[1.05]
                    duration-300 transition-transform cursor-pointer"
                      >
                        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                          <path
                            className="fill-white"
                            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                          />
                        </svg>
                      </div>
                      <div
                        className="social__youtube p-[11px] rounded-[50%] bg-[#BD081C] hover:scale-[1.05]
                    duration-300 transition-transform cursor-pointer"
                      >
                        <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                          <path
                            className="fill-white"
                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shoppage__right xs:w-full md:w-1/2 md:pl-[36px]">
                <h2 className="shoppage__right-title font-osr text-lg text-black-555">
                  <span>{name}</span>
                </h2>

                <StyleRate>
                  {rating && <Rate disabled defaultValue={Number(rating)} />}
                  <p className="shoppage__right-rating text-sm text-black-555 font-osr "></p>
                </StyleRate>
                <p className="shoppage__right-price text-[15px] text-primary font-osb flex gap-3 items-center">
                  <span className="text-md">
                    {formatPriceVND(price - discount)}
                  </span>
                  <span className="line-through text-black-555">
                    {formatPriceVND(price)}
                  </span>
                </p>
                <h3 className="shoppage__right-desc font-osb text-md text-black-555 my-[18px]">
                  Product Features
                </h3>
                <div className="shoppage__right-list">
                  <h4 className="heading font-osr text-[15px] text-black-555 leading-[24px]">
                    {description?.descTitle}
                  </h4>
                  <ul>
                    {description?.descSub?.length &&
                      description?.descSub?.map((sub) => {
                        return (
                          <li
                            className="item font-osr text-[15px] text-black-555 leading-[24px] relative pl-[14px] mt-[5px]
                            before:h-[5px] before:w-[5px] before:block before:rounded-[50%] before:bg-black-333 
                            before:top-1/2 before:left-0 before:-translate-y-1/2 before:absolute"
                          >
                            {sub}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="shoppage__right-button  flex items-center  gap-2 mt-[30px]">
                  <div
                    className="input flex items-center border border-solid border-[#ececec] rounded-md
                h-[60px]"
                  >
                    <div
                      onClick={onDecrease}
                      className="px-[22px] cursor-pointer"
                    >
                      <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24">
                        <path
                          className="fill-black-555"
                          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                        />
                      </svg>
                    </div>
                    <input
                      className="w-[30px] text-[15px] tracking-wider text-center text-black-555 font-osb"
                      value={numbInput}
                      type="number"
                      min={min}
                      max={max}
                      onChange={onChangeInput}
                    />
                    <div
                      onClick={onIncrease}
                      className="px-[22px] cursor-pointer"
                    >
                      <svg
                        className="h-[10px] w-[10px] rotate-[180deg]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-black-555"
                          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    className="font-osb text-white text-[15px] flex items-center border 
                  border-solid border-[#ececec] rounded-md bg-black-555 px-[27.5px]
                h-[60px] duration-400 transition-colors hover:bg-primary"
                  >
                    Add to cart
                  </button>
                </div>
                <div className="shoppage__right-social flex gap-[10px] items-center mt-[32px]">
                  <div
                    className="whitelist  p-[14px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                        flex items-center justify-center    cursor-pointer group/hover max-h-[38px] 
                        hover:bg-primary duration-400 transition-colors border-solid shadow-header"
                  >
                    <div>
                      <svg
                        viewBox="0 0 24 24"
                        className="  w-[16px] h-[16px] fill-black-555"
                      >
                        <path
                          className="group-hover/hover:fill-white duration-400 transition-colors fill-grey-999"
                          d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="share p-[14px] bg-white border-[1px] rounded-[50%] border-[#ececec]  max-w-[38px]
                       flex items-center justify-center    cursor-pointer group/hover max-h-[38px]
                        hover:bg-primary duration-400 transition-colors border-solid shadow-header"
                  >
                    <div>
                      <svg
                        className="group-hover/hover:fill-white duration-400 transition-colors h-[16px]
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
                          ></path>
                          <path
                            d="M305,155.3h-51.152c-2.762,0-5,2.239-5,5v43.201c0,6.009-4.889,10.898-10.898,10.898
                                              c-6.01,0-10.898-4.89-10.898-10.898V160.3c0-2.761-2.238-5-5-5H170.9c-2.762,0-5,2.239-5,5v43.201
                                              c0,39.761,32.321,72.107,72.049,72.107c39.729,0,72.051-32.347,72.051-72.107V160.3C310,157.539,307.762,155.3,305,155.3z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="shoppage__right-category border-t-[1px] border-solid border-[#ececec] py-[32px] mt-[32px]">
                  <div className="category flex items-center gap-2 flex-wrap">
                    {category_id?._id && (
                      <>
                        <p className="font-osr text-black-555 text-[15px] capitalize">
                          Categories:
                        </p>
                        <a
                          href=""
                          className="duration-300 transition-colors hover:text-primary font-osr text-grey-999 text-sm capitalize"
                        >
                          {category_id?.name || ""}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="tags flex items-center gap-2 mt-[14px] flex-wrap">
                    <p className="font-osr text-black-555 text-[15px] capitalize">
                      tags:
                    </p>
                    <a
                      href=""
                      className="duration-300 transition-colors hover:text-primary font-osr text-grey-999 text-sm capitalize "
                    >
                      Eyes Shadow
                    </a>
                    <a
                      href=""
                      className="duration-300 transition-colors hover:text-primary font-osr text-grey-999 text-sm capitalize"
                    >
                      Mascara
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Tabs>
              <Tab label="Description">
                <div className="description">
                  <h3 className="font-osr text-black-555 text-[15px] leading-[24px] ">
                    {description?.descIntro}
                  </h3>
                  <div className="mt-[30px] flex flex-col gap-5">
                    <div className="flex gap-6">
                      <div className="mt-[8px] ">
                        <svg className="w-[34px] h-[34px]" viewBox="0 0 24 24">
                          <path
                            fill="#555"
                            d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                          />
                        </svg>
                      </div>
                      <p className="font-osr text-grey-999 text-[15px] leading-[24px] tracking-wider ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur nisi fugit esse corrupti qui obcaecati,
                        reprehenderit aliquam sunt labore, quae nam repellendus
                        blanditiis laborum? Dolore sequi facere quas
                        necessitatibus quisquam!
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="mt-[8px] ">
                        <svg className="w-[34px] h-[34px]" viewBox="0 0 24 24">
                          <path
                            fill="#555"
                            d="M12.408 13.032c1.158-.062 2.854-.388 4.18-1.128.962-1.478 1.598-2.684 2.224-4-.86.064-1.852-.009-2.736-.257 1.068-.183 2.408-.565 3.422-1.216 1.255-1.784 2.185-4.659 2.502-6.429-2.874-.048-5.566.89-7.386 2.064-.614.7-1.146 2.389-1.272 3.283-.277-.646-.479-1.68-.242-2.542-1.458.767-2.733 1.643-4.177 2.86-.72 1.528-.834 3.29-.768 4.276-.391-.553-.915-1.63-.842-2.809-2.59 2.504-4.377 5.784-2.682 9.324 1.879-1.941 4.039-3.783 5.354-4.639-3.036 3.474-5.866 8.047-7.985 12.181l2.504-.786c1.084-1.979 2.059-3.684 2.933-4.905 3.229.423 6.096-2.168 8.028-4.795-.77.19-2.246-.058-3.057-.482z"
                          />
                        </svg>
                      </div>
                      <p className="font-osr text-grey-999 text-[15px] leading-[24px] tracking-wider ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequuntur nisi fugit esse corrupti qui obcaecati,
                        reprehenderit aliquam sunt labore, quae nam repellendus
                        blanditiis laborum? Dolore sequi facere quas
                        necessitatibus quisquam!
                      </p>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab label={`Reviews ${`(11)`}`}>
                <Review />
              </Tab>
            </Tabs>
          </>
        ) : (
          <LoadingSkeleton
            isData={image}
            isClassName={"mt-[20px]"}
            isArray={1}
            isParagraph={5}
            isImageStyle={{ height: "450px" }}
            isLoading={statusGetProductDetail}
          />
        )}
      </div>
    </main>
  );
};

export default ShopDetail;
