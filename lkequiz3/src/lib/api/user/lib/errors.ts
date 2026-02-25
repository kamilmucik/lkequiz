
import { ErrorCode } from "./error-codes"
/**
 * Base error thrown by Supabase Auth helpers.
 *
 * @example
 * ```ts
 * import { AuthError } from '@supabase/auth-js'
 *
 * throw new AuthError('Unexpected auth error', 500, 'unexpected')
 * ```
 */
export class UserError extends Error {
  /**
   * Error code associated with the error. Most errors coming from
   * HTTP responses will have a code, though some errors that occur
   * before a response is received will not have one present. In that
   * case {@link #status} will also be undefined.
   */
  code: ErrorCode | (string & {}) | undefined

  /** HTTP status code that caused the error. */
  status: number | undefined

  protected __isAuthError = true

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = 'UserError'
    this.status = status
    this.code = code
  }
  
}

/**
 * Flexible error class used to create named auth errors at runtime.
 *
 * @example
 * ```ts
 * import { CustomAuthError } from '@supabase/auth-js'
 *
 * throw new CustomAuthError('My custom auth error', 'MyAuthError', 400, 'custom_code')
 * ```
 */
export class CustomUserError extends UserError {
  name: string
  status: number

  constructor(message: string, name: string, status: number, code: string | undefined) {
    super(message, status, code)
    this.name = name
    this.status = status
  }
}

export function isUserError(error: unknown): error is UserError {
  return typeof error === 'object' && error !== null && '__isUserError' in error
}

export class UserInvalidRequestError extends CustomUserError {
  constructor(message: string) {
    super(message, 'UserInvalidRequestError', 400, undefined)
  }
}