import { UserClient } from '@/lib/api/user/'
import { CustomUserClientOptions } from './types'

export class CustomUserClient extends UserClient {
  constructor(options: CustomUserClientOptions) {
    super(options)
  }
}
