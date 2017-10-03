import { element } from 'protractor';
import { GrobalDataService } from './../../shared/grobal.service';
import { HeritageService } from './../../shared/heritage.service';
import { Item } from './../../shared/item.model';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MnFullpageOptions } from 'ng2-fullpage';
import 'jquery';
import 'fullpage.js'
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  id: number;
  item: Item;
  paramid: number;
  defaultImagePath: string;
  currentImageId: number = 0;
  @Input() public options: MnFullpageOptions = new MnFullpageOptions({
    navigation: true,
    keyboardScrolling: true
  });
  constructor(private route: ActivatedRoute, private router: Router, private activatedRoute: ActivatedRoute, private heritageService: HeritageService, public dialog: MdDialog, private gd: GrobalDataService) { }

  prevVisible: boolean = false;
  nextVisible: boolean = false;
  ngOnInit() {

    if (this.gd.shareObj['data'] === undefined) {
      this.router.navigate(['/home']);
    }
    else {
      this.item = this.gd.shareObj['data'];
      if (this.item.imgs != null) {
        this.defaultImagePath = this.item.imgs[this.currentImageId].imagePath;
        this.nextVisible = true;
      } else {
        this.defaultImagePath = './assets/images/no_image_thumb.gif'
      }
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.paramid = params["id"];
      });

  }

  onNextClick() {
    this.currentImageId++;
    this.defaultImagePath = this.item.imgs[this.currentImageId].imagePath;
    if (this.currentImageId > 0) {
      this.prevVisible = true;
    }
    if (this.currentImageId == this.item.imgs.length - 1) {
      this.nextVisible = false;
    }
    else
    {
      this.prevVisible = true;
    }
  }
  onPrevClick() {
    this.currentImageId--;
    this.defaultImagePath = this.item.imgs[this.currentImageId].imagePath;
    if (this.currentImageId == 0) {
      this.prevVisible = false;
      this.nextVisible = true;
    }    
    else
    {
      this.nextVisible = true;
    }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(OverviewDialog, {
      width: '50%',
      data: this.item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

@Component({
  selector: 'overview-dialog',
  templateUrl: 'overview-dialog.html',
  styleUrls: ['./overview-dialog.css']
})
export class OverviewDialog {

  constructor(
    public dialogRef: MdDialogRef<OverviewDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
