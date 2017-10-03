import { GrobalDataService } from './../shared/grobal.service';
import { ImageObj } from './../shared/image.model';
import { DataService } from './../shared/data.service';
import { HeritageService } from './../shared/heritage.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewEncapsulation, ElementRef, Inject } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryViewComponent implements OnInit {
  subscription: Subscription;
  imageObj: ImageObj[];
  elementRef: ElementRef;
  pgitems: PgItems[] = [];
  paramid: number;
  constructor(private heritageService: HeritageService, private dataService: DataService, @Inject(ElementRef) elementRef: ElementRef, private gd: GrobalDataService) { this.elementRef = elementRef; }

  ngOnInit() {
    this.subscription = this.heritageService.imageObjChanged
      .subscribe(
      (imageObj: ImageObj[]) => {
        this.imageObj = imageObj;

        for (let i in this.imageObj) {
          let pgitem: PgItems;
          pgitem = { src: this.imageObj[i].imagePath, srct: this.imageObj[i].imagePath, title:this.imageObj[i].title };

          this.pgitems.push(pgitem);
        }

        jQuery(this.elementRef.nativeElement).find("#nanogallery2").nanogallery2({
          thumbnailHeight: 150,
          thumbnailWidth: 150,
          //itemsBaseURL: 'http://nanogallery2.nanostudio.org/samples/',
          items: this.pgitems
        });

      });
    this.dataService.getImages();

  this.paramid=this.gd.shareObj['catid'];
  }

}
export class PgItems {
  constructor(
    public src: string,
    public srct: string,
    public title: string,
  ) { }
}