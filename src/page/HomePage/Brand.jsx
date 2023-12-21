import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Brand = () => {
  const images = [
    "/assets/img/brand-2.svg",
    "/assets/img/brand-3.svg",
    "/assets/img/brand-4.svg",
    "/assets/img/brand-5.svg",
    "/assets/img/brand-6.svg",
    "/assets/img/brand-7.svg",
    "/assets/img/brand-2.svg",
    "/assets/img/brand-3.svg",
    "/assets/img/brand-4.svg",
    "/assets/img/brand-5.svg",
    "/assets/img/brand-6.svg",
    "/assets/img/brand-7.svg",
  ];
  return (
    <section className="scbrand m-section xs:my-[40px]">
      <div className="container">
        <div className="scbrand__list">
          <Swiper
            modules={[Keyboard]}
            freeMode={true}
            grabCursor={true}
            pagination={false}
            loop={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              360: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            className="scbrand__list-wrapper"
            wrapperClass="scbrand__list"
          >
            {images?.map((img, index) => (
              <SwiperSlide key={`${img}${index}`}>
                <img
                  className="w-full xs:h-[60px] md:h-[100px]"
                  src={img}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Brand;
