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
  outStock,
  disabled,
}) => {
  const variantButton = useMemo(() => {
    switch (variant) {
      case "outline":
        return ` hover:bg-primary hover:text-white border-solid border border-primary   
        rounded-[50px]  group/hover ${
          isActive === true ? "bg-primary text-white" : "text-primary bg-white"
        }`;
      case "outline-secondary":
        return ` hover:bg-secondary hover:text-white border-solid border border-secondary   
        rounded-[50px]  group/hover ${
          isActive === true
            ? "bg-secondary text-white"
            : "text-secondary bg-white"
        }`;
      case "filled":
        return `text-white bg-primary hover:opacity-90   group/hover ${
          isActive === true ? "opacity-90" : "opacity-100"
        }`;
      case "secondary":
        return `text-white bg-secondary hover:opacity-90 rounded-[20px]   group/hover ${
          isActive === true ? "opacity-90" : "opacity-100"
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
          ` font-osb xs:text-xs md:text-sm  xs:px-[20px] md:px-[30.35px] xs:py-[7px] md:py-[10px] duration-400 transition-all ${variantButton} ${
            className ?? ""
          } ${
            disabled || outStock
              ? "pointer-events-none cursor-none"
              : "pointer-events-auto "
          } ${outStock ? "bg-[#ddd]" : ""}`
        )}
      >
        {outStock ? "OUT STOCK" : children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={twMerge(
        ` font-osb xs:text-xs md:text-sm xs:px-[20px] md:px-[30.35px] xs:py-[7px] md:py-[10px] duration-[500ms] transition-all ${variantButton} ${
          className ?? ""
        } ${
          disabled || outStock
            ? "pointer-events-none cursor-none"
            : "pointer-events-auto "
        } ${outStock ? "bg-[#ddd] border-[#ddd] text-black" : ""}`
      )}
    >
      {outStock ? "Out Stock" : children}
    </button>
  );
};

export default Button;
