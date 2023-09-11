import Button from "@/components/Button";
import React from "react";

const Outstanding = () => {
  return (
    <section className="scoutstanding my-[80px]">
      <div className="container">
        <div className="scoutstanding__list flex items-center gap-[30px]">
          <div
            className="scoutstanding__list-item bg-[url('/assets/img/cosmetics-2.png')] relative
           bg-center bg-no-repeat w-1/3 pl-[50px] pt-[25px] pb-[22px] before:h-full before:w-full 
           before:absolute before:bg-[rgba(255,255,255,0.1)] before:top-0 before:left-0 "
          >
            <h3
              className="heading font-osb text-[24px] max-w-[170px] leading-[30px] mb-[10px]
            text-black relative z-20"
            >
              Best Facial Moisturizer
            </h3>
            <div className="flex items-center gap-2 relative z-20">
              <a
                className="font-osb text-sm leading-none text-[#FFAD1A]"
                href=""
              >
                Shop Now
              </a>
              <svg className="w-[14px] h-[14px] pt-[2px]" viewBox="0 0 100 125">
                <path
                  fill="#ff887b"
                  d="M67.34,15.9a3.55,3.55,0,1,0-5,5L87.85,46.44H3.53a3.56,3.56,0,0,0,0,7.11H87.85L62.3,79.06a3.62,3.62,0,0,0,0,5,3.53,3.53,0,0,0,5,0l31.6-31.6a3.47,3.47,0,0,0,0-5Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outstanding;
