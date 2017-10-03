import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from './../../shared/item.model';
import { GrobalDataService } from './../../shared/grobal.service';
import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
@Injectable()
export class Step2Component implements OnInit {
  item: Item;
  titleCtrl: FormControl;
  addressCtrl: FormControl;
  landmarkCtrl: FormControl;
  shoertCtrl: FormControl;
  descriptionCtrl: FormControl;

  item2Form: FormGroup;

  constructor(private gd: GrobalDataService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.item = this.gd.shareObj['saveddata'];
    this.initForm();
  }
  private initForm() {
    let title='';
    let address='';
    let landmark='';
    let shortDescription='';
    let description='';

    this.item2Form = new FormGroup({
     
      'title': new FormControl(title, Validators.required),
      'address': new FormControl(address),
      'landmark': new FormControl(landmark),
      'shortDescription': new FormControl(shortDescription),
      'description': new FormControl(description)
    });
  }

  onNextStep3() {

    //this.item.title = this.titleCtrl.value;
    //this.item.address = this.addressCtrl.value;
    //this.item.landmark = this.landmarkCtrl.value;
    //this.item.shortDescription = this.shoertCtrl.value;
    //this.item.description = this.descriptionCtrl.value;

    this.gd.shareObj['saved2data'] = this.item2Form.value;

    //this.gd.shareObj['saveddata'] = this.item;
    this.router.navigate(['step-3']);
  }
}
