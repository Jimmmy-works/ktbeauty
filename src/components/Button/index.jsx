import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Button = ({
  variant = "outline",
  link = "",
  className,
  children,
  isActive = false,
  onClick,
}) => {
  const variantButton = useMemo(() => {
    switch (variant) {
      case "outline":
        return ` hover:bg-primary hover:text-white border-solid border border-primary bg-white  
        rounded-[50px] text-primary ${
          isActive === true ? "bg-primary text-white" : ""
        }`;
      case "filled":
        return `text-white bg-primary hover:bg-black-555 hover:text-white  ${
          isActive === true ? "bg-black-555 text-white" : ""
        }`;
      default:
        return "";
    }
  });
  if (!!link) {
    return (
      <Link
        to={`${link}`}
        className={twMerge(
          ` font-osb text-sm  px-[30.35px] py-[10px] duration-[500ms] transition-all ${variantButton} ${
            className ?? ""
          }`
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={twMerge(
        ` font-osb text-sm px-[30.35px] py-[10px] duration-[500ms] transition-all ${variantButton} ${
          className ?? ""
        }`
      )}
    >
      {children}
    </button>
  );
};

export default Button;
