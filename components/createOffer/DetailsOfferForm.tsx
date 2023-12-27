import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  DateTimeForm,
  ErrorForm,
  InputForm,
  SelectCurrencyForm,
} from "@/components/forms";
import { CardTitle } from "@/components/common";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { form } from "@/constants";
import { GlobalOfferFormState } from "@/app/page";
import RenderFormButton from "../common/RenderFormButton";
import { DateTimePicker } from "../ui/dateTimePicker";
import { Input } from "../ui/input";
import { DateTime } from "luxon";
import { Button } from "../ui/button";

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const validationSchema = Yup.object({
  budget: Yup.number().positive(form.NUMBER_POSITIVE).required(form.REQUIRED),
  budgetCurrency: Yup.string().required(form.REQUIRED),
  deadlineStart: Yup.string() /* date() */
    .required(form.REQUIRED),
  deadlineEnd: Yup.string() /* date() */
    .required(form.REQUIRED),
}).required();

const DetailsOfferForm = ({
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
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
  const [deadlineStart, setDeadlineStart] = useState<Date>(new Date());
  const [deadlineEnd, setDeadlineEnd] = useState<Date>(new Date());

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const detailsofferdata = {
      ...data,
      deadlineStart: new Date(data.deadlineStart),
      deadlineEnd: new Date(data.deadlineEnd),
    };
    const newGlobalFormState = {
      ...globalFormState,
      detailsOfferForm: detailsofferdata,
    };
    setGlobalFormState(newGlobalFormState);
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: TypeForm.tsx:70 ~ onSubmit ~ newGlobalFormState:",
      globalFormState
    );
  }, [globalFormState]);

  const minDate = globalFormState.infosOfferForm.closingDate
    ? new Date(globalFormState.infosOfferForm.closingDate)
    : new Date();
  const deadlineStartWatch = watch("deadlineStart");

  return (
    <fieldset className="w-full flex flex-col space-y-4">
      <form onSubmit={onSubmit}>
        <CardTitle title={"Details"} />
        <div className="w-1/2 lg:w-1/2">
          <div className="relative">
            <InputForm
              id="budget"
              name="Budget"
              type="number"
              required={true}
              register={register("budget")}
              errors={errors?.budget?.message}
            />
            <div className="absolute bottom-1 right-1">
              <SelectCurrencyForm
                full={true}
                id="budgetCurrency"
                name="budgetCurrency"
                required={true}
                value={getValues("budgetCurrency")}
                /* setValue={setValue} */
                register={register("budgetCurrency")}
              />
            </div>
          </div>

          {errors?.budget?.message &&
            errors?.budget?.message !== "undefined" && (
              <ErrorForm>{String(errors?.budget?.message)}</ErrorForm>
            )}
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="w-full lg:w-1/2">
            Date de début de la prestation : <br />
            <DateTimePicker
              label="Date de début de la prestation"
              date={deadlineStart}
              setDate={setDeadlineStart}
            />
            <Input
              type="hidden"
              id="deadlineStart"
              value={DateTime.fromJSDate(deadlineStart).toLocaleString()}
              {...register("deadlineStart")}
            />
            {/* <DateTimeForm
              label="Date de début de la prestation"
              id="deadlineStart"
              name="deadlineStart"
              required={true}
              minDate={minDate}
              control={control}
              errors={errors?.deadlineStart?.message}
            /> 
            */}
          </div>
          <div className="w-full lg:w-1/2">
            Date de fin de la prestation : <br />
            <DateTimePicker
              label="Date de fin de la prestation"
              minDate={deadlineStart}
              date={deadlineEnd}
              setDate={setDeadlineEnd}
            />
            <Input
              type="hidden"
              id="deadlineEnd"
              value={DateTime.fromJSDate(deadlineEnd).toLocaleString()}
              {...register("deadlineEnd")}
            />
            {/* <DateTimeForm
              label="Date de fin de la prestation"
              id="deadlineEnd"
              name="deadlineEnd"
              required={true}
              minDate={deadlineStartWatch}
              control={control}
              errors={errors?.deadlineEnd?.message}
            /> */}
          </div>
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
export default DetailsOfferForm;
