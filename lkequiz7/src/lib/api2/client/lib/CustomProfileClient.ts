import { ProfileClient } from './profile/'
import { CustomProfileClientOptions } from './shared/types'

export class CustomProfileClient extends ProfileClient {
  constructor(options: CustomProfileClientOptions) {
    super(options)
  }
}
