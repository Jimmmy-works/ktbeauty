import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";

const Footer = () => {
  return (
    <footer className="footer pt-section">
      <div className="footer__subscription bg-footer-banner bg-fixed bg-no-repeat bg-center xs:py-[40px] xl:py-[100px] h-full">
        <div
          className="container flex items-center justify-between xl:gap-0  xl:flex-row 
        xs:gap-[20px] xs:flex-col"
        >
          <div className="footer__subscription-text xs:text-center xl:text-left max-w-[350px] ">
            <h3 className="font-mab text-md text-primary xs:mb-[10px] xl:mb-[18px]">
              THE LATEST AND GREATEST:
            </h3>
            <p className="font-mar text-sm text-white leading-[24px]">
              Be the first to hear about new products and exclusive discounts.x
            </p>
          </div>
          <div className="footer__subscription-submit  h-full relative w-full max-w-[470px]  ">
            <Input
              placeholder="Enter your email address"
              type="text"
              className=" pr-[90px] pl-[30px] xs:py-[10px] md:py-[19px] rounded-l-[50px] rounded-r-[50px] font-mam
              text-black-555 text-[16px]  border border-primary "
            />
            <button
              type="submit"
              className="absolute right-[0px] top-1/2 h-full rounded-[50%] pr-[30px] -translate-y-1/2 hover:scale-110
              transition-transform duration-400"
            >
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path
                  fill="#ff887b"
                  d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
                />
              </svg>
            </button>
          </div>
          <div className="footer__subscription-socail flex  gap-[10px] justify-end">
            <div
              className="group/hover hover:bg-primary p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer fb"
            >
              <svg
                className="md:w-[30px] xs:w-[18px] md:h-[30px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white duration-400 transition-colors"
                  fill="#ff887b "
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </div>
            <div
              className="group/hover hover:bg-primary p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer instagram"
            >
              <svg
                className="md:w-[30px] xs:w-[18px] md:h-[30px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white duration-400 transition-colors"
                  fill="#ff887b "
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </div>
            <div
              className="group/hover hover:bg-primary p-[15px] rounded-[50%] bg-white 
            duration-400 transition-colors cursor-pointer twitter"
            >
              <svg
                className="md:w-[30px] xs:w-[18px] md:h-[30px] xs:h-[18px]"
                viewBox="0 0 24 24"
              >
                <path
                  className="group-hover/hover:fill-white duration-400 transition-colors"
                  fill="#ff887b "
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
          <div className="xs:w-full md:w-1/3  footer__middle-contact flex flex-col gap-[10px]  ">
            <h3 className="heading  font-mab text-primary text-[22px] xs:text-center md:text-left">
              CONTACT US
            </h3>
            <div className="flex flex-col gap-[10px] ">
              <div
                className=" flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
              items-center xs:text-center md:text-left "
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#ff887b"
                    d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  />
                </svg>
                <a
                  target="_blank"
                  href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam/@10.7552928,106.3655793,10z/data=!3m1!4b1!4m6!3m5!1s0x317529292e8d3dd1:0xf15f5aad773c112b!8m2!3d10.8230989!4d106.6296638!16zL20vMGhuNGg?entry=ttu"
                  className="font-mar text-sm  hover:text-primary duration-400 transition-colors
                text-black-333 address__desc leading-[20px] xs:max-w-[300px] md:max-w-[180px] lg:max-w-[250px] "
                >
                  Our business address is 63 Freelon Street San Francisco, CA
                  95108
                </a>
              </div>
              <div
                className="phone flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
              items-center "
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#ff887b"
                    d="M8 2c-1.105 0-2 .896-2 2v14.678c-.001 2.213 2.503 3.322 6.005 3.322 3.499 0 5.995-1.106 5.995-3.322v-14.678c0-1.104-.895-2-2-2h-8zm4 18c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm4-4h-8v-10h8v10zm4-7.459c.496.495.803 1.179.803 1.935.001.755-.305 1.44-.8 1.936l.814.814c.703-.704 1.139-1.677 1.139-2.751-.001-1.075-.436-2.046-1.141-2.749l-.815.815zm1.427-1.426c.86.859 1.393 2.046 1.393 3.358.001 1.313-.532 2.502-1.391 3.363l.834.835c1.074-1.075 1.738-2.56 1.737-4.198 0-1.639-.664-3.121-1.737-4.193l-.836.835zm-18.241.611c-.705.703-1.14 1.674-1.141 2.748s.435 2.047 1.139 2.751l.814-.814c-.495-.496-.8-1.18-.8-1.936s.307-1.44.802-1.935l-.814-.814zm-1.447-1.447c-1.075 1.073-1.738 2.554-1.739 4.194-.001 1.638.664 3.124 1.737 4.198l.834-.835c-.859-.861-1.391-2.05-1.39-3.363 0-1.312.531-2.5 1.392-3.358l-.834-.836z"
                  />
                </svg>

                <a
                  target="_blank"
                  href="tel:020.566.6666"
                  className="hover:text-primary duration-400 transition-colors font-mar text-sm
                   text-black-333 phone__desc"
                >
                  020.566.6666
                </a>
              </div>
              <div
                className=" email flex md:flex-row xs:flex-col  xs:w-full md:w-auto gap-[12px] 
              items-center "
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#ff887b"
                    d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"
                  />
                </svg>
                <a
                  target="_blank"
                  href="mailto:support@shb.com "
                  className="font-mar text-sm hover:text-primary duration-400 transition-colors
                 text-black-333 email__desc"
                >
                  support@shb.com
                </a>
              </div>
            </div>
          </div>
          <div
            className="xs:w-full md:w-1/3 gap-3 footer__middle-logo  md:absolute md:left-1/2 md:top-[43%] md:-translate-x-1/2  
            md:-translate-y-1/2 h-full flex flex-col items-center   "
          >
            <a href="#">
              <img src="/assets/img/logo-1.svg" alt="" />
            </a>
            <p className="font-mar text-sm text-black-333 leading-[20px] text-center max-w-[400px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              sunt deleniti illum mollitia deserunt quam voluptate. Maxime
              architecto ullam voluptatum?
            </p>
          </div>
          <div className="xs:w-full md:w-1/3  footer__middle-menu">
            <h3 className="heading font-mab text-primary text-center text-[22px] ">
              KTBEAUTY INFO
            </h3>
            <div className="flex mt-[10px] items-center justify-center md:gap-0 lg:gap-3">
              <ul className="flex flex-col gap-[8px] ">
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">About Us</a>
                </li>
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">Contact US</a>
                </li>{" "}
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">White List</a>
                </li>
              </ul>
              <ul className="flex flex-col gap-[8px] ">
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">Privacy Policy</a>
                </li>
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">Your Order</a>
                </li>
                <li
                  className="h-full leading-[20px] font-osr text-sm text-black-555  px-[5px]
                hover:text-primary duration-400 transition-colors"
                >
                  <a href="">Careers</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" footer__bottom  bg-[#181818] ">
        <div
          className="container py-[20px] flex xl:gap-0  xs:gap-[14px] xs:flex-col md:flex-row items-center
         justify-between"
        >
          <div className="text-white text-sm font-mar  flex items-center gap-1">
            <p className="">Copyright © 2023</p>
            <p className="uppercase font-mab text-primary">ktbeauty</p>
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
            {/* <div className="payment__banking flex items-center">
              <h3 className=" font-mar text-primary text-md">
                Momo:
                <span className="ml-[8px] font-mar text-white text-sm">
                  026.566.6666
                </span>
              </h3>
            </div>
            <div className="payment__banking flex">
              <h3 className=" font-mar text-primary text-md">
                Sacombank:
                <span className="ml-[8px] font-mar text-white text-sm">
                  0610.4566.6666
                </span>
              </h3>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
