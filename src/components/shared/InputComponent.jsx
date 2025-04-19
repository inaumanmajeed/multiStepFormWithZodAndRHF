import React from "react";

const InputComponent = ({
  label,
  name,
  error,
  field,
  width,
  type = "text",
  disabled = false,
  ...props
}) => {
  const containerStyles = width
    ? { flexBasis: `calc(${width} - 5px)`, maxWidth: `calc(${width} - 5px)` }
    : { flexBasis: "100%", maxWidth: "100%" };
  return (
    <div style={containerStyles} className={"relative w-full grow mt-6"}>
      {/* Input field */}
      <input
        id={name}
        {...field}
        {...props}
        type={type}
        disabled={disabled}
        placeholder=" "
        onKeyDown={(e) => {
          const invalidChars = ["e", "E", "+", "-"];
          if (type === "number" && invalidChars.includes(e.key)) {
            e.preventDefault();
          }
        }}
        className={`peer w-full border rounded-md px-3 py-3 text-sm bg-white placeholder-transparent focus:outline-none transition-all duration-200
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-[#E4E4E3] focus:border-[#7C8BA0]"
          }
        `}
      />

      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-4 -top-2 text-[10px] px-1 bg-white transition-all duration-200
          peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-sm
          peer-focus:-top-2 peer-focus:text-xs
          text-[#7C8BA0] peer-focus:text-[#3B4054]
          ${error ? "text-red-500" : "text-[#3B4054]"}
        `}
        style={{ pointerEvents: "none" }}
      >
        {label}
      </label>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 mt-1 ml-1">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
