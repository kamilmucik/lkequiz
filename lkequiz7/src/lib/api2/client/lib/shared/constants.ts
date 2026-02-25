import { CustomAuthClientOptions } from './types'

export const GOTRUE_URL = 'http://localhost:9999'
export const STORAGE_KEY = 'custom.auth.token'

export const DEFAULT_HEADERS = {  }

export const DEFAULT_GLOBAL_OPTIONS = {
  headers: DEFAULT_HEADERS,
}

export const DEFAULT_AUTH_OPTIONS: CustomAuthClientOptions = {
  autoRefreshToken: true,
  persistSession: true,
//   detectSessionInUrl: true,
//   flowType: 'implicit',
}
export const DEFAULT_USER_OPTIONS: CustomAuthClientOptions = {
  autoRefreshToken: true,
  persistSession: true,
//   detectSessionInUrl: true,
//   flowType: 'implicit',
}
// export const DEFAULT_REALTIME_OPTIONS: RealtimeClientOptions = {}
