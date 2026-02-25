import { CustomClientOptions, SupportedStorage } from './types'

type Fetch = typeof fetch

export function applySettingDefaults(
  options: CustomClientOptions,
  defaults: CustomClientOptions
): Required<CustomClientOptions> {
  const {
    // db: dbOptions,
    auth: authOptions,
    // realtime: realtimeOptions,
    global: globalOptions,
  } = options
  const {
    // db: DEFAULT_DB_OPTIONS,
    auth: DEFAULT_AUTH_OPTIONS,
    // realtime: DEFAULT_REALTIME_OPTIONS,
    global: DEFAULT_GLOBAL_OPTIONS,
  } = defaults

  const result: Required<CustomClientOptions> = {
    // db: {
    //   ...DEFAULT_DB_OPTIONS,
    //   ...dbOptions,
    // },
    auth: {
      ...DEFAULT_AUTH_OPTIONS,
      ...authOptions,
    },
    // realtime: {
    //   ...DEFAULT_REALTIME_OPTIONS,
    //   ...realtimeOptions,
    // },
    // storage: {},
    global: {
      ...DEFAULT_GLOBAL_OPTIONS,
      ...globalOptions,
      headers: {
        ...(DEFAULT_GLOBAL_OPTIONS?.headers ?? {}),
        ...(globalOptions?.headers ?? {}),
      },
    },
    accessToken: async () => '',
  }

  if (options.accessToken) {
    result.accessToken = options.accessToken
  } else {
    // hack around Required<>
    delete (result as any).accessToken
  }

  return result
}

export const resolveFetch = (customFetch?: Fetch): Fetch => {
  if (customFetch) {
    return (...args) => customFetch(...args)
  }
  return (...args) => fetch(...args)
}


export const looksLikeFetchResponse = (maybeResponse: unknown): maybeResponse is Response => {
  return (
    typeof maybeResponse === 'object' &&
    maybeResponse !== null &&
    'status' in maybeResponse &&
    'ok' in maybeResponse &&
    'json' in maybeResponse &&
    typeof (maybeResponse as any).json === 'function'
  )
}


export function parseResponseAPIVersion(response: Response) {
  // const apiVersion = response.headers.get(API_VERSION_HEADER_NAME)

  // if (!apiVersion) {
  //   return null
  // }

  // if (!apiVersion.match(API_VERSION_REGEX)) {
  //   return null
  // }

  // try {
  //   const date = new Date(`${apiVersion}T00:00:00.0Z`)
  //   return date
  // } catch (e: any) {
  //   return null
  // }
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
