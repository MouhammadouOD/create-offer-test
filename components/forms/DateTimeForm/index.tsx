import { PropsForm } from "@/types/formType/props-form";
import React, { ReactElement } from "react";
import DatePicker from "react-datepicker";
import { useController, useForm } from "react-hook-form";
import { ErrorForm } from "..";
import fr from "date-fns/locale/fr"; // the locale you want
//registerLocale("fr", fr); // register it with the name you want

export interface PropsDateTimeForm extends PropsForm {
  value?: any;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  showTimeSelect?: boolean;
  disabled?: boolean;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onlyMonth?: boolean;
  onlyTime?: boolean;
  format?: "years" | "monthYears" | "dateHours" | "date" | "time";
  setValue?: ReturnType<typeof useForm>["setValue"];
}

export const DateTimeForm = ({
  name: nameField,
  value: valueField,
  label,
  register,
  errors,
  required,
  setValue,
  placeholder,
  disabled = false,
  onlyMonth = false,
  onlyTime = false,
  showTimeSelect = false,
  minDate,
  maxDate,
  control,
  format = "date",
  ...props
}: PropsDateTimeForm): ReactElement => {
  const {
    field: { onChange, name, ref, value },
  } = useController({
    name: nameField,
    control,
    rules: { required: required ? true : false },
    defaultValue: valueField,
  });

  const getDateFormat = () => {
    let dateFormat: string;
    switch (format) {
      case "years":
        dateFormat = "yyyy";
        break;
      case "monthYears":
        dateFormat = "MM/yyyy";
        break;
      case "dateHours":
        dateFormat = "dd/MM/yyyy h:mm aa";
        break;
      case "time":
        dateFormat = "h:mm aa";
        break;
      default:
        dateFormat = "dd/MM/yyyy";
    }
    return dateFormat;
  };

  let handleColor = (time: { getHours: () => number }) => {
    return time.getHours() > 12 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="flex flex-col">
      {label ? (
        <label
          className="text-base dark:text-gray-200 text-gray-700 xl:text-lg"
          htmlFor={name}
        >
          {label} {required ? "*" : null} :
        </label>
      ) : null}
      {props.infoMessage}
      <DatePicker
        locale="fr"
        {...props}
        name={name}
        ref={ref}
        selected={value ? new Date(value) : undefined}
        onChange={onChange}
        placeholderText={placeholder}
        disabled={disabled}
        dateFormat={getDateFormat()}
        showMonthYearPicker={onlyMonth ? true : undefined}
        showTimeSelect={onlyTime ? true : undefined}
        showTimeSelectOnly={onlyTime ? true : undefined}
        timeIntervals={onlyTime ? 15 : undefined}
        timeCaption={onlyTime ? "Heures" : undefined}
        minDate={minDate ? minDate : null}
        maxDate={maxDate ? maxDate : null}
        timeClassName={handleColor}
        className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 leading-tight focus:outline-none focus:shadow-md dark:bg-dark-light text-gray-700 dark:text-gray-200 dark:border-dark-light"
      />
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </div>
  );
};

export default DateTimeForm;
