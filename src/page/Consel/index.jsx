import BackToTop from "@/components/BackToTop";
import { MainProvider } from "@/components/MainContext";
import Overplay from "@/components/Overplay";
import useWindowSize from "@/utils/windowResize";
import { Button, Steps, message } from "antd";
import { useMemo, useState } from "react";
import Header from "../Header";
import Nav from "../Nav";
import ConselAge from "./ConselAge";
import ConselLifeStyle from "./ConselLifeStyle";
import ConselSex from "./ConselSex";
import ConselShowcaseProduct from "./ConselShowcaseProduct";
import ConselSkinType from "./ConselSkinType";
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
  const controlDisableButton = useMemo(() => {
    if (controlSteps === 0) {
      if (!Object?.keys(valueSex)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 1) {
      if (!Object?.keys(valueAge)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 2) {
      if (!Object?.keys(valueSkinType)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    if (controlSteps === 3) {
      if (!Object?.keys(valueLifeStyle)?.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }, [controlSteps, valueSex, valueAge, valueLifeStyle, valueSkinType]);
  return (
    <MainProvider>
      <Overplay className={`z-50`} />
      <BackToTop />
      <Nav />
      <Header />
      <main className="main-wrapper w-full h-full">
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
                {controlSteps === 3 ? "Tư vấn" : "Tiếp tục"}
              </Button>
            </div>
            <div className="my-[20px] ">
              <CurrentConsel {...currentConselProps} />
            </div>
          </div>
        </div>
      </main>
    </MainProvider>
  );
};

export default ConselPage;
