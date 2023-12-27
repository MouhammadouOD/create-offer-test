import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/app/hooks'
import { dayjs } from '../../../helpers'
import {
  listLabelPreviewForm,
  listValuePreviewForm
} from '../../../helpers/listPreviewFormData'

type ReturnValue = {
  previewLabel: string | null
  previewValue: string
}

type SelectValue = {
  id: number
  nameEn: string | null
  nameFr: string | null
}

const usePreviewForm = (
  section: any,
  label: string,
  value: string | object
): ReturnValue => {
  const listValue = listValuePreviewForm(section)
  const listLabel = listLabelPreviewForm(section)
  const [previewValue, setPreviewValue] = useState<string>('')
  const [previewLabel, setPreviewLabel] = useState<string | null>('')
  const categories = useAppSelector(state => state.category.categories)
  const countries = useAppSelector(state => state.country.countries)

  useEffect(() => {
    getPreviewValue()
    getPreviewLabel()
  }, [value, label])

  const getPreviewLabel = () => {
    setPreviewLabel(
      listLabel[label as keyof typeof listLabel]
        ? listLabel[label as keyof typeof listLabel]
        : null
    )
  }

  const getValuesFromArray = (values: ReactSelectOption[]) => {
    const data = values.reduce((acc: any[], val: ReactSelectOption) => {
      return [...acc, val?.value]
    }, [])
    return data.join(', ')
  }

  const getValueFromId = (typeData: 'country' | 'category', dataId: number) => {
    const data = typeData === 'country' ? countries : categories
    const value = (data as Array<SelectValue>).filter(
      (val: SelectValue) => val.id === dataId
    )
    return value[0]?.nameFr || 'undefined'
  }

  const getPreviewValue = () => {
    let newValue
    const data = typeof value === 'string' ? JSON.parse(value) : null
    switch (label) {
      case 'countries':
      case 'areaActivities':
        newValue = Array.isArray(value) && getValuesFromArray(value)
        break
      case 'headquarters':
        newValue = getValueFromId('country', Number(value))
        break
      case 'mainIndustry':
        newValue = getValueFromId('category', Number(value))
        break
      case 'otherIndustries':
      case 'categories':
        newValue = Array.isArray(value) && getValuesFromArray(value)
        break
      case 'competences':
        newValue =
          Array.isArray(value) &&
          value
            .reduce((acc: [], val: ReactSelectOption) => {
              return [...acc, val.value]
            }, [])
            .join(', ')
        break
      case 'businessSizeExperience':
        newValue =
          typeof value === 'string' &&
          value
            .split(', ')
            .map(
              (val: string) =>
                listValue[val.replace('"', '') as keyof typeof listValue]
            )
            .join(', ')
        break
      case 'files':
        newValue =
          Array.isArray(value) &&
          value.reduce((acc: [], val: File) => {
            return [...acc, val.name]
          }, [])
        break
      case 'deadlineEnd':
      case 'deadlineStart':
      case 'closingDate':
        const date = JSON.stringify(value)
        newValue = dayjs(JSON.parse(date)).format('DD/MM/YYYY')
        break
      case 'closingDateHour':
        const dateHour = JSON.stringify(value)
        newValue = dayjs(JSON.parse(dateHour)).format('HH:mm')
        break
      default:
        newValue = data
        break
    }
    setPreviewValue(
      listValue[newValue as keyof typeof listValue]
        ? listValue[newValue as keyof typeof listValue]
        : String(newValue)
    )
  }

  return { previewLabel, previewValue }
}

export default usePreviewForm
