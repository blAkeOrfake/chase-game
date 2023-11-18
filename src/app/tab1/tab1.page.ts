import { WaypointService } from './../services/waypoint.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MapPoint } from '../models/mapPoint.model';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab1Page {
  mapPoints$: Observable<MapPoint[]> = this.waypointService.getWaypoints();

  printCurrentLocation = async() => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.waypointService.currentPosition = coordinates;
    console.log('Current position:', coordinates);
  };

  constructor(
    private waypointService: WaypointService,
    private route: ActivatedRoute
  ) {
    console.log('currentLocation: ', this.printCurrentLocation());
  }


}
