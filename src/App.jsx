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

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
    console.log("Form submitted successfully:", values);
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
      <div className="max-w-4xl mx-auto p-6 mt-6 border border-[#E6E9FA] bg-white rounded-lg">
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
        </FormProvider>
      </div>
    </div>
  );
};

export default App;
