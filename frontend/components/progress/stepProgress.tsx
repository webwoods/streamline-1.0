'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";

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

export const MultiStepIndicator = ({ currentStep, steps }: Readonly<{
  currentStep: number, steps: {
    label: string
    icon: any
  }[]
}>) => {
  return (
    <div className={`grid grid-cols-${steps.length}`}>
      {steps.map((step, index) => (
        <FlowStep key={step.label} currentStep={currentStep >= index + 1} label={step.label} icon={step.icon} />
      ))}
    </div>
  );
};


export const MultiStepProgressBar = ({ count, currentStep }: Readonly<{ count: number, currentStep: number }>) => {
  return (
    <div className="flex justify-between items-center">
      {Array.from({ length: count + 1 }).map((_, index) => (
        <React.Fragment key={index}>
          <FlowIndicator active={currentStep >= index + 1} />
          {index < count && (
            <div className={`w-1/${count} ${currentStep >= index + 2 ? 'bg-blue-500' : 'bg-slate-300'} h-1`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const MultiStepForm = ({ children, currentStep }: Readonly<{ children: ReactNode[], currentStep: number }>) => {
  return (
    <div className="w-full">
      {children.map((child, index) => (
        index === currentStep - 1 && (
          <div key={index}>
            {child}
          </div>
        )
      ))}
    </div>
  );
};

export const MultistepComponent = ({ steps, children }: Readonly<{
  steps: {
    label: string
    icon: any
  }[],
  children: ReactNode[]
}>) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="w-full">
      <MultiStepIndicator currentStep={currentStep} steps={steps} />
      <MultiStepProgressBar count={3} currentStep={currentStep} />
      <MultiStepForm currentStep={currentStep}>
        {children}
      </MultiStepForm>
    </div>
  );
};