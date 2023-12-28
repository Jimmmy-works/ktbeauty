import React from "react";
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
  background: #1c2020;
  opacity: 1;
  visibility: visible;
  &.remove {
    transition: all 0.4s;
    opacity: 0;
    visibility: hidden;
  }
  .loader {
    margin: 0 auto;
    width: 60px;
    height: 50px;
    text-align: center;
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 500;
    > div {
      height: 100%;
      width: 8px;
      display: inline-block;
      margin-left: 2px;
      animation: delay 0.8s infinite ease-in-out;
    }
    .bar1 {
      background-color: #754fa0;
    }
    .bar2 {
      background-color: #09b7bf;
      animation-delay: -0.7s;
    }
    .bar3 {
      background-color: #90d36b;
      animation-delay: -0.6s;
    }
    .bar4 {
      background-color: #f2d40d;
      animation-delay: -0.5s;
    }
    .bar5 {
      background-color: #fcb12b;
      animation-delay: -0.4s;
    }
    .bar6 {
      background-color: #ed1b72;
      animation-delay: -0.3s;
    }
  }
`;

const LoadingPage = ({ loadingPage }) => {
  return (
    <LoadingSpin className={`loading`}>
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>
    </LoadingSpin>
  );
};

export default LoadingPage;
