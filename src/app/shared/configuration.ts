import { environment } from './../../environments/environment';
export class Configuration {
    public baseApiUrl:string;
    public baseProject:string;
    public uploadLink:string;
    public uploadURl:string;
    constructor() {
        let 
            apiUrls = {
                dev: 'http://kuhook.com/api/',
                stage: 'http://kuhook.com/api/',
                production: 'http://kuhook.com/api/'
            };
            this.baseApiUrl = apiUrls[environment.NODE_ENVIRONMENT];
            this.baseProject="pujo-parikoma";
            this.uploadLink="http://kuhook.com/api/upload.php"
            this.uploadURl="http://kuhook.com/api/uploads/"
        }
    }
  