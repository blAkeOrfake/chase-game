import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    AngularFirestore
  ]
})
export class BasicModule { }
