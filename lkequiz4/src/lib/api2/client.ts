import { createMMKV } from 'react-native-mmkv';
import { createOwnApiClient } from "@/lib/api2/client/index";
export const storage = createMMKV();

const url = "http://lke.e-strix.pl/api/"
const apiKey ="sb_publishable_H4o6SDXXskt4YH4F3aix3A_mWjZFNqL"

export const ownapi = createOwnApiClient(url, apiKey, {
    auth: {
        storage: storage
    }
})
