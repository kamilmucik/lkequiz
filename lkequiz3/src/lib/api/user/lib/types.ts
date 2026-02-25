import { UserError } from './errors'
import { Fetch } from './fetch'

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

export interface UserProfile {
  id: number
//   app_metadata: UserAppMetadata
//   user_metadata: UserMetadata
//   aud: string
//   confirmation_sent_at?: string
//   recovery_sent_at?: string
//   email_change_sent_at?: string
//   new_email?: string
//   new_phone?: string
//   invited_at?: string
//   action_link?: string
  fullname?: string
  username?: string
  profile_image_url?: string
  onboarding_complete?: string
//   created_at: string
//   confirmed_at?: string
//   email_confirmed_at?: string
//   phone_confirmed_at?: string
//   last_sign_in_at?: string
//   role?: string
}

export type UserTrueClientOptions = {
  /* The URL of the GoTrue server. */
  url?: string
  /* Any additional headers to send to the GoTrue server. */
  headers?: { [key: string]: string }
  /* Optional key name used for storing tokens in local storage. */
  storageKey?: string
  
  /**
     * A storage provider. Used to store the logged-in session.
     */
  storage?: SupportedStorage

  /* A custom fetch implementation. */
  fetch?: Fetch
  /* If debug messages are emitted. Can be used to inspect the behavior of the library. If set to a function, the provided function will be used instead of `console.log()` to perform the logging. */
  debug?: boolean | ((message: string, ...args: any[]) => void)
  /**
   * If there is an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   */
  throwOnError?: boolean
}

export type InitializeResult = { error: UserError | null }

/**
 * similar to RequestResult except it allows you to destructure the possible shape of the success response
 *  {@see RequestResult}
 */
export type RequestResultSafeDestructure<T> =
  | { data: T; error: null }
  | {
      data: T extends object ? { [K in keyof T]: null } : null
      error: UserError
    }


export type UserDetailsResponse = RequestResultSafeDestructure<{
  id: number | null
  fullname: string | null
  username: string | null
  profile_image_url: string | null
  onboarding_complete: string | null
}> 

export type UserDetailsRequest = {
  userId: string
}


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