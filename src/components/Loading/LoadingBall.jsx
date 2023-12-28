import React, { forwardRef } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  .circle {
    display: inline-block;
    background-color: ${(props) => (props.color ? `${props.color}` : "#333")};
    height: ${(props) => (props.size ? `${props.size}px` : "15px")};
    width: ${(props) => (props.size ? `${props.size}px` : "15px")};
    border-radius: 25px;
  }
  #ball-1 {
    -webkit-animation-name: bounce;
    -webkit-animation-delay: 0.8s;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
  }
  #ball-2 {
    -webkit-animation-name: bounce;
    -webkit-animation-delay: 0.9s;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
  }
  #ball-3 {
    -webkit-animation-name: bounce;
    -webkit-animation-delay: 1s;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
  }
  @-webkit-keyframes bounce {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(10px);
    }
    60% {
      transform: translateY(-12px);
    }
    80% {
      transform: translateY(0);
    }
  }
`;
const LoadingBallM = ({ size, color, isloading, className }, ref) => {
  return (
    <Wrapper size={size} color={color}>
      <div id="ball-1" class="circle"></div>
      <div id="ball-2" class="circle"></div>
      <div id="ball-3" class="circle"></div>
    </Wrapper>
  );
};
const LoadingBall = forwardRef(LoadingBallM);
export default LoadingBall;
