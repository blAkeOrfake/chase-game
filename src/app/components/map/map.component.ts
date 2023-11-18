import { CommonModule } from '@angular/common';
import { WaypointService } from './../../services/waypoint.service';
import { AfterContentInit, AfterViewInit, Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { MapPoint } from 'src/app/models/mapPoint.model';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [LeafletModule, CommonModule]
})
export class MapComponent implements OnInit, AfterContentInit {
  viewInited = false;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  initialWaypoint: MapPoint | undefined;
  options: Leaflet.MapOptions = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 49.804355, lng: 19.051291 }
  }

  allWaypoints: MapPoint[] = [];

  // fitBounds: any = null;
// circle = Leaflet.circle([ 46.95, -122 ], { radius: 5000 });

  @Input() mapPoint: MapPoint | undefined;
    // if (!data) return;
    // console.log('new mappoint', data);
    // const marker = this.generateMarker(data, this.markers.length - 1);
    // // marker.addTo(this.map).bindPopup(`<b>${data.latitude},  ${data.longitude}</b>`);
    // this.map.panTo({ lat: data.latitude, lng: data.longitude });
    // this.markers.push(marker);

  constructor(
    private waypointService: WaypointService,
    private zone: NgZone
  ) {
    const pos = this.waypointService.getCurrentPosition();
    const waypoint = pos ? { lat: pos.coords.latitude, lng: pos.coords.longitude } : { lat: 49.804355, lng: 19.051291 };
    this.options.center = waypoint;
    // this.markers.push(Leaflet.marker(waypoint, { draggable: true }));
  }


  ngOnInit(): void {

    this.waypointService.getWaypoints().subscribe(waypoints => {
      this.allWaypoints = waypoints;
    });
    // this.circle.on('add', () => {

    //   // But, we can run stuff inside of Angular's zone by calling NgZone.run()
    //   // everything inside the arrow function body happens inside of Angular's zone, where changes will be detected
    //   this.zone.run(() => {
    //     this.fitBounds = this.circle.getBounds();
    //   });

    // });

    // this.refreshMap();
  }

  ngAfterContentInit(): void {
    console.log('ngAfterViewInit');
    this.viewInited = true;
    // this.initMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngonchanges', changes);
    if (changes['mapPoint'].currentValue) {
      this.initialWaypoint = changes['mapPoint'].currentValue;
      console.log('initial waypoint set', this.initialWaypoint);
      // this.initMarkers(changes['mapPoint'].currentValue);
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  initMarkers() {
    const initialMarkers: { position: { lat: number, lng: number}, name: string, draggable: boolean}[] = (this.initialWaypoint ? [this.initialWaypoint] : this.allWaypoints).map(x => {
      return {
        position: { lat: x.latitude, lng: x.longitude },
        name: x.name,
        draggable: true
      }
    });
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<p>${data.name}</p><b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      console.log('adding marker', data);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;

    setTimeout(() => {
      this.refreshMap();
      this.initMarkers();

    }, 100);
    console.log('mapready', this.map);
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }


  refreshMap() {
    console.log('map fn run');

    if (this.map) {
      console.log('map refreshing');
      // this.streetMaps.redraw();
      this.map.invalidateSize();
    }
  }


  // add market

  /*
    const data = {
    position: { lat: 28.625043, lng: 79.810135 },
    draggable: true
  }
    const marker = this.generateMarker(data, this.markers.length - 1);
    marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    this.markers.push(marker);
  */

  // remove marker

  /*
  this.map.removeLayer(this.markers[index])
this.markers.splice(index, 1)
*/

// update marker

/*
this.markers[index].setLatLng({ lat: 28.625043, lng: 79.810135 });

*/
}
