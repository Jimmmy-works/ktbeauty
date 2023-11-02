import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import useProfile from "./useProfile";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { removeAccents } from "@/utils/removeAccents";
import styled from "styled-components";
const SelectWrapper = styled.div`
  background-color: #f9f9f9;
  margin-top: 12px;
  padding: 4.5px 0;
  max-height: 42px;
  border-bottom: 1px solid #999 !important;
  position: relative;
  .ant-select {
    color: #000 !important;
    position: unset !important;
    border: 0 !important;
    &:hover,
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
    onChangeWard,
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
      // province: profile?.province,
      // district: profile?.district,
      address: profile?.address,
      ward: profile?.ward,
    },
  });
  useEffect(() => {
    reset({
      name: profile?.name,
      email: profile?.email,
      phone: profile?.phone,
      // province: profile?.province,
      // district: profile?.district,
      address: profile?.address,
      ward: profile?.ward,
    });
  }, []);

  return (
    <main className="profile-account">
      <form className="form p-0" action="">
        <div className="form__container mt-0 ">
          <div
            className="form__container-wrapper w-full error 
            annimated-horizontal animated-bounceHorizontal"
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
            <p className="ml-[10px]">{errors?.name?.message || ""}</p>
          </div>
        </div>
        <div className="form__container">
          <div className="form__container-wrapper xs:w-full md:w-1/2">
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
            <p className="ml-[10px]">{errors?.phone?.message || ""}</p>
          </div>
          <div className="form__container-wrapper xs:w-full md:w-1/2">
            <label htmlFor="email">Email</label>
            <input
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
            <p className="ml-[10px]">{errors?.email?.message || ""}</p>
          </div>
        </div>
        <div className="form__container xs:flex-wrap lg:flex-nowrap">
          <div className="form__container-wrapper xs:w-full lg:w-1/3">
            <label htmlFor="city">Thành/Tỉnh</label>
            <Controller
              control={control}
              name="province"
              rules={{
                required: true,
              }}
              render={(
                {
                  formState,
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                } // :{ onChange, onBlur, value }
              ) => (
                <SelectWrapper>
                  <Select
                    // status={errors?.province && "error"}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn Tỉnh/Thành"
                    options={provinces}
                    value={provinceId || null}
                    showSearch
                    labelInValue={provinces?.label}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeProvince(value);
                    }}
                  />
                </SelectWrapper>
              )}
            />

            <p className="ml-[10px]">{errors?.city?.message || ""}</p>
          </div>
          <div className="form__container-wrapper xs:w-full lg:w-1/3">
            <label htmlFor="district">Quận/Huyện</label>
            <SelectWrapper>
              <Controller
                control={control}
                name="district"
                rules={{
                  required: true,
                }}
                render={(
                  { field } // :{ onChange, onBlur, value }
                ) => (
                  <Select
                    status={errors?.district && "error"}
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn Quận/Huyện"
                    options={districts}
                    value={districtId || null}
                    showSearch
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeDistrict(value);
                    }}
                  />
                )}
              />
            </SelectWrapper>
            <p className="ml-[10px]">{errors?.district?.message || ""}</p>
          </div>
          <div className="form__container-wrapper xs:w-full lg:w-1/3">
            <label htmlFor="ward">Phường/xã</label>
            <SelectWrapper>
              <Controller
                control={control}
                name="ward"
                rules={{
                  required: true,
                }}
                render={(
                  { field } // :{ onChange, onBlur, value }
                ) => (
                  <Select
                    status={errors?.ward && "error"}
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn Quận/Huyện"
                    options={wards}
                    value={wardId || null}
                    showSearch
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeWard(value);
                    }}
                  />
                )}
              />
            </SelectWrapper>
            <p className="ml-[10px]">{errors?.ward?.message || ""}</p>
          </div>
        </div>
        <div className="form__container-wrapper">
          <label htmlFor="address">Địa chỉ</label>
          <input
            {...register("address", {
              required: "Xin vui lòng chọn Quận/Huyện",
            })}
            id="address"
            placeholder="Địa chỉ chi tiết (Tòa A, Số 1, Tôn Đức Thắng)"
            type="text"
          />
          <p className="ml-[10px]">{errors?.address?.message || ""}</p>
        </div>
        <h3 className="font-osb text-black-333 text-md m-[30px_0_20px_0]">
          Đổi mật khẩu
        </h3>
        <div className="form__container-wrapper">
          <label htmlFor="password">Mật khẩu hiện tại</label>
          <input id="password" type="password" />
          <p className="ml-[10px]">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="form__container-wrapper">
          <label htmlFor="new-password">Mật khẩu mới</label>
          <input id="new-password" type="password" />
          <p className="ml-[10px]">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="form__container-wrapper">
          <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
          <input id="confirm-password " type="password" />
          <p className="ml-[10px]">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className=" lg:mt-[20px] flex">
          <Button className={`rounded-none flex items-center gap-3 py-[15px]`}>
            <p>Thay đổi</p>
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
        </div>
      </form>
    </main>
  );
};

export default Account;
