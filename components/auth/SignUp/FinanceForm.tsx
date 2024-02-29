import React, { useEffect, useState } from "react";
import { FileForm, SelectForm } from "@/components/forms";
import { useForm, useFormContext } from "react-hook-form";
import { GlobalSignupFormState } from "@/app/signup/page";
import { financeValidationSchema } from "@/helpers/yupValidationForm";
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
import { yupResolver } from "@hookform/resolvers/yup";
import RenderFormButton from "@/components/common/RenderFormButton";

const validationSchema = financeValidationSchema;

interface Props extends PropsEditMode {
  globalFormState: GlobalSignupFormState;
  setGlobalFormState: (globalFormState: GlobalSignupFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FinanceForm = ({
  isEditMode,
  session,
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  const [selectedLevelDevelopment, setSelectedLevelDevelopment] = useState("");
  const [selectedRevenue, setSelectedRevenue] = useState("");
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
    const financeForm = {
      ...(data as FinanceFormData),
    };
    console.log(financeForm);
    const newGlobalFormState = {
      ...globalFormState,
      financeForm,
    };
    setGlobalFormState(newGlobalFormState);
  });

  useEffect(() => {
    if (isEditMode && session) {
      console.log("session?.userCompetence", session);
    }
  }, [isEditMode, session]);

  useEffect(() => {
    console.log("Is valid ? :", isValid);
    console.log("error: ", errors);

    const newLevelDevelopmentValue = getValues("levelDevelopment");
    if (newLevelDevelopmentValue !== selectedLevelDevelopment)
      setValue("levelDevelopment", selectedLevelDevelopment);

    const newRevenueValue = getValues("revenue");
    if (newRevenueValue !== selectedRevenue)
      setValue("revenue", selectedRevenue);
  }, [selectedLevelDevelopment, selectedRevenue]);

  return (
    <fieldset className="w-full flex flex-col space-y-6 xl:h-96">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            name="levelDevelopment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indiquer votre niveau de développement</FormLabel>
                <Select
                  value={selectedLevelDevelopment}
                  onValueChange={setSelectedLevelDevelopment}
                  defaultValue={selectedLevelDevelopment}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre niveau de développement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        value: "launch",
                        label: "Lancement",
                      },
                      {
                        value: "growth",
                        label: "Croissance",
                      },
                      {
                        value: "maturity",
                        label: "Maturité",
                      },
                      {
                        value: "mvp",
                        label: "MVP validé (Déjà des clients)",
                      },
                    ].map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p>{errors?.levelDevelopment?.message}</p>
              </FormItem>
            )}
          />
          <FormField
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indiquer votre chiffre d'affaire annuel</FormLabel>
                <Select
                  value={selectedRevenue}
                  onValueChange={setSelectedRevenue}
                  defaultValue={selectedRevenue}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre chiffre d'affaire annuel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      {
                        value: "none",
                        label: "Aucun",
                      },
                      {
                        value: "low",
                        label: "0 - 50 000 €",
                      },
                      {
                        value: "medium",
                        label: "50 000 - 250 000 €",
                      },
                      {
                        value: "high",
                        label: "250 000 - 1 000 000 €",
                      },
                      {
                        value: "veryHigh",
                        label: "> 1 000 000 €",
                      },
                    ].map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p>{errors?.revenue?.message}</p>
              </FormItem>
            )}
          />
          <div>
        <FileForm
          label="Vos documents d'entreprises"
          id='files'
          name='files'
          infoMessage="Vous pouvez nous envoyer vos documents d'entreprises (Bilan, Compte de résultat, Pitch Deck, Deck commercial)"
          required={false}
          multiple={true}
          hasPreview={true}
          typeFile='document'
          maxFiles={10}
          register={register('files')}
          errors={errors?.files?.message}
        />
      </div>
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

export default FinanceForm;
