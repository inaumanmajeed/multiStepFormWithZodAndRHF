import React, { useEffect, useState } from "react";
import InputComponent from "../shared/inputComponent";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import UploadImgIcon from "../../assets/images/cloudUpload.svg";
import RemoveIcon from "../../assets/images/RemoveIcon.svg";
import { truncateString } from "../../utils/commonFunctions";
import SelectComponent from "../shared/SelectComponent";
import countryOptions from "../../utils/countryOptions";

const BusinessInfo = ({ handleNextStep }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [images, setImages] = useState(null);
  const logoFile = useWatch({ control, name: "logo" });

  useEffect(() => {
    if (logoFile) {
      const fileURL = URL.createObjectURL(logoFile);
      setImages(fileURL);
      return () => URL.revokeObjectURL(fileURL);
    } else {
      setImages(null);
    }
  }, [logoFile]);

  const handleRemoveLogo = () => {
    setValue("logo", null);
    const fileInput = document.getElementById("logo-upload");
    if (fileInput) fileInput.value = "";
  };
  return (
    <div>
      <h1 className="font-semibold text-[#3B4054] text-2xl">General details</h1>
      <section className="flex justify-between flex-wrap">
        <Controller
          name="businessName"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Business Name"
              error={errors.businessName}
            />
          )}
        />
        <Controller
          name="companyNumber"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Company Number"
              error={errors.companyNumber}
              type="number"
              width="50%"
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <SelectComponent
              field={field}
              label="Country"
              options={countryOptions}
              error={errors.country}
              isSearchable
              width="50%"
            />
          )}
        />
        <Controller
          name="vatNumber"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="VAT Number"
              error={errors.vatNumber}
              type="number"
              width="50%"
            />
          )}
        />
      </section>
      <h1 className="font-medium text-[#3B4054] text-base mt-6">
        Upload your Logo
      </h1>
      {images === null ? (
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <div
              className="upload-img mt-4 cursor-pointer flex flex-col w-full items-center justify-center gap-2"
              onClick={() => document.getElementById("logo-upload").click()}
            >
              <img src={UploadImgIcon} alt="Upload" />
              <p className="font-normal text-center text-[10px]">
                Upload your image here, or{" "}
                <span className="font-bold">browse</span>
              </p>
              <p className="font-normal text-[#848484] text-center text-[8px]">
                Supports: JPG, PNG
              </p>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files[0])}
                className="hidden"
              />
              {errors.logo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.logo.message}
                </p>
              )}
            </div>
          )}
        />
      ) : (
        <div className="h-[120px] mt-4 w-[120px] rounded-[6px] relative border border-[#E4E4E3]">
          <img
            src={images}
            alt="Logo Preview"
            className="h-full w-full rounded-[6px] object-cover"
          />
          <p className="absolute -bottom-6 left-0 fiveHundred text-[#3B4054] text-[14px]">
            {truncateString(logoFile?.name)}
          </p>
          <img
            className="absolute -top-3 -right-3 cursor-pointer"
            src={RemoveIcon}
            alt="removeLogo"
            onClick={handleRemoveLogo}
          />
        </div>
      )}
      <h1 className="font-semibold text-[#3B4054] mt-6 text-2xl">Address</h1>
      <section className="flex justify-between flex-wrap">
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Address"
              error={errors.address}
            />
          )}
        />
        <Controller
          name="apptNo"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Appt. / Suit no."
              error={errors.apptNo}
              width="50%"
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="State"
              error={errors.state}
              width="50%"
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="City"
              error={errors.city}
              width="50%"
            />
          )}
        />
        <Controller
          name="postCode"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Post code"
              error={errors.postCode}
              type="number"
              width="50%"
            />
          )}
        />
      </section>
      <div className="flex  justify-center items-center mt-10">
        <button
          className="bg-[#2A9D8F] text-white w-full max-w-[371px] h-[50px] rounded-full"
          onClick={handleNextStep}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessInfo;
