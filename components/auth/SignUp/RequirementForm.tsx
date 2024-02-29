import React, { useEffect, useState } from "react";
import { TextareaForm } from "@/components/forms";
import { useForm, useFormContext } from "react-hook-form";
import ReactSelectField from "@/components/forms/ReactSelectForm";
import RequirementCheckboxForm from "@/components/forms/RequirementCheckboxForm";
import { GlobalSignupFormState } from "@/app/signup/page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "countries-list";
import { yupResolver } from "@hookform/resolvers/yup";
import { requirementValidationSchema } from "@/helpers/yupValidationForm";
import RenderFormButton from "@/components/common/RenderFormButton";
import { MultiSelect, OptionType } from "@/components/ui/multiSelect";

const validationSchema = requirementValidationSchema;

interface Props extends PropsEditMode {
  globalFormState: GlobalSignupFormState;
  setGlobalFormState: (globalFormState: GlobalSignupFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RequirementForm = ({
  isEditMode,
  session,
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const form = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const {
    watch,
    register,
    setFocus,
    formState,
    getValues,
    setValue,
    reset,
    handleSubmit,
  } = form;
  const { isValid, errors } = formState;

  const onSubmit = handleSubmit((data) => {
    const requirementForm = {
      ...(data as RequirementFormData),
    };
    console.log(requirementForm);
    const newGlobalFormState = {
      ...globalFormState,
      requirementForm,
    };
    setGlobalFormState(newGlobalFormState);
  });
  const locale = "fr";
  const userFreelance = session?.UserFreelanceInformation;

  useEffect(() => {
    if (isEditMode && session?.Requirement) {
      Object.entries(session?.Requirement).map(([key, value]) => {
        if (key !== "id") {
          const val =
            key === "descriptionRequirement"
              ? value !== null
                ? String(value).toLowerCase()
                : ""
              : !!value;
          setValue(key, val);
        }
      });
    }
  }, [isEditMode, session?.Requirement]);

  useEffect(() => {
    if (isEditMode && userFreelance?.UserFreelanceTargetCountry) {
      !!userFreelance?.UserFreelanceTargetCountry.length &&
        setValue("countries", userFreelance?.UserFreelanceTargetCountry);
    }
  }, [isEditMode, userFreelance?.UserFreelanceTargetCountry]);

  useEffect(() => {
    if (isEditMode && session) {
      console.log("session?.userCompetence", session);
    }
  }, [isEditMode, session]);

  useEffect(() => {
    console.log("Is valid ? :", isValid);
    console.log("error: ", errors);

    setValue("countries", selectedCountries);
  }, [selectedCountries]);

  return (
    <fieldset className="w-full flex flex-col space-y-6 xl:h-96">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            Pays cibles pour vos offres: <br />
            <MultiSelect
              options={Object.entries(countries).map((country, index) => {
                return {
                  label: country[1].name,
                  value: country[1].name,
                };
              })}
              selected={selectedCountries}
              onChange={setSelectedCountries}
            />
            {/* <FormField
              name="countries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays cibles pour vos offres</FormLabel>
                  <Select
                    value={selectedCountries}
                    onValueChange={setSelectedCountries}
                    defaultValue={selectedCountries}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Indiquer les pays cibles" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(countries).map((country, index) => (
                        <SelectItem key={index} value={country[0]}>
                          {country[1].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p>{errors?.countries?.message}</p>
                </FormItem>
              )}
            /> */}
          </div>
          <div className="w-full mt-4">
            <RequirementCheckboxForm
              label="Vos besoins"
              required={true}
              errors={errors}
              register={register}
            />
          </div>

          <TextareaForm
            required={true}
            id="description"
            name="description de vos besoins"
            register={register("descriptionRequirement")}
            errors={errors?.descriptionRequirement?.message}
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

export default RequirementForm;
