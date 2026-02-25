import {
  DEFAULT_HEADERS,
  GOTRUE_URL,
  STORAGE_KEY,
} from '../shared/constants'
import {
  UserInvalidRequestError,
  isUserError,
} from '../shared/errors'
import {
  Fetch,
  _request,
} from '../shared/fetch'
import type {
  Session,
  UserTrueClientOptions,
  InitializeResult,
  EmptyResponse,
  UserProfile,
  SupportedStorage,
  UserDetailsResponse,
  UserDetailsRequest,
} from '../shared/types'
import {
  resolveFetch,
  getItemAsync,
} from "../shared/helpers"

const DEFAULT_OPTIONS: Omit<
  Required<StorageTrueClientOptions>,
  'fetch' | 'storage' | 'userStorage' | 'lock'
> = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  headers: DEFAULT_HEADERS,
  debug: false,
  throwOnError: false
}

export default class StorageTrueClient {
  private static nextInstanceID: Record<string, number> = {}

  /**
   * The storage key used to identify the values saved in localStorage
   */
  protected storageKey: string

  protected storage: SupportedStorage

  protected url: string
  protected headers: {
    [key: string]: string
  }
  protected fetch: Fetch
  protected throwOnError: boolean

  constructor(options: StorageTrueClientOptions) {
    const settings = { ...DEFAULT_OPTIONS, ...options }
    this.storageKey = settings.storageKey

    if (settings.storage) {
        this.storage = settings.storage
      } 

    this.url = settings.url
    this.headers = settings.headers
    this.fetch = resolveFetch(settings.fetch)
    this.throwOnError = settings.throwOnError
  }


async upload(): Promise<EmptyResponse | undefined> {
  
    console.log("StorageTrueClient.upload")
}


}

