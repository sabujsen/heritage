import { Injectable } from "@angular/core"
interface ShareObj {
    [id: string]: any;
}
@Injectable()
export class GrobalDataService{
    shareObj:ShareObj={}
}