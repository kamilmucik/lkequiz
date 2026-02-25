import { fetchWithAuth } from '@/lib/api/client/lib/fetch'
import type {
  Fetch,
  CustomAuthClientOptions,
  CustomClientOptions,
} from '@/lib/api/client/lib/types'
import {
  DEFAULT_AUTH_OPTIONS,
  DEFAULT_USER_OPTIONS,
  DEFAULT_GLOBAL_OPTIONS,
} from './lib/constants'
import { applySettingDefaults } from './lib/helpers'
import { CustomAuthClient } from './lib/CustomAuthClient'
import { CustomUserClient } from './lib/CustomUserClient'

export default class CustomApiClient {

    auth: CustomAuthClient
    user: CustomUserClient
    // storage: SupabaseStorageClient
    // quiz: SupabaseStorageClient

    protected userUrl: URL
    protected authUrl: URL
    protected storageUrl: URL
    protected quizUrl: URL
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
        console.log("CustomApiClient.constructor", { apiURL, apiKey, options })

        this.userUrl = new URL('/api/profile', baseUrl)
        this.authUrl = new URL('/api/auth', baseUrl)
        this.storageUrl = new URL('storage/v1', baseUrl)
        this.quizUrl = new URL('quiz/v1', baseUrl)

        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `custom-api-auth-token`
        const DEFAULTS = {
        // db: DEFAULT_DB_OPTIONS,
        // realtime: DEFAULT_REALTIME_OPTIONS,
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
          this.user = this._initUserClient(
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
          this.user = new Proxy<CustomUserClient>({} as any, {
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
      console.log("_getAccessToken")
      if (this.accessToken) {
        return await this.accessToken()
      }

      const { data } = await this.auth.getSession()
      console.log("_getAccessToken.data", data)

      return data.session?.access_token
    }

    private _initSupabaseAuthClient(
    {
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      userStorage,
      storageKey,
      flowType,
      lock,
      debug,
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
      detectSessionInUrl,
      storage,
      userStorage,
      flowType,
      lock,
      debug,
      throwOnError,
      fetch,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      // hasCustomAuthorizationHeader: Object.keys(this.headers).some(
      //   (key) => key.toLowerCase() === 'authorization'
      // ),
    })
  }

    private _initUserClient(
    {
      storageKey,
      storage,
      debug,
      throwOnError,
    }: CustomAuthClientOptions,
    headers?: Record<string, string>,
    fetch?: Fetch
  ) {
    const authHeaders = {
      authorization: `Bearer ${this.apiKey}`,
      // apikey: `${this.apiKey}`,
    }
    return new CustomUserClient({
      url: this.userUrl.href,
      headers: { ...authHeaders, ...headers },
      storageKey: storageKey,
      storage,
      debug,
      throwOnError,
      fetch,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      // hasCustomAuthorizationHeader: Object.keys(this.headers).some(
      //   (key) => key.toLowerCase() === 'authorization'
      // ),
    })
  }



}