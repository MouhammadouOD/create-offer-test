import { PropsWithChildren } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn
} from 'react-hook-form'

type FormProps<T extends FieldValues> = PropsWithChildren<{
  onSubmit: SubmitHandler<T>
  methods: UseFormReturn<T, object>
  hasContext: boolean
}>

const Form = <T extends FieldValues>({
  onSubmit: onSubmitForm,
  methods,
  children,
  hasContext = false
}: FormProps<T>) => {
  const onSubmit = methods.handleSubmit(onSubmitForm)
  return (
    <>
      {hasContext ? (
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>{children}</form>
        </FormProvider>
      ) : (
        <form onSubmit={onSubmit}>{children}</form>
      )}
    </>
  )
}

export default Form
