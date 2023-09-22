import React from "react";
import Button from "../Button";
import { Checkbox } from "antd";
import { useMainContext } from "../MainContext";

const Login = ({ controlAuthen, onRegister, onAuthenModal }) => {
  return (
    <div
      className={` md:shadow-[0px_5px_20px_5px_rgba(255,255,255,0.15)] p-[50px_30px] transition-all 
      ease-cubic-authen duration-[600ms] center-absolute w-full h-fit max-w-[500px] z-[1003] ${
        controlAuthen === "login"
          ? "translate-y-[-50%] visible opacity-100 "
          : "translate-y-[-200%] invisible opacity-0"
      }`}
    >
      <h2 className="text-center text-[44px] tracking-[2px] text-white font-gvr leading-[60px]">
        Login
      </h2>
      <div
        className="group/hover w-[40px] h-[40px] flex items-center justify-center 
      absolute top-2 right-2 cursor-pointer"
        onClick={onAuthenModal}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            className="fill-white group-hover/hover:fill-primary duration-400 transition-colors"
            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"
          />
        </svg>
      </div>
      <div className="mt-[40px]">
        <div className="flex items-center gap-6 text-white relative">
          <svg
            className="w-[18px] h-[18px] absolute left-[20px] top-1/2 -translate-y-1/2 "
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
            />
          </svg>
          <input
            className="p-[16px_16px_16px_50px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                      text-[16px] font-mar text-white placeholder:text-white"
            placeholder="Username or Email"
            type="text"
          />
        </div>
        <div className="flex items-center gap-6 text-white relative mt-[20px]">
          <svg
            className="w-[18px] h-[18px] absolute left-[20px] top-1/2 -translate-y-1/2 "
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M10 16c0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.985-1-1.723zm11-6v14h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-13 0h8v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4zm11 2h-14v10h14v-10z"
            />
          </svg>
          <input
            className="p-[16px_16px_16px_50px] w-full h-full rounded-[50px] bg-[rgba(255,255,255,0.3)]
                        text-[16px] font-mar text-white placeholder:text-white"
            placeholder="Password"
            type="text"
          />
        </div>
        <div className=" flex items-center justify-between gap-6 text-white relative mt-[20px]">
          <div className="pl-[20px]">
            <Checkbox>Remember Me</Checkbox>
          </div>
          <div className="pr-[20px]">
            <a
              className="text-white font-mar text-sm cursor-pointer duration-400 transition-colors
                      hover:text-primary"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="  mt-[20px]">
          <Button
            className={`p-[16px_16px_16px_16px] text-md bg-[#dddddd] text-black-333 border-transparent  w-full`}
          >
            Sign in
          </Button>
        </div>
        <div className=" flex items-center justify-center gap-6 text-white relative mt-[30px]">
          <a className="text-white font-mar text-sm ">
            Don't have an account?{" "}
            <strong
              onClick={onRegister}
              className="ml-[4px] font-mab  cursor-pointer duration-400 transition-colors hover:text-primary "
            >
              Register
            </strong>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;