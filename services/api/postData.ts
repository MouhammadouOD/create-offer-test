import { apiSettings } from '../../config'
import { tranformDataToFormData } from '../../helpers'
import { apiFetch } from '.'

type Options = {
  qs: Object
  hasAborted?: boolean
}

const postData = async (
  url: string,
  datas: Object,
  options?: Options,
  weSentFile: boolean = false,
  nameFile?: NameFile
) => {
  const defaultSettings = await apiSettings()

  const baseOptions = {
    ...defaultSettings,
    method: 'POST',
    body:
      weSentFile && nameFile
        ? tranformDataToFormData(datas, nameFile)
        : JSON.stringify(datas),
    headers: {
      ...defaultSettings.headers,
      Accept: 'application/json',
      ...(weSentFile ? {} : { 'Content-Type': 'application/json' })
    }
  }

  const hasAborted = options?.hasAborted
  const optionsData = options ? options : {}

  try {
    const res = await apiFetch(
      url,
      { ...baseOptions, ...optionsData },
      hasAborted
    )
    return res
  } catch (error) {
    throw String(error)
  }
}

export default postData
