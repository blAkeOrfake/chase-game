import { RestService } from './../services/rest.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { Track } from '../models/track.model';
import { BasicModule } from '../basic/basic.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab3Page {
  tracks$: Observable<Track[]> = this.restService.getTracks();
  lastTrack: Track | undefined;
  selectedTrack$: Observable<Track | undefined> = this.restService.getSelectedTrack().pipe(map(track => {
    if (track) {
      this.lastTrack = track;
    }
    return track;
  }));
  constructor(
    private restService: RestService,
  ) {}

  selectTrack(track: Track) {
    this.restService.selectTrack(track);
  }

  isTrackSelected(track: Track): boolean {
    return track.id === this.lastTrack?.id;
  }
}
