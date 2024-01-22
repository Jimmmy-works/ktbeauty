const Footer = () => {
  return (
    <footer className="footer mt-section">
      <div
        className="footer__subscription bg-product-banner relative bg-fixed bg-no-repeat bg-center xs:py-[40px] xl:py-[100px] h-full
      before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] before:absolute before:top-0 before:left-0"
      >
        <div
          className="container flex items-center justify-between xl:gap-0  xl:flex-row 
        xs:gap-[20px] xs:flex-col md:flex-row "
        >
          <div className="footer__subscription-text xs:text-center xl:text-left max-w-[400px] xs:w-full md:w-1/3 ">
            <h3 className="font-osb leading-[24px] text-md text-primary xs:mb-[10px] xl:mb-[14px]">
              SẢN PHẨM MỚI - ƯU ĐÃI TỐT
            </h3>
            <p className="font-om text-sm text-white leading-[24px]">
              Hãy là người đầu tiên nhận được các sản phẩm mới và giảm giá độc
              quyền
            </p>
          </div>
          <div className="footer__subscription-submit  h-full relative   xs:w-full md:w-[40%] lg:w-1/3  ">
            <input
              placeholder="Email của bạn"
              type="text"
              className="pr-[70px] pl-[30px] xs:py-[10px] md:py-[14px] lg:py-[18px] rounded-l-[50px] rounded-r-[50px] font-osr
              text-black-555 text-[16px]  border border-primary w-full"
            />
            <button
              type="submit"
              className="absolute right-[0px] top-1/2 h-full rounded-[50%] pr-[30px] -translate-y-1/2 hover:scale-110
              transition-transform duration-400 bg-"
            >
              <svg className="w-[24px] h-[24px]" viewBox="0 0 24 24">
                <path
                  className="fill-primary"
                  d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
                />
              </svg>
            </button>
          </div>
          <div className="footer__subscription-socail flex  gap-[10px] xs:justify-center md:justify-end xs:w-full md:w-fit">
            <div
              className="group/hover hover:bg-primary xs:p-[10px] lg:p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer fb"
            >
              <svg
                className=" lg:w-[20px] xs:w-[18px] lg:h-[20px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white fill-primary duration-400 transition-colors"
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </div>
            <div
              className="group/hover hover:bg-primary xs:p-[10px] lg:p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer instagram"
            >
              <svg
                className=" lg:w-[20px] xs:w-[18px] lg:h-[20px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white fill-primary duration-400 transition-colors"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </div>
            <div
              className="group/hover hover:bg-primary xs:p-[10px] lg:p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer twitter"
            >
              <svg
                className=" lg:w-[20px] xs:w-[18px] lg:h-[20px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white fill-primary duration-400 transition-colors"
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__middle xs:py-[30px]  md:py-[40px] ">
        <div
          className="container flex xs:gap-[20px] md:gap-[30px] items-start justify-between md:flex-row
        xs:flex-col"
        >
          <div className="xs:w-full md:w-fit  footer__middle-contact flex flex-col gap-[10px]  ">
            <h3 className="heading  font-osb text-black-555 text-[22px] xs:text-center md:text-left">
              CONTACT US
            </h3>
            <div className="flex flex-col gap-[10px]  ">
              <a
                target="_blank"
                href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/@10.7552928,106.3655793,10z/data=!3m1!4b1!4m6!3m5!1s0x317529292e8d3dd1:0xf15f5aad773c112b!8m2!3d10.8230989!4d106.6296638!16zL20vMGhuNGg?entry=ttu"
                className=" flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
                          items-center xs:text-center md:text-left group/hover cursor-pointer "
              >
                <svg
                  className="md:w-[24px] md:h-[24px] xs:w-[20px] xs:h-[20px]  "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="duration-400 transition-colors fill-black-555 group-hover/hover:fill-primary"
                    d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  />
                </svg>
                <p
                  className="font-osr text-sm  group-hover/hover:text-primary duration-400 transition-colors
                  text-black-333 address__desc leading-[20px] xs:max-w-full md:max-w-[180px] lg:max-w-[250px] "
                >
                  Công ty TNHH KTBEAUTY Số 1, Tôn Đức Thắng, Q1, TP. Hồ Chí Minh
                </p>
              </a>
              <a
                target="_blank"
                href="tel:020.566.6666"
                className="phone flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
                items-center group/hover cursor-pointer"
              >
                <svg
                  className="md:w-[24px] md:h-[24px] xs:w-[20px] xs:h-[20px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="duration-400 transition-colors fill-black-555 group-hover/hover:fill-primary"
                    d="M8 2c-1.105 0-2 .896-2 2v14.678c-.001 2.213 2.503 3.322 6.005 3.322 3.499 0 5.995-1.106 5.995-3.322v-14.678c0-1.104-.895-2-2-2h-8zm4 18c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm4-4h-8v-10h8v10zm4-7.459c.496.495.803 1.179.803 1.935.001.755-.305 1.44-.8 1.936l.814.814c.703-.704 1.139-1.677 1.139-2.751-.001-1.075-.436-2.046-1.141-2.749l-.815.815zm1.427-1.426c.86.859 1.393 2.046 1.393 3.358.001 1.313-.532 2.502-1.391 3.363l.834.835c1.074-1.075 1.738-2.56 1.737-4.198 0-1.639-.664-3.121-1.737-4.193l-.836.835zm-18.241.611c-.705.703-1.14 1.674-1.141 2.748s.435 2.047 1.139 2.751l.814-.814c-.495-.496-.8-1.18-.8-1.936s.307-1.44.802-1.935l-.814-.814zm-1.447-1.447c-1.075 1.073-1.738 2.554-1.739 4.194-.001 1.638.664 3.124 1.737 4.198l.834-.835c-.859-.861-1.391-2.05-1.39-3.363 0-1.312.531-2.5 1.392-3.358l-.834-.836z"
                  />
                </svg>

                <p
                  className="group-hover/hover:text-primary duration-400 transition-colors font-osr text-sm
                     text-black-333 phone__desc"
                >
                  020.566.6666
                </p>
              </a>
              <a
                target="_blank"
                href="mailto:support@shb.com"
                className=" email flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
                items-center group/hover cursor-pointer"
              >
                <svg
                  className="md:w-[24px] md:h-[24px] xs:w-[20px] xs:h-[20px] "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="duration-400 transition-colors fill-black-555 group-hover/hover:fill-primary"
                    fillRule="evenodd"
                    d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                  />
                </svg>

                <p
                  className="font-osr text-sm group-hover/hover:text-primary duration-400 transition-colors
                   text-black-333 email__desc"
                >
                  support@ktbeauty.com
                </p>
              </a>
            </div>
          </div>
          <div
            className="xs:w-full md:w-1/3  gap-3 footer__middle-logo  md:absolute md:left-1/2 md:top-[calc(50%+2px)] md:-translate-x-1/2  
                md:-translate-y-1/2 h-full flex flex-col items-center   "
          >
            <a href="#">
              <svg
                className="group xs:w-[110px] md:w-[120px] lg:w-[150px]"
                viewBox="3 -40.5 215.18 41.1"
              >
                <path
                  className="fill-black-555 group-hover:fill-primary duration-400 transition-colors"
                  d="M11.95 0L3 0 3-40.5 11.95-40.5 11.95-23.95 18.75-40.5 27.5-40.5 20-22.2 27.85 0 18.75 0 12.9-17.9 11.95-16.3 11.95 0ZM44 0L35 0 35-33.85 28.9-33.85 28.9-40.5 50.05-40.5 50.05-33.85 44-33.85 44 0ZM78.84 0L66.39 0 66.39-40.5 76.94-40.5Q79.54-40.5 81.87-40.1 84.19-39.7 85.99-38.58 87.79-37.45 88.82-35.38 89.84-33.3 89.84-29.9L89.84-29.9Q89.84-27.45 89.12-25.78 88.39-24.1 87.07-23.1 85.74-22.1 83.89-21.75L83.89-21.75Q86.24-21.45 87.84-20.23 89.44-19 90.27-16.95 91.09-14.9 91.09-12L91.09-12Q91.09-8.85 90.27-6.58 89.44-4.3 87.89-2.85 86.34-1.4 84.07-0.7 81.79 0 78.84 0L78.84 0ZM75.34-18.4L75.34-6.25 77.24-6.25Q80.19-6.25 81.32-7.75 82.44-9.25 82.44-12.15L82.44-12.15Q82.44-14.45 81.94-15.8 81.44-17.15 80.29-17.78 79.14-18.4 77.19-18.4L77.19-18.4 75.34-18.4ZM75.34-34.5L75.34-24.3 77.09-24.3Q79.14-24.3 80.19-24.93 81.24-25.55 81.62-26.75 81.99-27.95 81.99-29.65L81.99-29.65Q81.99-31.25 81.42-32.33 80.84-33.4 79.72-33.95 78.59-34.5 76.89-34.5L76.89-34.5 75.34-34.5ZM114.09 0L95.79 0 95.79-40.5 113.99-40.5 113.99-34.4 104.74-34.4 104.74-24.35 111.79-24.35 111.79-18.15 104.74-18.15 104.74-6.05 114.09-6.05 114.09 0ZM124.64 0L116.19 0 123.84-40.5 134.04-40.5 141.59 0 133.34 0 131.99-8.55 126.04-8.55 124.64 0ZM128.99-29.7L126.84-13.9 131.14-13.9 128.99-29.7ZM156.99 0.6L156.99 0.6Q152.34 0.6 149.71-0.93 147.09-2.45 146.04-5.38 144.99-8.3 144.99-12.55L144.99-12.55 144.99-40.5 153.84-40.5 153.84-11.2Q153.84-9.95 154.04-8.7 154.24-7.45 154.91-6.65 155.59-5.85 156.99-5.85L156.99-5.85Q158.44-5.85 159.09-6.65 159.74-7.45 159.91-8.7 160.09-9.95 160.09-11.2L160.09-11.2 160.09-40.5 168.99-40.5 168.99-12.55Q168.99-8.3 167.91-5.38 166.84-2.45 164.24-0.93 161.64 0.6 156.99 0.6ZM187.33 0L178.33 0 178.33-33.85 172.23-33.85 172.23-40.5 193.38-40.5 193.38-33.85 187.33-33.85 187.33 0ZM210.63 0L202.03 0 202.03-16.55 194.33-40.5 202.78-40.5 206.63-27.7 210.08-40.5 218.18-40.5 210.63-16.55 210.63 0Z"
                ></path>
              </svg>
              {/* <img srcSet="/assets/img/sammishop.png 10x" alt="" /> */}
            </a>
            <p className="font-osr text-sm text-black-333 leading-[20px] text-center w-full">
              Thiên nhiên luôn là người bạn tốt nhất của sắc đẹp <br /> Cảm nhận
              sự khác biệt với sản phẩm làm đẹp thiên nhiên <br /> Nature is
              Always the Best Friend of Beauty <br />
              Feel the Difference with Natural Beauty Products
            </p>
          </div>
          <div className="xs:w-full md:w-fit  footer__middle-menu ">
            <div>
              <h3 className="heading font-osb text-black-555 text-[22px] xs:text-center md:text-left ">
                KTBEAUTY INFO
                {/* SAMMISHOP INFO */}
              </h3>
              <div className="flex mt-[10px] items-center xs:justify-center md:justify-start gap-3">
                <ul className="flex flex-col xs:items-center md:items-start gap-[8px] ">
                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Về chúng tôi</a>
                  </li>
                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Đơn hàng</a>
                  </li>

                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Giỏ hàng</a>
                  </li>
                </ul>
                <ul className="flex flex-col xs:items-center md:items-start gap-[8px] ">
                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Liên hệ</a>
                  </li>
                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Bản quyền</a>
                  </li>
                  <li
                    className="h-full leading-[20px] font-osr text-sm text-black-555  
                    hover:text-primary duration-400 transition-colors"
                  >
                    <a href="">Tuyển dụng</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" footer__bottom  bg-[#181818] ">
        <div
          className="container py-[20px] flex xl:gap-0  xs:gap-[14px] xs:flex-col md:flex-row items-center
         justify-between"
        >
          <div className="text-white text-sm font-osr  flex items-center gap-2 justify-center flex-wrap">
            <p className="">Copyright © 2023</p>
            <p className="uppercase font-osb text-primary">ktbeauty</p>
            <p className="">All Rights Reserved</p>
          </div>
          <div className="payment flex items-center gap-[10px]">
            <img
              className="annimated animated-bounceVertical"
              src="/assets/img/footer-paypal.png"
              alt=""
            />
            <img
              className="annimated animated-bounceVertical"
              src="/assets/img/footer-pay-1.png"
              alt=""
            />
            <img
              className="annimated animated-bounceVertical"
              src="/assets/img/footer-pay-2.png"
              alt=""
            />
            <img
              className="annimated animated-bounceVertical"
              src="/assets/img/footer-pay-3.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
