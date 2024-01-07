import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { formatPriceVND } from "@/utils/formatPrice";
import useWindowSize from "@/utils/windowResize";
import { Empty } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useProfile from "./useProfile";
const EmptyWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  .ant-empty-image {
    width: 150px !important;
    height: 150px !important;
    svg {
    }
  }
`;
const WhiteList = () => {
  const images = [
    "/assets/img/product-1.jpg",
    "/assets/img/product-2.jpg",
    "/assets/img/product-3.jpg",
    "/assets/img/product-4.jpg",
    "/assets/img/product-10.jpg",
    "/assets/img/product-5.jpg",
  ];
  const {
    whiteListInfo,
    statusGetWhiteList,
    onAddToCart,
    onDeleteProductInWhiteList,
  } = useProfile();
  const { width } = useWindowSize();
  console.log("whiteListInfo", whiteListInfo);
  return (
    <div className="whitelist">
      <h3 className="text-[24px] xs:text-center md:text-left font-ossb text-black-333 xs:my-[16px]">
        Sản phẩm yêu thích của bạn
      </h3>
      {whiteListInfo?.products?.length ? (
        <table className="table md:mt-0 xs:mt-[10px]">
          <thead className="cartpage__table-head">
            <tr>
              <td className="text-left">Sản phẩm</td>
              <td className="">Giá</td>
              <td className="">Kho</td>
              <td className=""></td>
              <td className=""></td>
            </tr>
          </thead>
          <tbody>
            {whiteListInfo?.products?.map((item, index) => {
              const {
                product_id,
                name,
                price,
                image,
                discount,
                quantity,
                countInStock,
                _id,
              } = item || {};
              return (
                <tr key={product_id} className="relative">
                  <td className="">
                    <div className="">
                      <Link
                        to={`${PATHS.SHOP.INDEX}/${product_id}`}
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
                          src={image[0]}
                          alt=""
                        />
                      </Link>
                      <Link
                        to={`${PATHS.SHOP.INDEX}/${product_id}`}
                        className=" duration-400 transition-colors hover:text-primary leading-normal
                      md:max-w-[160px] xl:max-w-[200px] xs:w-full truncate line-clamp-3 whitespace-normal"
                        href=""
                      >
                        {name}
                      </Link>
                    </div>
                  </td>

                  {width >= 768 ? (
                    <td className="">
                      <div className="flex gap-1 items-center justify-center">
                        {discount ? (
                          <span className="line-through font-om text-black-be  leading-[18px]">
                            {formatPriceVND(price)}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="font-osb text-black-555">
                          {formatPriceVND(price - discount)}
                        </span>
                      </div>
                    </td>
                  ) : (
                    <td className="">Giá: {formatPriceVND(price)}</td>
                  )}

                  {countInStock > 1 ? (
                    <td className="instock">{countInStock}</td>
                  ) : (
                    <td className="outstock">Hết hàng</td>
                  )}
                  <td className="text-black font-om">
                    <div
                      className={`relative cursor-pointer md:py-[12px] font-ossb text-sm  capitalize flex flex-row 
                              items-center justify-center gap-[6px] group hover:text-primary duration-300 transition-all ${
                                countInStock === 0
                                  ? "pointer-events-none text-black-be"
                                  : "pointer-events-auto text-black-555"
                              } group underline`}
                      onClick={() => onAddToCart(item)}
                    >
                      <div>
                        {countInStock === 0 ? "Hết hàng" : " Thêm vào giỏ"}
                      </div>
                    </div>
                  </td>

                  <td
                    className="xs:absolute md:static md:top-0  xs:top-[-10px] md:right-0 xs:right-3 w-[22px]
                cursor-pointer  "
                  >
                    <div
                      className="flex items-center justify-center py-[10px] group/delete"
                      onClick={() => onDeleteProductInWhiteList(_id)}
                    >
                      <div
                        className={`font-om text-sm text-black-555 p-[2px] rounded-md  transition-colors duration-300
                                 border border-solid w-fit
                                ${
                                  statusGetWhiteList !== THUNK_STATUS.fulfilled
                                    ? "border-[#d9d9d9]"
                                    : "border-black-555"
                                }  border-black-333 group-hover/delete:border-red-500  `}
                      >
                        <button className=" block ">
                          <svg
                            className={`w-[14px] h-[14px] transition-colors duration-300 ${
                              statusGetWhiteList !== THUNK_STATUS.fulfilled
                                ? "text-[#d9d9d9]"
                                : "text-black-555 group-hover/delete:text-red-500"
                            } `}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                              fill="currentColor"
                            />
                            <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                            <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <EmptyWrapper>
          <Empty description={false} />
        </EmptyWrapper>
      )}
    </div>
  );
};

export default WhiteList;
