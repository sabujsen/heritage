import { GrobalDataService } from './../shared/grobal.service';
import { Subscription } from 'rxjs/Subscription';
import { Item } from './../shared/item.model';
import { HeritageService } from './../shared/heritage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  items: Item[];
  subscription: Subscription;
  id: number;
  paramid: number;
  latitude: number = 22.703989;
  longitude: number = 88.615723;
  mlatitude: number = this.latitude;
  mlongitude: number = this.longitude;
  locations: Location[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private heritageService: HeritageService, private dataService: DataService, private gd: GrobalDataService) { }

  ngOnInit() {
    this.paramid=this.gd.shareObj['catid'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
      });

    this.subscription = this.heritageService.itemChanged
      .subscribe(
      (items: Item[]) => {
        this.items = items;


        var iconBase = 'http://maps.google.com/mapfiles/kml/pal2/';
        var icons = {       
          info: {
            icon: iconBase + 'icon10.png'
          }
        };
        var locations =this.getLocations(this.items);

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(-33.92, 151.25),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
            map: map,
            icon: icons.info.icon,          
            title: locations[i].title
          });
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(locations[i].title);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

      });
    this.dataService.getItems(this.id);
  }

  getLocations(items: Item[]): Location[] {
    for (let i in items) {
      let location: Location;
      let zIndx: number = parseInt(i);
      location = { title: items[i].title, lat: items[i].latitude, lng: items[i].longitude, zIndex: zIndx };
      this.locations.push(location);
    }
    return this.locations;
  }
}
export class Location {
  constructor(
    public title: string,
    public lat: number,
    public lng: number,
    public zIndex: number
  ) { }
}
