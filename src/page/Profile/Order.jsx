import { PATHS } from "@/contants/path";
import { formatPriceVND } from "@/utils/formatPrice";
import { localeVN } from "@/utils/timeVN";
import useWindowSize from "@/utils/windowResize";
import { Button, Drawer, Empty, Popconfirm, Timeline, message } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
const TimelineWrapper = styled.div`
  .ant-timeline-item {
    &:last-child {
      padding-bottom: 0px !important;
    }
    .ant-timeline-item-content {
      min-height: auto !important;
    }
  }
`;
const Order = () => {
  const { onCancelOrder } = useProfile();
  const { orderList } = useSelector((state) => state.order);
  const { profile } = useSelector((state) => state.auth);
  const { width } = useWindowSize();
  const [isActive, setIsActive] = useState(null);
  const sortOrderList = Array.from(orderList)
    ?.sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    })
    ?.map((item) => item);

  const [items, setItems] = useState(["United States", "India", "Germany"]);
  const listRef = useRef([]);
  const [open, setOpen] = useState(false);
  const showDrawer = (_id) => {
    setOpen(true);
    handleDrawer(_id);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleConfirmCancelOrder = (e) => {
    onCancelOrder({
      status: "canceled",
      _id: e?._id,
      user_id: profile?._id,
    });
  };
  const [drawerData, setDrawerData] = useState();
  const handleDrawer = (id) => {
    const find = orderList?.find((item) => item?._id === id);
    setDrawerData(find);
  };
  return (
    <div className="order">
      <h3 className="text-[24px] font-osb text-black-333 xs:my-[16px]">
        Đơn hàng của bạn
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
          const handleColorTimeline = (type) => {
            if (type === "canceled") {
              return "#e92527";
            } else if (type === "complete") {
              return "green";
            } else {
              return "#4096ff";
            }
          };
          return (
            <div key={_id} className="not-productsChild:mt-[20px]">
              <div
                className={`flex items-start justify-between mb-[6px] cursor-pointer `}
              >
                <div className="flex items-start flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm text-black-333 font-osr">
                      ID: {_id}
                    </h3>
                    <p className="text-sm text-black-333 font-osr">
                      {`${localeVN(createdAt)}`}
                    </p>
                  </div>
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
                key={_id}
                ref={(element) => (listRef.current[index] = element)}
                className={`transition-all duration-500 overflow-hidden  `}
                style={{
                  maxHeight: `${
                    isActive !== index
                      ? "0px"
                      : `${listRef.current[index]?.scrollHeight}px`
                  }`,
                }}
              >
                <TimelineWrapper className="">
                  <Timeline
                    mode="left"
                    key={_id}
                    className="font-osr min-h-max text-black-555 pt-[10px] text-left"
                    items={status?.map((item) => {
                      return {
                        position: "left",
                        color: handleColorTimeline(item?.type),
                        children: `Vào lúc ${localeVN(item?.createAt)} - ${
                          item?.label
                        }`,
                      };
                    })}
                  />
                </TimelineWrapper>
                <Drawer
                  key={`${_id}`}
                  title="Order"
                  placement="left"
                  onClose={onClose}
                  open={open}
                  bodyStyle={{ padding: "0" }}
                >
                  <div
                    key={`${_id}`}
                    className="w-full xs:p-[0] md:py-[15px] md:px-[20px] md:bg-[#f9f9f9]"
                  >
                    {width < 768 && (
                      <h3 className="font-osb text-black-333 text-md my-[20px]">
                        Giỏ hàng của bạn
                      </h3>
                    )}
                    <div className="pb-[20px] border-b border-solid border-[#e2e0e0]">
                      {drawerData?.products?.length &&
                        drawerData?.products?.map((product) => {
                          const {
                            _id,
                            price,
                            quantity,
                            image,
                            name,
                            discount,
                          } = product || {};
                          return (
                            <div
                              key={_id}
                              className="flex items-center justify-between gap-[15px] not-firstChild:mt-[14px]"
                            >
                              <div className="flex items-center gap-[12px]">
                                <a
                                  className="relative min-w-[64px] min-h-[64px] rounded-[6px] border border-solid
                          border-[#e2e0e0] duration-400 transition-colors hover:border-primary group/hover"
                                >
                                  <img
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/assets/img/error.png";
                                    }}
                                    className="h-full w-full object-cover center-absolute rounded-[6px]"
                                    src={image?.[0]}
                                    alt=""
                                  />
                                  <span
                                    className="text-xs text-white font-om rounded-[50%] bg-[#908f8f]  h-[22px] w-[22px]
                                       flex items-center justify-center absolute right-[-8px] top-[2px] -translate-y-1/2
                                    group-hover/hover:bg-primary duration-400 transition-colors "
                                  >
                                    {quantity || 0}
                                  </span>
                                </a>
                                <a
                                  className="text-sm text-black-333 font-om truncate whitespace-normal line-clamp-4
                                        duration-400 transition-colors hover:text-primary"
                                >
                                  {name}
                                </a>
                              </div>
                              <p className="text-xs text-primary font-osb">
                                <div className=" text-xs text-primary font-osb flex gap-1 items-center justify-center">
                                  <span className="line-through text-black-555">
                                    {formatPriceVND(price)}
                                  </span>
                                  <span className="text-sm">
                                    {formatPriceVND(price - discount)}
                                  </span>
                                </div>
                              </p>
                            </div>
                          );
                        })}
                    </div>
                    <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                      <div className="flex items-center justify-between ">
                        <h4 className="font-osb text-sm text-black-333">
                          Tổng chưa giảm giá
                        </h4>
                        <p className="font-osb text-sm text-primary tracking-wider">
                          {formatPriceVND(drawerData?.subTotal)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-[20px]">
                        <h4 className="font-osb text-sm text-black-333">
                          Vận chuyển
                        </h4>
                        {drawerData?.shipping?.label && (
                          <p className="capitalize font-osb text-sm text-primary">
                            {drawerData?.shipping?.label}
                          </p>
                        )}
                      </div>
                    </div>
                    {drawerData?.discount?.hasOwnProperty("price") && (
                      <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                        <div className="flex items-start justify-between font-osb text-sm text-black-333">
                          <p>Tổng giảm giá</p>
                          <p className="text-primary tracking-wider">
                            -
                            {total >= 3 * 1000000 &&
                            drawerData?.shipping?.price > 0
                              ? formatPriceVND(
                                  drawerData?.discount?.price +
                                    drawerData?.shipping?.price
                                )
                              : formatPriceVND(drawerData?.discount?.price)}
                          </p>
                        </div>
                        <div className="flex items-start justify-between mt-[14px] ">
                          <p className="pl-[6px] font-om text-[12px] text-black-333">
                            {`1. ` + drawerData?.discount?.type}
                          </p>
                          <p className="font-osb text-[12px] text-black-333 tracking-wider">
                            {formatPriceVND(drawerData?.discount?.price)}
                          </p>
                        </div>
                        <div className="flex items-start justify-between mt-[14px] ">
                          <p className="pl-[6px] font-om text-[12px] text-black-333 ">
                            {` ${
                              drawerData?.subTotal >= 3 * 1000000 &&
                              drawerData?.shipping?.price > 0
                                ? `2. Miễn phí vận chuyển`
                                : ""
                            } `}
                          </p>
                          <p className="font-osb text-[12px] text-black-333 tracking-wider">
                            {` ${
                              drawerData?.subTotal >= 3 * 1000000 &&
                              drawerData?.shipping?.price > 0
                                ? formatPriceVND(drawerData?.shipping?.price)
                                : ""
                            }`}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className=" py-[20px] flex items-center justify-between">
                      <h4 className="font-osb text-md text-black-333">
                        Tổng cộng
                      </h4>
                      <p className="font-osb text-md text-primary ">
                        {formatPriceVND(drawerData?.total)}
                      </p>
                    </div>
                  </div>
                </Drawer>
                <div className="m-[8px_0_16px_0] flex gap-2">
                  <Button
                    onClick={() => showDrawer(_id)}
                    className={`md:text-xs md:px-[15px] md:py-[5px]  `}
                    variant="outline"
                  >
                    Chi tiết
                  </Button>
                  {status?.find((item) => {
                    return item?.type === "canceled";
                  })?.type !== "canceled" &&
                    status?.find((item) => {
                      return item?.type === "complete";
                    })?.type !== "complete" && (
                      <Popconfirm
                        title="Hủy đơn hàng?"
                        description="Bạn có chắc muốn hủy đơn hàng?"
                        onConfirm={() => {
                          console.log("first", item?.type);

                          if (
                            status?.find((item) => {
                              return item?.type === "preparing";
                            })
                          ) {
                            message.error(
                              `Không thể hủy đơn khi đang giao hàng!!`
                            );
                          } else {
                            handleConfirmCancelOrder({
                              _id: _id,
                            });
                          }
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          danger
                          className={`md:text-xs md:px-[15px] md:py-[5px]  `}
                          variant="outline"
                        >
                          Hủy
                        </Button>
                      </Popconfirm>
                    )}
                </div>
                {/* <table className="table md:mt-0 xs:mt-[10px]">
                  <thead className=" ">
                    <tr>
                      <td className="">Sản phẩm</td>
                      <td className="">Giá</td>
                      <td className="">Số lượng</td>
                      <td className="">Tổng </td>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((item, index) => {
                      const { _id, price, quantity, image, name } = item || {};
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
                                  src={image[index] || "/assets/img/error.png"}
                                  alt=""
                                />
                              </Link>
                              <Link
                                to={`${PATHS.SHOP.INDEX}/${_id}`}
                                className="block duration-400 transition-colors hover:text-primary leading-normal
                                             lg:max-w-full md:max-w-[150px]"
                                href=""
                              >
                                {name}
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
                </table> */}
                {/* <div
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
                  </div> */}
              </div>
            </div>
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
