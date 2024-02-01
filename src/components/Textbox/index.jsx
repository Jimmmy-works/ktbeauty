import React, { useMemo } from "react";

const Textbox = ({
  textSlider,
  children,
  title,
  desc,
  className,
  textColor,
}) => {
  if (textSlider)
    return (
      <div
        className={`textbox center-absolute  text-center w-full ${
          className ?? ""
        }`}
      >
        <h2
          className={`textbox__title font-gvr text-lg ${
            textColor && textSlider ? textColor : "text-white"
          } mb-[10px]`}
        >
          {title}
        </h2>
        <p
          className={`textbox__desc font-osb text-xl ${
            textColor && textSlider ? textColor : "text-white"
          } leading-none uppercase`}
        >
          {desc}
        </p>
        {children}
      </div>
    );
  return (
    <div
      className={`border-b-[1px] border-dashed border-primary pb-[15px]
      xs:mb-[30px] lg:mb-[50px] flex items-center justify-between
       xs:flex-col xs:gap-5 lg:gap-0 lg:flex-row   ${className ?? ""}`}
    >
      <div className="heading-section flex items-center gap-3">
        <svg className="w-[32px] h-[32px]" viewBox="0 0 347 511.82">
          <path
            fill="#ff887b"
            d="M129.03 270.69 8.31 259.3c-5.04-.47-8.74-4.95-8.27-9.99.11-1.12.41-2.18.88-3.14L110.71 5.39c1.53-3.37 4.86-5.35 8.34-5.36L269.88 0c5.08 0 9.2 4.12 9.2 9.2 0 2.06-.67 3.95-1.81 5.49l-77.26 125.3 138.81 15.28c5.04.55 8.68 5.09 8.12 10.13a9.097 9.097 0 0 1-2.46 5.31L62.93 508.52c-3.23 3.89-9.01 4.42-12.9 1.18-3.04-2.52-4.03-6.6-2.77-10.12l81.77-228.89z"
          ></path>
        </svg>
        <h3
          className={`font-mab ${
            textColor ? textColor : "text-black-333"
          } text-lg uppercase`}
        >
          {" "}
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

export default Textbox;
