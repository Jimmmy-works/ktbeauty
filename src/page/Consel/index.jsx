import React, { useState } from "react";
import Header from "../Header";
import { Col, Row, Steps } from "antd";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const ConselPage = () => {
  const [controlSteps, setControlSteps] = useState();
  const [test1, setTest1] = useState(false);
  const [test2, setTest2] = useState(false);
  const [test3, setTest3] = useState(false);
  const [test4, setTest4] = useState(false);
  const [test5, setTest5] = useState(false);

  return (
    <>
      <Header />
      <main className="main-wrapper h-full w-full">
        <div className="container">
          <div className="conselpage w-full h-full my-[40px]">
            <div className="conselpage__step my-[50px]">
              <Steps
                current={controlSteps}
                items={[
                  {
                    title: "Bước 1",
                  },
                  {
                    title: "Bước 2",
                  },
                  {
                    title: "Bước 3",
                  },
                  {
                    title: "Bước 4",
                  },
                  {
                    title: "Bước 5",
                  },
                ]}
              />
            </div>
            <div className="conselpage__content">
              <div className="conselpage__content-item">
                <h3 className="font-ossb text-lg text-black-555 my-[50px] text-center">
                  Bước 1: Giới tính của bạn là?
                </h3>
                <div className="consel-sex flex items-center -mx-[10px] ">
                  <div
                    className="consel-sex-item cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500
                      relative before:content-['Nam'] before:absolute before:text-[100px] before:font-om
                      before:bg-[rgba(0,0,0,0.5)] before:w-full before:h-full before:flex before:justify-center 
                      before:items-center
                before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-1.png 2x" alt="" />
                  </div>
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500
                      relative before:content-['Nam'] before:absolute
                before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-2.png 2x" alt="" />
                  </div>
                </div>
              </div>
              <div className="conselpage__content-item">
                <h3 className="font-ossb text-lg text-black-555 my-[50px] text-center">
                  Bước 2: Bạn thuộc độ tuổi nào?
                </h3>
                <div className="flex items-center -mx-[10px]">
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-1.png 2x" alt="" />
                  </div>
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-2.png 2x" alt="" />
                  </div>
                </div>
              </div>
              <div className="conselpage__content-item">
                <h3 className="font-ossb text-lg text-black-555 my-[50px] text-center">
                  Bước 3: Da của bạn thuộc loại nào?
                </h3>
                <div className="flex items-center -mx-[10px]">
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-1.png 2x" alt="" />
                  </div>
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-2.png 2x" alt="" />
                  </div>
                </div>
              </div>
              <div className="conselpage__content-item">
                <h3 className="font-ossb text-lg text-black-555 my-[50px] text-center">
                  Bước 4: Lựa chọn theo sở thích và môi trường
                </h3>
                <div className="flex items-center -mx-[10px]">
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-1.png 2x" alt="" />
                  </div>
                  <div
                    className="cursor-pointer mx-[10px] rounded-2xl md:w-1/2 xs:w-full flex items-center justify-center
                      bg-gradient-to-br from-gray-400 to-gray-500"
                  >
                    <img srcSet="/assets/img/bg-consel-sex-2.png 2x" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ConselPage;
