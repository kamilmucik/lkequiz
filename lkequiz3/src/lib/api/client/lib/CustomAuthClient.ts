import { AuthClient } from '@/lib/api/auth/'
import { CustomAuthClientOptions } from './types'

export class CustomAuthClient extends AuthClient {
  constructor(options: CustomAuthClientOptions) {
    super(options)
  }
}
