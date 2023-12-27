interface BaseCategoryTagData {
  id: number
  nameEn: string | null
  nameFr: string | null
  description: string | null
  userId: number
}
interface CategoryData extends BaseCategoryTagData {
  official: boolean
}
interface TagData extends BaseCategoryTagData {}
