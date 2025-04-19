import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useFormContext, useFieldArray } from "react-hook-form";

import googleImg from "../../assets/images/googleImg.svg";
import arrowDropDown from "../../assets/images/arrow-drop.svg";
import separator from "../../assets/images/separator.svg";
import copyImg from "../../assets/images/file-copy.svg";

const BusinessHours = () => {
  const { control, watch, setValue } = useFormContext();
  const [localTimes, setLocalTimes] = useState({});

  const { fields } = useFieldArray({
    control,
    name: "openingHours",
  });
  const {
    fields: specialFields,
    append: appendSpecial,
    remove: removeSpecial,
  } = useFieldArray({
    control,
    name: "specialHours",
  });

  const openingHours = watch("openingHours");
  const specialHours = watch("specialHours");

  const handleToggle = (index) => {
    const current = openingHours[index];
    const isNowOpen = !current.open;

    setValue(`openingHours.${index}.open`, isNowOpen);

    if (isNowOpen && (!current.start || !current.end)) {
      const defaultStart = "09:00 AM";
      const defaultEnd = "04:00 PM";

      setValue(`openingHours.${index}.start`, defaultStart);
      setValue(`openingHours.${index}.end`, defaultEnd);

      setLocalTimes((prev) => ({
        ...prev,
        [`${index}-start`]: defaultStart,
        [`${index}-end`]: defaultEnd,
      }));
    }
  };

  const handleTimeChange = (index, type, value) => {
    const key = `${index}-${type}`;
    setLocalTimes((prev) => ({ ...prev, [key]: value }));
  };
  const handleBlur = (index, type) => {
    const key = `${index}-${type}`;
    const value = localTimes[key];

    if (value) {
      setValue(`openingHours.${index}.${type}`, value, {
        shouldDirty: true,
      });
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[#3B4054] text-2xl">Business Hours</h1>
      <div className="max-w-4xl mx-auto shadowMain mt-6 border border-[#E6E9FA] bg-white rounded-lg">
        {/* Header */}
        <section className="flex border-b border-[#E4E4E3] p-4 items-center justify-between">
          <img src={googleImg} alt="Google" />
          <img src={arrowDropDown} alt="Dropdown" className="cursor-pointer" />
        </section>

        <section className="flex flex-col border-b border-[#E4E4E3] gap-4 p-4">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <span className="w-24 font-semibold text-[#3B4054]">
                {item.day}
              </span>

              {/* Toggle */}
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={openingHours[index].open}
                    onChange={() => handleToggle(index)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#2CA58D] peer-focus:ring-2 peer-focus:ring-[#2CA58D] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:left-[2px]"></div>
                </label>
                <span className="text-[#3B4054] w-20 ">
                  {openingHours[index].open ? "Open" : "Closed"}
                </span>
              </div>

              {/* Time Pickers */}
              <section className="flex items-center gap-6">
                <TimePicker
                  onChange={(val) => handleTimeChange(index, "start", val)}
                  onBlur={() => handleBlur(index, "start")}
                  value={
                    localTimes[`${index}-start`] ??
                    openingHours[index].start ??
                    ""
                  }
                  disableClock={true}
                  clearIcon={null}
                  disabled={!openingHours[index].open}
                  format="hh:mm a"
                  className={`w-28 ${
                    !openingHours[index].open
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                />
                <img src={separator} alt="Separator" />
                <TimePicker
                  onChange={(val) => handleTimeChange(index, "end", val)}
                  onBlur={() => handleBlur(index, "end")}
                  value={
                    localTimes[`${index}-end`] ?? openingHours[index].end ?? ""
                  }
                  disableClock={true}
                  clearIcon={null}
                  disabled={!openingHours[index].open}
                  format="hh:mm a"
                  className={`w-28 ${
                    !openingHours[index].open
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                />
              </section>

              {/* Buttons (optional actions) */}
              <button
                type="button"
                className="text-[#2CA58D] border flex justify-center items-center border-[#e4e4e3] h-[32px] px-3 text-sm"
              >
                <img src={copyImg} alt="Copy" className="mr-2" />
                Copy
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center rounded-full border-[2px] border-[#7C8BA0] text-[#7C8BA0] text-xl"
              >
                +
              </button>
            </div>
          ))}
        </section>
        <section className="flex flex-col border-b border-[#E4E4E3] gap-4 p-4">
          <p className="text-[#3B4054] font-medium text-[18px]">
            Special Business Hours
          </p>
          {specialFields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              {/* Date Picker */}
              <DatePicker
                selected={
                  specialHours[index]?.date
                    ? new Date(specialHours[index].date)
                    : null
                }
                onChange={(date) =>
                  setValue(`specialHours.${index}.date`, date.toISOString())
                }
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                className="border border-gray-300 rounded-md px-2 py-1"
              />

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={specialHours[index]?.open}
                  onChange={() =>
                    setValue(
                      `specialHours.${index}.open`,
                      !specialHours[index]?.open
                    )
                  }
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#2CA58D] peer-focus:ring-2 peer-focus:ring-[#2CA58D] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:left-[2px]" />
              </label>
              <span className="text-[#3B4054] w-20">
                {specialHours[index]?.open ? "Open" : "Closed"}
              </span>

              {/* Time Pickers */}
              <TimePicker
                onChange={(val) =>
                  setValue(`specialHours.${index}.start`, val, {
                    shouldDirty: true,
                  })
                }
                value={specialHours[index]?.start ?? ""}
                disableClock={true}
                clearIcon={null}
                disabled={!specialHours[index]?.open}
                format="hh:mm a"
                className={`w-28 ${
                  !specialHours[index]?.open
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              />
              <img src={separator} alt="Separator" />
              <TimePicker
                onChange={(val) =>
                  setValue(`specialHours.${index}.end`, val, {
                    shouldDirty: true,
                  })
                }
                value={specialHours[index]?.end ?? ""}
                disableClock={true}
                clearIcon={null}
                disabled={!specialHours[index]?.open}
                format="hh:mm a"
                className={`w-28 ${
                  !specialHours[index]?.open
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeSpecial(index)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-[2px] border-[#7C8BA0] text-[#7C8BA0] text-[12px] font-bold"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add Button */}
          <button
            type="button"
            onClick={() =>
              appendSpecial({
                date: "",
                open: false,
                start: "",
                end: "",
              })
            }
            className="text-[#2CA58D] px-4 py-1 flex justify-center gap-2 items-center w-fit text-sm mt-2"
          >
            <span className="border flex items-center justify-center pt-[1px] border-[#2CA58D] w-4 h-4 rounded-full">
              +
            </span>{" "}
            Add Special Business Hours
          </button>
        </section>
      </div>
    </>
  );
};

export default BusinessHours;
