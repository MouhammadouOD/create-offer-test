"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { SelectForm } from "@/components/forms";
import YesOrNoRadioForm from "@/components/forms/YesOrNoRadioForm";
import PublicOrPrivateOffer from "@/components/forms/PublicOrPrivateOffer";
import { CardTitle } from "@/components/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { form } from "@/constants";
import { GlobalOfferFormState } from "@/app/page";
import { Dispatch } from "@reduxjs/toolkit";
import RenderFormButton from "../common/RenderFormButton";
import { DateTimePicker } from "../ui/dateTimePicker";
import { Button } from "../ui/button";

const validationSchema = Yup.object({
  typeOffer: Yup.string().required(form.REQUIRED),
  target: Yup.string().required(form.REQUIRED),
  typeResponse: Yup.string().required(form.REQUIRED),
  displayName: Yup.boolean().required(form.REQUIRED),
  public: Yup.boolean().required(form.REQUIRED),
}).required();

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TypeForm = ({
  globalFormState,
  handleNextStep,
  handlePrevStep,
  setGlobalFormState,
}: Props) => {
  /* const {
    register,
    setFocus,
    setValue,
    getValues,
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
    const typeofferdata = data;
    const newGlobalFormState = { ...globalFormState, typeForm: typeofferdata };
    setGlobalFormState(newGlobalFormState);
  });
  useEffect(() => {
    console.log(
      "🚀 ~ file: TypeForm.tsx:70 ~ onSubmit ~ newGlobalFormState:",
      globalFormState
    );
  }, [globalFormState]);

  useEffect(() => {
    setFocus("typeOffer");
  }, [setFocus]);

  return (
    <fieldset className="w-full flex flex-col space-y-8">
      <form onSubmit={onSubmit}>
        <CardTitle title={"Type"} />
        <SelectForm
          full={true}
          id="typeOffer"
          name="type d'offre"
          required={true}
          value={getValues("typeOffer")}
          //setValue={setValue}
          register={register("typeOffer")}
          options={[
            {
              value: "",
              label: "Choisissez un élément",
            },
            {
              value: "call_tender",
              label: "Appel d'offre (Pub)",
            },
            {
              value: "offer",
              label: "Offre",
            },
            {
              value: "need",
              label: "Besoin",
            },
            {
              value: "other",
              label: "Autre",
            },
          ]}
          errors={errors?.typeOffer?.message}
        />
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="w-full lg:w-1/2">
            <SelectForm
              full={true}
              id="target"
              name="Cible"
              required={true}
              value={getValues("target")}
              //setValue={setValue}
              register={register("target")}
              options={[
                {
                  value: "",
                  label: "Choisissez un élément",
                },
                {
                  value: "company",
                  label: "Entreprise",
                },
                {
                  value: "freelance",
                  label: "Freelance",
                },
              ]}
              errors={errors?.target?.message}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <SelectForm
              full={true}
              id="typeResponse"
              name="Offre"
              required={true}
              value={getValues("typeResponse")}
              //setValue={setValue}
              register={register("typeResponse")}
              options={[
                {
                  value: "",
                  label: "Choisissez un élément",
                },
                {
                  value: "global",
                  label: "Global",
                },
                {
                  value: "partial",
                  label: "Partial",
                },
              ]}
              errors={errors?.typeResponse?.message}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="w-full lg:w-1/2">
            <YesOrNoRadioForm
              label="Afficher mon nom"
              hasOutline={true}
              value={getValues("displayName")}
              register={register("displayName")}
              nameError="displayName"
              error={String(errors?.displayName?.message)}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <PublicOrPrivateOffer
              label="Offre publique ou privée"
              hasOutline={true}
              value={getValues("public")}
              register={register("public")}
              nameError="public"
              error={String(errors?.public?.message)}
            />
          </div>
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
export default TypeForm;
