import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { DateTimeForm, TextareaForm } from "@/components/forms";
import ReactSelectForm from "@/components/forms/ReactSelectForm";
import { CardTitle } from "@/components/common";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { form } from "@/constants";
import { GlobalOfferFormState } from "@/app/page";
import RenderFormButton from "../common/RenderFormButton";
import { DateTimePicker } from "../ui/dateTimePicker";
import { DateTime } from "luxon";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MultiSelect } from "../ui/multiSelect";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/app/hooks";

const validationSchema = Yup.object({
  title: Yup.string().required(form.REQUIRED),
  countries: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
    form.REQUIRED
  ),
  categories: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
    form.REQUIRED
  ),
  closingDate: Yup
    .date /* string */
    ()
    .required(form.REQUIRED),
}).required();

type FormValues = {
  title: string;
  closingDate: Date;
};

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const InfosOfferForm = ({
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
    control,
    formState: { errors },
  } = useFormContext(); */

  /* const { errors } = formState; */
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
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { isValid, errors } = formState;

  const dispatch = useAppDispatch();
  let categoryFetched = useAppSelector(
    (state) => state.category.categoryFetched
  );
  let countryFetched = useAppSelector((state) => state.country.countryFetched);

  /* const onSubmit = handleSubmit((data) => {console.log(data)}); */
  const onSubmit = handleSubmit((data) => {
    const infosofferdata = {
      ...data,
      closingDate: new Date(data.closingDate),
      countries: selectedCountries,
      categories: selectedCategories,
    };
    console.log(infosofferdata);
    const newGlobalFormState = {
      ...globalFormState,
      infosOfferForm: infosofferdata,
    };
    setGlobalFormState(newGlobalFormState);
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: TypeForm.tsx:70 ~ onSubmit ~ newGlobalFormState:",
      globalFormState
    );
  }, [globalFormState]);

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  
  useEffect(() => {
    setValue("countries", selectedCountries)
    setValue("categories", selectedCategories)
  }, [selectedCountries, selectedCategories]);

  useEffect(() => {
    console.log(isValid);
    console.log(errors);
    console.log("🚀 ~ file: InfosOfferForm.tsx:119 ~ selectedCountries:", selectedCountries)
  }, [selectedCountries]);

  const locale = "fr";
  const minDate = new Date();
  return (
    <fieldset className="w-full flex flex-col space-y-6">
      <form onSubmit={onSubmit}>
        <CardTitle title={"Informations"} />
        <TextareaForm
          id="title"
          name="titre"
          limitText={500}
          required={true}
          register={register("title")}
          errors={errors?.title?.message}
        />
        <div className="my-4">
          Pays de la prestation: <br />
          <MultiSelect
            options={[
              {
                value: "next.js",
                label: "Next.js",
              },
              {
                value: "sveltekit",
                label: "SvelteKit",
              },
              {
                value: "nuxt.js",
                label: "Nuxt.js",
              },
              {
                value: "remix",
                label: "Remix",
              },
              {
                value: "astro",
                label: "Astro",
              },
              {
                value: "wordpress",
                label: "WordPress",
              },
              {
                value: "express.js",
                label: "Express.js",
              },
            ]}
            selected={selectedCountries}
            onChange={setSelectedCountries}
            className="w-[560px]"
          />
          <input
            id="countries"
            type="hidden"
            value={selectedCountries}
            /* {...register("countries")} */
          />
          {/*
          <ReactSelectForm
            label="Pays de la prestation"
            id="countries"
            name="countries"
            required={true}
            register={register("countries")}
            value={getValues("countries")}
            /* setValue={setValue}
          control={control}
            isMulti={true}
            canCreate={false}
            placeholder="Indiquer les pays cibles"
            apiType="country"
            apiParams={{
              opField: locale === "fr" ? "nameFr" : "nameEn",
              continent: "Africa",
              op: "iLike",
              size: 100,
            }}
            errors={errors?.countries?.message}
          />*/}
        </div>

        <div className="my-4">
          industries visées :
          <MultiSelect
            options={[
              {
                value: "next.js",
                label: "Next.js",
              },
              {
                value: "sveltekit",
                label: "SvelteKit",
              },
              {
                value: "nuxt.js",
                label: "Nuxt.js",
              },
              {
                value: "remix",
                label: "Remix",
              },
              {
                value: "astro",
                label: "Astro",
              },
              {
                value: "wordpress",
                label: "WordPress",
              },
              {
                value: "express.js",
                label: "Express.js",
              },
            ]}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            className="w-[560px]"
          />
          <input
            id="countries"
            type="hidden"
            value={selectedCategories}
            /* {...register("categories")} */
          />
          {/* <ReactSelectForm
            label="industries visées"
            id="categories"
            name="categories"
            register={register("categories")}
            /* setValue={setValue}
          control={control}
            value={getValues("categories")}
            limitItems={8}
            isMulti={true}
            canCreate={true}
            placeholder="Indiquer les industries cibles"
            apiType="category"
            apiParams={{
              opField: locale === "fr" ? "nameFr" : "nameEn",
              op: "iLike",
              size: 100,
            }}
            errors={errors?.categories?.message}
          /> */}
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="w-full lg:w-1/2">
            Entrez la date de clôture de l&apos;offre: <br />
              {/* <input
                type="date"
                id="closingDate"
                value={date.toLocaleString()}
                onChange={e => register("closingDate", {value: e.target.value })}
                {...register("closingDate")}
              /> */}
            <DateTimePicker
              label="Entrez la date de clôture de l'offre"
              minDate={minDate}
              date={date}
              setDate={setDate}
              setValue={setValue}
              registerField="closingDate"
            />
            {/* <DateTimeForm
              label="Date de cloture de l'offre"
              id="closingDate"
              name="closingDate"
              required={true}
              minDate={minDate}
              control={control}
              errors={errors?.closingDate?.message}
            /> */}
          </div>
          <div className="w-full lg:w-1/2">
            {/* <DateTimeForm
              label="Heure de cloture de l'offre"
              id="closingDateHour"
              name="closingDateHour"
              required={true}
              onlyTime={true}
              //control={control}
              format="time"
              errors={errors?.closingDateHour?.message}
            /> */}
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
export default InfosOfferForm;
