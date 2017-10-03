import { Subscription } from 'rxjs/Subscription';
import { DataService } from './../shared/data.service';
import { MasterCategory } from './../shared/mastercategory.model';
import { HeritageService } from './../shared/heritage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titleList: MasterCategory[];
  subscription: Subscription;

  constructor(private heritageService: HeritageService, private dataService: DataService) { }

  ngOnInit() {
    this.subscription = this.heritageService.masterCategoryChanged
      .subscribe(
      (masterCategories: MasterCategory[]) => {
        this.titleList = masterCategories;
      });
    this.dataService.getMasterCategories();
  }

}
