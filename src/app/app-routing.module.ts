import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';

const routes: Routes = [
    { path: "trips", component: TripsComponent },
    { path: "trip-details/:id", component: TripDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
