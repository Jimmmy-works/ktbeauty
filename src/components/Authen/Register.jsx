import React, { useEffect, useState } from "react";
import Button from "../Button";
import { Checkbox } from "antd";
import { useForm } from "react-hook-form";
import { THUNK_STATUS } from "@/contants/thunkstatus";
import { LoadingOutlined } from "@ant-design/icons";
import useDebounce from "@/hooks/useDebounce";

const Register = ({
  onOpenLogin,
  controlAuthen,
  onAuthenModal,
  onRegister,
  updateStatusRegister,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const handleRegister = async (data) => {
    try {
      if (
        updateStatusRegister !== THUNK_STATUS.pending ||
        updateStatusRegister !== THUNK_STATUS.rejected
      )
        onRegister(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div
      className={`register p-[50px_30px] md:shadow-[0px_5px_20px_5px_rgba(255,255,255,0.15)] transition-all 
      ease-cubic-authen duration-[600ms] center-absolute w-full h-fit max-w-[500px] z-[1003] ${
        controlAuthen === "register"
          ? "translate-y-[-50%] visible opacity-100 "
          : "translate-y-[200%] invisible opacity-0 "
      }`}
    >
      <h2
        className="text-center xs:text-[30px] md:text-[44px] tracking-[2px] text-white font-gvr
      xs:leading-[30px] md:leading-[60px]"
      >
        Đăng Ký
      </h2>
      <div
        className="group/hover w-[40px] h-[40px] flex items-center justify-center 
                    absolute top-2 right-2 cursor-pointer"
        onClick={onAuthenModal}
      >
        <svg className="xs:w-4 md:w-5 xs:h-4 md:h-5" viewBox="0 0 24 24">
          <path
            className="fill-white group-hover/hover:fill-primary duration-400 transition-colors"
            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
          />
        </svg>
      </div>
      <div className="xs:pt-[26px] md:pt-[40px] form">
        <div className="flex items-center gap-3 mt-0">
          <div className="form__container ">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.name ? "error" : ""
              }`}
            >
              <div className="relative">
                <svg
                  className="xs:w-[12px] md:w-[18px] xs:h-[12px] md:h-[18px] absolute xs:left-[15px] md:left-[20px] top-1/2 -translate-y-1/2 "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                  />
                </svg>
                <input
                  {...register("name", {
                    required: "Họ và tên không được bỏ trống.",
                  })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-0 xs:p-[14px_14px_14px_35px] md:p-[16px_16px_16px_45px] w-full h-full 
                  rounded-[50px] bg-[rgba(255,255,255,0.3)]
                  xs:text-xs md:text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="Họ và Tên"
                  type="text"
                />
              </div>
              <p className="ml-[10px]">{errors?.name?.message || ""}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3  mt-[12px]">
          <div className="form__container">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.email ? "error" : ""
              }`}
            >
              <div className="relative ">
                <svg
                  className="xs:w-[12px] md:w-[18px] xs:h-[12px] md:h-[18px]  absolute xs:left-[15px] md:left-[20px] top-1/2 -translate-y-1/2 "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z"
                  />
                </svg>
                <input
                  {...register("email", {
                    required: "Email không được bỏ trống.",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: `Nhập đúng định dạng abc@gmail.com`,
                    },
                  })}
                  className="mt-0 xs:p-[14px_14px_14px_35px] md:p-[16px_16px_16px_45px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                      xs:text-xs md:text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="Email đăng nhập"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="ml-[10px] ">{errors?.email?.message || ""}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3  mt-[12px]">
          <div className="form__container">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.password ? "error" : ""
              }`}
            >
              <div className="relative ">
                <svg
                  className="xs:w-[12px] md:w-[18px] xs:h-[12px] md:h-[18px]  absolute xs:left-[15px] md:left-[20px] top-1/2 -translate-y-1/2 "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M10 16c0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.985-1-1.723zm11-6v14h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-13 0h8v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4zm11 2h-14v10h14v-10z"
                  />
                </svg>
                <input
                  className="mt-0 xs:p-[14px_14px_14px_35px] md:p-[16px_16px_16px_45px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                      xs:text-xs md:text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="Mật khẩu"
                  type={`${!hiddenPassword ? "text" : "password"}`}
                  value={password}
                  {...register("password", {
                    required: "Mật khẩu không được bỏ trống.",
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => setHiddenPassword(!hiddenPassword)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 cursor-pointer p-[10px]"
                >
                  {!hiddenPassword ? (
                    <svg
                      className="xs:w-[16px] md:w-[20px] xs:h-[16px] md:h-[20px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="fill-white"
                        d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="xs:w-[16px] md:w-[20px] xs:h-[16px] md:h-[20px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="fill-white"
                        d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p className="ml-[10px]">{errors?.password?.message || ""}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3  mt-[12px]">
          <div className="form__container">
            <div
              className={`form__container-wrapper text-white  w-full ${
                errors?.phone ? "error" : ""
              }`}
            >
              <div className="relative ">
                <svg
                  className=" xs:w-[14px] md:w-[18px] xs:h-[16px] md:h-[20px] absolute xs:left-[15px] md:left-[20px] top-1/2 -translate-y-1/2  "
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-white"
                    d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z"
                  />
                </svg>
                <input
                  {...register("phone", {
                    required: "Số điện thoại không được bỏ trống",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "Số điện thoại không đúng định dạng VN",
                    },
                  })}
                  className="mt-0 xs:p-[14px_14px_14px_35px] md:p-[16px_16px_16px_45px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                      xs:text-xs md:text-[16px] font-mar text-white placeholder:text-white"
                  placeholder="+84"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <p className="ml-[10px]">{errors?.phone?.message || ""}</p>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-between gap-6 text-white relative mt-[20px]">
          <div className="pl-[10px]">
            <Checkbox
              value={agree}
              checked={agree}
              onChange={(e) => setAgree(!agree)}
            >
              Tôi đồng ý với các Điều khoản & Điều kiện *
            </Checkbox>
          </div>
        </div>
        <div className="mt-[20px]">
          <Button
            disabled={
              agree === true &&
              updateStatusRegister !== THUNK_STATUS.pending &&
              updateStatusRegister !== THUNK_STATUS.rejected
                ? false
                : true
            }
            onClick={handleSubmit(handleRegister)}
            className={`xs:p-[12px_12px_12px_12px] md:p-[16px_16px_16px_16px] xs:text-sm md:text-md
             bg-[#dddddd] text-black-333 border-transparent  w-full`}
          >
            {updateStatusRegister === THUNK_STATUS.pending ? (
              <LoadingOutlined />
            ) : (
              "  Đăng ký"
            )}
          </Button>
        </div>
        <div className=" flex items-center justify-center gap-6 text-white relative xs:mt-[20px] md:mt-[30px]">
          <a className="text-white font-mar text-sm ">
            Bạn đã có tài khoản?
            <strong
              onClick={onOpenLogin}
              className=" font-mab ml-[4px] cursor-pointer duration-400 transition-colors hover:text-primary "
            >
              Đăng nhập
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
