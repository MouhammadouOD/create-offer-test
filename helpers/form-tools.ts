const tranformDataToFormData = (
  datas: object,
  nameFile?: NameFile
): FormData => {
  let formData = new FormData()

  Object.entries(datas).forEach(([name, value]) => {
    let newValue
    switch (name) {
      case 'competences':
      case 'otherIndustries':
      case 'countries':
      case 'categories':
      case 'tags':
        newValue = JSON.stringify(value)
        break
      case 'deadlineEnd':
      case 'deadlineStart':
      case 'closingDate':
        newValue = value.toUTCString()
        break
      default:
        newValue = value ? value.toString() : null
        break
    }

    if (name === 'files' && nameFile && value) {
      for (const file of value) {
        formData.append(nameFile, file)
      }
    } else {
      newValue && formData.append(name, newValue)
    }
  })

  return formData
}

const tranformDataToSelectData = (
  datas: INameFrEn[],
  lang = 'fr'
): SelectOptionsForm[] => {
  const selectData: SelectOptionsForm[] = datas.reduce(
    (acc: SelectOptionsForm[], curr: INameFrEn) => {
      acc.push({
        value: curr.id,
        label:
          lang === 'fr' && curr?.nameFr
            ? curr.nameFr
            : curr.nameEn
            ? curr.nameEn
            : 'Error'
      })
      return acc
    },
    []
  )

  return selectData
}

const transformDataToReactSelectData = (
  datas: INameFrEn[],
  lang = 'fr'
): any => {
  const selectData: ReactSelectOption[] = datas.reduce(
    (acc: ReactSelectOption[], curr: INameFrEn) => {
      const name =
        lang === 'fr'
          ? curr.nameFr
            ? curr.nameFr
            : ''
          : curr.nameEn
          ? curr.nameEn
          : ''

      acc.push({
        value: name.toLowerCase(),
        label: name,
        id: curr.id
      })
      return acc
    },
    []
  )

  return selectData
}

export {
  tranformDataToFormData,
  tranformDataToSelectData,
  transformDataToReactSelectData
}
