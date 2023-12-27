type Props = {
  [x: string]: boolean
}

const listLabel = {
  country: 'pays',
  city: 'ville',
  description: 'description',
  logo: 'logo',
  avatar: 'photo de profil',
  mainIndustry: 'industries principales',
  otherIndustry: 'autres industries',
  targetCountry: 'pays cibles',
  competence: 'compétences'
}

const usePercentageCompleteProfile = (values: Props) => {
  const nbInfos = Object.values(values).length
  const nbInfoCompleted = Object.values(values).filter(info => info).length
  const percentInfoCompleted = Math.round((nbInfoCompleted * 100) / nbInfos)

  const getValues = (): Props => {
    const list = Object.entries(values).reduce((acc, curr) => {
      const [key, value] = curr
      const name = listLabel[key as keyof typeof listLabel]
      return { ...acc, [name]: value }
    }, {})
    return list
  }

  return { nbInfos, nbInfoCompleted, percentInfoCompleted, getValues }
}

export default usePercentageCompleteProfile
