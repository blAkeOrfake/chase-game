import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { MapPoint } from '../models/mapPoint.model';
import { Observable, map, of } from 'rxjs';
import { Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class WaypointService {
  // this service is handling waypoints. It has a method to get all waypoints and a method to get a single waypoint by id
  // Also, it keeps track of current route state - so which waypoint has been visited and which is the next one.
  // This is a very simple implementation, but it will do for our purposes.
    // private waypoints: MapPoint[] = [
    //   new MapPoint({name: 'Muzeum Miasta Bielska-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Muzeum'}),
    //   new MapPoint({name: 'Szyndzielnia', latitude: 49.7508, longitude: 18.9947, shortName: 'Góra'}),
    //   new MapPoint({name: 'Zamek książąt cieszyńskich', latitude: 49.7477, longitude: 18.6349, shortName: 'Zamek'}),
    //   new MapPoint({name: 'Muzeum Kolejnictwa w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Muzeum'}),
    //   new MapPoint({name: 'Teatr Lalek i Aktora w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Teatr'}),
    //   new MapPoint({name: 'Centrum Kultury w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Centrum Kultury'}),
    //   new MapPoint({name: 'Muzeum Historyczne w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Muzeum'}),
    //   new MapPoint({name: 'Park Miejski w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Park'}),
    //   new MapPoint({name: 'Katedra św. Mikołaja w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Katedra'}),
    //   new MapPoint({name: 'Stare Miasto w Bielsku-Białej', latitude: 49.8228, longitude: 19.0445, shortName: 'Stare Miasto'})
    // ];

    private get waypoints(): MapPoint[] {
      return localStorage.getItem('waypoints') ? JSON.parse(localStorage.getItem('waypoints') || '') : [];
    }
    private set waypoints(waypoints: MapPoint[]) {
      localStorage.setItem('waypoints', JSON.stringify(waypoints));
    }
    private currentRouteState = {
      currentWaypoint: 0,
      nextWaypoint: 1
    };

    currentPosition: Position | undefined;

    constructor(
      private restService: RestService
    ) { }

    getCurrentPosition(): Position | undefined {
      return this.currentPosition;
    }

    getWaypoints(): Observable<MapPoint[]> {
      return this.restService.getSelectedTrack().pipe(map(track => {
        return track?.waypoints || [];
      }));
    }

    getWaypoint(index: number) {
      return this.restService.getSelectedTrack().pipe(map(x => {
        return x?.waypoints[index];
      }));
    }

    getCurrentRouteState() {
      return this.currentRouteState;
    }

    refreshWaypointsFromServer() {

    }
}
