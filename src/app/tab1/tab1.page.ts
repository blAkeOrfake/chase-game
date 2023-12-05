import { WaypointService } from './../services/waypoint.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MapPoint } from '../models/mapPoint.model';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { RestService } from '../services/rest.service';
import { Track } from '../models/track.model';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BasicModule } from '../basic/basic.module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, ExploreContainerComponent, CommonModule, BasicModule],
})
export class Tab1Page implements OnInit{
  mapPoints$: Observable<MapPoint[]> = this.waypointService.getWaypoints();
  trackSelected = false;

  printCurrentLocation = async() => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.waypointService.currentPosition = coordinates;
    console.log('Current position:', coordinates);
  };

  constructor(
    private waypointService: WaypointService,
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('currentLocation: ', this.printCurrentLocation());

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/tabs/tab1')) {
        this.trackSelected = !!this.restService.selectedTrack;

      }
    });
  }

  // addTracks() {
  //   const track1 = new Track({
  //     id: "1",
  //     name: "Trasa 1",
  //     description: "Trasa po centrum miasta",
  //     waypoints: [
  //       { name: "Rynek", latitude: 49.822498, longitude: 19.044775, shortName: "Rynek - Rozpocznij trasę na centralnym placu miasta" },
  //       { name: "Plac Wolności", latitude: 49.819932, longitude: 19.045440, shortName: "Plac Wolności - Przejdź na północ od Rynku" },
  //       { name: "Park Słowackiego", latitude: 49.818464, longitude: 19.046385, shortName: "Park Słowackiego - Znajduje się na południowy zachód od Placu Wolności" },
  //       { name: "Muzeum Historyczne", latitude: 49.823337, longitude: 19.034801, shortName: "Muzeum - Idź na wschód od Parku Słowackiego" },
  //       { name: "Wzgórze Zamkowe", latitude: 49.825112, longitude: 19.054525, shortName: "Wzgórze Zamkowe - Zakończ trasę na wzgórzu na północny zachód od centrum" },
  //     ],
  //   });
  //   const track2 = new Track({
  //     id: "2",
  //     name: "Trasa 2",
  //     description: "Trasa przez parki i tereny zielone",
  //     waypoints: [
  //       { name: "Park Julianowski", latitude: 49.824503, longitude: 19.040302, shortName: "Park Julianowski - Rozpocznij trasę od północnego wschodu Parku Słowackiego" },
  //       { name: "Park Leśny", latitude: 49.817776, longitude: 19.036834, shortName: "Park Leśny - Kieruj się na południowy zachód w kierunku Parku Broniewskiego" },
  //       { name: "Park Broniewskiego", latitude: 49.818943, longitude: 19.051643, shortName: "Park Broniewskiego - Przejdź na północny zachód od Parku Leśnego" },
  //       { name: "Skwer Kościuszki", latitude: 49.820811, longitude: 19.032910, shortName: "Skwer Kościuszki - Znajduje się na południowy wschód od Parku Broniewskiego" },
  //       { name: "Park Zamkowy", latitude: 49.827077, longitude: 19.044136, shortName: "Park Zamkowy - Zakończ trasę na północ od centrum miasta" },
  //     ],
  //   });
  //   const track3 = new Track({
  //     id: "3",
  //     name: "Trasa 3",
  //     description: "Trasa po okolicznych wzgórzach",
  //     waypoints: [
  //       { name: "Wzgórze św. Stanisława", latitude: 49.833109, longitude: 19.045619, shortName: "Wzgórze św. Stanisława - Rozpocznij trasę na północ od centrum miasta" },
  //       { name: "Wzgórze Szyndzielnia", latitude: 49.809731, longitude: 19.045322, shortName: "Wzgórze Szyndzielnia - Kieruj się na północny wschód" },
  //       { name: "Wzgórze Walońskie", latitude: 49.827542, longitude: 19.059944, shortName: "Wzgórze Walońskie - Przejdź na zachód od Wzgórza Szyndzielnia" },
  //       { name: "Wzgórze Wawrzacz", latitude: 49.837655, longitude: 19.033912, shortName: "Wzgórze Wawrzacz - Kieruj się na południowy wschód" },
  //       { name: "Wzgórze Chrobrego", latitude: 49.815971, longitude: 19.034480, shortName: "Wzgórze Chrobrego - Zakończ trasę na południowy zachód od centrum miasta" },
  //     ],
  //   });
  //   // this.restService.addTrack(track3);
  // }


}
