import React from "react";

const ConselAge = ({ onChangeConselAge, valueAge, width }) => {
  return (
    <div className="flex flex-wrap gap-y-[30px] justify-center items-center -mx-[15px] ">
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] mx-[15px] flex gap-3 items-center justify-center  cursor-pointer
         aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700
       ${valueAge?.value === "below25" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselAge({ label: "Dưới 25 Tuổi", value: "below25" })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-age-2.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
        <p className="xs:text-[46px] xl:text-[60px] font-osb text-[#FE73C5]">
          -
        </p>
      </div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] mx-[15px] flex gap-3 items-center justify-center  cursor-pointer
         aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700 
       ${valueAge?.value === "from25to35" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselAge({ label: "Từ 25-35 Tuổi", value: "from25to35" })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-age-2.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
        <p className="xs:text-[46px] xl:text-[60px] text-[#9CF8D2]">-</p>
        <img
          srcSet={`/assets/img/bg-consel-age-1.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
      </div>
      <div
        className={`xs:w-full md:w-[calc(50%-30px)] mx-[15px] flex gap-3 items-center justify-center  cursor-pointer
         aspect-[16/12] rounded-[20px] duration-300 transition-all hover:bg-gray-700 
       ${valueAge?.value === "above35" ? "bg-gray-700" : "bg-black-555"}`}
        onClick={() =>
          onChangeConselAge({ label: "Trên 35 Tuổi", value: "above35" })
        }
      >
        <img
          srcSet={`/assets/img/bg-consel-age-1.png ${
            width >= 1280 ? "" : "1.5x"
          }`}
          alt=""
        />
        <p className="xs:text-[46px] xl:text-[60px] font-osr text-[#BD80E1]">
          +
        </p>
      </div>
    </div>
  );
};

export default ConselAge;
