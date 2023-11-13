'use client'

import { faCertificate, faFileLines, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function FlowIndicator({ active }: Readonly<{ active: boolean }>) {
  return (
    <div className={`w-3 aspect-square ${active ? 'bg-blue-500' : 'bg-slate-300'} rounded-full flex justify-center items-center`}>
    </div>
  );
}

export function FlowStep({ currentStep, label, icon }: Readonly<{ currentStep: boolean, label: string, icon: any }>) {
  return (
    <div className={`flex justify-center gap-2 ${currentStep ? 'text-blue-500' : 'text-slate-300'} pb-3`}>
      <FontAwesomeIcon size="lg" icon={icon} />
      <span className="text-sm">{label}</span>
    </div>);
}

const MultiStepIndicator = ({ currentStep }: Readonly<{ currentStep: number }>) => {
  return (
    <div className="grid grid-cols-3">
      <FlowStep currentStep={currentStep >= 1} label="Create" icon={faFileLines} />
      <FlowStep currentStep={currentStep >= 2} label="Add items" icon={faSquarePlus} />
      <FlowStep currentStep={currentStep >= 3} label="Verify" icon={faCertificate} />
    </div>
  );
};

const MultiStepProgressBar = ({ currentStep }: Readonly<{ currentStep: number }>) => {
  return (
    <div className="flex justify-between items-center">
      <FlowIndicator active={currentStep >= 1} />
      <div className={`w-1/3 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-slate-300'} h-1`}></div>
      <FlowIndicator active={currentStep >= 2} />
      <div className={`w-1/3 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-slate-300'} h-1`}></div>
      <FlowIndicator active={currentStep >= 3} />
      <div className={`w-1/3 ${currentStep >= 4 ? 'bg-blue-500' : 'bg-slate-300'} h-1`}></div>
      <FlowIndicator active={currentStep === 4} />
    </div>
  );
};

const MultiStepForm = ({ currentStep }: Readonly<{ currentStep: number }>) => {
  return (
    <div className="w-full">
      {/* Your form content for each step goes here */}
      {/* For example, you can conditionally render different form sections based on the current step */}
      {/* {currentStep === 1 && <div>Step 1 Content</div>}
      {currentStep === 2 && <div>Step 2 Content</div>}
      {currentStep === 3 && <div>Step 3 Content</div>} */}
    </div>
  );
};

const MultistepComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="w-full">
      <MultiStepIndicator currentStep={currentStep} />
      <MultiStepProgressBar currentStep={currentStep} />
      <MultiStepForm currentStep={currentStep} />

      {/* Navigation buttons */}
      <div className="mt-4">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextStep}
          disabled={currentStep === 4}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default function CreateRequest() {
  return (
    <div className="w-full flex justify-center py-10 max-w-screen-lg px-6 ">
      <MultistepComponent />
    </div>
  );
}