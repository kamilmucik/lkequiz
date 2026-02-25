
import {
  DEFAULT_HEADERS,
  GOTRUE_URL,
  STORAGE_KEY,
} from '../shared/constants'
import {
  isAuthError,
  AuthInvalidCredentialsError,
  AuthInvalidTokenResponseError,
} from '../shared/errors'
import {
  Fetch,
  _request,
  _sessionResponse,
  _sessionResponsePassword,
  _ssoResponse,
  _userResponse,
} from '../shared/fetch'
import {
  getItemAsync,
  removeItemAsync,
  resolveFetch,
  setItemAsync,
} from '../shared/helpers'
import type {
  AuthResponse,
  AuthTokenResponsePassword,
  GoTrueClientOptions,
  InitializeResult,
  AuthResponsePassword,
  User,
  Session,
  SignUpWithPasswordCredentials,
  SupportedStorage,
  SignInWithPasswordCredentials
} from '../shared/types'


const DEFAULT_OPTIONS: Omit<
  Required<GoTrueClientOptions>,
  'fetch' | 'storage' | 'userStorage' | 'lock'
> = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  // detectSessionInUrl: true,
  headers: DEFAULT_HEADERS,
  // flowType: 'implicit',
  debug: false,
  // hasCustomAuthorizationHeader: false,
  throwOnError: false,
  // lockAcquireTimeout: 10000, // 10 seconds
  // skipAutoInitialize: false,
}

export default class GoTrueClient {
  private static nextInstanceID: Record<string, number> = {}

  // private instanceID: number

  /**
   * Namespace for the GoTrue admin methods.
   * These methods should only be used in a trusted server-side environment.
   */
  // admin: GoTrueAdminApi
  /**
   * Namespace for the MFA methods.
   */
  // mfa: GoTrueMFAApi
  /**
   * Namespace for the OAuth 2.1 authorization server methods.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   * Used to implement the authorization code flow on the consent page.
   */
  // oauth: AuthOAuthServerApi
  /**
   * The storage key used to identify the values saved in localStorage
   */
  protected storageKey: string

  // protected flowType: AuthFlowType

  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  // protected get jwks() {
  //   return GLOBAL_JWKS[this.storageKey]?.jwks ?? { keys: [] }
  // }

  // protected set jwks(value: { keys: JWK[] }) {
  //   GLOBAL_JWKS[this.storageKey] = { ...GLOBAL_JWKS[this.storageKey], jwks: value }
  // }

  // protected get jwks_cached_at() {
  //   return GLOBAL_JWKS[this.storageKey]?.cachedAt ?? Number.MIN_SAFE_INTEGER
  // }

  // protected set jwks_cached_at(value: number) {
  //   GLOBAL_JWKS[this.storageKey] = { ...GLOBAL_JWKS[this.storageKey], cachedAt: value }
  // }

  // protected autoRefreshToken: boolean
  // protected persistSession: boolean
  protected storage: SupportedStorage
  /**
   * @experimental
  //  */
  // protected userStorage: SupportedStorage | null = null
  // protected memoryStorage: { [key: string]: string } | null = null
  protected url: string
  protected headers: {
    [key: string]: string
  }
  protected fetch: Fetch
  protected throwOnError: boolean

  /**
   * Create a new client for use in the browser.
   *
   * @example
   * ```ts
   * import { GoTrueClient } from '@supabase/auth-js'
   *
   * const auth = new GoTrueClient({
   *   url: 'https://xyzcompany.supabase.co/auth/v1',
   *   headers: { apikey: 'public-anon-key' },
   *   storageKey: 'supabase-auth',
   * })
   * ```
   */
  constructor(options: GoTrueClientOptions) {
    const settings = { ...DEFAULT_OPTIONS, ...options }
    this.storageKey = settings.storageKey
    // this.instanceID = GoTrueClient.nextInstanceID[this.storageKey] ?? 0
    // GoTrueClient.nextInstanceID[this.storageKey] = this.instanceID + 1


    // if (this.persistSession) {
      if (settings.storage) {
        this.storage = settings.storage
      } 
      // else {
      //   if (supportsLocalStorage()) {
      //     this.storage = globalThis.localStorage
      //   } else {
      //     this.memoryStorage = {}
      //     this.storage = memoryLocalStorageAdapter(this.memoryStorage)
      //   }
      // }

    //   if (settings.userStorage) {
    //     this.userStorage = settings.userStorage
    //   }
    // } else {
    //   this.memoryStorage = {}
    //   this.storage = memoryLocalStorageAdapter(this.memoryStorage)
    // }

    this.url = settings.url
    this.headers = settings.headers
    this.fetch = resolveFetch(settings.fetch)
    this.throwOnError = settings.throwOnError
  
  }

  /**
   * Returns whether error throwing mode is enabled for this client.
   */
  public isThrowOnErrorEnabled(): boolean {
    return this.throwOnError
  }

  /**
   * Centralizes return handling with optional error throwing. When `throwOnError` is enabled
   * and the provided result contains a non-nullish error, the error is thrown instead of
   * being returned. This ensures consistent behavior across all public API methods.
   */
  private _returnResult<T extends { error: any }>(result: T): T {
    if (this.throwOnError && result && result.error) {
      throw result.error
    }
    return result
  }

  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(credentials: SignUpWithPasswordCredentials): Promise<AuthResponse> {
    try {
      let res: AuthResponse
      if ('email' in credentials) {
        const { email, password, options } = credentials
        let codeChallenge: string | null = null
        let codeChallengeMethod: string | null = null
        // if (this.flowType === 'pkce') {
        //   ;[codeChallenge, codeChallengeMethod] = await getCodeChallengeAndMethod(
        //     this.storage,
        //     this.storageKey
        //   )
        // }
        res = await _request(this.fetch, 'POST', `${this.url}/register`, {
          headers: this.headers,
          // redirectTo: options?.emailRedirectTo,
          body: {
            email,
            password,
            // data: options?.data ?? {},
            // gotrue_meta_security: { captcha_token: options?.captchaToken },
            // code_challenge: codeChallenge,
            // code_challenge_method: codeChallengeMethod,
          },
          // xform: _sessionResponse,
        })
      // } else if ('phone' in credentials) {
      //   const { phone, password, options } = credentials
      //   res = await _request(this.fetch, 'POST', `${this.url}/signup`, {
      //     headers: this.headers,
      //     body: {
      //       phone,
      //       password,
      //       data: options?.data ?? {},
      //       channel: options?.channel ?? 'sms',
      //       gotrue_meta_security: { captcha_token: options?.captchaToken },
      //     },
      //     xform: _sessionResponse,
      //   })
      } else {
        throw new AuthInvalidCredentialsError(
          'You must provide either an email or phone number and a password'
        )
      }

      const { data, error } = res

      if (error || !data) {
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)
        return this._returnResult({ data: { user: null, session: null }, error: error })
      }

      const session: Session | null = data.session
      const user: User | null = data.user

      // if (data.session) {
      //   await this._saveSession(data.session)
      //   // await this._notifyAllSubscribers('SIGNED_IN', session)
      // }

      return this._returnResult({ data: { user, session }, error: null })
    } catch (error) {
      // await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error })
      }

      throw error
    }
  }

  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(
    credentials: SignInWithPasswordCredentials
  ): Promise<AuthTokenResponsePassword> {
    try {
      let res: AuthResponsePassword
      if ('email' in credentials) {
        const { email, password } = credentials
        res = await _request(this.fetch, 'POST', `${this.url}/login`, {
          // headers: this.headers,
          body: {
            email,
            password,
          },
        })
      } else {
        throw new AuthInvalidCredentialsError(
          'You must provide either an email or phone number and a password'
        )
      }
      const { data, error } = res

      if (error) {
        return this._returnResult({ data: { user: null, session: null }, error })
      } else if (!data || !data.session || !data.user) {
        const invalidTokenError = new AuthInvalidTokenResponseError()
        return this._returnResult({ data: { user: null, session: null }, error: invalidTokenError })
      }
      if (data.session) {
        await this._saveSession(data.session)
        // await this._notifyAllSubscribers('SIGNED_IN', data.session)
      }
      return this._returnResult({
        data: {
          user: data.user,
          session: data.session,
          ...(data.weak_password ? { weakPassword: data.weak_password } : null),
        },
        error,
      })
    } catch (error) {
      if (isAuthError(error)) {
        return this._returnResult({ data: { user: null, session: null }, error })
      }
      throw error
    }
  }

  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  private async _saveSession(session: Session) {
    // console.log('#_saveSession()', session)
    // console.log('#_saveSession().storage', this.storage)
    // console.log('#_saveSession().storageKey', this.storageKey)
    // _saveSession is always called whenever a new session has been acquired
    // so we can safely suppress the warning returned by future getSession calls
    // this.suppressGetSessionWarning = true
    // await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)
    // Create a shallow copy to work with, to avoid mutating the original session object if it's used elsewhere
    // const sessionToProcess = { ...session }

    // const userIsProxy =
    //   sessionToProcess.user && (sessionToProcess.user as any).__isUserNotAvailableProxy === true
    // if (this.userStorage) {
    //   if (!userIsProxy && sessionToProcess.user) {
    //     // If it's a real user object, save it to userStorage.
    //     await setItemAsync(this.userStorage, this.storageKey + '-user', {
    //       user: sessionToProcess.user,
    //     })
    //   } else if (userIsProxy) {
    //     // If it's the proxy, it means user was not found in userStorage.
    //     // We should ensure no stale user data for this key exists in userStorage if we were to save null,
    //     // or simply not save the proxy. For now, we don't save the proxy here.
    //     // If there's a need to clear userStorage if user becomes proxy, that logic would go here.
    //   }

    //   // Prepare the main session data for primary storage: remove the user property before cloning
    //   // This is important because the original session.user might be the proxy
    //   const mainSessionData: Omit<Session, 'user'> & { user?: User } = { ...sessionToProcess }
    //   delete mainSessionData.user // Remove user (real or proxy) before cloning for main storage

    //   const clonedMainSessionData = deepClone(mainSessionData)
    //   await setItemAsync(this.storage, this.storageKey, clonedMainSessionData)
    // } else {
    //   // No userStorage is configured.
    //   // In this case, session.user should ideally not be a proxy.
    //   // If it were, structuredClone would fail. This implies an issue elsewhere if user is a proxy here
    //   const clonedSession = deepClone(sessionToProcess) // sessionToProcess still has its original user property
      // await setItemAsync(this.storage, this.storageKey, clonedSession)
      await setItemAsync(this.storage, this.storageKey, session)
    // }
  }

  private async _removeSession() {
    // this._debug('#_removeSession()')

    // this.suppressGetSessionWarning = false

    // await removeItemAsync(this.storage, this.storageKey)
    // await removeItemAsync(this.storage, this.storageKey + '-code-verifier')
    // await removeItemAsync(this.storage, this.storageKey + '-user')

    // if (this.userStorage) {
    //   await removeItemAsync(this.userStorage, this.storageKey + '-user')
    // }

    // await this._notifyAllSubscribers('SIGNED_OUT', null)
  }


  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    // await this.initializePromise

    // const result = await this._acquireLock(this.lockAcquireTimeout, async () => {
      return this._useSession(async (result) => {
        return result
      })
    // })

    // return result
  }


  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  private async _useSession<R>(
    fn: (
      result:
        | {
            data: {
              session: Session
            }
            error: null
          }
        // | {
        //     data: {
        //       session: null
        //     }
        //     error: AuthError
        //   }
        | {
            data: {
              session: null
            }
            error: null
          }
    ) => Promise<R>
  ): Promise<R> {
    // console.log('#_useSession', 'begin')

    try {
      // the use of __loadSession here is the only correct use of the function!
      const result = await this.__loadSession()

      return await fn(result)
    } finally {
      // console.log('#_useSession', 'end')
    }
  }


  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  private async __loadSession(): Promise<
    | {
        data: {
          session: Session
        }
        error: null
      }
    // | {
    //     data: {
    //       session: null
    //     }
    //     error: AuthError
    //   }
    | {
        data: {
          session: null
        }
        error: null
      }
  > {
    // console.log('#__loadSession()', 'begin')

    // if (!this.lockAcquired) {
    //   console.log('#__loadSession()', 'used outside of an acquired lock!', new Error().stack)
    // }

    // try {
      let currentSession: Session | null = null

      const maybeSession = await getItemAsync(this.storage, this.storageKey)

      // console.log('#getSession()', 'session from storage', maybeSession)

      // if (maybeSession !== null) {
      //   if (this._isValidSession(maybeSession)) {
      //     currentSession = maybeSession
      //   } else {
      //     console.log('#getSession()', 'session from storage is not valid')
      //     await this._removeSession()
      //   }
      // }

      // if (!currentSession) {
        return { data: { session: null }, error: null }
      // }

      // A session is considered expired before the access token _actually_
      // expires. When the autoRefreshToken option is off (or when the tab is
      // in the background), very eager users of getSession() -- like
      // realtime-js -- might send a valid JWT which will expire by the time it
      // reaches the server.
      // const hasExpired = currentSession.expires_at
      //   ? currentSession.expires_at * 1000 - Date.now() < EXPIRY_MARGIN_MS
      //   : false

      // console.log(
      //   '#__loadSession()',
      //   `session has${hasExpired ? '' : ' not'} expired`,
      //   'expires_at',
      //   currentSession.expires_at
      // )

      // if (!hasExpired) {
        // if (this.userStorage) {
        //   const maybeUser: { user?: User | null } | null = (await getItemAsync(
        //     this.userStorage,
        //     this.storageKey + '-user'
        //   )) as any

        //   if (maybeUser?.user) {
        //     currentSession.user = maybeUser.user
        //   } else {
        //     currentSession.user = userNotAvailableProxy()
        //   }
        // }

        // Wrap the user object with a warning proxy on the server
        // This warns when properties of the user are accessed, not when session.user itself is accessed
        // if (
        //   this.storage.isServer &&
        //   currentSession.user &&
        //   !(currentSession.user as any).__isUserNotAvailableProxy
        // ) {
        //   const suppressWarningRef = { value: this.suppressGetSessionWarning }
        //   currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef)

        //   // Update the client-level suppression flag when the proxy suppresses the warning
        //   if (suppressWarningRef.value) {
        //     this.suppressGetSessionWarning = true
        //   }
        // }

      //   return { data: { session: currentSession }, error: null }
      // }

    //   const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token)
    //   if (error) {
    //     return this._returnResult({ data: { session: null }, error })
    //   }

    //   return this._returnResult({ data: { session }, error: null })
    // } finally {
    //   console.log('#__loadSession()', 'end')
    // }
  }


}
