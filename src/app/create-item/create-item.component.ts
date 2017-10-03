import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onNext() {

    this.router.navigate(['step-1']);
  }
}
