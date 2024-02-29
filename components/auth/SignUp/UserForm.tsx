"use client";
import React, { useEffect, useState } from "react";
import { InputForm } from "@/components/forms";
import { useForm, useFormContext } from "react-hook-form";
import { SelectCountryForm } from "@/components/forms";
import { GlobalSignupFormState } from "@/app/signup/page";
import { MultiSelect } from "@/components/ui/multiSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { form } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { countries } from "countries-list";
import RenderFormButton from "@/components/common/RenderFormButton";

const validationSchema = Yup.object({
  firstName: Yup.string().required(form.REQUIRED),
  lastName: Yup.string().required(form.REQUIRED),
  email: Yup.string().email(form.EMAIL_INVALID).required(form.REQUIRED),
  country: Yup.string().required(form.REQUIRED),
  job: Yup.string().required(form.REQUIRED),
}).required();

interface Props {
  globalFormState: GlobalSignupFormState;
  setGlobalFormState: (globalFormState: GlobalSignupFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const UserForm = ({
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const form = useForm({ mode: "all", resolver: yupResolver(validationSchema) });
  const {
    watch,
    control,
    register,
    setFocus,
    formState,
    getValues,
    setValue,
    handleSubmit,
  } = form;
  const { isValid, errors } = formState;

  const onSubmit = handleSubmit((data) => {
    const userForm = {
      ...data,
    };
    console.log(userForm);
    const newGlobalFormState = {
      ...globalFormState,
      userForm,
    };
    setGlobalFormState(newGlobalFormState);
  });

  useEffect(() => {
    console.log(
      "🚀 ~ file: TypeForm.tsx:75 ~ onSubmit ~ newGlobalFormState:",
      globalFormState
    );
  }, [globalFormState]);

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  useEffect(() => {
    setValue("country", selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    console.log(isValid);
    console.log(errors);
    console.log(
      "🚀 ~ file: InfosOfferForm.tsx:119 ~ selectedCountries:",
      selectedCountry
    );
  }, [selectedCountry]);

  return (
    <fieldset className="w-full flex flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            <div className="w-full lg:w-1/2">
              <InputForm
                id="firstName"
                name="Prenom"
                type="text"
                required={true}
                register={register("firstName")}
                errors={errors?.firstName?.message}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <InputForm
                id="lastName"
                name="Nom"
                type="text"
                required={true}
                register={register("lastName")}
                errors={errors?.lastName?.message}
              />
            </div>
          </div>
          <InputForm
            id="email"
            name="Email Professionnelle"
            type="email"
            required={true}
            register={register("email")}
            errors={errors?.email?.message}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays de résidence</FormLabel>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                  defaultValue={selectedCountry}
                >
                  <FormControl>
                    <SelectTrigger /* className="border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700" */
                    >
                      <SelectValue placeholder="Indiquer votre pays de résidence" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(countries).map((country, index) => (
                      <SelectItem value={country[0]}>
                        {country[1].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <InputForm
            id="job"
            name="Votre poste"
            type="text"
            required={true}
            register={register("job")}
            errors={errors?.job?.message}
          />
        </form>
      </Form>
      <RenderFormButton
        isvalid={isValid}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        onSubmit={onSubmit}
      />
    </fieldset>
  );
};

export default UserForm;
