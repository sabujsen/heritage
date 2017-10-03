import { GrobalDataService } from './../../shared/grobal.service';
import { Item } from './../../shared/item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../shared/data.service';
import { HeritageService } from './../../shared/heritage.service';
import { MasterCategory } from './../../shared/mastercategory.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
@Injectable()
export class Step1Component implements OnInit {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  titleList: MasterCategory[];
  subscription: Subscription;
  item: Item;
  itemForm: FormGroup;

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  constructor(private heritageService: HeritageService, private dataService: DataService, private router: Router, private route: ActivatedRoute, private gd: GrobalDataService) {
    this.stateCtrl = new FormControl();
    this.initForm();
    this.subscription = this.heritageService.masterCategoryChanged
      .subscribe(
      (masterCategories: MasterCategory[]) => {
        this.titleList = masterCategories;

        this.filteredStates = this.stateCtrl.valueChanges
          .startWith(null)
          .map(masterCategory => masterCategory ? this.filterStates(masterCategory) : this.titleList.slice());

      });
    this.dataService.getMasterCategories();

  }
  filterStates(name: string) {
    return this.titleList.filter(masterCategory =>
      masterCategory.title.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  ngOnInit() {

  }
  private initForm() {
    let categoryId: number;
    let subCategoryId: number;

    this.itemForm = new FormGroup({
      'categoryId': new FormControl(categoryId, Validators.required),
      'subCategoryId': new FormControl({value: 0, disabled: true})
    });
  }

  onNextStep2() {
    this.gd.shareObj['saved1data'] = this.itemForm.value;
    this.router.navigate(['step-2']);
  }
}
