import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ErrorForm } from "..";
import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";
import { useController, useForm } from "react-hook-form";
import { PropsForm } from "@/types/formType/props-form";
import { apiUrl } from "@/constants";
import { api } from "@/services";
import { useAppDispatch, useAppSelector } from "@/store/app/hooks";
import { requestCategoryFetched } from "@/redux/category/categorySlice";
import { requestCountryFetched } from "@/redux/country/countrySlice";
import { transformDataToReactSelectData } from "@/helpers/form-tools";

interface FormSelectProps extends PropsForm {
  value?: any;
  isMulti?: boolean;
  limitItems?: number;
  isClearable?: boolean;
  canCreate?: boolean;
  closeMenuOnSelect?: boolean;
  setValue?: ReturnType<typeof useForm>["setValue"] | any;
  apiType: "category" | "tag" | "country" | "company";
  apiParams?: any;
}

const ReactSelectForm = ({
  name: nameField,
  value: valueField,
  isMulti = false,
  limitItems,
  isClearable = false,
  canCreate = false,
  closeMenuOnSelect = true,
  setValue,
  errors,
  label,
  required,
  placeholder,
  apiType,
  apiParams,
  control,
  ...props
}: FormSelectProps): ReactElement => {
  //const { openAlert } = useAlert()
  //const { locale } = useContext(context.LangContext)
  const {
    field: { onChange, name, ref, value },
  } = useController({
    name: nameField,
    control,
    rules: { required: required ? true : false },
    defaultValue: valueField,
  });

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  let categoryFetched = useAppSelector(
    (state) => state.category.categoryFetched
  );
  const countries = useAppSelector((state) => state.country.countries);
  let countryFetched = useAppSelector((state) => state.country.countryFetched);
  let tagFetched = useAppSelector((state) => state.tag.tagFetched);

  const locale = "fr";
  const [numberItems, setNumberItems] = useState<number>(0);
  const componentMount = useRef(false);

  useEffect(() => {
    componentMount.current = true;
    return () => {
      componentMount.current = false;
    };
  }, []);

  const promiseOptions = async (inputValue: string) => {
    let list: any[];
    try {
      if (inputValue) {
        dispatch(requestCategoryFetched(inputValue));
        dispatch(requestCountryFetched(inputValue));
      }
      const optionsFetch = {
        qs: apiParams
          ? { ...apiParams, opValue: inputValue }
          : {
              opField: "name",
              op: "iLike",
              opValue: inputValue,
              size: 100,
            },
      };

      if (isMulti && limitItems && numberItems >= limitItems) {
        list = [];
      } else {
        let resRedux = null;
        let res = null;
        switch (apiType) {
          case "country":
            if (categories.length !== 0) {
              resRedux = countryFetched;
            } else {
              res = await api.fetchData(apiUrl.API_COUNTRIES, optionsFetch);
            }
            break;
          case "category":
            if (countries.length !== 0) {
              resRedux = categoryFetched;
            } else {
              res = await api.fetchData(apiUrl.API_CATEGORIES, optionsFetch);
              console.log("🚀 ~ promiseOptions ~ res:", res)
            }
            break;
          default:
            if (tagFetched) {
              resRedux = tagFetched;
            } else {
              res = await api.fetchData(apiUrl.API_TAGS, optionsFetch);
            }
        }
        list = resRedux || res?.results?.datas;
      }

      const loadOptions = transformDataToReactSelectData(list, locale);
      return loadOptions;
    } catch (err) {
      //const message = handlingApiErrors(err)
      //openAlert(message, 'error')
    }
  };

  const isValidNewOption = (inputValue: any, value: any) => {
    setNumberItems(value.length);
    if (isMulti && limitItems && value.length >= limitItems) {
      return false;
    }
    return inputValue.length > 1;
  };

  return (
    <>
      <>
        {label ? (
          <label
            className="text-md py-2 text-gray-600 dark:text-gray-200"
            htmlFor={name}
          >
            {label} {required ? "*" : null} :{" "}
            <span className="text-sm">
              {limitItems ? "(" + numberItems + "/" + limitItems + ")" : null}
            </span>
          </label>
        ) : null}
        <br />
        <span className="italic text-sm text-gray-500 dark:text-gray-200">
          {props.infoMessage}
        </span>
        <div className="pt-1">
          {canCreate ? (
            <AsyncCreatableSelect
              name={name}
              ref={ref}
              instanceId={props.id}
              cacheOptions
              closeMenuOnSelect={closeMenuOnSelect}
              value={value}
              isMulti={isMulti}
              isClearable={isClearable}
              placeholder={placeholder}
              loadOptions={promiseOptions}
              onChange={(e) => {
                onChange(e);
              }}
              isValidNewOption={isValidNewOption}
            />
          ) : (
            <AsyncSelect
              name={name}
              ref={ref}
              instanceId={props.id}
              cacheOptions
              closeMenuOnSelect={closeMenuOnSelect}
              value={value}
              isMulti={isMulti}
              isClearable={isClearable}
              placeholder={placeholder}
              loadOptions={promiseOptions}
              onChange={(e) => {
                onChange(e);
                isValidNewOption(1, e);
              }}
            />
          )}
        </div>
        {errors && <ErrorForm>{String(errors)}</ErrorForm>}
      </>
    </>
  );
};

export default ReactSelectForm;
