import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { formatPriceVND } from "@/utils/formatPrice";
import { localeVN } from "@/utils/timeVN";
import useWindowSize from "@/utils/windowResize";
import { Empty } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useProfile from "./useProfile";
const EmptyWrapper = styled.div`
  width: 100%;
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
const Order = () => {
  const { onCancelOrder } = useProfile();
  const { orderList } = useSelector((state) => state.order);
  const { profile } = useSelector((state) => state.auth);
  const { width } = useWindowSize();
  const refContent = useRef(null);
  const [isActive, setIsActive] = useState(null);
  const sortOrderList = Array.from(orderList)
    ?.sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    })
    ?.map((item) => item);
  return (
    <div className="order">
      <h3 className="text-[24px] font-osb text-black-333 xs:my-[16px]">
        Giỏ hàng của bạn
      </h3>
      {sortOrderList?.length ? (
        sortOrderList?.map((item, index) => {
          const {
            _id,
            products,
            shipping,
            createdAt,
            status,
            subTotal,
            total,
            discount,
          } = item || {};
          return (
            <>
              <div className="not-productsChild:mt-[20px]">
                <div className="flex items-center justify-between p-[0_0_8px_0] cursor-pointer ">
                  <div className="flex xs:items-start md:items-center md:flex-row xs:flex-col xs:gap-3  md:gap-5">
                    <h3 className="text-sm text-black-333 font-osr">
                      ID: {_id}
                    </h3>
                    <p className="text-sm text-black-333 font-osr">
                      {`${localeVN(createdAt)}`}
                    </p>
                    {status !== "Đã hủy đơn" && (
                      <Button
                        onClick={() =>
                          onCancelOrder({
                            status: "Đã hủy đơn",
                            _id: _id,
                            user_id: profile?._id,
                          })
                        }
                        className={`md:text-xs md:px-[15px] md:py-[5px]  `}
                        variant="outline"
                      >
                        Hủy
                      </Button>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setIsActive((prev) => (prev === index ? null : index));
                    }}
                    className={`p-[10px] rounded-[50%] cursor-pointer group/hover
                    hover:bg-primary duration-400 transition-colors
                     ${isActive === index ? "bg-primary" : "bg-gray-300 "}`}
                  >
                    <svg
                      className={`h-[12px] w-[12px] duration-400 transition-transform 
                     ${isActive === index ? "rotate-[-180deg]" : "rotate-0"}`}
                      viewBox="0 0 24 24"
                    >
                      <path
                        className={` group-hover/hover:fill-white duration-400 transition-colors
                      ${isActive === index ? "fill-white" : "fill-black-333"}`}
                        d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  ref={refContent}
                  className={`transition-all duration-500 overflow-hidden`}
                  style={{
                    maxHeight: `${
                      isActive !== index
                        ? "0px"
                        : `${refContent?.current?.scrollHeight}px`
                    }`,
                  }}
                >
                  <table className="table md:mt-0 xs:mt-[10px]">
                    <thead className=" ">
                      <tr>
                        <td className="">Sản phẩm</td>
                        <td className="">Giá</td>
                        <td className="">Số lượng</td>
                        <td className="">Tổng </td>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((item) => {
                        const { _id, price, quantity } = item || {};
                        return (
                          <tr key={`${_id}`} className="relative">
                            <td className="">
                              <div
                                className="flex md:flex-row xs:flex-col items-center md:gap-[10px]
                                xs:gap-[12px]"
                              >
                                <Link
                                  to={`${PATHS.SHOP.INDEX}/${_id}`}
                                  className="xs:h-[80px] md:h-[60px] lg:h-[80px] xs:w-[80px] md:w-[60px] lg:w-[80px]
                                border-solid border border-transparent hover:border-primary rounded-md duration-300 
                                transition-colors"
                                  href=""
                                >
                                  <img
                                    className="rounded-md h-full w-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/assets/img/error.png";
                                    }}
                                    src={item}
                                    alt=""
                                  />
                                </Link>
                                <Link
                                  to={`${PATHS.SHOP.INDEX}/${_id}`}
                                  className="block duration-400 transition-colors hover:text-primary leading-normal
                                             lg:max-w-full md:max-w-[150px]"
                                  href=""
                                >
                                  Lorem ipsum dolor sit amet Lorem ipsum dolor .
                                </Link>
                              </div>
                            </td>
                            {width >= 768 ? (
                              <td className="">{formatPriceVND(price)}</td>
                            ) : (
                              <td className="">Giá: {formatPriceVND(price)}</td>
                            )}
                            {width >= 768 ? (
                              <td className="">{quantity}</td>
                            ) : (
                              <td className="">Số lượng: {quantity}</td>
                            )}
                            {width >= 768 ? (
                              <td className="text-black font-om tracking-wider">
                                {formatPriceVND(price * quantity)}
                              </td>
                            ) : (
                              <td className="text-black font-om">Tổng:</td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div
                    className="flex  md:items-start xs:items-center xs:gap-3 md:gap-10 border-t border-solid border-black-be py-[14px]
                    md:flex-row xs:flex-col "
                  >
                    <div
                      className="text-black-555 text-[16px] font-om  xs:w-full md:w-1/3  flex 
                          flex-col gap-1"
                    >
                      Shipping:
                      <span className="pl-[8px] text-primary capitalize ">
                        {total >= 3000000
                          ? `${shipping?.type}: Miễn phí`
                          : `${shipping?.type}: ${formatPriceVND(
                              shipping?.price
                            )}`}
                      </span>
                    </div>
                    <div
                      className="text-black-555 text-[16px] font-om xs:w-full md:w-1/3 flex 
                   flex-col gap-1 "
                    >
                      Giảm giá:
                      <span className="pl-[8px] text-primary ">
                        {formatPriceVND(discount?.price)}
                      </span>
                    </div>

                    <div
                      className="text-black-555 text-[16px] font-om xs:w-full md:w-1/3 flex 
                   flex-col gap-1"
                    >
                      Tổng chưa giảm giá:
                      <span className="pl-[8px] text-primary tracking-wider">
                        {formatPriceVND(subTotal)}
                      </span>
                    </div>
                    <div
                      className="text-black-555 text-[16px] font-om xs:w-full md:w-1/3 flex 
                   flex-col gap-1 "
                    >
                      Tổng cộng:
                      <span className="pl-[8px] text-primary tracking-wider">
                        {formatPriceVND(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <EmptyWrapper>
          <Empty description={false} />
        </EmptyWrapper>
      )}
    </div>
  );
};

export default Order;
