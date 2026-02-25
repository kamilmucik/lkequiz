import { createMMKV } from 'react-native-mmkv'
import { HTTPService } from "@/lib/api/httpservice";
import { Endpoint } from "@/lib/api/endpoint";
// import { useCustomFetch } from "@/lib/api/useCustomPost"
import { INITIAL_STATE, postReducer } from './postReducer';
import { useEffect, useReducer} from 'react';
import { useState} from 'react';
import { ACTION_TYPE } from './postActionTypes';
import { useCustomPost } from './useCustomPost'

export const storage = createMMKV();

const url = process.env.PUBLIC_API_URL!;
const supabaseAnonKey = process.env.PUBLIC_API_KEY!;

// const [query, setQuery] = useState('');
// const {loading, singleResult} = useCustomFetch(query);

export default class CustomApiClient {

    constructor() {}







    // private baseUrl: string = "http://162.19.227.81:3000";//process.env.PUBLIC_API_URL!
    // // private baseUrl: string = "http://lkequiz.local:3000";//process.env.PUBLIC_API_URL!
    // // private baseUrl: string = "http://lkequiz.local:3000";//process.env.PUBLIC_API_URL!

    // async signInWithPassword(email: string, password: string ) {
    //     // const httpService = new HTTPService();
    //     // const response = await httpService.httpPost(Endpoint.AUTH_LOGIN, 
    //         // {
    //         //     "email": email,
    //         //     "password": password
    //         // }
    //     // ).then( (res) => {
    //     //     // console.info("signIn.res`", res.data);
    //     //     // return {
    //     //     //     "user": {
    //     //     //         "id": res.data
    //     //     //     }
    //     //     // }
    //     // } ).catch((error) => {
    //     //     //try to fix the error or
    //     //     //notify the users about somenthing went wrong
    //     //     console.log(error.message)
    //     // });
    //     return useCustomPost(
    //         Endpoint.AUTH_LOGIN,
    //         'productimageversion/add-image', 
    //         {
    //             "email": email,
    //             "password": password
    //         }
    //         , 'POST');
    // }

}