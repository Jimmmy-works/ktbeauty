import React, { useMemo, useState } from "react";
import Header from "../Header";
import { Button, Col, Row, Steps, message } from "antd";
import ConselSex from "./ConselSex";
import ConselAge from "./ConselAge";
import ConselSkinType from "./ConselSkinType";
import ConselLifeStyle from "./ConselLifeStyle";
import ConselProgress from "./ConselProgress";
import ConselShowcaseProduct from "./ConselShowcaseProduct";
import useWindowSize from "@/utils/windowResize";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};

const ConselPage = () => {
  const { width } = useWindowSize();
  const [controlSteps, setControlSteps] = useState(0);
  const [valueSex, setValueSex] = useState({});
  const [valueAge, setValueAge] = useState({});
  const [valueSkinType, setValueSkinType] = useState({});
  const [valueLifeStyle, setValueLifeStyle] = useState({});
  const currentSteps = {
    0: ConselSex,
    1: ConselAge,
    2: ConselSkinType,
    3: ConselLifeStyle,
    4: ConselShowcaseProduct,
  };
  const CurrentConsel = currentSteps[controlSteps];
  const onChangeConselSex = (sex) => {
    if (sex) {
      setValueSex(sex);
    } else {
      message.error(`Xin vui lòng lựa chọn giới tính!!`);
    }
  };
  const onChangeConselAge = (age) => {
    setValueAge(age);
  };
  const onChangeConselSkinType = (skin) => {
    setValueSkinType(skin);
  };
  const onChangeConselLifeStyle = (style) => {
    setValueLifeStyle(style);
  };
  const onNext = () => {
    if (controlSteps > 4 || controlSteps < 0) {
      setControlSteps(4);
    }
    setControlSteps(controlSteps + 1);
  };
  const onPrev = () => {
    if (controlSteps > 0) {
      setControlSteps(controlSteps - 1);
    } else if (controlSteps > 4) {
      setControlSteps(4);
    }
  };
  const currentConselProps = {
    onChangeConselSex,
    onChangeConselAge,
    onChangeConselSkinType,
    onChangeConselLifeStyle,
    valueSex,
    valueAge,
    valueSkinType,
    valueLifeStyle,
    width,
  };
  console.log("valueSex", valueSex);
  const controlDisableButton = useMemo(() => {
    if (controlSteps === 0) {
      console.log("111", 111);
      if (!Object?.keys(valueSex)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 1) {
      console.log("222", 222);
      if (!Object?.keys(valueAge)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 2) {
      console.log("3333", 3333);
      if (!Object?.keys(valueSkinType)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 3) {
      console.log("4444", 4444);
      if (!Object?.keys(valueLifeStyle)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, [controlSteps, valueSex, valueAge, valueLifeStyle, valueSkinType]);
  console.log("controlDisableButton", controlDisableButton);
  return (
    <>
      <Header />
      <main className="main-wrapper">
        <div className="container">
          <div className="my-[30px] relative">
            <div className="my-[20px]">
              <Steps
                onChange={setControlSteps}
                current={controlSteps}
                items={[
                  {
                    title: "ConselSex",
                    description: valueSex?.label
                      ? valueSex?.label
                      : "Chọn giới tính",
                  },
                  {
                    disabled: !valueSex?.label ? true : false,
                    title: "ConselAge",
                    description: `${
                      valueAge?.label ? valueAge?.label : "Độ tuổi của bạn?"
                    }`,
                  },
                  {
                    disabled: !valueAge?.label ? true : false,
                    title: "ConselSkinType",
                    description: `${
                      valueSkinType?.label
                        ? valueSkinType?.label
                        : "Loại da của bạn thuộc loại nào?"
                    }`,
                  },
                  {
                    disabled: !valueSkinType?.label ? true : false,
                    title: "ConselLifeStyle",
                    description: `${
                      valueLifeStyle?.label
                        ? valueLifeStyle?.label
                        : "Sở thích của bạn?"
                    }`,
                  },
                ]}
              />
            </div>
            <div className="w-full flex items-center justify-between gap-10 ">
              <Button
                onClick={onPrev}
                size="large"
                className={`${
                  controlSteps > 0
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                Trở lại
              </Button>
              <Button
                disabled={controlDisableButton}
                onClick={onNext}
                size="large"
                className={`${
                  controlSteps >= 0 && controlSteps < 4
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                Tiếp tục
              </Button>
            </div>
            <div className="my-[20px] ">
              <CurrentConsel {...currentConselProps} />
              {/* {CurrentConsel[controlSteps]} */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ConselPage;
