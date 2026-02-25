import { StorageClient } from './storage/'
import { CustomStorageClientOptions } from './shared/types'

export class CustomStorageClient extends StorageClient {
  constructor(options: CustomStorageClientOptions) {
    super(options)
  }
}
