import backtotop from "@/utils/backtotop";
const BackToTop = () => {
  return (
    <div
      className="fixed xs:right-[5%] xl:right-[40px]  bottom-[20px] 
      p-[7px] md:p-[10px]  text-[16px] md:text-[20px] z-[1000] bg-white  
       md:leading-[20px] text-primary rounded-[50px] rotate-[-90deg] cursor-pointer duration-400 transition-colors
      hover:bg-primary hover:text-white border-solid border-[2px] border-primary"
      onClick={backtotop}
    >
      &#10140;
    </div>
  );
};

export default BackToTop;
