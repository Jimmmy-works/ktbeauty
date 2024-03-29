import QuantityInput from "@/assets/Input/QuantityInput";
import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { cartActions } from "@/store/reducer/cartReducer";
import { formatPriceVND } from "@/utils/formatPrice";
import useWindowSize from "@/utils/windowResize";
import { Empty, Select, Steps, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCartPage from "./useCartPage";
const StepsWrapper = styled.div`
  .ant-steps-item-icon {
    background-color: #555 !important;
    border-color: #555 !important;
  }
  .ant-steps-item-title {
    &::after {
      background-color: #ff887b !important;
    }
  }
  .ant-steps-item-finish {
    svg {
      fill: #fff !important;
    }
    .ant-steps-item-icon {
      background-color: #ff887b !important;
      border-color: #ff887b !important;
    }
    .ant-steps-item-container {
      .ant-steps-item-title,
      .ant-steps-item-description {
        transition: all 0.3s;
      }
      &:hover {
        .ant-steps-item-title,
        .ant-steps-item-description {
          color: #ff887b !important;
        }
      }
    }
  }
`;
const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  .ant-empty-description {
    font-family: "OpenSans-SemiBold";
    font-size: 14px;
  }
  .ant-empty-image {
    width: 150px !important;
    height: 150px !important;
    svg {
    }
  }
`;
const CartPage = () => {
  const optionShippingNoDiscount = [
    {
      value: "default",
      label: "Chọn phương thức",
      price: 0,
    },
    {
      value: "fast",
      label: "Nhanh : 20.000đ",
      price: 20 * 1000,
    },
    {
      value: "express",
      label: "Hỏa tốc : 35.000đ",
      price: 35 * 1000,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const {
    cartInfo,
    onChangeQuantity,
    onDeleteProductInCart,
    total,
    subTotal,
    updateStatusUpdateCart,
  } = useCartPage();
  const { products } = cartInfo || {};
  const [discountCodeCurrent, setDiscountCodeCurrent] = useState();
  const [shippingCurrent, setShippingCurrent] = useState(
    JSON.parse(localStorage.getItem("shipping")) ||
      optionShippingNoDiscount?.[0]
  );
  const [stepDiscount, setStepDiscount] = useState();
  const min = 1;
  const max = 20;
  const million = 1000000;
  const onChangeShippingType = useCallback(
    (value, current) => {
      setShippingCurrent(current);
    },
    [subTotal, shippingCurrent]
  );
  const updateDiscountCode = useMemo(() => {
    if (subTotal >= 5 * million) {
      const discount = Number((subTotal * 20) / 100);
      setDiscountCodeCurrent({
        name: "Giảm giá 20%",
        price: discount + (shippingCurrent ? shippingCurrent?.price : 0),
      });
    } else if (subTotal >= 3 * million && subTotal < 5 * million) {
      const discount = Number((subTotal * 10) / 100);
      setDiscountCodeCurrent({
        name: "Giảm giá 10%",
        price: discount + (shippingCurrent ? shippingCurrent?.price : 0),
      });
    } else if (subTotal >= 1 * million && subTotal < 3 * million) {
      setDiscountCodeCurrent({
        name: "Miễn phí vận chuyển",
        price: shippingCurrent ? shippingCurrent?.price : 0,
      });
    } else {
      setDiscountCodeCurrent({ name: "Chưa đủ điều kiện", price: 0 });
    }
  }, [subTotal, shippingCurrent]);
  const onChangeStep = useMemo(() => {
    if (subTotal >= 5 * million) {
      setStepDiscount(3);
    } else if (subTotal >= 3 * million && subTotal < 5 * million) {
      setStepDiscount(2);
    } else if (subTotal >= 1 * million && subTotal < 3 * million) {
      setStepDiscount(1);
    } else {
      setStepDiscount(0);
    }
  }, [subTotal, shippingCurrent]);
  useEffect(() => {
    dispatch(cartActions.setDiscountCode(discountCodeCurrent));
    dispatch(cartActions.setShipping(shippingCurrent));
    if (products?.length) {
      dispatch(
        cartActions.setSubTotal(
          products?.reduce((acc, cur) => {
            return acc + (cur?.price - cur?.discount) * cur?.quantity;
          }, 0)
        )
      );
      if (subTotal > 0) {
        dispatch(
          cartActions.setTotal(
            Number(
              subTotal -
                (discountCodeCurrent?.price || 0) +
                shippingCurrent?.price
            )
          )
        );
      } else {
        dispatch(cartActions.setTotal(0));
      }
    }
  }, [products, subTotal, shippingCurrent, total]);
  useEffect(() => {
    dispatch(cartActions.setSubTotal(0));
    dispatch(cartActions.setTotal(0));
  }, [cartInfo?.products?.length < 1]);
  const handleSubmit = () => {
    if (!!!cartInfo?._id || cartInfo?.products?.length < 1) {
      message.error(`Oh, bạn chưa có sản phẩm nào trong giỏ hàng`);
    } else {
      if (!shippingCurrent || shippingCurrent?.value === "default") {
        message.error(`Hãy chọn phương thức vận chuyển`);
      } else {
        navigate(PATHS.CHECKOUT);
      }
    }
  };
  return (
    <main className="main-wrapper cartpage">
      <div className="container">
        <BreadCrumb>
          <BreadCrumb.Item link={`${PATHS.HOME}`}>Home</BreadCrumb.Item>

          <BreadCrumb.Item isActive>Giỏ Hàng</BreadCrumb.Item>
        </BreadCrumb>
        <div className="bg-advertising-banner-2 bg-no-repeat bg-cover xs:h-[100px] md:h-[140px] w-full relative ">
          <h3 className="font-om xs:text-[26px] w-full text-center md:text-[40px] text-white center-absolute z-20">
            Giỏ hàng
          </h3>
        </div>
        {cartInfo?._id && (
          <table className="table ">
            <thead>
              <tr>
                <td>Sản phẩm</td>
                <td>Tên Sản phẩm</td>
                <td>Giá</td>
                <td>Số lượng</td>
                <td>Tổng</td>
              </tr>
            </thead>
            <tbody className="table__body">
              {cartInfo?.products?.map((item, index) => {
                const {
                  image,
                  name,
                  _id,
                  product_id,
                  quantity,
                  price,
                  discount,
                } = item || {};
                return (
                  <tr key={_id}>
                    <td className="table__body-row ">
                      <Link
                        to={`${PATHS.SHOP.INDEX}/${product_id}`}
                        className="img rounded-lg duration-500 transition-all border border-solid border-[#fff]
                       hover:border-primary max-w-[90px]"
                      >
                        <img
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/error.png";
                          }}
                          className="max-w-[90px] rounded-lg center-absolute "
                          src={image?.[0]}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td className="">
                      <Link
                        to={`${PATHS.SHOP.INDEX}/${product_id}`}
                        className="leading-[20px] hover:text-primary duration-400 transition-colors"
                      >
                        {name}
                      </Link>
                    </td>
                    {width >= 768 ? (
                      <td className="tracking-wider">
                        <div className=" text-sm text-primary font-osb flex gap-3 items-center justify-center">
                          <span className="line-through text-black-555">
                            {formatPriceVND(price)}
                          </span>
                          <span className="text-16px">
                            {formatPriceVND(price - discount)}
                          </span>
                        </div>
                      </td>
                    ) : (
                      <td className="tracking-wider ">
                        <div className=" text-sm text-primary font-osb flex gap-3 items-center justify-center">
                          <span className="text-black-555">Giá:</span>
                          <span className="line-through text-black-555">
                            {formatPriceVND(price)}
                          </span>
                          <span className="text-16px">
                            {formatPriceVND(price - discount)}
                          </span>
                        </div>
                      </td>
                    )}
                    <td className="">
                      <div
                        className="flex items-center border border-solid border-[#ececec] rounded-md
                        h-[50px] justify-center w-fit mx-auto "
                      >
                        <QuantityInput
                          min={min}
                          max={max}
                          loading={
                            updateStatusUpdateCart !== THUNK_STATUS.fulfilled
                          }
                          value={quantity}
                          onChange={(value) => {
                            return onChangeQuantity(value, index);
                          }}
                        />
                      </div>
                    </td>
                    {width >= 768 ? (
                      <td className="text-black font-om tracking-wider">
                        {formatPriceVND(quantity * (price - discount))}
                      </td>
                    ) : (
                      <td className="text-black font-om tracking-wider">
                        Tổng: {formatPriceVND(quantity * (price - discount))}
                      </td>
                    )}
                    {width >= 768 ? (
                      <td className="">
                        <button
                          onClick={() => onDeleteProductInCart(_id)}
                          className="px-[10px] block xs:text-[12px] lg:text-[14px] text-white rounded-md 
                        py-[6px] hover:bg-red-500
                      bg-black-333 transition-all duration-400 mx-auto"
                        >
                          Xóa
                        </button>
                      </td>
                    ) : (
                      <td className="absolute top-0 right-3 w-[22px] p-0">
                        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                          <path
                            fill="#555"
                            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                          />
                        </svg>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!cartInfo?.products?.length && (
          <div className="w-full flex items-center justify-center ">
            <EmptyWrapper>
              <Empty description={`Không có sản phẩm`} />
            </EmptyWrapper>
          </div>
        )}
        <StepsWrapper className="p-[35px_0] m-[35px_0] border-t border-b border-solid border-black-be">
          <Steps
            current={stepDiscount}
            onChange={onChangeStep}
            items={[
              {
                title: "Miễn phí vận chuyển",
                description: `Cho đơn hàng trên ${formatPriceVND(
                  1 * million
                )} `,
              },
              {
                title: "Giảm 10%",
                description: `Cho đơn hàng trên ${formatPriceVND(
                  3 * million
                )} `,
              },
              {
                title: "Giảm 20%",
                description: `Cho đơn hàng trên ${formatPriceVND(
                  5 * million
                )} `,
              },
            ]}
          />
        </StepsWrapper>
        <div
          className="cartpage__total flex md:flex-row xs:flex-col items-start justify-start
           gap-[30px] mt-[30px]
                   "
        >
          <div className="coupon  xs:w-full md:w-[50%] border border-solid  border-grey-999">
            <h3 className="text-white bg-black-555 font-osb text-[16px] py-[10px] px-[20px]">
              Mã giảm giá
            </h3>
            <div className="flex items-center gap-2 p-[20px_20px] ">
              <input
                type="text"
                placeholder="Code"
                className="border border-solid border-grey-999 p-[11px] font-osr text-sm text-black
                  md:max-w-[300px] xs:max-w-[100%] w-full"
              />
              <button
                className="bg-black-555 font-ossb  p-[11.5px] text-[14px] text-white
                tracking-widest duration-400 transition-colors hover:bg-primary"
              >
                Sử dụng
              </button>
            </div>
          </div>

          <div className="  xs:w-full md:w-[50%] border border-solid border-grey-999">
            <h3 className="text-white bg-black-555 font-osb text-[16px] py-[10px] px-[20px]">
              Tổng kết
            </h3>
            <div className="flex justify-between items-center p-[16px_20px] ">
              <h4 className="text-[16px] font-om text-black">
                Tổng chưa giảm giá:
              </h4>
              <p className="text-[16px] font-om text-black tracking-wider">
                {formatPriceVND(subTotal)}
              </p>
            </div>
            <div className="flex justify-between items-center p-[16px_20px] ">
              <h4 className="text-[16px] font-om text-black">Giảm giá:</h4>
              <p className="text-[16px] font-om text-black tracking-wider">
                {`${
                  subTotal < 1 * million
                    ? discountCodeCurrent?.name
                    : discountCodeCurrent?.price
                    ? "-" + formatPriceVND(discountCodeCurrent?.price)
                    : formatPriceVND(discountCodeCurrent?.price)
                }`}
              </p>
            </div>
            <div className="flex justify-between items-center  p-[16px_20px] ">
              <h4 className="text-[16px] font-om text-black">Vận chuyển</h4>
              <Select
                defaultValue={optionShippingNoDiscount?.[0]?.value}
                value={shippingCurrent}
                onChange={onChangeShippingType}
                options={optionShippingNoDiscount}
              />
            </div>
            <div
              className="flex justify-between items-center p-[16px_20px] border-t border-solid
              border-grey-999"
            >
              <h4 className="text-[16px] font-om text-black">Tổng cộng:</h4>
              <p className="text-[16px] font-om text-black tracking-wider">
                {total && formatPriceVND(total)}
              </p>
            </div>
            <div className=" p-[14px_20px] ">
              <Button
                onClick={handleSubmit}
                className={`block text-center rounded-none w-full  md:p-[14px]`}
              >
                Thanh Toán
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
