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
  Required<UserTrueClientOptions>,
  'fetch' | 'storage' | 'userStorage' | 'lock'
> = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  headers: DEFAULT_HEADERS,
  debug: false,
  throwOnError: false
}

export default class ProfileTrueClient {
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

  constructor(options: UserTrueClientOptions) {
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


async updateUser(requestParams: { userId: string, userData: Partial<UserProfile> }): Promise<EmptyResponse | undefined> {
    const { data, error } = await this.getSession()
    const access_token = data.session?.access_token;
    // console.log("updateUser.getSession.data", access_token)
    try {
        let res: EmptyResponse

        if ('userId' in requestParams) {


          const { userId, userData } = requestParams

          // console.info("updateUser.userData", {userData})
          // console.info("updateUser.userId", userId)

          res = await _request(this.fetch, 'PUT', `${this.url}/`, {
            headers: this.headers,
            jwt: access_token ?? undefined,
            body: {
                userId: userId,
                fullname: userData.fullname,
                username: userData.username,
                // profile_image_url: userData?.profileImage,
                onboarding_complete: userData.onboarding_complete,
                onboardingComplete: true
                // onboarding_completed: "true"
            }
            // options.body: JSON.stringify(userData)
           })
        } else {
          throw new UserInvalidRequestError(
            'You must provide either an email or phone number and a password' );
          }

          const { data, error } = res
          
          if (error) {
            return this._returnResult({ data: { user: null, session: null }, error })
           }



        } catch (error) {
          console.error("Error in updateUser", error);
          // if (isUserError(error)) {
          //   throw error;
          // }
          // throw new Error("Error updating user");
          if (isUserError(error)) {
            return this._returnResult({ data: { user: null, session: null }, error })
          }
          
          throw error
        }
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
  async getDetails(requestParams: UserDetailsRequest): Promise<UserDetailsResponse> {
    const { data, error } = await this.getSession()
    const access_token = data.session?.access_token;
    console.log("getDetails.getSession.data", access_token)
    try {
      let res: UserDetailsResponse
      if ('userId' in requestParams) {
        const { userId } = requestParams
        res = await _request(this.fetch, 'GET', `${this.url}/`, {
          headers: this.headers,
          jwt: access_token ?? undefined,
        })
      } else {
        throw new UserInvalidRequestError(
          'You must provide either an email or phone number and a password'
        )
      }

      const { data, error } = res
      // console.info("getDetails.data", data.data)
      // console.info("getDetails.error", error)

      if (error || !data) {
        // await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)
        return this._returnResult(
            { 
                data: { 
                    userId: requestParams.userId,
                }, 
                error: error 
            })
      }

    //   const id: Session | null = data.session
    //   const userProfile: UserProfile | null = data

      // if (data.session) {
      //   await this._saveSession(data.session)
      //   // await this._notifyAllSubscribers('SIGNED_IN', session)
      // }

      return this._returnResult(
        { 
            data: { 
                    id: data.data.id,
                    userId: requestParams.userId,
                    fullname: data?.data.fullname || null,
                    username: data?.data.username || null,
                    profile_image_url: data?.data.profile_image_url || null,
                    onboarding_completed: data?.data.onboarding_completed === true || null
                }, 
            error: null 
        })
    } catch (error) {
      // await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)
      if (isUserError(error)) {
        // return this._returnResult({ data: { user: null, session: null }, error })
        return this._returnResult(
            { 
                data: { 
                    id: null,
                    fullname: null,
                    username: null,
                    profile_image_url: null,
                    onboarding_complete: null
                }, 
                error: error 
            })
      }

      throw error
    }
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
        // | {
        //     data: {
        //       session: Session
        //     }
        //     error: null
        //   }
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
    console.log('#_useSession', 'begin')

    try {
      // the use of __loadSession here is the only correct use of the function!
      const result = await this.__loadSession()
      // console.log('#_useSession.result', result)

      return await fn(result)
    } finally {
      console.log('#_useSession', 'end')
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
    //   this._debug('#__loadSession()', 'used outside of an acquired lock!', new Error().stack)
    // }

    try {
      let currentSession: Session | null = null

      const maybeSession = await getItemAsync(this.storage, this.storageKey)


    // console.log('#__loadSession().storage', this.storage)
    // console.log('#__loadSession().storageKey', this.storageKey)
    // console.log('#__loadSession()', maybeSession)

      // console.log('#getSession()', 'session from storage', maybeSession)
      console.log('#getSession()', 'session from storage')

      // if (maybeSession !== null) {
      //   if (this._isValidSession(maybeSession)) {
          currentSession = maybeSession
      //   } else {
      //     this._debug('#getSession()', 'session from storage is not valid')
      //     await this._removeSession()
      //   }
      // }

      // if (!currentSession) {
      //   return { data: { session: null }, error: null }
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
      //   if (this.userStorage) {
      //     const maybeUser: { user?: User | null } | null = (await getItemAsync(
      //       this.userStorage,
      //       this.storageKey + '-user'
      //     )) as any

      //     if (maybeUser?.user) {
      //       currentSession.user = maybeUser.user
      //     } else {
      //       currentSession.user = userNotAvailableProxy()
      //     }
      //   }

      //   // Wrap the user object with a warning proxy on the server
      //   // This warns when properties of the user are accessed, not when session.user itself is accessed
      //   if (
      //     this.storage.isServer &&
      //     currentSession.user &&
      //     !(currentSession.user as any).__isUserNotAvailableProxy
      //   ) {
      //     const suppressWarningRef = { value: this.suppressGetSessionWarning }
      //     currentSession.user = insecureUserWarningProxy(currentSession.user, suppressWarningRef)

      //     // Update the client-level suppression flag when the proxy suppresses the warning
      //     if (suppressWarningRef.value) {
      //       this.suppressGetSessionWarning = true
      //     }
      //   }

        return { data: { session: currentSession }, error: null }
      // }

      // const { data: session, error } = await this._callRefreshToken(currentSession.refresh_token)
      // if (error) {
        // return this._returnResult({ data: { session: null }, error })
        // return this._returnResult({ data: { session: null }, error })
      // }

      // return this._returnResult({ data: { session }, error: null })
    } finally {
      // console.log('#__loadSession()', 'end')
    }
  }


}

