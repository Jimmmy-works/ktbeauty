import React from "react";

const ConselLifeStyle = ({
  onChangeConselLifeStyle,
  valueLifeStyle,
  width,
}) => {
  return (
    <div className="flex flex-wrap gap-y-[20px] justify-center items-center -mx-[15px]">
      <div
        className={`relative xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
         bg-contain bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueLifeStyle?.value === "nomal" ? "bg-gray-700" : "bg-black-555"} 
       group/hover`}
        onClick={() =>
          onChangeConselLifeStyle({
            label: "Dành cho Nhân viên văn phòng",
            value: "office",
          })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-hobby-1.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
      </div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
         bg-contain bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueLifeStyle?.value === "oil" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselLifeStyle({
            label: "Dành cho người Makeup nhiều",
            value: "makeup",
          })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-hobby-2.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
      </div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
         bg-contain bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueLifeStyle?.value === "dry" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselLifeStyle({
            label: "Dành cho Học sinh - Sinh viên",
            value: "student",
          })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-hobby-3.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
      </div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
         bg-contain bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${
         valueLifeStyle?.value === "combination"
           ? "bg-gray-700"
           : "bg-black-555"
       }`}
        onClick={() =>
          onChangeConselLifeStyle({
            label: "Dành cho người Năng động hoặc Làm việc ngoài trời",
            value: "combination",
          })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-hobby-4.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ConselLifeStyle;
