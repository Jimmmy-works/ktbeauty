import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
const Wrapper = styled.div`
  /* background-color: #f6f6f6; */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  filter: blur(50px);
`;
const LoadingSpinM = ({ size = 20, isloading, className }, ref) => {
  return (
    <div
      className={twMerge(
        `center-absolute h-screen w-scrh-screen flex items-center justify-center duration-700 transition-opacity ${
          isloading ? "opacity-100 " : "opacity-0 "
        } ${className ?? ""}`
      )}
      ref={ref}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: size,
            }}
            spin
          />
        }
      />
    </div>
  );
};
const LoadingSpin = forwardRef(LoadingSpinM);
export default LoadingSpin;
