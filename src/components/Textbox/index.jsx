import React, { useMemo } from "react";

const Textbox = ({ variant, children, title, desc }) => {
  const variantTextbox = useMemo(() => {
    switch (variant) {
      case "outline":
        return `font-osb text-sm text-primary border-solid border border-primary transition-all
            bg-white rounded-[50px] px-[30.35px] py-[10px] hover:bg-primary hover:text-white duration-[500ms]
                  `;
      default:
        return "";
    }
  });
  return (
    <div className="textbox center-absolute text-center w-full ">
      <h2 className="textbox__title font-gvr text-lg text-white mb-[10px]">
        {title}
      </h2>
      <p className="textbox__desc font-mab text-xl text-white leading-none uppercase">
        {desc}
      </p>
      {children}
    </div>
  );
};

export default Textbox;
