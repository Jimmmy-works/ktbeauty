import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/contants/path";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
            <strong> KTBEAUTY</strong> bởi <strong>KTBEAUTY</strong> biết cách
            kết hợp giữa tinh túy của khoa học và sự hoàn hảo của thiên nhiên để
            mang đến những sản phẩm tốt nhất cho làn da của bạn.
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
              {/* <div
                className={`whychooseus__list-item flex flex-col mt-[20px] cursor-pointer overflow-hidden
                ${toggleContent ? "active" : ""}
                `}
                onClick={() => setToggleContent(!toggleContent)}
              >
                <div className="content flex items-center gap-3 w-full">
                  <div className={`content__left p-[11px] bg-primary `}>
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                      <path
                        fill="#fff"
                        d="M18 1h-11.916l-6.084 7 12 15 12-14.917-6-7.083zm-11.667 8l3.231 7.753-6.203-7.753h2.972zm9.167 0l-3.5 8.4-3.5-8.4h7zm-6.365-2l2.865-3.438 2.865 3.438h-5.73zm8.532 2h3.028l-6.283 7.811 3.255-7.811zm2.794-2h-2.992l-3.334-4h2.938l3.388 4zm-13.465-4h2.869l-3.334 4h-3.011l3.476-4z"
                      />
                    </svg>
                  </div>
                  <div className="content__right ">
                    DEALS & PROMOTIONS
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
                  ref={ref}
                  className={`content__desc `}
                  style={{
                    maxHeight: `${
                      toggleContent ? `${ref?.current?.scrollHeight}px` : "0px"
                    }`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  expedita ipsum ipsa magni consequatur maiores repellat
                  temporibus saepe quidem perferendis!
                </div>
              </div>
              <div
                className={`whychooseus__list-item flex flex-col mt-[20px] cursor-pointer overflow-hidden
                ${toggleContent ? "active" : ""}
                `}
                onClick={() => setToggleContent(!toggleContent)}
              >
                <div className="content flex items-center gap-3 w-full">
                  <div className={`content__left p-[11px] bg-primary `}>
                    <svg className="w-[18px] h-[18px] " viewBox="0 0 24 24">
                      <path
                        fill="#fff"
                        d="M12 2.644c2.965 2.238 6.457 3.004 8.912 3.25-.658 7.052-4.892 12.593-8.912 15.655-4.021-3.062-8.255-8.603-8.912-15.656 2.454-.245 5.947-1.011 8.912-3.249zm0-2.644c-2.996 2.995-7.486 4-11 4 0 8.583 5.067 16.097 11 20 5.932-3.903 11-11.417 11-20-3.515 0-8.006-1.005-11-4zm3.794 8l-4.381 4.475-2.215-2.123-1.237 1.239 3.452 3.362 5.619-5.715-1.238-1.238z"
                      />
                    </svg>
                  </div>
                  <div className="content__right ">
                    DEALS & PROMOTIONS
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
                  ref={ref}
                  className={`content__desc `}
                  style={{
                    maxHeight: `${
                      toggleContent ? `${ref?.current?.scrollHeight}px` : "0px"
                    }`,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  expedita ipsum ipsa magni consequatur maiores repellat
                  temporibus saepe quidem perferendis!
                </div>
              </div> */}
            </div>
          </div>
          <div className="whychooseus__right  flex justify-end w-[50%]">
            <img
              style={{
                maxHeight: `${refWhychoosusLeft?.current?.clientHeight}px`,
              }}
              className={`w-full object-cover `}
              srcSet="/assets/img/cerfication-ktbeauty.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="gallery py-[100px] mt-[50px] bg-[#2c2c2c]">
        {/* <h2 className="text-center font-ossb text-lg capitalize text-white mb-[30px]">
            Galley
          </h2> */}
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
    </main>
  );
};

export default AboutPage;
