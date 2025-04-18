import React, { useState } from "react";
import Stepper from "./components/shared/Stepper";
import BusinessInfo from "./components/from/BusinessInfo";
import { useForm } from "react-hook-form";
import { businessSchema } from "./utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
};

const StepContent = ({
  currentStep,
  control,
  errors,
  setValue,
  handleNextStep,
}) => {
  switch (currentStep) {
    case 1:
      return (
        <BusinessInfo
          control={control}
          errors={errors}
          setValue={setValue}
          handleNextStep={handleNextStep}
        />
      );
    case 2:
      return <div className="p-6">📞 Contact Details Content</div>;
    case 3:
      return <div className="p-6">🔗 Link Account Content</div>;
    case 4:
      return <div className="p-6">🔐 Access & Permissions Content</div>;
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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(businessSchema),
  });

  const onSubmit = async (values) => {
    try {
      console.log("Form submitted successfully:", values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="max-w-4xl mx-auto p-6 mt-6 border border-[#E6E9FA] bg-white rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <StepContent
            control={control}
            currentStep={currentStep}
            errors={errors}
            setValue={setValue}
            handleNextStep={handleNextStep}
          />
          {/* <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
          >
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default App;
