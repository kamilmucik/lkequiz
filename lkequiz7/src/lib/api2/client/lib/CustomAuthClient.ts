import { AuthClient } from './auth/'
import { CustomAuthClientOptions } from './shared/types'

export class CustomAuthClient extends AuthClient {
  constructor(options: CustomAuthClientOptions) {
    super(options)
  }
}
