import { Tag } from './tag.model';
import { ItemImage } from './itemImage.model';
export class Item{
    constructor(
        public id:number,
        public categoryId:number,
        public subCategoryId:number,
        public title:string,
        public description:string,
        public address:string,  
        public landmark:string,        
        public latitude:number,
        public longitude:number,
        public shortDescription:string,
        public isFavotite:boolean,
        public isVisited:boolean,
        public isStar:boolean,
        public likes:number,
        public imgs:ItemImage[],
        public tags:Tag[]
    ){}
}