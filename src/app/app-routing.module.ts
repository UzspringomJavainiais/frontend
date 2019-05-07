import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from './components/trip/trips/trips.component';
import { TripDetailsComponent } from './components/trip/trip-details/trip-details.component';
import {AllApartmentsComponent} from './components/apartments/all-apartments/all-apartments.component';
import {AllEmployeesComponent} from './components/employes/all-employees/all-employees.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {NewTripComponent} from './components/trip/new-trip/new-trip.component';

const routes: Routes = [
    { path: 'trips', component: TripsComponent },
    { path: 'trip-details/:id', component: TripDetailsComponent },
    { path: 'trips/new', component: NewTripComponent },
    { path: 'apartments', component: AllApartmentsComponent},
    { path: 'employees', component: AllEmployeesComponent},
    { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
