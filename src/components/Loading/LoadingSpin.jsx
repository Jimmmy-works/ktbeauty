import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  /* background-color: #f6f6f6; */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  filter: blur(50px);
`;
const LoadingSpin = ({ size = 20, isloading = true }) => {
  return (
    <div
      className={`center-absolute h-full w-full flex items-center justify-center duration-700 transition-opacity ${
        isloading ? "opacity-100 " : "opacity-0 "
      }`}
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

export default LoadingSpin;
