import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState } from 'react'
import { webStorage } from '../../../helpers'
import { yupResolver } from '@hookform/resolvers/yup'

/**
 * Hook to maintain value of React prop/state between successive renders
 *
 * @param {object} schema - object schema from Yup validation
 * @param {object} nameForm - Indicate the name of this form
 * @param {object} saveForm - Indicate if the form must to be save in web storage
 *
 * @returns {mehods} methods from react hook form
 * @returns {onSubmit} function when you submit the form
 * @returns {values} values from the form if exist or null
 *
 *
 */

const useFormValidation = <SchemaType extends Yup.AnyObjectSchema, FormType>(
  schema: SchemaType,
  nameForm: string,
  saveForm?: boolean
): ReturnFormValidation<FormType> => {
  const [values, setValues] = useState<FormType | null>(null)
  const isValidData = useRef(false)

  /* Remove any a make good typescript without errors */
  const methods = useForm<any>({
    resolver: yupResolver<Yup.AnyObjectSchema>(schema)
  })

  useEffect(() => {
    if (saveForm) {
      const isExist = webStorage.checkValueIfExistInWebStorage(nameForm)
      if (isExist) {
        const saveForm = webStorage.getValueInWebStorage(nameForm, true)
        if (saveForm) {
          for (const [key, value] of Object.entries(saveForm)) {
            methods.setValue(key, value, { shouldValidate: true })
          }
        }
      }
    }
  }, [])

  const onSubmit = useCallback((data: FormType) => {
    setValues(data)
    if (saveForm && data) {
      webStorage.saveInWebStorage(nameForm, data, true)
    }
    isValidData.current = true
  }, [])

  return { methods, values, onSubmit, isValidData: isValidData.current }
}

export default useFormValidation
