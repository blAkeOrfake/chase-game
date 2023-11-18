import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ActivatedRoute } from '@angular/router';
import { WaypointService } from '../services/waypoint.service';
import { MapPoint } from '../models/mapPoint.model';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from "../components/map/map.component";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent, LeafletModule, MapComponent]
})
export class Tab2Page implements OnInit {
  waypointIndex?: number;
  waypoint?: MapPoint;

  constructor(
    private waypointService: WaypointService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(params => {

      const pointId = (params.get('id'));

      if (!pointId) return;

      this.waypointService.getWaypoint(+pointId).subscribe(waypoint => {
        this.waypoint = waypoint;

        console.log('got waypoint', waypoint);
      });
    });
  }
}
