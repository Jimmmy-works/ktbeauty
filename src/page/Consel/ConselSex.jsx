import React from "react";

const ConselSex = ({ onChangeConselSex, valueSex }) => {
  return (
    <div className="flex flex-wrap gap-y-[20px] justify-center items-center -mx-[15px]">
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] lg:w-[calc(40%)] flex items-center justify-center h-full  mx-[15px] cursor-pointer
         aspect-[16/12] rounded-[20px] duration-300 transition-all 
       bg-consel-sex-1 bg-no-repeat bg-center hover:bg-gray-700 
       ${valueSex?.value === "male" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSex({ label: "Giới tính: Nam", value: "male" })
        }
      ></div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] lg:w-[calc(40%)] flex items-center justify-center h-full  mx-[15px] cursor-pointer
         aspect-[16/12] rounded-[20px] duration-300 transition-all 
       bg-consel-sex-2 bg-no-repeat bg-center hover:bg-gray-700 
       ${valueSex?.value === "female" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselSex({ label: "Giới tính: Nữ", value: "female" })
        }
      ></div>
    </div>
  );
};

export default ConselSex;
