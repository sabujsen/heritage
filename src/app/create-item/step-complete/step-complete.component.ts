import { HeritageService } from './../../shared/heritage.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../shared/data.service';
import { Item } from './../../shared/item.model';
import { GrobalDataService } from './../../shared/grobal.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-step-complete',
  templateUrl: './step-complete.component.html',
  styleUrls: ['./step-complete.component.css']
})
export class StepCompleteComponent implements OnInit {
  item: Item;
  uploadedImageCount: number;
  subscription: Subscription;
  completeStatus:boolean=false;

  constructor(private gd: GrobalDataService, private dataService: DataService, private heritageService: HeritageService, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.subscription = this.heritageService.returnImageStringsChanged
      .subscribe(
      (ret: Number) => {
        this.openSnackBar("Data Saved Successfully", "Complete: wait for 2 seconds.");
      });

    let a0: Item = this.gd.shareObj['saved1data'];
    let a1: Item = this.gd.shareObj['saved2data'];
    let a2: Item = this.gd.shareObj['saved3data'];
    let a3: Item = this.gd.shareObj['saved4data'];


    this.item = a1;
    this.item.categoryId = a0.categoryId;
    this.item.subCategoryId = 0;// a0.subCategoryId;

    this.item.latitude = a2.latitude;
    this.item.longitude = a2.longitude;

    this.item.isFavotite = a3.isFavotite;
    this.item.isStar = a3.isStar;
    this.item.isVisited = a3.isVisited;

    //this.uploadedImageCount=savedimages.length;

    //this.item.tags = a4;
  }
  onSubmit() {
    this.completeStatus=true;
    let savedtags = this.gd.shareObj['savedtags'];
    let savedimages = this.gd.shareObj['savedimages'];
    this.dataService.postItem(this.item, savedtags, savedimages);
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.completeStatus=false;
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
