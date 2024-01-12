import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/contants/path";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AboutPage = () => {
  const [activeSubcase, setActiveSubcase] = useState(null);
  const [toggleContent, setToggleContent] = useState(0);
  const handleActiveContentSubcase = (index) => {
    setActiveSubcase((prevIndex) => (prevIndex === index ? null : index));
  };
  const listRef = useRef([]);
  const refWhychoosusLeft = useRef(null);
  const optionWhychooseme = [
    {
      heading: "DEALS & PROMOTIONS",
      desc: "Western Australia since 1997. Having established a solid reputation built on honesty and integrity, designFARM offer their customers a genuine experience. We believe in good, authentic design, in order to do what we do best – create meaningful spaces. You won’t find any replica’s here",
      icon: () => (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z"
          />
        </svg>
      ),
    },
    {
      heading: "TRANSACTION SERVICE AGREEMENT",
      desc: "Western Australia since 1997. Having established a solid reputation built on honesty and integrity, designFARM offer their customers a genuine experience. We believe in good, authentic design, in order to do what we do best – create meaningful spaces. You won’t find any replica’s here",
      icon: () => (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z"
          />
        </svg>
      ),
    },
    {
      heading: "ORGANIZATION & TECHNICAL SUPPORT",
      desc: "Western Australia since 1997. Having established a solid reputation built on honesty and integrity, designFARM offer their customers a genuine experience. We believe in good, authentic design, in order to do what we do best – create meaningful spaces. You won’t find any replica’s here",
      icon: () => (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z"
          />
        </svg>
      ),
    },
  ];
  const optionPeople = [
    {
      author: "Vincent Vanilla",
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex aut impedit repudiandae distinctio quibusdam saepe voluptates ea soluta enim, fugit cum rem nostrum iure quisquam corporis odio odit atque. Adipisci.",
      job: "Student",
    },
    {
      author: "Jack",
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      desc: "Western Australia since 1997. Having established a solid reputation built on honesty and integrity, designFARM offer their customers a genuine experience. We believe in good, authentic design, in order to do what we do best – create meaningful spaces. You won’t find any replica’s here",
      job: "Student",
    },
    {
      author: "Mac",
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      desc: " Having established a solid reputation built on honesty and integrity, designFARM offer their customers a genuine experience. ",
      job: "officer ",
    },
    {
      author: "Thomson Wilson",
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt facilis repellat labore numquam minus hic adipisicing eli.",
      job: "officer ",
    },
    {
      author: "Mr.Beast",
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatum maiores laboriosam quasi repellat inventore voluptatem mollitia in accusantium? Quasi rem nostrum voluptates vitae cum. `,
      job: "Teacher",
    },
    {
      author: "Customer",
      desc: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatum maiores laboriosam quasi repellat inventore voluptatem mollitia in accusantium? Quasi rem nostrum voluptates vitae cum. `,
      avatar: "/assets/img/cerfication-ktbeauty.jpg",
      job: "Doctor",
    },
  ];
  return (
    <main className="main-wrapper aboutpage">
      <div className="relative  md:h-[350px] xs:h-[200px] bg-about-banner bg-[50%_20%] bg-cover"></div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={`${PATHS.HOME}`}>Trang chủ</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          <Link>Về chúng tôi</Link>
        </BreadCrumb.Item>
      </BreadCrumb>
      <div className="container  mt-[15px]">
        <div className="">
          <h2 className="font-osb text-lg uppercase text-black-555 mb-[12px]">
            về chúng tôi
          </h2>
          <p className="text-md font-osr leading-[24px]">
            Thiên nhiên luôn hiện diện quanh ta, không quá xa vời và được chứa
            đựng trọn vẹn trong từng sản phẩm của
            <strong className="font-ossb text-primary">
              {" "}
              KTBEAUTY
            </strong> bởi{" "}
            <strong className="font-ossb text-primary">KTBEAUTY</strong> biết
            cách kết hợp giữa tinh túy của khoa học và sự hoàn hảo của thiên
            nhiên để mang đến những sản phẩm tốt nhất cho làn da của bạn.
          </p>
        </div>
        <div
          className="text-md font-osr leading-[24px] p-[47px_60px] mt-[30px]
          border border-primary border-solid rounded-lg relative max-w-[900px]
          after:w-[10px] after:absolute after:top-1/2 after:-translate-y-1/2 
          after:left-0 after:bg-primary after:h-[70%] "
        >
          GoodShop has been a family-owned, designer furniture institution in
          Western Australia since 1997. Having established a solid reputation
          built on honesty and integrity, designFARM offer their customers a
          genuine experience. We believe in good, authentic design, in order to
          do what we do best
        </div>
        <div className="whychooseus flex gap-[60px] items-start mt-[50px]">
          <div
            ref={refWhychoosusLeft}
            className="whychooseus__left w-[50%] pb-[50px]"
          >
            <h3 className="whychooseus__left-heading font-osb text-md uppercase text-black-555 mb-[30px]">
              Vì sao bạn nên lựa chọn ktbeauty
            </h3>
            <div className="whychooseus__left-list ">
              {optionWhychooseme?.map((item, index) => {
                return (
                  <div
                    key={`${item?.heading}`}
                    className={`item flex flex-col mt-[20px] cursor-pointer overflow-hidden
                ${toggleContent === index ? "active" : ""}
                `}
                    onClick={() => {
                      setToggleContent(index);
                    }}
                  >
                    <div className="item__content flex items-center gap-3 w-full">
                      <div
                        className={`item__content-left p-[11px] bg-primary `}
                      >
                        {item.icon()}
                      </div>
                      <div className="item__content-right ">
                        {item.heading}
                        <svg
                          className={``}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      ref={(element) => (listRef.current[index] = element)}
                      className={`item__content-desc `}
                      style={{
                        maxHeight: `${
                          toggleContent === index
                            ? `${listRef.current?.[index]?.scrollHeight}px`
                            : "0px"
                        }`,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="whychooseus__right  flex justify-end w-[50%]">
            <img
              style={{
                maxHeight: `390px`,
              }}
              className={`w-full object-cover `}
              srcSet="/assets/img/cerfication-ktbeauty.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="gallery py-[100px] mt-section bg-[#2c2c2c]">
        <div className="container ">
          <div className="gallery__list">
            <div className="gallery__list-item">
              <img src="/assets/img/about-1.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-6.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-3.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-4.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-5.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-2.jpg" alt="" />
            </div>

            <div className="gallery__list-item">
              <img src="/assets/img/about-7.jpg" alt="" />
            </div>
            <div className="gallery__list-item">
              <img src="/assets/img/about-8.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="people m-section">
        <div className="container">
          <div className="mb-[30px]">
            <h2 className="font-osb text-md uppercase text-black-555 mb-[12px]">
              Phản hồi từ khách hàng
            </h2>
            <p className="text-md font-osr leading-[24px]">
              Đôi lời nhận xét và đánh giá từ khách hàng đã trải nghiệm qua dịch
              vụ từ
              <strong className="font-ossb text-primary"> KTBEAUTY</strong>
            </p>
          </div>
          <div className="people__list ">
            <Swiper
              className="overflow-y-visible"
              modules={[Navigation, Keyboard]}
              keyboard={{
                enabled: true,
              }}
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              grabCursor={true}
              pagination={false}
            >
              {optionPeople?.map((item) => {
                return (
                  <SwiperSlide>
                    <div className="people__list-item gap-[40px] flex items-start">
                      <a className="pt-[7px] rounded-[50%] block w-[70px] h-[70px]">
                        <img
                          className="rounded-[50%] object-cover min-w-[70px] min-h-[70px] h-full w-full"
                          src={item?.avatar}
                          alt=""
                        />
                      </a>
                      <div
                        className="content before:content-['\275F\275F'] relative before:text-[#ccc] text-lg
                         before:rotate-[180deg] before:flex before:items-center before:justify-center before:text-center
                         before:tracking-[-0.07em] before:absolute before:left-[-20px] before:top-[7px] "
                      >
                        <div
                          className="content__top min-h-[calc(24px*4)] leading-[24px] font-osr text-16px text-black-555
                        line-clamp-4 truncate whitespace-normal"
                        >
                          {item?.desc}
                        </div>
                        <div className="content__bottom leading-[20px] mt-[12px]">
                          <p className="font-ossb uppercase text-sm text-primary">
                            {item?.author}
                          </p>
                          <p className="capitalize font-osr text-sm text-black-555">
                            {item?.job}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
