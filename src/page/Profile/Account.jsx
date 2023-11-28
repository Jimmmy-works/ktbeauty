import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import useProfile from "./useProfile";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { removeAccents } from "@/utils/removeAccents";
import styled from "styled-components";
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
const Account = () => {
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrist, setNameDistrist] = useState("");
  const [nameWard, setNameWard] = useState("");
  const {
    provinces,
    districts,
    wards,
    profile,
    provinceId,
    districtId,
    wardId,
    onChangeProvince,
    onChangeDistrict,
    onUpdateProfile,
    onChangeWard,
    onChangePassword,
  } = useProfile();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      province: profile?.province?._id,
      district: profile?.district?._id,
      ward: profile?.ward?._id,
    },
    values: {
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      province: profile?.province?._id,
      district: profile?.district?._id,
      ward: profile?.ward?._id,
    },
  });
  const handleUpdateProfile = (data) => {
    const payload = {
      value: {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        province: { name: nameProvince, _id: provinceId },
        district: { name: nameDistrist, _id: districtId },
        ward: { name: nameWard, _id: wardId },
      },
      id: profile?._id,
    };
    // if (
    //   getValues("password") !== "" &&
    //   getValues("newPassword") !== "" &&
    //   getValues("confirmPassword") !== ""
    // ) {
    // }
    onUpdateProfile(payload);
  };
  const handleUpdatePassword = (data) => {
    const payload = {
      userId: getValues("password"),
      newPassword: getValues("newPassword"),
      confirmNewPassword: getValues("confirmPassword"),
    };
    console.log("payload", payload);
    // onChangePassword({
    //   userId: getValues("password"),
    //   newPassword: getValues("newPassword"),
    //   confirmNewPassword: getValues("confirmPassword"),
    // });
  };

  useEffect(() => {
    reset({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      address: profile?.address,
      province: profile?.province?._id,
      district: profile?.district?._id,
      ward: profile?.ward?._id,
    });
  }, [profile]);
  return (
    <main className="profile-account">
      <div className="form p-0" action="">
        <div className="form__container mt-0 ">
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
              type="text"
              id="phone"
            />
            <p className="">{errors?.phone?.message || ""}</p>
          </div>
          <div
            className={`form__container-wrapper xs:w-full md:w-1/2 ${
              errors?.email?.message
                ? "annimated-horizontal error animated-bounceHorizontal"
                : "success"
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              className="pointer-events-none"
              {...register("email", {
                required: "Email không được bỏ trống.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: `Nhập đúng định dạng abc@gmail.com`,
                },
              })}
              type="text"
              placeholder="abc@gmail.com"
              id="email"
            />
            <p className="">{errors?.email?.message || ""}</p>
          </div>
        </div>
        <div className="form__container xs:flex-wrap lg:flex-nowrap">
          <div
            className={`form__container-wrapper xs:w-full lg:w-1/3 ${
              errors?.province?.message
                ? "annimated-horizontal error animated-bounceHorizontal"
                : "successsuccess"
            }
          `}
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
                      value={provinceId || profile?.province?._id}
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
                      value={districtId || profile?.district?._id}
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
                      value={wardId || profile?.ward?._id}
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
        <div
          className={`form__container-wrapper ${
            errors?.address?.message
              ? "annimated-horizontal error animated-bounceHorizontal"
              : ""
          } ${getValues("address") && "success"}`}
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
          <p className="">{errors?.address?.message || ""}</p>
        </div>
        <h3 className="font-osb text-black-333 text-md m-[30px_0_20px_0]">
          Đổi mật khẩu
        </h3>
        <div
          className={`form__container-wrapper ${
            errors?.password?.message
              ? "annimated-horizontal error animated-bounceHorizontal"
              : ""
          } ${getValues("password") && "success"}`}
        >
          <label htmlFor="password">Mật khẩu hiện tại</label>
          <input {...register("password")} id="password" type="password" />
          <p className="">Lorem ipsum dolor sit amet.</p>
        </div>
        <div
          className={`form__container-wrapper ${
            errors?.newPassword?.message
              ? "annimated-horizontal error animated-bounceHorizontal"
              : ""
          } ${getValues("newPassword") && "success"}`}
        >
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input
            {...register("newPassword", {
              validate: () => {
                const password = getValues("password");
              },
            })}
            id="newPassword"
            type="password"
          />
          <p className="">Lorem ipsum dolor sit amet.</p>
        </div>
        <div
          className={`form__container-wrapper ${
            errors?.confirmPassword?.message
              ? "annimated-horizontal error animated-bounceHorizontal"
              : ""
          } ${getValues("confirmPassword") && "success"}`}
        >
          {/* {!hiddenPassword ? (
            <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
              <path
                className="fill-white"
                d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
              />
            </svg>
          // ) : (
            <svg className="w-[20px] h-[20px] " viewBox="0 0 24 24">
              <path
                className="fill-white"
                d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
              />
            </svg>
          )} */}
          <label htmlFor="confirmPassword">Nhập lại mật khẩu mới</label>
          <input
            {...register("confirmPassword", {
              validate: (match) => {
                console.log("match", match);
                const newPassword = getValues("newPassword");
                return match === newPassword || "Mật khẩu không giống";
              },
            })}
            id="confirmPassword "
            type="password"
          />
          <p className="">{errors?.confirmPassword?.message || ""}</p>
        </div>
        <div className=" lg:mt-[20px] gap-[20px] flex">
          <Button
            onClick={handleSubmit(handleUpdateProfile)}
            className={`rounded-none flex items-center gap-3 py-[15px]`}
          >
            <p>Lưu thông tin</p>
            <svg
              className="w-[20px] h-[20px] group-hover/hover:stroke-white  stroke-primary  transition-colors duration-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z" />
              <rect width="10" height="8" x="7" y="13" />
              <rect width="8" height="5" x="8" y="3" />
            </svg>
          </Button>
          <Button
            onClick={handleSubmit(handleUpdatePassword)}
            className={`rounded-none flex items-center gap-3 py-[15px]`}
          >
            <p>Thay đổi mật khẩu</p>
            <svg
              viewBox="0 0 24 24"
              className="w-[20px] h-[20px] group-hover/hover:fill-white  fill-primary  transition-colors duration-400"
            >
              <path d="M23.621 9.012c.247.959.379 1.964.379 3 0 6.623-5.377 11.988-12 11.988s-12-5.365-12-11.988c0-6.623 5.377-12 12-12 2.581 0 4.969.822 6.927 2.211l1.718-2.223 1.935 6.012h-6.58l1.703-2.204c-1.62-1.128-3.582-1.796-5.703-1.796-5.52 0-10 4.481-10 10 0 5.52 4.48 10 10 10 5.519 0 10-4.48 10-10 0-1.045-.161-2.053-.458-3h2.079zm-7.621 7.988h-8v-6h1v-2c0-1.656 1.344-3 3-3s3 1.344 3 3v2h1v6zm-5-8v2h2v-2c0-.552-.448-1-1-1s-1 .448-1 1z" />
            </svg>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Account;
