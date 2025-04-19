import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import InputComponent from "../shared/inputComponent";
import SelectComponent from "../shared/SelectComponent";
import { socialOptions } from "../../utils/staticValues";

const LinkAccounts = ({ handleNextStep }) => {
  const {
    control,
    setValue,
    formState: { errors },
    getValues, // Use getValues instead of watch
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "linkedAccounts",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ profile: "", webAddress: "", isConnected: false });
    }
  }, [fields.length, append]);

  const handleToggleConnection = (index) => {
    const linkedAccounts = getValues("linkedAccounts");
    const current = linkedAccounts?.[index];
    const isConnected = current?.isConnected;

    if (isConnected) {
      if (index === 0 && fields.length === 1) {
        setValue(`linkedAccounts.${index}`, {
          profile: "",
          webAddress: "",
          isConnected: false,
        });
      } else {
        remove(index);
      }
    } else {
      setValue(`linkedAccounts.${index}.isConnected`, true);

      // Append a new empty row only if there's a webAddress
      if (current?.webAddress?.trim()) {
        append({ profile: "", webAddress: "", isConnected: false });
      }
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-[#3B4054] text-2xl">Link Accounts</h1>
      <p className="text-[#3B4054] text-sm font-normal mt-2">
        Connect your social accounts that you want to track and manage with us.
      </p>

      {fields.map((item, index) => {
        const account = getValues("linkedAccounts")?.[index];
        const webAddressValue = account?.webAddress;
        const isConnected = account?.isConnected;
        const width = webAddressValue ? "50%" : "70%";

        return (
          <section
            key={item.id}
            className="flex justify-between items-center flex-wrap mt-6"
          >
            <Controller
              name={`linkedAccounts.${index}.profile`}
              control={control}
              render={({ field }) => (
                <SelectComponent
                  field={field}
                  label="Search profile"
                  options={socialOptions}
                  error={errors?.linkedAccounts?.[index]?.profile}
                  isSearchable
                  width="30%"
                  disabled={isConnected}
                />
              )}
            />

            <Controller
              name={`linkedAccounts.${index}.webAddress`}
              control={control}
              render={({ field }) => (
                <InputComponent
                  field={field}
                  label="Add web address"
                  error={errors?.linkedAccounts?.[index]?.webAddress}
                  width={width}
                  disabled={isConnected}
                />
              )}
            />

            {webAddressValue && (
              <div className="flex items-end mt-6 justify-center basis-[calc(20%-10px)]">
                <button
                  type="button"
                  className={`w-full h-[36px] rounded-full ${
                    isConnected ? "bg-red-500" : "bg-[#2A9D8F]"
                  } text-white`}
                  onClick={() => handleToggleConnection(index)}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              </div>
            )}
          </section>
        );
      })}

      <div className="flex justify-center items-center mt-10">
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

export default LinkAccounts;
