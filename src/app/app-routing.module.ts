import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import {AllApartmentsComponent} from './components/apartments/all-apartments/all-apartments.component';
import {AllEmployeesComponent} from './components/employes/all-employees/all-employees.component';
import {StatisticsComponent} from './components/statistics/statistics.component';

const routes: Routes = [
    { path: 'trips', component: TripsComponent },
    { path: 'trip-details/:id', component: TripDetailsComponent },
    { path: 'apartments', component: AllApartmentsComponent},
    { path: 'employees', component: AllEmployeesComponent},
    { path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
