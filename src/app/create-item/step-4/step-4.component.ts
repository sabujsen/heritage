import { GrobalDataService } from './../../shared/grobal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Tag } from './../../shared/tag.model';
import { HeritageService } from './../../shared/heritage.service';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.css']
})
export class Step4Component implements OnInit {
  isFavotite = false;
  isVisited = false;
  isStar = false;
  subscription: Subscription;
  tags: Tag[];
  item4Form: FormGroup;
  SelectionStatusOfMutants: any = {};

  constructor(private heritageService: HeritageService, private dataService: DataService, private gd: GrobalDataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.heritageService.tagChanged
      .subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      });
    this.dataService.getTags();
  }
  private initForm() {
    let isFavotite = false;
    let isVisited = false;
    let isStar = false;

    this.item4Form = new FormGroup({
      'isFavotite': new FormControl(isFavotite),
      'isVisited': new FormControl(isVisited),
      'isStar': new FormControl(isStar)
    });
  }
  onNextStep5() {
    let selecteds = Object.keys(this.SelectionStatusOfMutants).filter((item, index) => {
      return this.SelectionStatusOfMutants[item];
    });
    this.gd.shareObj['savedtags'] = selecteds;
    this.gd.shareObj['saved4data'] = this.item4Form.value;
    this.router.navigate(['step-5']);
  }
}
