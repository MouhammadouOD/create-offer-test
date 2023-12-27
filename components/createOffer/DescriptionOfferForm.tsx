import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { TextareaForm } from "@/components/forms";
import { CardTitle } from "@/components/common";
import { GlobalOfferFormState } from "@/app/page";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { form } from "@/constants";
import RenderFormButton from "../common/RenderFormButton";
import { Button } from "../ui/button";

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void
  handleNextStep:() => void;
handlePrevStep:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const validationSchema = Yup.object({
  description: Yup.string().required(form.REQUIRED),
}).required();

const DescriptionOfferForm = ({
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
    const detailsofferdata = data;
    const newGlobalFormState = { ...globalFormState, descriptionOfferForm: detailsofferdata };
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
        <CardTitle title={"Description"} />
        <div className="h-full">
          <TextareaForm
            id="description"
            name="Veuillez décrire votre offre"
            required={true}
            size={14}
            isResize={true}
            register={register("description")}
            errors={errors?.description?.message}
          />
        </div>
        <Button type="submit">Soumettre</Button>
      </form>
        <RenderFormButton
          isvalid={isValid}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </fieldset>
  );
};
export default DescriptionOfferForm;
