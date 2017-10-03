import { ImageObj } from './image.model';
import { Http } from '@angular/http';
import { Tag } from './tag.model';
import { ItemImage } from './itemImage.model';
import { Item } from './item.model';
import { MasterCategory } from './mastercategory.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class HeritageService {
  private titleList: MasterCategory[] = [
    new MasterCategory(1, "test", "business", "test"),
    new MasterCategory(2, "test", "store", "test"),
    new MasterCategory(3, "test", "home", "test"),
    new MasterCategory(4, "test", "account_balance", "test"),
    new MasterCategory(5, "test", "add_location", "test"),
    new MasterCategory(6, "test", "local_hotel", "test"),
    new MasterCategory(7, "test", "store_mall_directory", "test"),
    new MasterCategory(8, "test", "location_city", "test")
  ];

  private items: Item[];
  private masterCategories: MasterCategory[]
  private tags: Tag[];
  private imageObj:ImageObj[];

  masterCategoryChanged = new Subject<MasterCategory[]>();
  itemChanged = new Subject<Item[]>();
  tagChanged= new Subject<Tag[]>();
  returnImageStringsChanged = new Subject<Number>();
  imageObjChanged= new Subject<ImageObj[]>();

  subscription: Subscription;

  constructor(private http: Http) { }

  getTitleList() {
    return this.titleList.slice();
  }
  setMasterCategories(masterCategories: MasterCategory[]) {
    this.masterCategories = masterCategories;
    this.masterCategoryChanged.next(this.masterCategories.slice());
  }
  setItems(items: Item[]) {
    this.items = items;
    this.itemChanged.next(this.items.slice());
  }
  setTags(tags: Tag[]) {
    this.tags = tags;
    this.tagChanged.next(this.tags.slice());
  }
  setImages(imageObj: ImageObj[]) {
    this.imageObj = imageObj;
    this.imageObjChanged.next(this.imageObj.slice());
  }
  setComplete(ret: Number) {
   this.returnImageStringsChanged.next(ret);
  }

}
