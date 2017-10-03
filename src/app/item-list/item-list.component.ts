import { GrobalDataService } from './../shared/grobal.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../shared/data.service';
import { Item } from './../shared/item.model';
import { HeritageService } from './../shared/heritage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareButton, ShareProvider } from 'ngx-sharebuttons';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[];
  subscription: Subscription;
  id: number;
  defaultImagePath: string;
  constructor(private router: Router, private route: ActivatedRoute, private heritageService: HeritageService, private dataService: DataService, private gd: GrobalDataService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        this.gd.shareObj['catid'] = this.id;
      });

    this.subscription = this.heritageService.itemChanged
      .subscribe(
      (items: Item[]) => {
        this.items = items;
        if (this.items[0].imgs!=null) {
          this.defaultImagePath = this.items[0].imgs[0].imagePath;
        } else {
          this.defaultImagePath = './assets/images/no_image_thumb.gif'
        }

      });
    this.dataService.getItems(this.id);
  }
  onSelectItem(index: number) {
    this.gd.shareObj['data'] = this.items.find(x => x.id == index)
    this.router.navigate(['/item', this.id]);
  }

}
