 


export type Fetch = typeof fetch
import { AuthError } from './errors'
export type AuthFlowType = 'implicit' | 'pkce'

type AnyFunction = (...args: any[]) => any
type MaybePromisify<T> = T | Promise<T>

type PromisifyMethods<T> = {
  [K in keyof T]: T[K] extends AnyFunction
    ? (...args: Parameters<T[K]>) => MaybePromisify<ReturnType<T[K]>>
    : T[K]
}

export type SupportedStorage = PromisifyMethods<
  Pick<Storage, 'getString' | 'set' | 'delete'>
> & {
  /**
   * If set to `true` signals to the library that the storage medium is used
   * on a server and the values may not be authentic, such as reading from
   * request cookies. Implementations should not set this to true if the client
   * is used on a server that reads storage information from authenticated
   * sources, such as a secure database or file.
   */
  isServer?: boolean
}


export interface User {
  id: string
  email?: string
  phone?: string
  fullname?: string
  username?: string
//   created_at: string
//   confirmed_at?: string
//   email_confirmed_at?: string
//   phone_confirmed_at?: string
//   last_sign_in_at?: string
//   role?: string
//   updated_at?: string
//   identities?: UserIdentity[]
//   is_anonymous?: boolean
//   is_sso_user?: boolean
//   factors?: (Factor<FactorType, 'verified'> | Factor<FactorType, 'unverified'>)[]
//   deleted_at?: string
//   banned_until?: string
}

const WeakPasswordReasons = ['length', 'characters', 'pwned'] as const

export type WeakPasswordReasons = (typeof WeakPasswordReasons)[number]
export type WeakPassword = {
  reasons: WeakPasswordReasons[]
  message: string
}


export type GoTrueClientOptions = {
  /* The URL of the GoTrue server. */
  url?: string
  /* Any additional headers to send to the GoTrue server. */
  headers?: { [key: string]: string }
  /* Optional key name used for storing tokens in local storage. */
  storageKey?: string
  /* Set to "true" if you want to automatically refresh the token before expiring. */
  autoRefreshToken?: boolean
  /* Set to "true" if you want to automatically save the user session into local storage. If set to false, session will just be saved in memory. */
  persistSession?: boolean
  /* Provide your own local storage implementation to use instead of the browser's local storage. */
  storage?: SupportedStorage
  /* If debug messages are emitted. Can be used to inspect the behavior of the library. If set to a function, the provided function will be used instead of `console.log()` to perform the logging. */
  debug?: boolean | ((message: string, ...args: any[]) => void)
  /* A custom fetch implementation. */
  fetch?: Fetch
  /**
   * If there is an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   */
  throwOnError?: boolean
}


export interface CustomAuthClientOptions extends GoTrueClientOptions {}
export interface CustomProfileClientOptions extends GoTrueClientOptions {}
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
    /* If set to 'pkce' PKCE flow. Defaults to the 'implicit' flow otherwise */
    flowType?: AuthFlowType
    /**
     * If debug messages for authentication client are emitted. Can be used to inspect the behavior of the library.
     */
    debug?: CustomAuthClientOptions['debug']
    /**
     * If there is an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     */
    // throwOnError?: SupabaseAuthClientOptions['throwOnError']
  }
  storage?: CustomStorageClientOptions
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


/**
 * similar to RequestResult except it allows you to destructure the possible shape of the success response
 *  {@see RequestResult}
 */
export type RequestResultSafeDestructure<T> =
  | { data: T; error: null }
  | {
      data: T extends object ? { [K in keyof T]: null } : null
      error: AuthError
    }


export type AuthResponse = RequestResultSafeDestructure<{
  user: User | null
  session: Session | null
}>


export type AuthTokenResponsePassword = RequestResultSafeDestructure<{
  user: User
  session: Session
}>


export type InitializeResult = { error: AuthError | null }


export interface Session {
//   /**
//    * The oauth provider token. If present, this can be used to make external API requests to the oauth provider used.
//    */
//   provider_token?: string | null
//   /**
//    * The oauth provider refresh token. If present, this can be used to refresh the provider_token via the oauth provider's API.
//    * Not all oauth providers return a provider refresh token. If the provider_refresh_token is missing, please refer to the oauth provider's documentation for information on how to obtain the provider refresh token.
//    */
//   provider_refresh_token?: string | null
  /**
   * The access token jwt. It is recommended to set the JWT_EXPIRY to a shorter expiry value.
   */
  access_token: string
  /**
   * A one-time used refresh token that never expires.
   */
  refresh_token: string
  /**
   * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
   */
  expires_in: number
  /**
   * A timestamp of when the token will expire. Returned when a login is confirmed.
   */
  expires_at?: number
  token_type: 'bearer'

//   /**
//    * When using a separate user storage, accessing properties of this object will throw an error.
//    */
//   user: User
}


/**
 * Resolve mapped types and show the derived keys and their types when hovering in
 * VS Code, instead of just showing the names those mapped types are defined with.
 */
export type Prettify<T> = T extends Function ? T : { [K in keyof T]: T[K] }

type PasswordCredentialsBase =
  | { email: string; password: string }
  | { phone: string; password: string }

export type SignUpWithPasswordCredentials = Prettify<
  PasswordCredentialsBase & {
    options?: {
      emailRedirectTo?: string // only for email
      data?: object
      captchaToken?: string
      channel?: 'sms' | 'whatsapp' // only for phone
    }
  }
>

export type SignInWithPasswordCredentials = PasswordCredentialsBase & {
  options?: {
    captchaToken?: string
  }
}


export type AuthResponsePassword = RequestResultSafeDestructure<{
  user: User | null
  session: Session | null
  weak_password?: WeakPassword | null
}>
