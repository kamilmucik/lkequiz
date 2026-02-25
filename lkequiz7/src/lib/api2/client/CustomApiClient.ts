import { fetchWithAuth } from './lib/shared/fetch'
import type {
  Fetch,
  CustomAuthClientOptions,
  CustomClientOptions,
} from './lib/shared/types'
import {
  DEFAULT_AUTH_OPTIONS,
  DEFAULT_USER_OPTIONS,
  DEFAULT_GLOBAL_OPTIONS,
} from './lib/shared/constants'
import { applySettingDefaults } from './lib/shared/helpers'
import { CustomAuthClient } from './lib/CustomAuthClient'
import { CustomProfileClient } from './lib/CustomProfileClient'
import { CustomStorageClient } from './lib/CustomStorageClient'

export default class CustomApiClient {

    auth: CustomAuthClient
    profile: CustomProfileClient
    storage: CustomStorageClient
    // quiz: SupabaseStorageClient

    protected profileUrl: URL
    protected authUrl: URL
    protected storageUrl: URL
    // protected quizUrl: URL
    protected fetch?: Fetch

    protected accessToken?: () => Promise<string | null>
    protected headers: Record<string, string>

    constructor(
        protected apiURL: string,
        protected apiKey: string,
        options?: CustomClientOptions
    ) {
        const baseUrl = apiURL
        // const baseUrl = validateSupabaseUrl(supabaseUrl)
        // if (!apiKey) throw new Error('apiKey is required.')
        // console.log("CustomApiClient.constructor", { apiURL, apiKey, options })

        this.profileUrl = new URL('/api/profile', baseUrl)
        this.authUrl = new URL('/api/auth', baseUrl)
        this.storageUrl = new URL('storage/v1', baseUrl)
        // this.quizUrl = new URL('quiz/v1', baseUrl)

        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `custom-api-auth-token`
        const DEFAULTS = {
          auth: { ...DEFAULT_AUTH_OPTIONS, storageKey: defaultStorageKey },
          global: DEFAULT_GLOBAL_OPTIONS,
        }

        const settings = applySettingDefaults(options ?? {}, DEFAULTS)

        this.headers = settings.global.headers ?? {}


        if (!settings.accessToken) {
          this.auth = this._initSupabaseAuthClient(
              settings.auth ?? {},
              this.headers,
              settings.global.fetch
          )
          this.profile = this._initProfileClient(
              settings.auth ?? {},
              this.headers,
              settings.global.fetch
          )
          this.storage = this._initStorageClient(
              settings.auth ?? {},
              this.headers,
              settings.global.fetch
          )
        } else {
        // this.accessToken = settings.accessToken

          this.auth = new Proxy<CustomAuthClient>({} as any, {
            get: (_, prop) => {
            throw new Error(
                `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(
                prop
                )} is not possible`
            )
            },
          })
          this.profile = new Proxy<CustomProfileClient>({} as any, {
            get: (_, prop) => {
            throw new Error(
                `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(
                prop
                )} is not possible`
            )
            },
          })
          this.storage = new Proxy<CustomStorageClient>({} as any, {
            get: (_, prop) => {
            throw new Error(
                `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(
                prop
                )} is not possible`
            )
            },
          })
        }
        // console.log("_getAccessToken", this._getAccessToken.bind(this))
        this.fetch = fetchWithAuth(apiKey, this._getAccessToken.bind(this), settings.global.fetch)
    }

    private async _getAccessToken() {
      // console.log("_getAccessToken")
      if (this.accessToken) {
        return await this.accessToken()
      }

      const { data } = await this.auth.getSession()
      // console.log("_getAccessToken.data", data)

      return data.session?.access_token
    }

    private _initSupabaseAuthClient(
    {
      autoRefreshToken,
      persistSession,
      storage,
      storageKey,
      // debug,
      throwOnError,
    }: CustomAuthClientOptions,
    headers?: Record<string, string>,
    fetch?: Fetch
  ) {
    const authHeaders = {
      Authorization: `Bearer ${this.apiKey}`,
      // apikey: `${this.apiKey}`,
    }
    return new CustomAuthClient({
      url: this.authUrl.href,
      headers: { ...authHeaders, ...headers },
      storageKey: storageKey,
      autoRefreshToken,
      persistSession,
      storage,
      throwOnError,
      fetch,
    })
  }

  private _initProfileClient(
    {
      storageKey,
      storage,
      // debug,
      throwOnError,
    }: CustomAuthClientOptions,
    headers?: Record<string, string>,
    fetch?: Fetch
  ) {
    const authHeaders = {
      authorization: `Bearer ${this.apiKey}`,
      // apikey: `${this.apiKey}`,
    }
    return new CustomProfileClient({
      url: this.profileUrl.href,
      headers: { ...authHeaders, ...headers },
      storageKey: storageKey,
      storage,
      // debug,
      throwOnError,
      fetch,
    })
  }

  private _initStorageClient(
    {
      storageKey,
      storage,
      // debug,
      throwOnError,
    }: CustomAuthClientOptions,
    headers?: Record<string, string>,
    fetch?: Fetch
  ) {
    const authHeaders = {
      authorization: `Bearer ${this.apiKey}`,
      // apikey: `${this.apiKey}`,
    }
    return new CustomStorageClient({
      url: this.storageUrl.href,
      headers: { ...authHeaders, ...headers },
      storageKey: storageKey,
      storage,
      // debug,
      throwOnError,
      fetch
    })
  }



}