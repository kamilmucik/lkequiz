import { SupportedStorage } from './types'

type Fetch = typeof fetch

export const resolveFetch = (customFetch?: Fetch): Fetch => {
  if (customFetch) {
    return (...args) => customFetch(...args)
  }
  return (...args) => fetch(...args)
}

// Storage helpers
export const setItemAsync = async (
  storage: SupportedStorage,
  key: string,
  data: any
): Promise<void> => {
  await storage.set(key, JSON.stringify(data))
}

export const getItemAsync = async (storage: SupportedStorage, key: string): Promise<unknown> => {
  const value = await storage.getString(key)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const removeItemAsync = async (storage: SupportedStorage, key: string): Promise<void> => {
  await storage.delete(key)
}
