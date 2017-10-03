import { Component, OnInit, Input } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() title: string;
  mlatitude: number = this.latitude;
  mlongitude: number = this.longitude;
  constructor() { }

  ngOnInit() {
    var myLatlng = new google.maps.LatLng(this.latitude, this.longitude);
    var iconBase = 'http://maps.google.com/mapfiles/kml/pal2/';
    var icons = {       
      info: {
        icon: iconBase + 'icon10.png'
      }
    };
    var mapProp = {
      center: myLatlng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      icon: icons.info.icon,      
      title: this.title
    });
    marker.setMap(map);
  }
  //22.703989 88.615723
}
