import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { TextareaForm } from "@/components/forms";
import { CardTitle } from "@/components/common";
import { GlobalOfferFormState } from "@/app/page";
import * as Yup from "yup";
import { form } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import RenderFormButton from "../common/RenderFormButton";
import { Button } from "../ui/button";

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const validationSchema = Yup.object({
  termsConditionsAward: Yup.string().required(),
  selectionCriteria: Yup.string().required(),
  criteriaJudgingOffers: Yup.string().required(),
}).required();

const ConditionsOfferForm = ({
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  /* const {
    register,
    formState: { errors }
  } = useFormContext() */

  const {
    watch,
    register,
    setFocus,
    formState,
    getValues,
    setValue,
    control,
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(validationSchema) });
  const { isValid, errors } = formState;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const conditionsofferdata = data;
    const newGlobalFormState = { ...globalFormState, conditionsOfferForm: conditionsofferdata };
    setGlobalFormState(newGlobalFormState);
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: TypeForm.tsx:70 ~ onSubmit ~ newGlobalFormState:",
      globalFormState
    );
  }, [globalFormState]);

  return (
    <fieldset className="w-full flex flex-col space-y-4">
      <form onSubmit={onSubmit}>
        <CardTitle title={"Conditions"} />
        <div className="h-full">
          <TextareaForm
            id="termsConditionsAward"
            name="Modalités d’attribution"
            register={register("termsConditionsAward")}
            errors={errors?.termsConditionsAward?.message}
          />

          <TextareaForm
            id="selectionCriteria"
            name="Critères de séléction"
            register={register("selectionCriteria")}
            errors={errors?.selectionCriteria?.message}
          />

          <TextareaForm
            id="criteriaJudgingOffers"
            name="Critère de jugement des réponses"
            register={register("criteriaJudgingOffers")}
            errors={errors?.criteriaJudgingOffers?.message}
          />
        </div>
        <Button type="submit">Soumettre</Button>

      </form>
      <RenderFormButton
        isvalid={isValid}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
onSubmit={onSubmit}
      />
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </fieldset>
  );
};
export default ConditionsOfferForm;
