import { ImageObj } from './image.model';
import { StepCompleteComponent } from './../create-item/step-complete/step-complete.component';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReturnString } from './../create-item/step-5/step-5.component';
import { Tag } from './tag.model';
import { Item } from './item.model';
import { MasterCategory } from './mastercategory.model';
import { HeritageService } from './heritage.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import Utils from 'app/shared/utility';

@Injectable()
export class DataService {
    tagMapping: TagMapping;
    tempId: number;
    returnStringsChanged = new Subject<ReturnString[]>();
    subscription: Subscription;


    constructor(private http: Http,
        private heritageService: HeritageService
    ) {
        this.subscription = this.returnStringsChanged
            .subscribe(
            (returnString: ReturnString[]) => {
                let savedimagesParam: ReturnString[] = returnString;
                this.manageImages(savedimagesParam, this.tempId);
            });
    }

    getMasterCategories() {
        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");

        const getMasterCategoriesURL = Utils.ReturnUrl('getMasterCategories.php');
        this.http.get(getMasterCategoriesURL)
            .map(
            (response: Response) => {
                const masterCategories: MasterCategory[] = response.json().records;
                return masterCategories;
            })
            .subscribe(
            (masterCategories: MasterCategory[]) => {
                this.heritageService.setMasterCategories(masterCategories);
            });
    }

    getItems(id: number) {
        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");

        const getItemsURL = Utils.ReturnUrl('items.php?id=' + id);
        this.http.get(getItemsURL)
            .map(
            (response: Response) => {
                const items: Item[] = response.json().records;
                return items;
            })
            .subscribe(
            (items: Item[]) => {
                this.heritageService.setItems(items);
            });
    }

    getTags() {
        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");

        const getTagsURL = Utils.ReturnUrl('taglist.php');
        this.http.get(getTagsURL)
            .map(
            (response: Response) => {
                const tags: Tag[] = response.json().records;
                return tags;
            })
            .subscribe(
            (tags: Tag[]) => {
                this.heritageService.setTags(tags);
            });
    }
    getImages() {
        let headers = new Headers();
        headers.append("Access-Control-Allow-Origin", "*");

        const getTagsURL = Utils.ReturnUrl('imagelist.php');
        this.http.get(getTagsURL)
            .map(
            (response: Response) => {
                const imageObj: ImageObj[] = response.json().records;
                return imageObj;
            })
            .subscribe(
            (imageObj: ImageObj[]) => {
                this.heritageService.setImages(imageObj);
            });
    }
    postItem(item: Item, savedtags: any[], savedimages: ReturnString[]) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let body = JSON.stringify(item);
        const postItemURL = Utils.ReturnUrl('create-item.php');
        this.http.post(postItemURL, body, { headers: headers })
            .map(
            (response: Response) => {
                return response.json();
            })
            .subscribe(
            (returnId: number) => {
                //Insert Tags
                if (returnId != -1) {
                    if (savedtags.length > 0) {
                        let loopCount: number = 0;
                        const postTagMappingURL = Utils.ReturnUrl('create-tag-mapping.php');
                        for (let tid in savedtags) {
                            let tagBody = JSON.stringify({ 'itemId': returnId, 'tagId': savedtags[tid] });
                            this.http.post(postTagMappingURL, tagBody, { headers: headers })
                                .map((response: Response) => {
                                    return response.json();
                                })
                                .subscribe((ret: number) => {
                                    let r = ret;
                                    loopCount++
                                    if (savedtags.length === loopCount) {
                                        this.tempId = returnId
                                        this.returnStringsChanged.next(savedimages);
                                    }
                                });
                        }
                    }
                    else {
                        this.tempId = returnId
                        this.returnStringsChanged.next(savedimages);
                    }
                }
               
            });
    }

    manageImages(savedimages: ReturnString[], returnId: number) {
        //Insert Images --
        if (savedimages.length > 0) {
            let savedimagesCount: number = 0;
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            const postImgMappingURL = Utils.ReturnUrl('create-item-image-mapping.php');
            for (let iid in savedimages) {
                let baseLink: string = Utils.UploadURl();
                let imgBody = JSON.stringify({ 'itemId': returnId, 'imagePath': baseLink + savedimages[iid].generatedName, 'caption': savedimages[iid].originalName });
                this.http.post(postImgMappingURL, imgBody, { headers: headers })
                    .map((response: Response) => {
                        return response.json();
                    })
                    .subscribe((ret: number) => {
                        let r = ret;
                        savedimagesCount++;
                        if (savedimagesCount === savedimages.length) {
                            this.heritageService.setComplete(savedimagesCount);
                        }
                    });
            }
        }
        else {
            this.heritageService.setComplete(0);
        }
    }
}
export class TagMapping {
    constructor(
        public itemId: number,
        public tagId: number
    ) { }
}