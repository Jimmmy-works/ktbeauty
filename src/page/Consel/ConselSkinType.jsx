import React from "react";

const ConselSkinType = ({ onChangeConselSkinType, valueSkinType, width }) => {
  return (
    <div className="flex flex-wrap gap-y-[20px] justify-center items-center -mx-[15px]">
      <div
        className={`relative xs:w-full lg:w-[calc(33.3333%-30px)] md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
         bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "nomal" ? "bg-gray-700" : "bg-black-555"} 
       group/hover`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da thường", value: "nomal" })
        }
      >
        <img srcSet={`/assets/img/bg-consel-skin-1.png 1.5x`} alt="" />
      </div>
      <div
        className={`xs:w-full lg:w-[calc(33.3333%-30px)] md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "oil" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da dầu", value: "oil" })
        }
      >
        <img srcSet={`/assets/img/bg-consel-skin-2.png 1.5x`} alt="" />
      </div>
      <div
        className={`xs:w-full lg:w-[calc(33.3333%-30px)] md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "dry" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da khô", value: "dry" })
        }
      >
        <img srcSet={`/assets/img/bg-consel-skin-3.png 1.5x`} alt="" />
      </div>
      <div
        className={`xs:w-full lg:w-[calc(33.3333%-30px)] md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${
         valueSkinType?.value === "combination" ? "bg-gray-700" : "bg-black-555"
       }`}
        onClick={() =>
          onChangeConselSkinType({
            label: "Da hỗn hợp",
            value: "combination",
          })
        }
      >
        <img srcSet={`/assets/img/bg-consel-skin-4.png 1.5x `} alt="" />
      </div>
    </div>
  );
};

export default ConselSkinType;
