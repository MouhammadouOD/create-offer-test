"use client";
import PreviewForm from "@/components/PreviewForm";
import {
  FinanceForm,
  InfosForm,
  RequirementForm,
  StatusForm,
  UserForm,
} from "@/components/auth/SignUp";
import { CardTitle } from "@/components/common";
import { useState } from "react";
import * as Yup from "yup";

export type GlobalSignupFormState = {
  userForm: UserFormData;
  statusForm: StatusFormData;
  infosForm: InfosFormData;
  financeForm: FinanceFormData;
  requirementForm: RequirementFormData;
};

export default function Home() {
  const [formStep, setFormStep] = useState(2);
  const [globalFormState, setGlobalFormState] = useState<GlobalSignupFormState>(
    {
      userForm: {
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        job: "",
      },
      statusForm: {
        status: "",
        nameCompany: undefined,
        typeCompany: undefined,
        typeBusiness: undefined,
        levelExperience: undefined,
        yearExperience: undefined,
        businessSizeExperience: undefined,
        description: "",
      },
      infosForm: {
        mainIndustry: undefined,
        otherIndustries: undefined,
        competences: undefined,
        headquarters: undefined,
        areaActivities: undefined,
      },
      financeForm: {
        levelDevelopment: "",
        revenue: "",
        clients: undefined,
        files: undefined,
      },
      requirementForm: {
        countries: [],
        descriptionRequirement: undefined,
        find_partners: false,
        find_suppliers: false,
        find_customers: false,
        seeks_investor: false,
        find_skills: false,
        exchange_share: false,
        trained_for_development: false,
        other: false,
      },
    }
  );

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const handlePrevStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (formStep > 0) {
      setFormStep((cur) => cur - 1);
    }
  };

  const setGlobalFormStateFunc = (globalFormState: GlobalSignupFormState) => {
    setGlobalFormState(globalFormState);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {formStep}
      {formStep === 0 && (
        <UserForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormStateFunc}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 1 && (
        <StatusForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 2 && (
        <InfosForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 3 && (
        <FinanceForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 4 && (
        <RequirementForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 5 && (
        <>
          <CardTitle title="Récapitulatif de votre offre" />
          <PreviewForm
            hasActivatedScrolling={false}
            section="createOffer"
            listValues={globalFormState}
          />
        </>
      )}
    </main>
  );
}
