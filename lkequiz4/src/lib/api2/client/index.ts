import  CustomApiClient  from "./CustomApiClient";
import { CustomClientOptions } from "./lib/shared/types"

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