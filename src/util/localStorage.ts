const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorageItem = (key: string): any => {
  const item = localStorage.getItem(key)

  if (item != null) {
    console.log(item)
    return JSON.parse(item)
  }

  return null
}

export { setLocalStorageItem, getLocalStorageItem }
