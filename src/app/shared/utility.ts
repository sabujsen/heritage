import { Configuration } from "./configuration";


export default class Utils {


    static ReturnUrl(url): string {
        let configuration = new Configuration();
        //configuration.baseApiUrl
        return configuration.baseApiUrl+url;
    }
    static UploadUrl(): string {
        let configuration = new Configuration();       
        return configuration.uploadLink;
    }
    static UploadURl(): string {
        let configuration = new Configuration();
        //configuration.baseApiUrl
        return configuration.uploadURl;
    }
}