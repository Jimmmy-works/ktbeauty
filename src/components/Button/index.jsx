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
        return `font-osb text-sm text-primary border-solid border border-primary
                  bg-white rounded-[50px] px-[30.35px] py-[10px] hover:bg-primary hover:text-white duration-[500ms]
                  transition-all ${
                    isActive === true ? "bg-primary text-white" : ""
                  }`;
      default:
        return "";
    }
  });
  if (!!link) {
    return (
      <Link
        to={`${link}`}
        className={twMerge(` ${variantButton} ${className ?? ""}`)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={twMerge(` ${variantButton} ${className ?? ""}`)}
    >
      {children}
    </button>
  );
};

export default Button;
