import * as yup from 'yup'
import { file, form } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useFilesOfferForm = () => {
  const validationSchema = yup.object({
    files: yup.array().of(
      yup
        .mixed()
        .test('fileSize', form.FILE_SIZE_INVALID, value => {
          if (value.length === 0) return true
          return value.size <= file.FILE_DOCUMENT_SIZE
        })
        .test('fileFormat', form.FILE_FORMAT_INVALID, value => {
          if (value.length === 0) return true
          //Hack : When you want upload words document on windows the input file not recognize the file type
          //So we need to check the extension on validate manually
          if (!value.type && value.name) {
            const values = value.name.split('.').length
            const ext = value.name.split('.')[values - 1]
            return ext === 'doc' || ext === 'docx' ? true : false
          }
          return file.FILE_DOCUMENT_SUPPORTED_ALL_FORMATS.includes(value.type)
        })
    )
  })

  const proprietiesForm = useFormValidation<
    SchemaOf<FilesOfferFormData>,
    FilesOfferFormData
  >(validationSchema, ``, false)
  return proprietiesForm
}

export default useFilesOfferForm
