import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  onKeyDown,
  placeholder,
  required = false,
  className,
}) => {
  return (
    <div className={`input-container ${className ? className : ""}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        className={className}
      />
    </div>
  );
};

export default Input;
