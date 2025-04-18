import React from "react";

const steps = [
  "Business Info",
  "Contact Details",
  "Link Account",
  "Access & Permissions",
];

const Stepper = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Circle */}
              <div
                className={`w-4 h-4 z-10 rounded-full border-[4px] flex items-center justify-center cursor-pointer
                  ${
                    isCompleted 
                      ? "border-teal-500"
                      : "border-[#7C8BA0]"
                  }
                  bg-white`}
                onClick={() => setCurrentStep(index + 1)}
              >
                {/* {isCompleted && (
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                )} */}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm text-center ${
                  isActive ? "text-teal-600 font-semibold" : "text-gray-500"
                }`}
              >
                {step}
              </span>

              {/* Line segment (only if not last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-2 left-0 h-0.5 ${
                    currentStep > index + 1 ? "bg-teal-500" : "bg-gray-300"
                  }`}
                  style={{
                    width: "100%",
                    transform: "translateX(50%)",
                    zIndex: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
