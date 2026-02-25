import  CustomApiClient  from "./CustomApiClient";
export type {
  CustomClientOptions,
} from "./lib/types"

export const createOwnApiClient =  (
    apiURL: string,
    apiKey: string, 
    options?: CustomClientOptions)
    : CustomApiClient => {
        return new CustomApiClient(
            apiURL, 
            apiKey,
            options
        )
    }