import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripsComponent} from './components/main/trip/trips/trips.component';
import {TripDetailsComponent} from './components/main/trip/trip-details/trip-details.component';
import {AllApartmentsComponent} from './components/main/apartments/all-apartments/all-apartments.component';
import {AllEmployeesComponent} from './components/main/employees/all-employees/all-employees.component';
import {StatisticsComponent} from './components/main/statistics/statistics.component';
import {NewTripComponent} from './components/main/trip/new-trip/new-trip.component';
import {RolesComponent} from './components/main/employees/roles/roles.component';
import {LoginComponent} from './components/auth/login/login.component';
import {MainComponent} from './components/main/main.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthService} from './_services/auth.service';
import { MyTripsComponent } from './components/main/trip/my-trips/my-trips.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [AuthService], children: [
            {path: '', component: TripsComponent},
            {path: 'my-trips', component: MyTripsComponent},
            {path: 'trips', component: TripsComponent},
            {path: 'trip-details/:id', component: TripDetailsComponent},
            {path: 'trips/new', component: NewTripComponent},
            {path: 'apartments', component: AllApartmentsComponent},
            {path: 'employees', component: AllEmployeesComponent},
            {path: 'roles', component: RolesComponent},
            {path: 'statistics', component: StatisticsComponent},
        ]
    },
    {
        path: 'auth', children: [

            {path: '', component: LoginComponent, pathMatch: 'full'},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
