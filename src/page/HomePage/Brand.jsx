import React from "react";
import Slider from "react-slick";

const Brand = () => {
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    speed: 600,
    slidesToShow: 6,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  const images = [
    "brand-2.svg",
    "brand-3.svg",
    "brand-4.svg",
    "brand-5.svg",
    "brand-6.svg",
    "brand-7.svg",
    "brand-2.svg",
    "brand-3.svg",
    "brand-4.svg",
    "brand-5.svg",
    "brand-6.svg",
    "brand-7.svg",
  ];
  const baseURL = `/assets/img/`;
  return (
    <section className="scbrand pt-section">
      <div className="container">
        <div className="scbrand__list ">
          <Slider {...settings}>
            {images?.map((img, index) => (
              <img
                key={`${img}${index}`}
                className="w-full xs:h-[80px] md:h-[100px]"
                src={`${baseURL}${img}`}
                alt=""
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Brand;
