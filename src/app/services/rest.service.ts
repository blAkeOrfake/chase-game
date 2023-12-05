import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { ITrack, Track } from '../models/track.model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {

  selectedTrackSubject$: BehaviorSubject<Track | undefined> = new BehaviorSubject<Track | undefined>(undefined);

  get selectedTrack(): Track | undefined {
    return this.selectedTrackSubject$.getValue();
  }
  constructor(
    public afs: AngularFirestore) { }

    getTracks() {
      return this.afs.collection('tracks').snapshotChanges().pipe(map(track => {
        return track.map(a => {
          const data = a.payload.doc.data() as ITrack;
          const id = a.payload.doc.id;
          return { ...data };
        });
      }));
    }

    getTrack(trackId: string) {
      return this.getTracks().pipe(map(tracks => {
        return tracks.find(track => track.id === trackId);
      }));
      // return this.afs.collection('tracks').doc(id).snapshotChanges();
    }

    getSelectedTrack(): Observable<Track | undefined> {
      return this.selectedTrackSubject$.asObservable();
    }

    selectTrack(track: Track) {
      this.selectedTrackSubject$.next(track);
    }

    addTrack(track: Track) {
      const trackObj = { ...track };
      return this.afs.collection('tracks').add(trackObj);
    }
}
