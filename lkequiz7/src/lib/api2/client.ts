import { createMMKV } from 'react-native-mmkv';
import { createOwnApiClient } from "./client/index";
export const storage = createMMKV();

const url = "http://APP_ENV_API_URL";
const apiKey = "PUBLIC_API_KEY";

// const url = process.env.PUBLIC_API_URL!;
// const apiKey = process.env.PUBLIC_API_KEY!;

export const ownapi = createOwnApiClient(url, apiKey, {
    auth: {
        storage: storage
    }
})
