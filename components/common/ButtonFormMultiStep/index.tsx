type FormProps<T> = {
  componentId: number
  className?: string
  hasCompletedForm?: boolean
  loading?: boolean
  handlePrevious: (e: React.MouseEvent<HTMLElement>) => void
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void
}

const ButtonFormMultiStep = <
  T extends Record<string, any> = Record<string, any>
>({
  componentId,
  className,
  hasCompletedForm,
  loading,
  handlePrevious,
  onSubmit
}: FormProps<T>) => {
  return (
    <div className={`w-full flex flex-row mt-6 ${className}`}>
      <div className={`w-1/2 ${componentId === 1 ? 'hidden' : 'block'}`}>
        <button
          className='btn btn-outline btn-warning w-48 capitalize text-white'
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            handlePrevious(e)
          }}
        >
          précédent
        </button>
      </div>
      <div
        className={`${
          componentId === 1 ? 'w-full' : 'w-1/2'
        }  flex justify-end`}
      >
        <button
          className={`btn btn-warning w-48 capitalize text-white ${
            loading && 'loading'
          }`}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            hasCompletedForm && onSubmit(e)
          }}
        >
          {hasCompletedForm ? 'Créer' : 'Suivant'}
        </button>
      </div>
    </div>
  )
}

export default ButtonFormMultiStep
