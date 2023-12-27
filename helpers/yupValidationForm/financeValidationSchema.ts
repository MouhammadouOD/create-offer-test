import * as Yup from 'yup'
import { form, file } from '../../constants'

const financeValidationSchema = Yup.object({
  levelDevelopment: Yup.string().required(form.REQUIRED),
  revenue: Yup.string().required(form.REQUIRED),
  clients: Yup.array().of(
    Yup.object({
      name: Yup.string().test('required', form.REQUIRED, function (name) {
        //Allow to retrieve field from parent to parent
        const { reference, contact } = this.parent
        if ((contact || reference) && !name) {
          return false
        }
        return true
      }),
      reference: Yup.string().test(
        'required',
        form.REQUIRED,
        function (reference) {
          //Allow to retrieve field from parent to parent
          const { name, contact } = this.parent
          if ((contact || name) && !reference) {
            return false
          }
          return true
        }
      ),
      contact: Yup.string().test('required', form.REQUIRED, function (contact) {
        //Allow to retrieve field from parent to parent
        const { name, reference } = this.parent
        if ((name || reference) && !contact) {
          return false
        }
        return true
      })
    })
  ),
  files: Yup.array().of(
    Yup.mixed()
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
        return file.FILE_DOCUMENT_SUPPORTED_FORMATS.includes(value.type)
      })
  )
})

export default financeValidationSchema
