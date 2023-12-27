import * as Yup from 'yup'
import { useAlertNotification, useFormValidation } from '@hooks/common'
import { useEffect, useState } from 'react'
import { apiUrl, file, form } from '../../constants'
import { api } from '../../services'

const validationSchema = (typeForm: 'newConversation' | 'newMessage') => {
  return Yup.object({
    fromUserId: Yup.mixed().test(
      'required',
      form.REQUIRED,
      function (fromUserId) {
        //Allow to retrieve field from parent to parent
        const { fromCompanyId } = this.parent
        if (!fromCompanyId && !fromUserId) {
          return false
        }
        return true
      }
    ),
    fromCompanyId: Yup.mixed().test(
      'required',
      form.REQUIRED,
      function (fromCompanyId) {
        //Allow to retrieve field from parent to parent
        const { fromUserId } = this.parent
        if (!fromUserId && !fromCompanyId) {
          return false
        }
        return true
      }
    ),
    toCompanyId: Yup.mixed().test(
      'required',
      form.REQUIRED,
      function (toCompanyId) {
        //Allow to retrieve field from parent to parent
        const { toUserId } = this.parent
        if (!toUserId && !toCompanyId && typeForm === 'newConversation') {
          return false
        }
        return true
      }
    ),
    toUserId: Yup.mixed().test('required', form.REQUIRED, function (toUserId) {
      //Allow to retrieve field from parent to parent
      const { toCompanyId } = this.parent
      if (!toCompanyId && !toUserId && typeForm === 'newConversation') {
        return false
      }
      return true
    }),
    message: Yup.string().required(form.REQUIRED),
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
          return file.FILE_DOCUMENT_SUPPORTED_ALL_FORMATS.includes(value.type)
        })
    )
  })
}

const useMessageForm = (typeForm: 'newConversation' | 'newMessage') => {
  const { messageNotification, typeNotification, handleNotification } =
    useAlertNotification()
  const { values,  methods, onSubmit } = useFormValidation<
    Yup.SchemaOf<MessageFormData>,
    MessageFormData
  >(validationSchema(typeForm), ``, false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messageSent, setMessageSent] = useState<null | MessengerMessageData>(
    null
  )

  const apiMessenger =
    typeForm === 'newConversation'
      ? apiUrl.API_MESSENGER_NEW_CONVERSATION
      : apiUrl.API_MESSENGER_NEW_MESSAGE

  useEffect(() => {
    if (values) {
      handleSubmit(values)
    }
  }, [values])

  const handleSubmit = async (datas: MessageFormData) => {
    setIsLoading(true)
    const payload = {
      ...datas,
      ...(datas?.toCompanyId && { toCompanyId: Number(datas?.toCompanyId) }),
      ...(datas?.toUserId && { toUserId: Number(datas?.toUserId) }),
      ...(datas?.fromUserId && { fromUserId: Number(datas?.fromUserId) }),
      ...(datas?.fromCompanyId && {
        fromCompanyId: Number(datas?.fromCompanyId)
      })
    }

    try {
      const res = await api.postData(
        apiMessenger,
        payload,
        undefined,
        true,
        'encrypt-files'
      )
      setIsLoading(false)
      setMessageSent(res.messageInfo)
      handleNotification(res.message, 'success')
    } catch (error) {
      setIsLoading(false)
      handleNotification(String(error), 'error')
    }
  }

  return {
    methods,
    onSubmit,
    isLoading,
    messageSent,
    messageNotification,
    typeNotification,
    handleNotification
  }
}

export default useMessageForm
