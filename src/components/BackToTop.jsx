import backtotop from "@/utils/backtotop";
const BackToTop = () => {
  return (
    <div
      className="fixed right-[5%]  bottom-[20px] 
      p-[7px] md:p-[10px]  text-[20px] md:text-[24px] z-[1000] bg-white  
       md:leading-[24px] text-primary rounded-[50px] rotate-[-90deg] cursor-pointer duration-400 transition-colors
      hover:bg-primary hover:text-white border-solid border border-primary"
      onClick={backtotop}
    >
      &#10140;
    </div>
  );
};

export default BackToTop;
