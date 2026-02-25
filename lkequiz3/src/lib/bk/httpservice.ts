import axios from "axios";

export class HTTPService {

    private baseUrl: string = "http://162.19.227.81:3000";//process.env.PUBLIC_API_URL!
    // private baseUrl: string = "http://lkequiz.local:3000";//process.env.PUBLIC_API_URL!
    // private baseUrl: string = "http://lkequiz.local:3000";//process.env.PUBLIC_API_URL!

    constructor() {}

    buildURL(url: string) {
        return `${this.baseUrl}/${url}`;
    }

    async httpGet(url: string) {
        return axios.get(this.buildURL(url));
    }

    async httpPut(url: string, data: any) {
        return axios.put(
            this.buildURL(url), 
            {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true
            },
            data
        );
    }

    async httpPost(url: string, data: any) {
        return axios.post(
            this.buildURL(url),
             data);
    }

    async httpDelete(url: string) {
        return axios.delete(this.buildURL(url));
    }
}