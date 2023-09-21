import React from "react";
import { Spin } from "antd";
import { styled } from "styled-components";

const LoadingSpin = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: fixed;
  z-index: 10000;
  background-color: #171616;
`;
const LoadingPage = ({ loadingPage }) => {
  return (
    <LoadingSpin
      className={`loading  
      ${
        loadingPage
          ? "opacity-100 visible"
          : "opacity-0 invisible transition-all duration-500"
      }
     `}
    >
      <span className=" animated-transfer-page w-[20px] h-[20px] bg-green-300 block rounded-[50%]"></span>
      <span className="animated-transfer-page-2 w-[20px] h-[20px] bg-blue-300 block rounded-[50%]"></span>
      <span className="animated-transfer-page-3 w-[20px] h-[20px] bg-red-300 block rounded-[50%]"></span>
      {/* <Spin size="large"></Spin> */}
    </LoadingSpin>
  );
};

export default LoadingPage;
