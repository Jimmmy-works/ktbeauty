import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import Textbox from "@/components/Textbox";
import { PATHS } from "@/contants/path";
import useWindowSize from "@/utils/windowResize";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const EmptyWrapper = styled.div`
  margin-bottom: 12px;
  min-width: 200px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: ${({ refhegiht }) => {
    if (refhegiht !== 0) {
      return `${refhegiht - 22}px`;
    } else {
      return `300px`;
    }
  }};
  .ant-empty-image {
    width: ${({ windowx }) => {
      if (windowx > 1024) {
        return `200px`;
      } else if (windowx >= 768) {
        return `150px`;
      } else {
        return `120px`;
      }
    }} !important;
    height: ${({ windowx }) => {
      if (windowx > 1024) {
        return `200px`;
      } else if (windowx >= 768) {
        return `150px`;
      } else {
        return `120px`;
      }
    }} !important;
  }
`;
const ShowcaseProduct = ({
  onChangeCategoryTab,
  categories,
  imageloading,
  onImageLoading,
  dataShowcaseProduct,
  loadingShowcaseProduct,
  customCategoryTab,
}) => {
  const refLoading = useRef();
  const { width } = useWindowSize();
  return (
    <section className="scshowcaseproduct relative">
      <div className="container ">
        <Textbox title={`Sản phẩm`}>
          <div className="scshowcaseproduct__top ">
            <div className={`prev  `}>
              <svg className="" viewBox="0 0 24 24">
                <path
                  d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className={`next `}>
              <div className="rotate-180">
                <svg viewBox="0 0 24 24">
                  <path d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z" />
                </svg>
              </div>
            </div>
            <Swiper
              className="overflow-y-visible "
              wrapperClass="pb-0 "
              grabCursor={true}
              pagination={false}
              slidesPerView={"auto"}
              modules={[Navigation, Keyboard]}
              navigation={{
                prevEl: ".scshowcaseproduct__top .prev",
                nextEl: ".scshowcaseproduct__top .next",
              }}
            >
              {categories?.length > 0
                ? categories?.map((cate) => {
                    const { _id, name, label } = cate || {};
                    return (
                      <SwiperSlide
                        className={`w-fit animate-link-hover-1   ${
                          customCategoryTab?.name === name ? "active" : ""
                        }`}
                        style={{ width: "fit-content" }}
                        key={_id}
                      >
                        <a
                          onClick={() => onChangeCategoryTab(cate)}
                          className={`${
                            customCategoryTab?.name === name
                              ? "text-primary"
                              : ""
                          }
                               `}
                        >
                          {label}
                        </a>
                      </SwiperSlide>
                    );
                  })
                : ""}
            </Swiper>
          </div>
        </Textbox>
        <div className="scshowcaseproduct__bottom">
          <div className="scshowcaseproduct__bottom-list" ref={refLoading}>
            {dataShowcaseProduct?.data?.data?.length > 0 ? (
              <Swiper
                modules={[Navigation, Keyboard]}
                keyboard={{
                  enabled: true,
                }}
                breakpoints={{
                  360: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  1024: {
                    spaceBetween: 15,
                    slidesPerView: 5,
                  },
                }}
                navigation={{
                  enabled: true,
                  prevEl: ".scshowcaseproduct__bottom .prev",
                  nextEl: ".scshowcaseproduct__bottom .next",
                }}
                grabCursor={true}
                pagination={false}
              >
                {dataShowcaseProduct?.data?.data.map((item, index) => {
                  return (
                    <SwiperSlide key={`${item?._id}`}>
                      {!loadingShowcaseProduct ? (
                        <ProductCard
                          className={`item`}
                          item={item}
                          onLoadingImage={onImageLoading}
                          imageloading={imageloading}
                        />
                      ) : (
                        <div
                          className="xs:min-h-[300px] md:min-h-[350px]  xs:p-[20px_14px_14px] md:p-[30px_30px_20px] lg:p-[40px_40px_26px]
                           h-full flex justify-center items-center"
                        >
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{
                                  color: "#555",
                                  fontSize: 24,
                                }}
                                spin
                              />
                            }
                            size="default"
                          />
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : !loadingShowcaseProduct ? (
              <EmptyWrapper
                windowx={width}
                refhegiht={refLoading?.current?.clientHeight}
              >
                <Empty description={false} />
              </EmptyWrapper>
            ) : (
              <LoadingSkeleton
                isClassName={`lg:w-1/4 min-576px:w-1/3 xs:w-1/2`}
                isArray={1}
                isLoading={loadingShowcaseProduct}
                isParagraph={width >= 768 ? 3 : 2}
              />
            )}
            <div
              className={`prev ${
                dataShowcaseProduct?.data?.data?.length > 4 ? "block" : "hidden"
              }`}
            >
              <div className="rotate-180 prev__wrapper">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
            <div
              className={`next ${
                dataShowcaseProduct?.data?.data?.length > 4 ? "block" : "hidden"
              }`}
            >
              <div className="next__wrapper">
                <svg viewBox="0 0 24 24">
                  <path
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit mx-auto md:mt-[10px]">
          <Link
            to={`${PATHS.SHOP.INDEX}`}
            className="btn-flip"
            data-back="Đến shop"
            data-front="Xem tất cả"
          ></Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseProduct;
