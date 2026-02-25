// import { createMMKV } from 'react-native-mmkv'
// import { createMMKV } from 'react-native-mmkv';
import { createOwnApiClient } from "@/lib/api/client/";
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()
// export const storage = createMMKV();

// const url = process.env.PUBLIC_API_URL!;
// const apiKey = process.env.PUBLIC_API_KEY!;
// const url = "http://162.19.227.81:3000"
const url = "http://lke.e-strix.pl/api/"
const apiKey ="sb_publishable_H4o6SDXXskt4YH4F3aix3A_mWjZFNqL"

export const ownapi = createOwnApiClient(url, apiKey, {
    auth: {
        storage: storage
    }
})
