import BreadCrumb from "@/components/BreadCrumb";
import Button from "@/components/Button";
import { PATHS } from "@/contants/path";
import { createOrder } from "@/store/reducer/orderReducer";
import { removeAccents } from "@/utils/removeAccents";
import useWindowSize from "@/utils/windowResize";
import { Checkbox, Empty, Select, Switch, Tooltip, message } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCheckout from "./useCheckout";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { formatPriceVND } from "@/utils/formatPrice";
const SelectWrapper = styled.div`
  .select-antd-wrapper {
    background-color: #f9f9f9;
    margin-top: 12px;
    padding: 4.5px 0;
    max-height: 42px;
    border-bottom: 1px solid #999 !important;
    position: relative;
    &.error {
      border: 1px solid rgb(239 68 68) !important;
    }
    &.success {
      border-bottom: 1px solid rgb(21 128 61) !important;
    }
  }
  .ant-select {
    color: #000 !important;
    position: unset !important;
    border: 0 !important;
    :focus,
    :focus-within,
    :focus-visible {
      border-color: transparent !important;
      color: #000 !important;
      box-shadow: unset !important;
    }
    .ant-select-selection-item {
    }
    .ant-select-selector {
      border: 0 !important;
      background-color: #f9f9f9 !important;
      font-size: 14px !important;
      color: #333 !important;
      border-radius: 0;
      position: unset !important;
      font-family: "OpenSans-Regular" !important;
      .ant-select-selection-search {
      }
      .ant-select-selection-search-input {
        height: 100% !important;
      }
    }
  }
`;
const FormWrapper = styled.div`
  .ant-switch {
    cursor: pointer;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1) !important;
  }
`;
const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-empty-image {
    width: 100px !important;
    height: 100px !important;
  }
`;
const Checkout = () => {
  //// redux
  const dispatch = useDispatch();
  // const { orderList } = useSelector((state) => state.order);

  ////
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrist, setNameDistrist] = useState("");
  const [nameWard, setNameWard] = useState("");
  const { width } = useWindowSize();
  const {
    onToggleSwitch,
    controlSwitch,
    profile,
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    cartInfo,
    form,
    statusCreateOrder,
  } = useCheckout();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    reset,
    trigger,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = form || {};
  const discountCode = localStorage.getItem("discount");
  const shipping = localStorage.getItem("shipping");
  const total = Number(localStorage.getItem("total"));
  const subTotal = Number(localStorage.getItem("subTotal"));
  const handleChangeSwitch = () => {
    onToggleSwitch();
  };
  const million = 1000000;
  const handleOrder = async (data) => {
    const payload = {
      user_id: profile?._id,
      products: [...cartInfo?.products],
      name: data?.name || profile?.name,
      phone: data?.phone || profile?.phone,
      email: data?.email || profile?.email,
      address: `${watch("address")} ${nameWard || profile?.ward?.name}, ${
        nameDistrist || profile?.district?.name
      }, ${nameProvince || profile?.province?.name}`,
      note: data?.note,
      discount: {
        type: JSON.parse(discountCode)?.name,
        price: Number(JSON.parse(discountCode)?.price),
      },
      shipping: {
        type: JSON.parse(shipping)?.value || "",
        label: JSON.parse(shipping)?.label || "",
        price: Number(JSON.parse(shipping)?.price) || 0,
      },
      payment_method: "cod",
      subTotal: subTotal,
      total: total,
    };
    if (JSON.parse(shipping)?.value === "default") {
      message.error(`Xin vui lòng chọn phương thức vận chuyển`);
    } else if (payload?.products?.length < 1) {
      message.error(`Bạn chưa có sản phẩm trong giỏ hàng`);
    } else {
      dispatch(createOrder(payload));
    }
  };
  return (
    <main className="checkout main-wrapper relative">
      <div className="container ">
        <FormWrapper className="relative z-10">
          <BreadCrumb>
            <BreadCrumb.Item>
              <Link to={`${PATHS.HOME}`}>Home</Link>
            </BreadCrumb.Item>
            <BreadCrumb.Item isActive>
              <Link>Thanh Toán</Link>
            </BreadCrumb.Item>
          </BreadCrumb>
          <div className="bg-advertising-banner-2 bg-no-repeat bg-cover xs:h-[100px] md:h-[140px] w-full relative ">
            <h3 className="font-om xs:text-[26px] w-full text-center md:text-[40px] text-white center-absolute z-20">
              Thanh Toán
            </h3>
          </div>
          <div className="flex lg:flex-row xs:flex-col items-start mt-[30px] xs:gap-[20px] md:gap-[40px]">
            <div className="xs:w-full lg:w-[60%] screen-1200:w-[65%]">
              <div className="checkout__information  form" action="">
                <div className="flex items-center justify-between">
                  <h3 className="form__title">Liên hệ</h3>
                  <div className="">
                    <Tooltip
                      title={`${
                        !controlSwitch ? "Bật" : "Tắt"
                      } tự động điền thông tin`}
                    >
                      <Switch
                        size="large"
                        checkedChildren="Auto"
                        unCheckedChildren="None"
                        defaultChecked={controlSwitch}
                        onChange={handleChangeSwitch}
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="form__container">
                  <div
                    className={`form__container-wrapper xs:w-full md:w-1/2 ${
                      errors?.phone?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : "success"
                    }`}
                  >
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      {...register("phone", {
                        required: "Số điện thoại không được bỏ trống",
                        pattern: {
                          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: "Số điện thoại không đúng định dạng VN",
                        },
                      })}
                      placeholder="+84"
                      type="number"
                      id="phone"
                    />
                    <p className="">{errors?.phone?.message || ""}</p>
                  </div>

                  <div
                    className={`form__container-wrapper  xs:w-full md:w-1/2 ${
                      errors?.email?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : "success"
                    } `}
                  >
                    <label htmlFor="email">Email của bạn</label>
                    <input
                      {...register("email", {
                        required: "Email không được bỏ trống.",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: `Nhập đúng định dạng abc@gmail.com`,
                        },
                      })}
                      placeholder="abc@gmail.com"
                      id="email"
                      type="text"
                    />
                    <p className="">{errors?.email?.message || ""}</p>
                  </div>
                </div>
                <div>
                  <Checkbox>Gửi email ưu đãi mới nhất cho bạn</Checkbox>
                </div>
              </div>
              <form className="form mt-[20px]" action="">
                <h3 className="form__title">Chi tiết thanh toán</h3>
                <div className="form__container">
                  <div
                    className={`form__container-wrapper w-full  ${
                      errors?.name?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : "success"
                    }`}
                  >
                    <label htmlFor="name">Họ và tên</label>
                    <input
                      {...register("name", {
                        required: "Họ và tên không được bỏ trống.",
                      })}
                      className=" "
                      type="text"
                      id="name"
                    />
                    <p className="">{errors?.name?.message || ""}</p>
                  </div>
                </div>
                <div
                  className={`form__container-wrapper ${
                    errors?.address?.message
                      ? "annimated-horizontal error animated-bounceHorizontal"
                      : "success"
                  }`}
                >
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    {...register("address", {
                      required: "Xin vui lòng điền địa chỉ cụ thể",
                    })}
                    id="address"
                    placeholder="Địa chỉ chi tiết (Tòa A, Số 1, Tôn Đức Thắng)"
                    type="text"
                  />
                  <p className="">{errors?.address?.message}</p>
                </div>
                <div className="form__container xs:flex-wrap lg:flex-nowrap">
                  <div
                    className={`form__container-wrapper xs:w-full lg:w-1/3 ${
                      errors?.province?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : "successsuccess"
                    } `}
                  >
                    <label htmlFor="province">Thành/Tỉnh</label>

                    <Controller
                      control={control}
                      name="province"
                      rules={{
                        required: "Xin vui lòng chọn Tỉnh/Thành",
                      }}
                      render={({ field }) => (
                        // :{ onChange, onBlur, value }
                        <SelectWrapper>
                          <div
                            className={`select-antd-wrapper ${
                              errors?.province?.message ? " error " : ""
                            } ${getValues("province") && "success"}`}
                          >
                            <Select
                              // status={errors?.province && "error"}
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                removeAccents(option?.label ?? "")
                                  .toLowerCase()
                                  .includes(removeAccents(input.toLowerCase()))
                              }
                              style={{ width: "100%" }}
                              placeholder="Tỉnh/Thành"
                              options={provinces}
                              value={provinceId}
                              showSearch
                              labelInValue={provinces?.label}
                              onChange={(value, e) => {
                                field.onChange(value);
                                onChangeProvince(value);
                                setNameProvince(e.label);
                              }}
                            />
                          </div>
                        </SelectWrapper>
                      )}
                    />
                    <p className="">{errors?.province?.message || ""}</p>
                  </div>

                  <div
                    className={`form__container-wrapper xs:w-full lg:w-1/3 ${
                      errors?.district?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : ""
                    } `}
                  >
                    <label htmlFor="district">Quận/Huyện</label>
                    <Controller
                      control={control}
                      name="district"
                      rules={{
                        required: "Xin vui lòng chọn Quận/Huyện",
                      }}
                      render={(
                        { field } // :{ onChange, onBlur, value }
                      ) => (
                        <SelectWrapper>
                          <div
                            className={`select-antd-wrapper ${
                              errors?.district?.message
                                ? "annimated-horizontal error animated-bounceHorizontal"
                                : ""
                            } ${getValues("district") && "success"}`}
                          >
                            <Select
                              status={errors?.district && "error"}
                              filterOption={(input, option) =>
                                removeAccents(option?.label ?? "")
                                  .toLowerCase()
                                  .includes(removeAccents(input.toLowerCase()))
                              }
                              optionFilterProp="children"
                              style={{ width: "100%" }}
                              placeholder="Quận/Huyện"
                              options={districts}
                              value={districtId}
                              showSearch
                              onChange={(value, e) => {
                                field.onChange(value);
                                onChangeDistrict(value);
                                setNameDistrist(e.label);
                              }}
                            />
                          </div>
                        </SelectWrapper>
                      )}
                    />
                    <p className="">{errors?.district?.message || ""}</p>
                  </div>
                  <div
                    className={`form__container-wrapper xs:w-full lg:w-1/3 ${
                      errors?.ward?.message
                        ? "annimated-horizontal error animated-bounceHorizontal"
                        : ""
                    }`}
                  >
                    <label htmlFor="ward">Phường/xã</label>
                    <Controller
                      control={control}
                      name="ward"
                      rules={{
                        required: "Xin vui lòng nhập Phường/Xã",
                      }}
                      render={(
                        { field } // :{ onChange, onBlur, value }
                      ) => (
                        <SelectWrapper>
                          <div
                            className={`select-antd-wrapper ${
                              errors?.ward?.message
                                ? "annimated-horizontal error animated-bounceHorizontal"
                                : ""
                            }  ${getValues("ward") && "success"}`}
                          >
                            <Select
                              status={errors?.ward && "error"}
                              filterOption={(input, option) =>
                                removeAccents(option?.label ?? "")
                                  .toLowerCase()
                                  .includes(removeAccents(input.toLowerCase()))
                              }
                              optionFilterProp="children"
                              style={{ width: "100%" }}
                              placeholder="Phường/Xã"
                              options={wards}
                              value={wardId}
                              showSearch
                              onChange={(value, e) => {
                                field.onChange(value);
                                onChangeWard(value);
                                setNameWard(e.label);
                              }}
                            />
                          </div>
                        </SelectWrapper>
                      )}
                    />
                    <p className="">{errors?.ward?.message || ""}</p>
                  </div>
                </div>

                <div className="form__container-wrapper ">
                  <label htmlFor="note">Ghi chú</label>
                  <textarea
                    {...register("note")}
                    className="textarea"
                    placeholder="Ghi chú cho đơn hàng"
                    id="note"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <p className="">{errors?.note?.message}</p>
                </div>
              </form>
            </div>
            <div
              className="xs:w-full lg:w-[40%] screen-1200:w-[35%] xs:p-[0] md:py-[30px] md:px-[40px] 
             md:bg-[#f9f9f9]"
            >
              {width < 768 && (
                <h3 className="font-osb text-black-333 text-md my-[20px]">
                  Giỏ hàng của bạn
                </h3>
              )}
              <div className="pb-[20px] border-b border-solid border-[#e2e0e0]">
                {cartInfo?.products?.length ? (
                  cartInfo?.products?.map((item) => {
                    const { image, name, _id, quantity, price, discount } =
                      item || {};
                    return (
                      <div
                        key={_id}
                        className="flex items-center justify-between gap-[15px] not-firstChild:mt-[14px]"
                      >
                        <div className="flex items-center gap-[12px]">
                          <Link
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
                              to={PATHS.SHOP.DETAIL}
                              className="text-xs text-white font-om rounded-[50%] bg-[#908f8f]  h-[22px] w-[22px]
                                     flex items-center justify-center absolute right-[-8px] top-[2px] -translate-y-1/2
                                  group-hover/hover:bg-primary duration-400 transition-colors "
                            >
                              {quantity || 0}
                            </span>
                          </Link>
                          <Link
                            to={PATHS.SHOP.DETAIL}
                            className="text-sm text-black-333 font-om truncate whitespace-normal line-clamp-4
                         duration-400 transition-colors hover:text-primary"
                          >
                            {name}
                          </Link>
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
                  })
                ) : (
                  <EmptyWrapper>
                    <Empty description={false} />
                  </EmptyWrapper>
                )}
              </div>
              <div
                className="flex items-center gap-2 py-[20px] border-b border-solid
                    border-[#e2e0e0] "
              >
                <input
                  type="text"
                  placeholder="Discount code"
                  className={`border border-solid border-grey-999 p-[11px] font-osr text-sm text-black
                  w-full `}
                />
                <button
                  className="bg-black-555 font-om font-semibold p-[11.5px] text-[14px] text-white
                  tracking-widest duration-400 transition-colors hover:bg-primary"
                >
                  Apply
                </button>
              </div>
              <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                <div className="flex items-center justify-between ">
                  <h4 className="font-osb text-sm text-black-333">
                    Tổng chưa giảm giá
                  </h4>
                  <p className="font-osb text-sm text-primary tracking-wider">
                    {formatPriceVND(subTotal)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-[20px]">
                  <h4 className="font-osb text-sm text-black-333">
                    Vận chuyển
                  </h4>
                  {JSON.parse(shipping)?.value !== "default" ? (
                    <a className="capitalize font-osb text-sm text-primary">
                      {JSON.parse(shipping)?.label}
                    </a>
                  ) : (
                    <Link
                      to={PATHS.CART}
                      className="font-osb text-sm text-black-333 relative before:w-full before:h-[1px]
                  before:absolute before:bg-black-333 before:bottom-[-4px] duration-400 transition-colors
                  before:duration-400 before:transition-colors hover:before:bg-primary hover:text-primary
                  cursor-pointer"
                    >
                      Chọn phương thức
                    </Link>
                  )}
                </div>
              </div>
              {JSON.parse(discountCode).hasOwnProperty("price") && (
                <div className=" py-[20px] border-b border-solid border-[#e2e0e0] ">
                  <div className="flex items-start justify-between font-osb text-sm text-black-333">
                    <p>Tổng giảm giá</p>
                    <p className="text-primary tracking-wider">
                      {total >= 1 * million && JSON.parse(shipping)?.price > 0
                        ? `- ${formatPriceVND(JSON.parse(discountCode)?.price)}`
                        : formatPriceVND(JSON.parse(discountCode)?.price)}
                    </p>
                  </div>
                  <div className="flex items-start justify-between mt-[14px] ">
                    <p className="pl-[6px] font-om text-[12px] text-black-333">
                      {`1. ` + JSON.parse(discountCode)?.name}
                    </p>
                    <p className="font-osb text-[12px] text-black-333 tracking-wider">
                      {formatPriceVND(
                        JSON.parse(discountCode)?.price -
                          JSON.parse(shipping)?.price
                      )}
                    </p>
                  </div>
                  <div className="flex items-start justify-between mt-[14px] ">
                    <p className="pl-[6px] font-om text-[12px] text-black-333 ">
                      {` ${
                        subTotal >= 3 * million &&
                        JSON.parse(shipping)?.price > 0
                          ? `2. Miễn phí vận chuyển`
                          : ""
                      } `}
                    </p>
                    <p className="font-osb text-[12px] text-black-333 tracking-wider">
                      {` ${
                        subTotal >= 3 * million &&
                        JSON.parse(shipping)?.price > 0
                          ? formatPriceVND(JSON.parse(shipping)?.price)
                          : ""
                      }`}
                    </p>
                  </div>
                </div>
              )}
              <div className=" py-[20px] flex items-center justify-between">
                <h4 className="font-osb text-md text-black-333">Tổng cộng</h4>
                <p className="font-osb text-md text-primary ">
                  {formatPriceVND(total)}
                </p>
              </div>
              <div className="mt-[10px] relative">
                <Button
                  disabled={
                    statusCreateOrder === THUNK_STATUS.pending ? true : false
                  }
                  // link={PATHS.COMPLETE}
                  onClick={handleSubmit(handleOrder)}
                  className={`block text-center rounded-none w-full md:p-[14px] ${
                    statusCreateOrder === THUNK_STATUS.pending
                      ? "border-black-be "
                      : ""
                  }`}
                >
                  {statusCreateOrder === THUNK_STATUS.pending ? (
                    <div className={`flex items-center justify-center `}>
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              color: "#555",
                              fontSize: 16,
                            }}
                            spin
                          />
                        }
                        size="default"
                      />
                    </div>
                  ) : (
                    "Đặt hàng"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </FormWrapper>
      </div>
    </main>
  );
};

export default Checkout;
