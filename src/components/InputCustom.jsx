import React, { forwardRef } from "react";

const InputM = (
  {
    type,
    id,
    required,
    label,
    disabled,
    renderProps,
    placeholder,
    className,
    ...inputProps
  },
  ref
) => {
  return (
    <>
      {/* <label htmlFor="register-email">
        {label} <span>{required && "*"}</span>
      </label> */}
      {renderProps ? (
        renderProps?.({ ...inputProps, ref: ref })
      ) : (
        <input
          placeholder={placeholder}
          disabled={disabled}
          style={{ cursor: disabled ? "not-allowed" : "" }}
          ref={ref}
          type={type}
          className={`form-control ${
            !!inputProps?.error ? `input-error` : ""
          } `}
          id={id}
          {...inputProps}
        />
      )}
      <p className=" ml-[10px]">{inputProps?.error || ""}</p>
    </>
  );
};

export const InputCustom = forwardRef(InputM);
