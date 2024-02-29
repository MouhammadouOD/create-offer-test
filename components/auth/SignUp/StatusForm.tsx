"use client";
import React, { useEffect, useState } from "react";
import {
  InputForm,
  SelectForm,
  TextareaForm,
  BusinessExperienceCheckboxForm,
} from "@/components/forms";
import { useForm } from "react-hook-form";
import { GlobalSignupFormState } from "@/app/signup/page";
import { yupResolver } from "@hookform/resolvers/yup";
import { statusValidationSchema } from "@/helpers/yupValidationForm";
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
import RenderFormButton from "@/components/common/RenderFormButton";

const validationSchema = statusValidationSchema;

interface Props extends PropsEditMode {
  globalFormState: GlobalSignupFormState;
  setGlobalFormState: (globalFormState: GlobalSignupFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StatusForm = ({
  isEditMode,
  session,
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTypeCompany, setSelectedTypeCompany] = useState("");
  const [selectedTypeBusiness, setSelectedTypeBusiness] = useState("");
  const [selectedLevelExperience, setSelectedLevelExperience] = useState("");
  const [selectedYearExperience, setSelectedYearExperience] = useState("");

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
    control,
    handleSubmit,
    reset,
    clearErrors,
  } = form;

  const { isValid, errors } = formState;

  useEffect(() => {
    if (isEditMode && session?.status) {
      if (
        session?.status === "freelance" &&
        session?.UserFreelanceInformation
      ) {
        const userFreelance = session?.UserFreelanceInformation;
        setValue("status", session?.status);
        Object.entries(userFreelance).map(([key, value]) => {
          const val =
            key !== "available" && key !== "remoteWorking"
              ? String(value).toLowerCase()
              : !!value;
          setValue(key, val);
        });
        session?.description && setValue("description", session?.description);
        userFreelance?.businessSizeExperience &&
          setValue(
            "businessSizeExperience",
            userFreelance?.businessSizeExperience
          );
      } else if (session?.status === "company" && session?.Company) {
        const company = session?.Company;
        setValue("status", session?.status);
        company?.name && setValue("nameCompany", company?.name);
        company?.typeCompany && setValue("typeCompany", company?.typeCompany);
        company?.description && setValue("description", company?.description);
        company?.btob && setValue("typeBusiness", "btob");
        company?.btoc && setValue("typeBusiness", "btoc");
      }
    }

    return () => {
      isEditMode && reset();
    };
  }, [isEditMode, session?.status]);

  const watchStatus =
    session?.status && isEditMode ? session?.status : watch("status");

  const status = !!watchStatus
    ? watchStatus === "freelance"
      ? "freelance"
      : watchStatus
    : "company";
  //Reset specific form according to the value of status

  useEffect(() => {
    if (!isEditMode) {
      if (status === "freelance") {
        setValue("nameCompany", "");
        setValue("typeCompany", "");
        setValue("typeBusiness", "");
      } else {
        setValue("levelExperience", "");
        setValue("yearExperience", "");
        setValue("businessSizeExperience", "");
      }
      setValue("description", "");
    }
  }, [status, isEditMode]);

  const onSubmit = handleSubmit((data) => {
    const statusForm = {
      ...(data as StatusFormData),
    };
    console.log(statusForm);
    const newGlobalFormState = {
      ...globalFormState,
      statusForm,
    };
    setGlobalFormState(newGlobalFormState);
    console.log(
      "🚀 ~ file: TypeForm.tsx:75 ~ onSubmit ~ newGlobalFormState:",
      newGlobalFormState
    );
  });

  useEffect(() => {
    setFocus("status");
  }, [setFocus]);

  useEffect(() => {
    console.log("Is valid ? :", isValid);
    console.log("error: ", errors);

    const newStatusValue = getValues("status");
    if (newStatusValue !== selectedStatus) setValue("status", selectedStatus);

    const newTypeCompanyValue = getValues("typeCompany");
    if (newTypeCompanyValue !== selectedTypeCompany)
      setValue("typeCompany", selectedTypeCompany);

    const newLevelExperienceValue = getValues("levelExperience");
    if (newLevelExperienceValue !== selectedLevelExperience)
      setValue("levelExperience", selectedLevelExperience);

    const newTypeBusinessValue = getValues("typeBusiness");
    if (newTypeBusinessValue !== selectedTypeBusiness)
      setValue("typeBusiness", selectedTypeBusiness);

    const newYearExperienceValue = getValues("yearExperience");
    if (newYearExperienceValue !== selectedYearExperience)
      setValue("yearExperience", selectedYearExperience);
  }, [
    selectedStatus,
    selectedLevelExperience,
    selectedTypeBusiness,
    selectedYearExperience,
  ]);

  return (
    <fieldset className="w-full flex flex-col  space-y-2">
      <Form {...form}>
        <form  onSubmit={onSubmit}>
          {!isEditMode && (
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    defaultValue={selectedStatus}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez un statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { label: "Entreprise", value: "company" },
                        { label: "Freelance", value: "freelance" },
                        { label: "Institution", value: "institution" },
                        { label: "Association", value: "association" },
                      ].map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p>{errors?.status?.message}</p>
                </FormItem>
              )}
            />
          )}
          <div
            className={`w-full ${
              status !== "freelance" ? "flex flex-col" : "hidden"
            }`}
          >
            <InputForm
              id="nameCompany"
              name={`Nom de l'${status === "company" ? "entreprise" : status}`}
              type="text"
              required={true}
              defaultValue={
                session?.Company?.name ? session?.Company?.name : ""
              }
              register={register("nameCompany")}
              errors={errors?.nameCompany?.message}
            />
            <div
              className={`flex flew-row ${
                status === "company" ? "space-x-6" : "space-x-0"
              }  `}
            >
              <div
                className={` ${status === "company" ? "w-1/2" : "hidden"}  `}
              >
                {
                  <FormField
                    control={control}
                    name={"typeCompany"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Type d'{status === "company" ? "entreprise" : status}
                        </FormLabel>
                        <Select
                          value={selectedTypeCompany}
                          onValueChange={setSelectedTypeCompany}
                          defaultValue={selectedTypeCompany}
                        >
                          <FormControl>
                            <SelectTrigger /* className="border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700" */
                            >
                              <SelectValue
                                placeholder={`Choisissez un type d'${
                                  status === "company" ? "entreprise" : status
                                }`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              /* {
                              value: "",
                              label: "Choisissez un élément",
                            }, */
                              {
                                value: "startup",
                                label: "Startup - 1 à 50 collaborateurs",
                              },
                              {
                                value: "pme",
                                label: "PME - 1 à 250 collaborateurs",
                              },
                              {
                                value: "eti",
                                label: "ETI - 250 à 5000 collaborateurs",
                              },
                              {
                                value: "corporate",
                                label:
                                  "Corporate - Plus de 5000 collaborateurs",
                              },
                            ].map((option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p>{errors?.typeCompany?.message}</p>
                      </FormItem>
                    )}
                  />
                }
              </div>
              <div
                className={` ${status === "company" ? "w-1/2" : "w-full"}  `}
              >
                {
                  <FormField
                    control={control}
                    name={"typeBusiness"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>type de business</FormLabel>
                        <Select
                          value={selectedTypeBusiness}
                          onValueChange={setSelectedTypeBusiness}
                          defaultValue={selectedTypeBusiness}
                        >
                          <FormControl>
                            <SelectTrigger /* className="border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700" */
                            >
                              <SelectValue placeholder="Choisissez un type de business" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              /* {
                              value: "",
                              label: "Choisissez un élément",
                            }, */
                              {
                                value: "btob",
                                label: "BtoB",
                              },
                              {
                                value: "btoc",
                                label: "BtoC",
                              },
                            ].map((option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                }
              </div>
            </div>
          </div>
          <div
            className={`w-full ${
              status === "freelance" ? "flex flex-col" : "hidden"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <div className="w-full lg:w-1/2">
                {
                  <FormField
                    control={control}
                    name={"levelExperience"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>niveau d'expérience</FormLabel>
                        <Select
                          value={selectedLevelExperience}
                          onValueChange={setSelectedLevelExperience}
                          defaultValue={selectedLevelExperience}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez un niveau d'expérience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              /* {
                              value: "",
                              label: "Choisissez un élément",
                            }, */
                              {
                                value: "beginner",
                                label: "Débutant",
                              },
                              {
                                value: "intermediaire",
                                label: "Intermédiaire",
                              },
                              {
                                value: "senior",
                                label: "Sénior",
                              },
                            ].map((option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                }
              </div>
              <div className="w-full lg:w-1/2">
                {
                  <FormField
                    control={control}
                    name={"yearExperience"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année d'expérience</FormLabel>
                        <Select
                          value={selectedYearExperience}
                          onValueChange={setSelectedYearExperience}
                          defaultValue={selectedYearExperience}
                        >
                          <FormControl>
                            <SelectTrigger /* className="border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700" */
                            >
                              <SelectValue placeholder="Choisissez une année d'expérience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              /* {
                              value: "",
                              label: "Choisissez un élément",
                            }, */
                              {
                                value: "< 3 years",
                                label: "moins de 3 ans",
                              },
                              {
                                value: "3 à 5 years",
                                label: "entre 3 et 5 ans",
                              },
                              {
                                value: "5 à 10 years",
                                label: "entre 5 et 10 ans",
                              },
                              {
                                value: "> 10 years",
                                label: "plus de 10 ans",
                              },
                            ].map((option, index) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                }
              </div>
            </div>
            <div className="w-full mt-4">
              <BusinessExperienceCheckboxForm
                label="Pour quel type(s) d'entreprise(s) vous avez travailler ?"
                name="businessSizeExperience"
                required={true}
                errors={errors}
                setValue={setValue}
                value={getValues("businessSizeExperience")!}
                register={register("businessSizeExperience")}
              />
            </div>
          </div>

          <TextareaForm
            id="description"
            size={4}
            limitText={500}
            required={true}
            value={getValues("description")}
            name={
              status !== "freelance"
                ? `description de l'${
                    status === "company" ? "entreprise" : status
                  }`
                : "description de votre métier de freelance"
            }
            placeholder={
              status !== "freelance"
                ? `Description de l'${
                    status === "company" ? "entreprise" : status
                  }`
                : "description de votre métier de freelance"
            }
            register={register("description")}
            errors={errors?.description?.message}
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

export default StatusForm;
