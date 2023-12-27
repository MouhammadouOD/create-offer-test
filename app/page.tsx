"use client";
import PreviewForm from "@/components/PreviewForm";
import { CardTitle } from "@/components/common";
import RenderFormButton from "@/components/common/RenderFormButton";
import RenderForm from "@/components/common/RenderFormButton";
import ConditionsOfferForm from "@/components/createOffer/ConditionsOfferForm";
import DescriptionOfferForm from "@/components/createOffer/DescriptionOfferForm";
import DetailsOfferForm from "@/components/createOffer/DetailsOfferForm";
import FilesOfferForm from "@/components/createOffer/FilesOfferForm";
import InfosOfferForm from "@/components/createOffer/InfosOfferForm";
import TypeForm from "@/components/createOffer/TypeForm";
import { form } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

Yup.object({
  title: Yup.string().required(form.REQUIRED),
  countries: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
    form.REQUIRED
  ),
  categories: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
    form.REQUIRED
  ),
  closingDate: Yup.date().required(form.REQUIRED),
  closingDateHour: Yup.date().required(form.REQUIRED),
}).required();

export type GlobalOfferFormState = {
  typeForm: TypeFormData;
  infosOfferForm: /* {
    title: string;
    countries: [];
    categories: [];
    closingDate: Date;
    closingDateHour: Date;
  } */InfosOfferFormData;
  detailsOfferForm: /* {
    budgets: number;
    budgetCurrency: string;
    deadlineStart: Date;
    deadlineEnd: Date;
  } */DetailsOfferFormData;
  descriptionOfferForm: /* string */DescriptionOfferFormData;
  conditionsOfferForm: {
    termsConditionsAward: string;
    selectionCriteria: string;
    criteriaJudgingOffers: string;
  };
  filesOfferForm: /* {
    files: File[] | undefined
  } */FilesOfferFormData
};

export default function Home() {
  const [formStep, setFormStep] = useState(0);
  const [globalFormState, setGlobalFormState] = useState<GlobalOfferFormState>({
    typeForm: {
      typeOffer: "",
      target: "",
      typeResponse: "",
      displayName: false,
      public: false,
    },
    infosOfferForm: {
      title: "",
      countries: [],
      categories: [],
      closingDate: new Date(),
      closingDateHour: new Date(),
    },
    detailsOfferForm: {
      budget: 0,
      budgetCurrency: "",
      deadlineStart: new Date(),
      deadlineEnd: new Date(),
    },
    descriptionOfferForm: {description:""},
    conditionsOfferForm: {
      termsConditionsAward: "",
      selectionCriteria: "",
      criteriaJudgingOffers: "",
    },
    filesOfferForm: {
      files: undefined
    }
  });

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const handlePrevStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (formStep > 0) {
      setFormStep((cur) => cur - 1);
    }
  };

  const setGlobalFormStateFunc = (globalFormState:GlobalOfferFormState) => {
    setGlobalFormState(globalFormState)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {formStep}
      {formStep === 0 && (
        <TypeForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormStateFunc}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 1 && (
        <InfosOfferForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 2 && (
        <DetailsOfferForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 3 && (
        <DescriptionOfferForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 4 && (
        <ConditionsOfferForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 5 && (
        <FilesOfferForm
          globalFormState={globalFormState}
          setGlobalFormState={setGlobalFormState}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {formStep === 6 && (
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
