import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CardTitle } from "@/components/common";
import { FileForm } from "@/components/forms";
import { GlobalOfferFormState } from "@/app/page";
import * as Yup from "yup";
import { file, form } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import RenderFormButton from "../common/RenderFormButton";
import { Button } from "../ui/button";

const validationSchema = Yup.object({
  files: Yup.array().of(
    Yup.mixed()
      .test("fileSize", form.FILE_SIZE_INVALID, (value) => {
        if (value.length === 0) return true;
        return value.size <= file.FILE_DOCUMENT_SIZE;
      })
      .test("fileFormat", form.FILE_FORMAT_INVALID, (value) => {
        if (value.length === 0) return true;
        //Hack : When you want upload words document on windows the input file not recognize the file type
        //So we need to check the extension on validate manually
        if (!value.type && value.name) {
          const values = value.name.split(".").length;
          const ext = value.name.split(".")[values - 1];
          return ext === "doc" || ext === "docx" ? true : false;
        }
        return file.FILE_DOCUMENT_SUPPORTED_ALL_FORMATS.includes(value.type);
      })
  ),
});

interface Props {
  globalFormState: GlobalOfferFormState;
  setGlobalFormState: (globalFormState: GlobalOfferFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const FilesOfferForm = ({
  globalFormState,
  handleNextStep,
  handlePrevStep,
  setGlobalFormState,
}: Props) => {
  /* const {
    register,
    control,
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
    const filesofferdata = data as { files: File[] };
    const newGlobalFormState = {
      ...globalFormState,
      filesOfferForm: filesofferdata,
    };
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
        <CardTitle title="Fichiers" />
        <div className="h-full">
          <FileForm
            id="files"
            name="files"
            infoMessage="Vous pouvez sélectionner plusieurs fichiers (5 fichiers maximum) en meme temps."
            required={false}
            multiple={true}
            hasPreview={true}
            control={control}
            maxFiles={5}
            register={register("files")}
            errors={errors?.files?.message}
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
export default FilesOfferForm;
