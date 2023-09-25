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
        rounded-[50px] text-primary group/hover ${
          isActive === true ? "bg-primary text-white" : ""
        }`;
      case "filled":
        return `text-white bg-primary hover:bg-gray-100 hover:text-black  group/hover ${
          isActive === true ? "bg-gray-100 text-black" : ""
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
