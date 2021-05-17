export const removeEmptyPropsFromObject = (objectToRemoveFrom: any) => {
  const obj: any = {}

  for (const key in objectToRemoveFrom) {
    if (objectToRemoveFrom.hasOwnProperty(key)) {
      const elementVal = objectToRemoveFrom[key];

      if (elementVal) {
        obj[key] = elementVal
      }
    }
  }

  objectToRemoveFrom = null

  return obj
}