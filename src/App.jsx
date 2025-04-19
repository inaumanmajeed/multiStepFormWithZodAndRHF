import React, { useState } from "react";
import Stepper from "./components/shared/Stepper";
import BusinessInfo from "./components/from/BusinessInfo";
import { FormProvider, useForm } from "react-hook-form";
import { businessSchema } from "./utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactDetails from "./components/from/ContactDetails";
import LinkAccounts from "./components/from/LinkAccounts";
import BusinessHours from "./components/from/BusinessHours";
import { fieldToStepMap } from "./utils/staticValues";

const initialValues = {
  businessName: "",
  companyNumber: "",
  country: "",
  vatNumber: "",
  logo: null,
  address: "",
  apptNo: "",
  state: "",
  city: "",
  postCode: "",
  primaryContactName: "",
  primaryContactEmail: "",
  contactNumber: "",
  landline: "",
  linkedAccounts: [
    {
      profile: "",
      webAddress: "",
    },
  ],
  openingHours: [
    {
      day: "Monday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Tuesday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Wednesday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Thursday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Friday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Saturday",
      open: false,
      startTime: "",
      endTime: "",
    },
    {
      day: "Sunday",
      open: false,
      startTime: "",
      endTime: "",
    },
  ],
  specialHours: [],
};

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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Submitted Values</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
          {JSON.stringify(submittedValues, null, 2)}
        </pre>
        <button
          className="mt-4 bg-[#2A9D8F] text-white px-4 py-2 rounded-full"
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
  console.log("🚀 ~ App ~ submittedValues:", submittedValues)

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(businessSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    setSubmittedValues(values);
    // setIsPopupOpen(true);
    // setCurrentStep(1); 
    // methods.reset(); 
    // setIsPopupOpen(false);
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
      <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
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
