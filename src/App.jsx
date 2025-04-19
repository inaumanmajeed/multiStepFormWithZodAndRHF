import React, { useEffect, useState } from "react";
import Stepper from "./components/shared/Stepper";
import BusinessInfo from "./components/from/BusinessInfo";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { businessSchema } from "./utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactDetails from "./components/from/ContactDetails";
import LinkAccounts from "./components/from/LinkAccounts";
import BusinessHours from "./components/from/BusinessHours";
import { fieldToStepMap, initialValues } from "./utils/staticValues";
import { cleanSubmittedValues } from "./utils/commonFunctions";

const StepContent = ({ currentStep, handleNextStep }) => {
  switch (currentStep) {
    case 1:
      return <BusinessInfo handleNextStep={handleNextStep} />;
    case 2:
      return <ContactDetails handleNextStep={handleNextStep} />;
    case 3:
      return <LinkAccounts handleNextStep={handleNextStep} />;
    case 4:
      return <BusinessHours />;
    default:
      return null;
  }
};

const ConsolePopup = ({ isOpen, onClose, submittedValues }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[700px] w-full">
        <h2 className="text-lg font-bold mb-4">Submitted Values</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[65dvh]">
          {JSON.stringify(submittedValues, null, 2)}
        </pre>
        <button
          className="mt-4 w-full bg-[#2A9D8F] text-white px-4 py-2 rounded-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submittedValues, setSubmittedValues] = useState(null);
  const [progressData, setProgressData] = useState({
    BusinessInfo: 0,
    ContactDetails: 0,
    LinkAccounts: 0,
    BusinessHours: 0,
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(businessSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const allValues = useWatch({ control: methods.control });

  useEffect(() => {
    const totalFields = {
      BusinessInfo: [
        "businessName",
        "companyNumber",
        "country",
        "vatNumber",
        "logo",
        "address",
        "apptNo",
        "state",
        "city",
        "postCode",
      ],
      ContactDetails: [
        "primaryContactName",
        "primaryContactEmail",
        "contactNumber",
        "landline",
      ],
      LinkAccounts: ["linkedAccounts"],
      BusinessHours: ["openingHours", "specialHours"],
    };

    const newProgress = {};

    Object.entries(totalFields).forEach(([key, fields]) => {
      let filledCount = 0;

      fields.forEach((field) => {
        const value = allValues?.[field];

        const isFilled = (() => {
          // Special case for linkedAccounts
          if (key === "LinkAccounts" && field === "linkedAccounts") {
            return Array.isArray(value) && value.some((v) => v?.isConnected);
          }

          // Special case for openingHours
          if (key === "BusinessHours" && field === "openingHours") {
            // Check if any day has 'open: true'
            return Array.isArray(value) && value.some((v) => v?.open === true);
          }

          // Special case for specialHours
          if (key === "BusinessHours" && field === "specialHours") {
            // Check if any special date has 'open: true'
            return Array.isArray(value) && value.some((v) => v?.open === true);
          }

          if (value instanceof File) {
            return value.size > 0;
          }

          if (Array.isArray(value)) {
            if (value.length === 0) return false;

            if (typeof value[0] === "object") {
              return value.some((obj) =>
                Object.values(obj).some(
                  (v) => v !== "" && v !== null && v !== undefined
                )
              );
            }

            return value.some((v) => v !== "" && v !== null && v !== undefined);
          }

          if (typeof value === "object" && value !== null) {
            return Object.values(value).some(
              (v) => v !== "" && v !== null && v !== undefined
            );
          }

          return value !== "" && value !== undefined && value !== null;
        })();

        if (isFilled) {
          filledCount += 1;
        }
      });

      const percent = Math.round((filledCount / fields.length) * 100);
      newProgress[key] = percent;
    });

    setProgressData(newProgress);
  }, [allValues]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const onSubmit = (values) => {
    const payLoad = {
      BusinessInfo: {
        businessName: values.businessName,
        companyNumber: values.companyNumber,
        country: values.country,
        vatNumber: values.vatNumber,
        logo: values.logo,
        address: values.address,
        apptNo: values.apptNo,
        state: values.state,
        city: values.city,
        postCode: values.postCode,
      },
      ContactDetails: {
        primaryContactName: values.primaryContactName,
        primaryContactEmail: values.primaryContactEmail,
        contactNumber: values.contactNumber,
        landline: values.landline,
      },
      LinkAccounts: {
        linkedAccounts: values.linkedAccounts.map((account) => ({
          profile: account.profile,
          webAddress: account.webAddress,
        })),
      },
      BusinessHours: {
        openingHours: values.openingHours.map((hour) => ({
          day: hour.day,
          open: hour.open,
          startTime: hour.startTime,
          endTime: hour.endTime,
        })),
        specialHours: values.specialHours.map((hour) => ({
          date: hour.date,
          startTime: hour.start,
          endTime: hour.end,
        })),
      },
    };
    const cleanedValues = cleanSubmittedValues(payLoad);
    setSubmittedValues(cleanedValues);
    setIsPopupOpen(true);
    setCurrentStep(1);
    methods.reset();
  };

  const onError = (errors) => {
    const flatErrors = Object.keys(errors);
    if (flatErrors.length > 0) {
      const firstErrorField = flatErrors[0];
      const step = fieldToStepMap[firstErrorField] || 1;
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        progressData={progressData}
        zodErrors={errors}
      />
      <div className="max-w-4xl mx-auto shadowMain p-6 mt-6 border border-[#E6E9FA] bg-white rounded-lg">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <StepContent
              currentStep={currentStep}
              handleNextStep={handleNextStep}
            />
          </form>
          {currentStep === 4 && (
            <div className="flex justify-center items-center mt-10">
              <button
                className="bg-[#2A9D8F] text-white w-full max-w-[371px] h-[50px] rounded-full"
                onClick={handleSubmit(onSubmit, onError)}
              >
                Submit
              </button>
            </div>
          )}
        </FormProvider>
      </div>
      <ConsolePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        submittedValues={submittedValues}
      />
    </div>
  );
};

export default App;
