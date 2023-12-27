const isArrayEmptyOrContainsEmptyObjects = (array: any) => {
  if (array?.length > 0) {
    return array?.every((item: any) => {
      return Object.keys(item).length === 0
    })
  }
  return true
}

export { isArrayEmptyOrContainsEmptyObjects }
