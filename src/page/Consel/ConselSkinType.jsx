import React from "react";

const ConselSkinType = ({ onChangeConselSkinType, valueSkinType }) => {
  return (
    <div className="flex flex-wrap gap-y-[20px] justify-center items-center -mx-[15px]">
      <div
        className={`relative xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-consel-skin-1 bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "nomal" ? "bg-gray-700" : "bg-black-555"} 
       group/hover`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da thường", value: "nomal" })
        }
      ></div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-consel-skin-2 bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "oil" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da dầu", value: "oil" })
        }
      ></div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-consel-skin-3 bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueSkinType?.value === "dry" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSkinType({ label: "Da khô", value: "dry" })
        }
      ></div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] flex gap-3 items-center justify-center mx-[15px] cursor-pointer
        bg-consel-skin-4 bg-no-repeat bg-center aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${
         valueSkinType?.value === "combination" ? "bg-gray-700" : "bg-black-555"
       }`}
        onClick={() =>
          onChangeConselSkinType({
            label: "Da hỗn hợp",
            value: "combination",
          })
        }
      ></div>
    </div>
  );
};

export default ConselSkinType;
