import React from "react";
import Select from "react-select";
import Flag from "react-world-flags";
import { FixedSizeList as List } from "react-window";

const heightPerOption = 40;

const MenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * heightPerOption;

  const Row = ({ index, style }) => <div style={style}>{children[index]}</div>;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={heightPerOption}
      initialScrollOffset={initialOffset}
      width="100%"
    >
      {Row}
    </List>
  );
};

const SelectComponent = ({
  label,
  name,
  error,
  field,
  onChange,
  options,
  isSearchable,
  isCountry,
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
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const customFilterOption = (option, inputValue) =>
    option.data.label.toLowerCase().includes(inputValue.toLowerCase());

  const getOptionLabel = (option) => {
    if (isCountry) {
      return (
        <div className="flex items-center gap-2">
          <Flag code={option.code} style={{ width: 20, height: 15 }} />
          <span>{option.label}</span>
        </div>
      );
    }
    return option.label;
  };

  const getSingleValue = (option) => {
    if (isCountry) {
      return (
        <div className="flex items-center gap-2">
          <Flag code={option.code} style={{ width: 20, height: 15 }} />
          <span>{option.label}</span>
        </div>
      );
    }
    return option.label;
  };

  return (
    <div style={containerStyles} className={"relative w-full grow mt-6"}>
      <Select
        id={name}
        options={options}
        styles={customStyles}
        className="peer"
        classNamePrefix="react-select"
        value={options.find((option) => option.value === field.value)}
        filterOption={isCountry ? customFilterOption : undefined}
        placeholder={label}
        isDisabled={disabled}
        isSearchable={isSearchable}
        onChange={(selectedOption) => {
          field.onChange(selectedOption.value);
          if (onChange) {
            onChange(selectedOption);
          }
        }}
        getOptionLabel={getOptionLabel}
        formatOptionLabel={isCountry ? getOptionLabel : undefined}
        formatValue={isCountry ? getSingleValue : undefined}
        components={{ MenuList }}
        {...props}
      />

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

      {error && (
        <p className="text-xs text-red-500 mt-1 ml-1">
          {error.message || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default SelectComponent;
