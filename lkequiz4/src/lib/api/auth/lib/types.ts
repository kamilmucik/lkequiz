import { AuthError } from './errors'
// import { Fetch } from './fetch'


const WeakPasswordReasons = ['length', 'characters', 'pwned'] as const

export type WeakPasswordReasons = (typeof WeakPasswordReasons)[number]
export type WeakPassword = {
  reasons: WeakPasswordReasons[]
  message: string
}

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

/**
 * a shared result type that encapsulates errors instead of throwing them, allows you to optionally specify the ErrorType
 */
export type RequestResult<T, ErrorType extends Error = AuthError> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: Error extends AuthError ? AuthError : ErrorType
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

export type AuthTokenResponse = RequestResultSafeDestructure<{
  user: User
  session: Session
}>

export type AuthTokenResponsePassword = RequestResultSafeDestructure<{
  user: User
  session: Session
}>


export type EmptyResponse = RequestResultSafeDestructure<{}>