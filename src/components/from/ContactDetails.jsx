import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputComponent from "../shared/inputComponent";

const ContactDetails = ({ handleNextStep }) => {
  const {
      control,
      formState: { errors },
    } = useFormContext();
  return (
    <>
      <h1 className="font-semibold text-[#3B4054] text-2xl">Contact details</h1>
      <section className="flex justify-between flex-wrap">
        <Controller
          name="primaryContactName"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Primary Contact Name"
              error={errors.primaryContactName}
              width="50%"
            />
          )}
        />
        <Controller
          name="primaryContactEmail"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Primary Contact Email"
              error={errors.primaryContactEmail}
              width="50%"
            />
          )}
        />
        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Contact Number"
              error={errors.contactNumber}
              type="number"
              width="50%"
            />
          )}
        />
        <Controller
          name="landline"
          control={control}
          render={({ field }) => (
            <InputComponent
              field={field}
              label="Landline (Optional)"
              error={errors.landline}
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
    </>
  );
};

export default ContactDetails;
