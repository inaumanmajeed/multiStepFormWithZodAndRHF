import React from "react";
import Select from "react-select";

const SelectComponent = ({
  label,
  name,
  error,
  field,
  onChange,
  options,
  isSearchable,
  width,
  disabled,
  ...props
}) => {
  const containerStyles = width
    ? { flexBasis: `calc(${width} - 5px)`, maxWidth: `calc(${width} - 5px)` }
    : { flexBasis: "100%", maxWidth: "100%" };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: error
        ? "1px solid #EF4444"
        : state.isFocused
        ? "1px solid #3B4054"
        : "1px solid #E4E4E3",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderColor: error ? "#EF4444" : "#7C8BA0",
      },
      borderRadius: "6px",
      height: "45px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#7C8BA0",
      fontSize: "14px",
      fontWeight: "400",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#3B4054",
      fontSize: "14px",
      fontWeight: "400",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div style={containerStyles} className={"relative w-full grow mt-6"}>
      {/* Select field */}
      <Select
        id={name}
        options={options}
        styles={customStyles}
        className="peer"
        classNamePrefix="react-select"
        placeholder={label}
        isDisabled={disabled}
        isSearchable={isSearchable}
        onChange={(selectedOption) => {
          field.onChange(selectedOption.value);
          if (onChange) {
            onChange(selectedOption);
          }
        }}
        {...props}
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

export default SelectComponent;
