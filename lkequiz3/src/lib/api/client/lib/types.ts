import { GoTrueClientOptions } from '@supabase/auth-js'
// import { GoTrueClientOptions } from '@supabase/auth-js'

export type Fetch = typeof fetch

export interface CustomAuthClientOptions extends GoTrueClientOptions {}
export interface CustomUserClientOptions extends GoTrueClientOptions {}
export interface CustomStorageClientOptions extends GoTrueClientOptions {}

export type CustomClientOptions = {
  
  auth?: {
    /**
     * Automatically refreshes the token for logged-in users. Defaults to true.
     */
    autoRefreshToken?: boolean
    /**
     * Optional key name used for storing tokens in local storage.
     */
    storageKey?: string
    /**
     * Whether to persist a logged-in session to storage. Defaults to true.
     */
    persistSession?: boolean
    /**
     * A storage provider. Used to store the logged-in session.
     */
    storage?: SupabaseAuthClientOptions['storage']
    /**
     * A storage provider to store the user profile separately from the session.
     * Useful when you need to store the session information in cookies,
     * without bloating the data with the redundant user object.
     *
     * @experimental
     */
    // userStorage?: SupabaseAuthClientOptions['userStorage']
    /**
     * OAuth flow to use - defaults to implicit flow. PKCE is recommended for mobile and server-side applications.
     */
    // flowType?: SupabaseAuthClientOptions['flowType']
    /**
     * If debug messages for authentication client are emitted. Can be used to inspect the behavior of the library.
     */
    // debug?: SupabaseAuthClientOptions['debug']
    /**
     * Provide your own locking mechanism based on the environment. By default no locking is done at this time.
     *
     * @experimental
     */
    // lock?: SupabaseAuthClientOptions['lock']
    /**
     * If there is an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     */
    // throwOnError?: SupabaseAuthClientOptions['throwOnError']
  }
  /**
   * Options passed to the realtime-js instance
   */
//   realtime?: RealtimeClientOptions
//   storage?: StorageClientOptions
  global?: {
    /**
     * A custom `fetch` implementation.
     */
    fetch?: Fetch
    /**
     * Optional headers for initializing the client.
     */
    headers?: Record<string, string>
  }
  /**
   * Optional function for using a third-party authentication system with
   * Supabase. The function should return an access token or ID token (JWT) by
   * obtaining it from the third-party auth SDK. Note that this
   * function may be called concurrently and many times. Use memoization and
   * locking techniques if this is not supported by the SDKs.
   *
   * When set, the `auth` namespace of the Supabase client cannot be used.
   * Create another client if you wish to use Supabase Auth and third-party
   * authentications concurrently in the same application.
   */
  accessToken?: () => Promise<string | null>
}