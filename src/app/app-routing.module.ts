import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripDetailsComponent} from './components/main/trip/administrate-trips/trip-details/trip-details.component';
import {AllApartmentsComponent} from './components/main/apartments/all-apartments/all-apartments.component';
import {AllEmployeesComponent} from './components/main/employees/all-employees/all-employees.component';
import {StatisticsComponent} from './components/main/statistics/statistics.component';
import {NewTripComponent} from './components/main/trip/administrate-trips/new-trip/new-trip.component';
import {LoginComponent} from './components/auth/login/login.component';
import {MainComponent} from './components/main/main.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthService} from './_services/auth.service';
import { MyTripsComponent } from './components/main/trip/my-trips/my-trips.component';
import { MyOrganisedTripsComponent } from './components/main/trip/administrate-trips/my-organised-trips/my-organised-trips.component';
import { EditTripComponent } from './components/main/trip/administrate-trips/edit-trip/edit-trip.component';
import {AdministrateTripsComponent} from './components/main/trip/administrate-trips/administrate-trips.component';
import { AddAttachmentsComponent } from './components/main/trip/administrate-trips/new-trip/add-attachments/add-attachments.component';

const routes: Routes = [
    {
        path: '', component: MainComponent, canActivate: [AuthService], children: [
            {path: '', component: MyTripsComponent},

            {path: 'my-trips', component: MyTripsComponent},
            {path: 'my-trips/new', component: NewTripComponent},
            {path: 'my-trips/edit/:id', component: EditTripComponent},
            {path: 'my-trips/add-attachments/:id', component: AddAttachmentsComponent},

            {path: 'administrate-trips', component: AdministrateTripsComponent},
            {path: 'apartments', component: AllApartmentsComponent},
            {path: 'employees', component: AllEmployeesComponent},
            {path: 'statistics', component: StatisticsComponent},


            {path: 'trip-details/:id', component: TripDetailsComponent},

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
