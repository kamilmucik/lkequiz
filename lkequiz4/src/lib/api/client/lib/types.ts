// import { GoTrueClientOptions } from '@supabase/auth-js'
// import { GoTrueClientOptions } from '@supabase/auth-js'

export type Fetch = typeof fetch

export type AuthFlowType = 'implicit' | 'pkce'

export type GoTrueClientOptions = {
  /* The URL of the GoTrue server. */
  url?: string
  /* Any additional headers to send to the GoTrue server. */
  headers?: { [key: string]: string }
  /* Optional key name used for storing tokens in local storage. */
  storageKey?: string
  /**
   * Set to "true" if you want to automatically detect OAuth grants in the URL and sign in the user.
   * Set to "false" to disable automatic detection.
   * Set to a function to provide custom logic for determining if a URL contains a Supabase auth callback.
   * The function receives the current URL and parsed parameters, and should return true if the URL
   * should be processed as a Supabase auth callback, or false to ignore it.
   *
   * This is useful when your app uses other OAuth providers (e.g., Facebook Login) that also return
   * access_token in the URL fragment, which would otherwise be incorrectly intercepted by Supabase Auth.
   *
   * @example
   * ```ts
   * detectSessionInUrl: (url, params) => {
   *   // Ignore Facebook OAuth redirects
   *   if (url.pathname === '/facebook/redirect') return false
   *   // Use default detection for other URLs
   *   return Boolean(params.access_token || params.error_description)
   * }
   * ```
   */
  detectSessionInUrl?: boolean | ((url: URL, params: { [parameter: string]: string }) => boolean)
  /* Set to "true" if you want to automatically refresh the token before expiring. */
  autoRefreshToken?: boolean
  /* Set to "true" if you want to automatically save the user session into local storage. If set to false, session will just be saved in memory. */
  persistSession?: boolean
  /* Provide your own local storage implementation to use instead of the browser's local storage. */
  storage?: SupportedStorage
  /**
   * Stores the user object in a separate storage location from the rest of the session data. When non-null, `storage` will only store a JSON object containing the access and refresh token and some adjacent metadata, while `userStorage` will only contain the user object under the key `storageKey + '-user'`.
   *
   * When this option is set and cookie storage is used, `getSession()` and other functions that load a session from the cookie store might not return back a user. It's very important to always use `getUser()` to fetch a user object in those scenarios.
   *
   * @experimental
   */
  userStorage?: SupportedStorage
  /* A custom fetch implementation. */
  fetch?: Fetch
  /**
   * If there is an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   */
  throwOnError?: boolean
}

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
    storage?: CustomAuthClientOptions['storage']
    /**
     * OAuth flow to use - defaults to implicit flow. PKCE is recommended for mobile and server-side applications.
     */

  /* If set to 'pkce' PKCE flow. Defaults to the 'implicit' flow otherwise */
    flowType?: AuthFlowType
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