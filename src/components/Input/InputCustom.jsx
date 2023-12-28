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
    onChange,
    onBlur,
    value,
    ...inputProps
  },
  ref
) => {
  return (
    <>
      {renderProps ? (
        renderProps?.({ ...inputProps, ref: ref })
      ) : (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
      <p className="form-error">{inputProps?.error || ""}</p>
    </>
  );
};

export const InputCustom = forwardRef(InputM);
