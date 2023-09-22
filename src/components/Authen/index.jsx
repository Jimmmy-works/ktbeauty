import React from "react";
import Register from "./Register";
import Login from "./Login";
import { useMainContext } from "../MainContext";

const AuthenModal = () => {
  const { onLogin, onRegister, onAuthenModal, isAuthenModal, controlAuthen } =
    useMainContext();
  const loginProps = {
    controlAuthen,
    onRegister,
    onAuthenModal,
  };
  const registerProps = {
    onLogin,
    controlAuthen,
    onAuthenModal,
  };
  return (
    <div
      className={` login w-screen h-screen bg-slider-2 z-[1000] bg-cover bg-center 
     fixed top-0 left-0 after:w-screen after:h-screen after:z-[1001] after:bg-[rgba(0,0,0,0.3)] 
     after:top-0 after:left-0 after:absolute  duration-400 transition-all   ${
       isAuthenModal ? "visible opacity-100" : "invisible opacity-0 "
     }`}
    >
      <div
        className={`login__inner  flex items-center justify-center h-full w-full center-absolute z-[1002] bg-transparent
          overflow-hidden `}
      >
        <div
          onClick={onAuthenModal}
          className="absolute w-full h-full z-[1002] cursor-pointer"
        ></div>
        {/* <div className="relative  max-h-[600px] shadow-[0px_5px_20px_5px_rgba(126, 105, 105, 0.2)] h-full w-full"> */}
        <Login {...loginProps} />
        <Register {...registerProps}></Register>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AuthenModal;
