import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GrobalDataService } from './../../shared/grobal.service';
import { Item } from './../../shared/item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css']
})
export class Step3Component implements OnInit {
  item: Item;
  item3Form: FormGroup;
  latitude: number;
  longitude: number;
  positionChanged = new Subject<number>();
  subscription: Subscription;
  constructor(private gd: GrobalDataService, private router: Router, private route: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit() {
    this.subscription = this.positionChanged
      .subscribe(
      (lat: number) => {
        this.initForm();
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        let location = position.coords;
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.positionChanged.next(this.latitude);
      });
    }

  }

  private initForm() {

    this.item3Form = new FormGroup({
      'latitude': new FormControl(this.latitude),
      'longitude': new FormControl(this.longitude)
    });
  }


  onNextStep4() {
    // this.item3Form = new FormGroup({
    //    'latitude': new FormControl(this.latitude),
    //    'longitude': new FormControl(this.longitude)
    //  });
    this.gd.shareObj['saved3data'] = this.item3Form.value;
    this.router.navigate(['step-4']);
  }

}
