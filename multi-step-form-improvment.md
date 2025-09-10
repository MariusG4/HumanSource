# Multi-Step Form Improvement Task
This document outlines the steps to improve the multi-step form implementation by replacing cookie-based persistence with React Context API.

## Task Overview
Currently, the form data is persisted between steps using cookies. This approach has limitations including size constraints, security concerns, and less idiomatic React code. The goal is to implement a more robust solution using React Context API.

## Implementation Steps
### Step 1: Create Form Context
Create a new file FormContext.tsx in the components/Formular directory:

```
import React, { createContext, useContext, 
useState, ReactNode, useEffect } from 
'react';

// Define the shape of your form data
type FormData = {
  // Transport form fields
  tipRemorca?: string;
  vechime?: string;
  regim?: string;
  tahograf?: string;
  echipaj?: string;
  turaNoapte?: string;
  lbItaliana?: string;
  ultimulSalariu?: string;
  salariuDorit?: string;
  nrTelefon?: string;
  category?: string;
  
  // Medical form fields
  experienta?: string;
  domeniu?: string;
  subDomeniu?: string;
  locatia?: string;
  bac?: string;
  amg?: string;
  absolvire?: string;
  cursItaliana?: string;
  experientaLimba?: string;
  ultimuSalar?: string;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (fieldName: string, 
  value: any) => void;
  setFormValues: (values: 
  Partial<FormData>) => void;
  resetForm: () => void;
};

const FormContext = 
createContext<FormContextType | undefined>
(undefined);

export const FormProvider = ({ children, 
initialData = {} }: { children: ReactNode, 
initialData?: Partial<FormData> }) => {
  // Try to load from localStorage first, 
  then use initialData
  const loadInitialState = () => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem
      ('formData');
      return savedData ? { ...
      initialData, ...JSON.parse
      (savedData) } : initialData;
    }
    return initialData;
  };

  const [formData, setFormData] = 
  useState<FormData>(loadInitialState());

  // Save to localStorage whenever formData 
  changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.
      stringify(formData));
    }
  }, [formData]);

  const updateFormData = (fieldName: 
  string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };
  
  const setFormValues = (values: 
  Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
  };

  const resetForm = () => {
    setFormData({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('formData');
    }
  };

  return (
    <FormContext.Provider value={{ 
    formData, updateFormData, 
    setFormValues, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be 
    used within a FormProvider');
  }
  return context;
};
```
### Step 2: Update useMultistepForm Hook
Modify the existing useMultistepForm.ts to integrate with form validation:

```
import { scrollToTop } from "@/utils/
scrollToTop";
import { ReactElement, useState } from 
"react";
import { UseFormReturn } from 
"react-hook-form";

export function useMultistepForm(
  steps: ReactElement[], 
  formMethods?: UseFormReturn<any>,
  validationFields: Record<number, string[]
  > = {}
) {
  const [currentStepIndex, 
  setCurrentStepIndex] = useState(0);
  
  // Validate current step before proceeding
  async function validateCurrentStep() {
    // If no form methods or validation 
    needed for this step
    if (!formMethods || !validationFields
    [currentStepIndex]) return true;
    
    // Trigger validation only for fields 
    in current step
    const result = await formMethods.trigger
    (validationFields[currentStepIndex]);
    return result;
  }

  async function next() {
    const isValid = await 
    validateCurrentStep();
    if (!isValid) return;
    
    scrollToTop();
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }
  
  function back() {
    scrollToTop();
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    scrollToTop();
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.
    length - 1,
    goTo,
    next,
    back,
    progress: (currentStepIndex + 1) / 
    steps.length * 100
  };
}
```
### Step 3: Create Progress Bar Component
Create a new file for the progress bar component:

```
import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar = ({ progress, className 
= '' }: ProgressBarProps) => {
  return (
    <div className={`w-full bg-gray-200 
    rounded-full h-2.5 mb-6 ${className}`}>
      <div 
        className="bg-gri-brand h-2.5 
        rounded-full transition-all 
        duration-300" 
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;
```
### Step 4: Create Animated Form Step Component
Create a component for animated transitions between steps:

```
import React, { ReactNode } from 'react';

interface AnimatedStepProps {
  children: ReactNode;
  stepIndex: number;
  currentIndex: number;
}

// Note: For actual animation, you'll need 
to install framer-motion:
// npm install framer-motion

// Basic version without animation library:
const AnimatedFormStep = ({ children, 
stepIndex, currentIndex }: 
AnimatedStepProps) => {
  if (stepIndex !== currentIndex) return 
  null;
  
  return (
    <div 
      className="w-full transition-opacity 
      duration-300 ease-in-out" 
      style={{ opacity: 1 }}
    >
      {children}
    </div>
  );
};

// Version with framer-motion (uncomment 
after installing):
/*
import { motion, AnimatePresence } from 
'framer-motion';

const AnimatedFormStep = ({ children, 
stepIndex, currentIndex }: 
AnimatedStepProps) => {
  return (
    <AnimatePresence mode="wait">
      {stepIndex === currentIndex && (
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
*/

export default AnimatedFormStep;
```
### Step 5: Update Transport Form Page
Update the transport form page to use the new context:

```
"use client";

import { useMultistepForm } from "@/
components/Formular/useMultistepForm";
import { useState } from "react";
import Pas1Trasport from "@/components/
Formular/sofer/pasi/1";
import Pas2Trasport from "@/components/
Formular/sofer/pasi/2";
// ... other imports

import { SubmitHandler, useForm } from 
"react-hook-form";
import Breadcrumbs from "@/components/
Breadcrumbs/Breadcrumbs";
import Link from "next/link";

import { useMutation } from "@apollo/
client";
import NavigatieFormularSofer from "@/
components/Formular/NavigatieFormularSofer";
import AddTransportForm from "@/lib/apollo/
mutations/mutateTransportForm";
import { useRouter } from "next/navigation";
import { useCookies } from 
"next-client-cookies";
import { useTranslation } from "@/app/i18n/
client";
import CheckIfDefaulthLang from "@/utils/
isDefaultLang";

// New imports
import { FormProvider, useFormContext } 
from "@/components/Formular/FormContext";
import ProgressBar from "@/components/
Formular/ProgressBar";
import AnimatedFormStep from "@/components/
Formular/AnimatedFormStep";

// ... type definitions

// Define validation fields for each step
const validationFields = {
  0: ['tipRemorca'],
  1: ['vechime'],
  // Add validation fields for other steps
};

const FormularSoferContent = ({ params }: { 
params: { lang: string; country: 
string } }) => {
  const { formData, updateFormData, 
  setFormValues } = useFormContext();
  const [disabled, setDisabled] = useState
  (true);
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, 
    isSubmitSuccessful, isLoading },
  } = useForm({
    mode: "onChange",
    defaultValues: formData,
  });

  const formMethods = { register, 
  handleSubmit, setValue, trigger, 
  formState: { errors } };
  
  const { steps, currentStepIndex, 
  isFirstStep, isLastStep, step, back, 
  next, progress } = useMultistepForm(
    [
      <Pas1Trasport key="step1" setValue=
      {setValue} setDisabled={setDisabled} /
      >,
      <Pas2Trasport key="step2" register=
      {register} setValue={setValue} 
      setDisabled={setDisabled} />,
      // ... other steps
    ],
    formMethods,
    validationFields
  );

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = 
  useState(false);
  const [addTransportForm] = useMutation
  (AddTransportForm);

  const onSubmit: SubmitHandler<Inputs> = 
  (data) => {
    setIsSubmitting(true);
    
    // Combine form data with context data
    const submitData = {
      ...formData,
      ...data,
      category: "transport",
    };
    
    addTransportForm({
      variables: {
        data: submitData,
      },
      onCompleted(response) {
        // Store ID if needed
        router.push(`/${params.lang}/
        multumim?title=Transport`);
      },
      onError(error) {
        console.error("Form submission 
        error:", error);
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 
    py-8">
      <Breadcrumbs>
        {/* ... breadcrumbs content */}
      </Breadcrumbs>
      
      <ProgressBar progress={progress} 
      className="mt-8" />
      
      <form onSubmit={handleSubmit
      (onSubmit)} className="flex w-full 
      flex-col items-center justify-center">
        <AnimatedFormStep stepIndex=
        {currentStepIndex} currentIndex=
        {currentStepIndex}>
          {step}
        </AnimatedFormStep>
        
        <NavigatieFormularSofer
          currentStepIndex=
          {currentStepIndex}
          steps={steps}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          back={back}
          next={next}
          disabled={disabled || 
          isSubmitting}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

const FormularSofer = ({ params }: { 
params: { lang: string; country: 
string } }) => {
  // Get initial data from cookies for 
  migration
  const cookies = useCookies();
  
  const initialData = {
    tipRemorca: cookies.get
    ("sofer-tip-remorca") || "",
    vechime: cookies.get
    ("sofer-experienta") || "",
    regim: cookies.get("sofer-regim") || "",
    tahograf: cookies.get
    ("sofer-tahograf") || "",
    echipaj: cookies.get
    ("sofer-echipaj") || "",
    turaNoapte: cookies.get
    ("sofer-noapte") || "",
    lbItaliana: cookies.get
    ("sofer-italiana") || "",
    ultimulSalariu: cookies.get
    ("sofer-ultimul-salariu") || "",
    salariuDorit: cookies.get
    ("sofer-salariu-dorit") || "",
    nrTelefon: cookies.get
    ("sofer-numar-telefon") || "",
    category: "transport",
  };
  
  return (
    <FormProvider initialData={initialData}>
      <FormularSoferContent params=
      {params} />
    </FormProvider>
  );
};

export default FormularSofer;
```
### Step 6: Update Navigation Component
Update the navigation component to support loading state:

```
import { ArrowSmallRightIcon, 
ArrowSmallLeftIcon } from "@heroicons/react/
24/outline";
import { ReactElement } from "react";

interface IButtonProps {
    currentStepIndex: number;
    steps: ReactElement[];
    isFirstStep: boolean;
    isLastStep: boolean;
    disabled: boolean;
    isSubmitting?: boolean;

    back: () => void;
    next: () => void;
}

const stilComunButon =
    "absolute flex w-fit items-center 
    content-center text-center 
    justify-center border border-gri-brand 
    gap-1 rounded-2xl px-2 py-2 
    text-gri-brand md:py-4 md:px-5";

const NavigatieFormularSofer = ({
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    back,
    next,
    disabled,
    isSubmitting = false,
}: IButtonProps) => {
    return (
        <div className="relative flex 
        w-full items-center justify-between 
        px-2 py-12 md:px-16">
            {!isFirstStep && (
                <button
                    className={`$
                    {stilComunButon} left-0 
                    hover:bg-gri-brand 
                    hover:text-alb-site`}
                    onClick={back}
                    type="button"
                    aria-label="Inapoi"
                >
                    <ArrowSmallLeftIcon 
                    strokeWidth={2} 
                    className="h-3 w-3 
                    md:h-5 md:w-5" />
                    <span 
                    className="text-sm 
                    md:text-lg">Inapoi</
                    span>
                </button>
            )}
            <div className="mx-auto text-sm 
            md:text-xl">
                {currentStepIndex + 1} / 
                {steps.length}
            </div>

            {isLastStep ? (
                <button
                    className={`$
                    {stilComunButon} 
                    right-0 ${
                        disabled ? 
                        "cursor-not-allowed 
                        opacity-10" : 
                        "bg-alb-site 
                        hover:bg-gri-brand 
                        hover:text-alb-site"
                    }`}
                    type="submit"
                    disabled={disabled}
                    aria-label="Cauta"
                >
                    {isSubmitting ? (
                        <span 
                        className="flex 
                        items-center">
                            <svg 
                            className="anima
                            te-spin -ml-1 
                            mr-2 h-4 w-4 
                            text-gri-brand" 
                            xmlns="http://
                            www.w3.org/2000/
                            svg" 
                            fill="none" 
                            viewBox="0 0 24 
                            24">
                                <circle 
                                className="o
                                pacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="curr
                                entColor" 
                                strokeWidth=
                                "4"></
                                circle>
                                <path 
                                className="o
                                pacity-75" 
                                fill="curren
                                tColor" 
                                d="M4 12a8 
                                8 0 
                                018-8V0C5.
                                373 0 0 5.
                                373 0 
                                12h4zm2 5.
                                291A7.962 7.
                                962 0 014 
                                12H0c0 3.
                                042 1.135 5.
                                824 3 7.
                                938l3-2.
                                647z"></
                                path>
                            </svg>
                            <span 
                            className="text-
                            sm 
                            md:text-lg">Se 
                            trimite...</
                            span>
                        </span>
                    ) : (
                        <>
                            <span 
                            className="text-
                            sm 
                            md:text-lg">Caut
                            a</span>
                            <ArrowSmallRight
                            Icon 
                            strokeWidth={2} 
                            className="h-3 
                            w-3 md:h-5 
                            md:w-5" />
                        </>
                    )}
                </button>
            ) : (
                <button
                    className={`right-0 $
                    {stilComunButon} ${
                        disabled ? 
                        "cursor-not-allowed 
                        opacity-10" : 
                        "bg-alb-site 
                        hover:bg-gri-brand 
                        hover:text-alb-site"
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        next();
                    }}
                    type="button"
                    disabled={disabled}
                    aria-label="Continua"
                >
                    <span className={`$
                    {disabled ? "text-
                    [#1d2328]" : ""} 
                    text-sm md:text-lg`}
                    >Continua</span>
                    <ArrowSmallRightIcon
                        strokeWidth={2}
                        className={`$
                        {disabled ? 
                        "text-gri-bg" : ""} 
                        h-3 w-3 md:h-5 
                        md:w-5`}
                    />
                </button>
            )}
        </div>
    );
};

export default NavigatieFormularSofer;
```
### Step 7: Update Step Component Example
Update a step component to use the context:

```
import FormWrapper from "../../FormWrapper";
import { useEffect, useState } from "react";
import CardRemorca from "../CardRemorca";
import Cisterna from "../../../../../public/
imagini/formular/sofer/negru/cisterna.svg";
// ... other imports
import { useFormContext } from "../../
FormContext";

interface IClickProps {
    cardSelectat: number;
    valoareFormular: string;
}

const Pas1Trasport = ({ setValue, 
setDisabled }: any) => {
    const { formData, updateFormData } = 
    useFormContext();
    const [selected, setSelected] = useState
    (formData.tipRemorca ? parseInt
    (formData.tipRemorca) : 0);
    const clasaIconite = "w-full";
    
    useEffect(() => {
        if (formData.tipRemorca) {
            setDisabled(false);
        }
    }, []);

    const handleClick = ({ cardSelectat, 
    valoareFormular }: IClickProps) => {
        setValue("tipRemorca", 
        valoareFormular);
        setSelected(cardSelectat);
        updateFormData("tipRemorca", 
        cardSelectat.toString());
        setDisabled(false);
    };

    return (
        <FormWrapper intrebare="Cu ce tip 
        de remorca va doriti sa lucrati?">
            {/* Your existing JSX */}
        </FormWrapper>
    );
};

export default Pas1Trasport;
```
### Step 8: Create Summary Step Component
Create a summary step to show all form data before submission:

```
import FormWrapper from "../../FormWrapper";
import { useFormContext } from "../../
FormContext";

const SummaryStep = () => {
  const { formData } = useFormContext();
  
  // Helper function to format field names 
  for display
  const formatFieldName = (key: string): 
  string => {
    const fieldNameMap: Record<string, 
    string> = {
      tipRemorca: "Tip remorcă",
      vechime: "Experiență",
      regim: "Regim de lucru",
      tahograf: "Tahograf",
      echipaj: "Echipaj",
      turaNoapte: "Tură de noapte",
      lbItaliana: "Limba italiană",
      ultimulSalariu: "Ultimul salariu",
      salariuDorit: "Salariu dorit",
      nrTelefon: "Număr de telefon",
      // Add other field mappings
    };
    
    return fieldNameMap[key] || key;
  };
  
  return (
    <FormWrapper intrebare="Verificați 
    informațiile introduse">
      <div className="w-full space-y-4 
      max-w-2xl mx-auto">
        {Object.entries(formData)
          .filter(([key]) => key !== 
          'category') // Exclude category 
          field
          .map(([key, value]) => (
            <div key={key} 
            className="border-b pb-2">
              <h3 className="font-bold 
              text-gray-700">
              {formatFieldName(key)}:</h3>
              <p className="mt-1">{value}</
              p>
            </div>
          ))
        }
        
        <div className="mt-8 text-sm 
        text-gray-500 p-4 bg-gray-50 
        rounded-lg">
          Verificați informațiile de mai 
          sus și apăsați "Caută" pentru a 
          trimite formularul.
        </div>
      </div>
    </FormWrapper>
  );
};

export default SummaryStep;
```
### Step 9: Update Medical Form Page
Apply the same pattern to the medical form page (similar to the transport form update).

### Step 10: Migration Strategy
1. 1.
   Install any required dependencies:
   
   ```
   npm install framer-motion
   ```
2. 2.
   Implement the Context API files first
3. 3.
   Update one form at a time, starting with the transport form
4. 4.
   Test thoroughly after each form update
5. 5.
   Once all forms are migrated and tested, remove cookie-based persistence code
## Benefits of This Implementation
- Improved State Management : Centralized form state with React Context
- Better Performance : Reduced HTTP overhead by eliminating cookie usage
- Enhanced User Experience : Smooth transitions between steps
- Improved Validation : Step-specific validation with React Hook Form
- Better Persistence : Local storage for larger data and persistence across sessions
- Accessibility Improvements : Better keyboard navigation and screen reader support
- Visual Feedback : Progress bar and loading states
## Testing Checklist
- Form data persists between steps
- Form data persists after page refresh
- Validation works correctly for each step
- Navigation between steps works as expected
- Progress bar accurately reflects current position
- Form submission works correctly
- Loading states display during submission
- Animations work smoothly between steps
- Summary step displays all form data correctly
- Form resets properly after submission
This implementation provides a more robust, user-friendly, and maintainable solution for multi-step forms in your application.