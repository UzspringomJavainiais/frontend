import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import {AllApartmentsComponent} from './components/apartments/all-apartments/all-apartments.component';

const routes: Routes = [
    { path: "trips", component: TripsComponent },
    { path: "trip-details/:id", component: TripDetailsComponent },
    { path: "apartments", component: AllApartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
