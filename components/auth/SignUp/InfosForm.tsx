import React, { useEffect, useState } from "react";
import { SelectForm } from "@/components/forms";
import { useForm, useFormContext } from "react-hook-form";
import ReactSelectField from "@/components/forms/ReactSelectForm";
import { apiUrl } from "../../../constants";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { tranformDataToSelectData } from "../../../helpers";
import { useAppSelector } from "../../../store/app/hooks";
import { api } from "../../../services";
import { transformDataToReactSelectData } from "@/helpers/form-tools";
import { GlobalSignupFormState } from "@/app/signup/page";
import { informationsValidationSchema } from "@/helpers/yupValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { countries } from "countries-list";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const validationSchema = informationsValidationSchema;

interface Props extends PropsEditMode {
  globalFormState: GlobalSignupFormState;
  setGlobalFormState: (globalFormState: GlobalSignupFormState) => void;
  handleNextStep: () => void;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const InfosForm = ({
  isEditMode,
  session,
  globalFormState,
  setGlobalFormState,
  handleNextStep,
  handlePrevStep,
}: Props) => {
  const [selectedHeadquarters, setSelectedHeadquarters] = useState("")
  const [selectedMainIndustry, setSelectedMainIndustry] = useState(0)
  const [selectedOtherIndustries, setSelectedOtherIndustries] = useState("")
  //const [selectedHeadquarters, setselectedHeadquarters] = useState("")
  
  const form = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const {
    watch,
    control,
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
    const infosForm = {
      ...data as InfosFormData,
    };
    console.log(infosForm);
    const newGlobalFormState = {
      ...globalFormState,
      infosForm,
    };
    setGlobalFormState(newGlobalFormState);
  });

  //const { locale } = useContext(context.LangContext);
  const locale = "fr";
  const [listMainIndustries, setListMainIndustries] = useState<
    SelectOptionsForm[]
  >([]);
  const [listCountries, setListCountries] = useState<SelectOptionsForm[]>();
  const [loadingCat, setLoadingCat] = useState<boolean>(false);
  const [loadingCountry, setLoadingCountry] = useState<boolean>(false);
  const categories = useAppSelector((state) => state.category.categories);
  const countryList = Object.entries(countries)
  const userFreelance = session?.UserFreelanceInformation;

  useEffect(() => {
    if (isEditMode) {
      !!userFreelance?.UserFreelanceAreaActivity?.length &&
        setValue(
          "areaActivities",
          transformDataToReactSelectData(
            userFreelance?.UserFreelanceAreaActivity,
            locale
          )
        );
      !!userFreelance?.UserFreelanceOtherIndustry?.length &&
        setValue(
          "otherIndustries",
          transformDataToReactSelectData(
            userFreelance?.UserFreelanceOtherIndustry,
            locale
          )
        );
      !!session?.TagCompetenceUser?.length &&
        setValue(
          "competences",
          transformDataToReactSelectData(session?.TagCompetenceUser, locale)
        );
    }
    return () => {
      isEditMode && reset();
    };
  }, [isEditMode, userFreelance]);

  const getCategories = async (type: "category" | "country") => {
    const typeApi =
      type === "category" ? apiUrl.API_CATEGORIES : apiUrl.API_COUNTRIES;
    const results = await api.fetchData(typeApi, {
      qs: {
        attributes: "id, nameFr, nameEn",
        size: 9999,
        sort: "ASC",
        sortField: locale === "fr" ? "nameFr" : "nameEn",
      },
    });
    return results?.results?.datas;
  };

  useEffect(() => {
    const loadCategory = async () => {
      setLoadingCat(true);
      let list: SelectOptionsForm[] = [];
      try {
        if (categories.length > 0) {
          list = tranformDataToSelectData(categories);
        } else {
          const datas = await getCategories("category");
          list = tranformDataToSelectData(datas);
          //Add new value for the first display otherwise there will be an error
        }
        if (list[0]) {
          isEditMode && userFreelance?.UserFreelanceMainIndustry
            ? setValue("mainIndustry", 10)
            : setValue("mainIndustry", +list[0]?.value);
        }
        setListMainIndustries(list);
        setLoadingCat(false);
      } catch (error) {
        setLoadingCat(false);
      }
    };
    loadCategory();
  }, []);

  /* useEffect(() => {
    const loadCountry = async () => {
      setLoadingCountry(true);
      let list: SelectOptionsForm[] = [];
      try {
        if (countryList.length > 0) {
          list = tranformDataToSelectData(countries);
        } else {
          //const datas = await getDatas("country");
          list = tranformDataToSelectData(datas);
          //Add new value for the first display otherwise there will be an error
        }
        if (list[0]) {
          isEditMode && userFreelance?.UserFreelanceHeadquarter
            ? setValue("headquarters", userFreelance?.UserFreelanceHeadquarter)
            : setValue("headquarters", list[0]?.value);
        }
        setListCountries(list);
        setLoadingCountry(false);
      } catch (error) {
        setLoadingCountry(false);
      }
    };
    loadCountry();
  }, []); */

  return (
    <fieldset className="w-full flex flex-col space-y-2">
      <Form {...form}>
        <form onSubmit={onSubmit}>
          {loadingCountry ? (
            <LoadingSpinner displayMessage={true} />
          ) : (
            <FormField
              control={control}
              name="headquarters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Siège sociale</FormLabel>
                  <Select
                    value={selectedHeadquarters}
                    onValueChange={setSelectedHeadquarters}
                    defaultValue={selectedHeadquarters}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Donnez votre siège sociale" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryList.map((country, index) => (
                        <SelectItem key={index} value={country[0]}>
                          {country[1].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p>{errors?.headquarters?.message}</p>
                </FormItem>
              )}
            />
          )}
          <div>
            <ReactSelectField
              label="Zone d'activité (Pays)"
              id="areaActivities"
              name="areaActivities"
              required={true}
              register={register("areaActivities")}
              value={getValues("areaActivities")}
              setValue={setValue}
              isMulti={true}
              canCreate={false}
              placeholder="Zone d'activité (Pays)"
              apiType="country"
              apiParams={{
                opField: locale === "fr" ? "nameFr" : "nameEn",
                op: "iLike",
                size: 100,
              }}
              errors={errors?.areaActivities?.message}
            />
          </div>
          {loadingCat ? (
            <LoadingSpinner displayMessage={true} />
          ) : (
            <SelectForm
              full={true}
              id="mainIndustry"
              name="Secteur principale"
              required={true}
              setValue={setValue}
              value={getValues("mainIndustry")!}
              register={register("mainIndustry")}
              options={listMainIndustries}
              errors={errors?.mainIndustry?.message}
            />
          )}
          <div>
            <ReactSelectField
              label="Secteur(s) secondaire(s)"
              infoMessage="Vous pouvez indiquer d'autre(s) industrie(s) liée(s) à votre activité."
              id="otherIndustries"
              name="otherIndustries"
              register={register("otherIndustries")}
              setValue={setValue}
              value={getValues("otherIndustries")}
              limitItems={5}
              isMulti={true}
              canCreate={true}
              placeholder="Industrie(s) secondaire(s)"
              apiType="category"
              apiParams={{
                opField: locale === "fr" ? "nameFr" : "nameEn",
                op: "iLike",
                size: 100,
              }}
              errors={errors?.otherIndustries?.message}
            />
          </div>
          <div>
            <ReactSelectField
              label="Savoir(s) faire"
              infoMessage="Indiquer votre/vos savoir(s) faire, vos compétences..."
              id="competences"
              name="competences"
              register={register("competences")}
              setValue={setValue}
              value={getValues("competences")}
              required={true}
              limitItems={10}
              isMulti={true}
              canCreate={true}
              placeholder="Savoir(s) faire"
              apiType="tag"
              apiParams={{
                opField: locale === "fr" ? "nameFr" : "nameEn",
                op: "iLike",
                size: 100,
              }}
              errors={errors?.competences?.message}
            />
          </div>
        </form>
      </Form>
    </fieldset>
  );
};

export default InfosForm;
