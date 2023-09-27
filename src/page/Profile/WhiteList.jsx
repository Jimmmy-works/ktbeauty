import Button from "@/components/Button";
import useWindowSize from "@/utils/windowResize";
import React from "react";
import { Link } from "react-router-dom";

const WhiteList = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-10.jpg",
    "/assets/img/product-5.jpg",
  ];
  const { width } = useWindowSize();
  return (
    <div className="whitelist">
      <h3 className="text-[24px] xs:text-center md:text-left font-mab text-black-333 xs:my-[16px]">
        Your Whitelist
      </h3>
      <table className="table md:mt-0 xs:mt-[10px]">
        <thead className="cartpage__table-head">
          <tr>
            <td className="text-left">Product</td>
            <td className="">price</td>
            <td className="">Stock Status</td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </thead>
        <tbody>
          {images?.map((item, index) => {
            return (
              <tr key={`${item}${index}`} className="relative">
                <td className="">
                  <div className="">
                    <a
                      href=""
                      className="img pb-0 xs:h-[80px] md:h-[60px] lg:h-[80px] xs:w-[80px] md:w-[60px] lg:w-[80px]
                      border-solid border border-transparent hover:border-primary rounded-md duration-300 transition-colors"
                    >
                      <img
                        className="rounded-md w-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/error.png";
                        }}
                        src={item}
                        alt=""
                      />
                    </a>
                    <a
                      className=" duration-400 transition-colors hover:text-primary leading-normal
                      md:max-w-[160px] xl:max-w-[200px] xs:w-full truncate line-clamp-3 whitespace-normal"
                      href=""
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ipsa, dolorum?
                    </a>
                  </div>
                </td>

                {width >= 768 ? (
                  <td className="">$100</td>
                ) : (
                  <td className="">Price: $100</td>
                )}

                {item !== images[0] ? (
                  <td className="instock">Instock: {`${index}`}</td>
                ) : (
                  <td className="outstock">Out of stock </td>
                )}

                {item !== images[0] ? (
                  <td className="text-black font-mam">
                    <Button
                      className={` rounded-none lg:px-[30px] lg:py-[10px] md:px-[10px] md:py-[6px]`}
                    >
                      Add to cart
                    </Button>
                  </td>
                ) : (
                  <td className="text-black font-mam">
                    <Button
                      className={` rounded-none text-[#ccc] bg-[#fafafa] border-[#fafafa] pointer-events-none 
                      lg:px-[30px] lg:py-[10px] md:px-[10px] md:py-[6px]`}
                    >
                      Out of stock
                    </Button>
                  </td>
                )}

                <td
                  className="xs:absolute md:static md:top-0  xs:top-[-10px] md:right-0 xs:right-3 w-[22px]
                cursor-pointer group/hover "
                >
                  <div className="h-full items-center justify-center">
                    <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                      <path
                        className="fill-gray-400 group-hover/hover:fill-primary duration-300 transition-colors"
                        d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WhiteList;
