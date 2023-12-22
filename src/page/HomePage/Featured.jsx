import LoadingSkeleton from "@/components/Loading/LoadingSkeleton";
import ProductCard from "@/components/ProductCard";
import { FEATURED_OPTIONS } from "@/contants/general";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { PATHS } from "@/contants/path";
const Featured = ({
  onChangeFeaturedTab,
  featuerdTab,
  products,
  statusGetProduct,
  imageloading,
  onImageLoading,
  onAddToCart,
  dataFeatured,
  loadingFeatured,
}) => {
  return (
    <section
      className="scfeatured 
    "
    >
      <div className="container">
        <div className="scfeatured__tabs  ">
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.FEATURED ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.FEATURED)}
          >
            Dành cho bạn
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.TOP_SOLD ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.TOP_SOLD)}
          >
            Bán chạy nhất
          </div>
          <div
            className={`scfeatured__tabs-item ${
              featuerdTab === FEATURED_OPTIONS.TOP_SALE ? "active" : ""
            }`}
            onClick={() => onChangeFeaturedTab(FEATURED_OPTIONS.TOP_SALE)}
          >
            Ưu đãi
          </div>
        </div>
        <div className="scfeatured__content">
          <div className={`scfeatured__content-list`}>
            <div className="prev">
              <div
                className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors rotate-180
              group-hover/hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="md:w-[14px] md:h-[14px] xs:h-[10px] xs:w-[10px]"
                >
                  <path
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary fill-white duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="next">
              <div
                className="p-[2px] rounded-[50%] bg-primary duration-400 transition-colors 
              group-hover/hover:bg-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="md:w-[14px] md:h-[14px] xs:h-[10px] xs:w-[10px]"
                >
                  <path
                    d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z"
                    className="group-hover/hover:fill-primary fill-white duration-400 transition-colors"
                  ></path>
                </svg>
              </div>
            </div>
            {dataFeatured?.data?.data?.length > 0 ? (
              <Swiper
                className="overflow-y-visible"
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
                  prevEl: ".scfeatured .prev",
                  nextEl: ".scfeatured .next",
                }}
                freeMode
                grabCursor={true}
                pagination={false}
                loop={true}
              >
                {dataFeatured?.data?.data.map((item, index) => {
                  return (
                    <SwiperSlide key={`${item?._id}`}>
                      {!loadingFeatured ? (
                        <ProductCard
                          onAddToCart={onAddToCart}
                          onLoadingImage={onImageLoading}
                          imageloading={imageloading}
                          isProductDetail
                          className={`item`}
                          item={item}
                        />
                      ) : (
                        <div
                          className="xs:min-h-[250px] md:min-h-[336px]  xs:p-[20px_14px_14px] md:p-[30px_30px_20px] lg:p-[40px_40px_26px]
                           h-full flex justify-center items-center"
                        >
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{
                                  color: "#fff",
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
            ) : (
              <Swiper
                className="overflow-y-visible"
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
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
                navigation={{
                  prevEl: ".scfeatured .prev",
                  nextEl: ".scfeatured .next",
                }}
                freeMode
                grabCursor={true}
                pagination={false}
                loop={true}
              >
                {Array(9)
                  ?.fill("")
                  ?.map((item, index) => (
                    <SwiperSlide key={`${item}${index}`}>
                      <div
                        className="xs:min-h-[250px] md:min-h-[366px]  xs:p-[20px_14px_14px] md:p-[30px_30px_20px] lg:p-[40px_40px_26px]
                           h-full bg-black-333 flex justify-center items-center"
                      >
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                color: "#fff",
                                fontSize: 24,
                              }}
                              spin
                            />
                          }
                          size="default"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
        <div className="w-fit mx-auto xs:mt-[30px] lg:mt-[40px]">
          <Link
            to={`${PATHS.SHOP.INDEX}`}
            class="btn-flip"
            data-back="Đến shop"
            data-front="Xem tất cả"
          ></Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;
