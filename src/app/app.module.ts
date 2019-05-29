import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './components/main/navbar/navbar.component';
import {AdministrateTripsComponent} from './components/main/trip/administrate-trips/administrate-trips.component';
import {TripDetailsComponent} from './components/main/trip/administrate-trips/trip-details/trip-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AllApartmentsComponent} from './components/main/apartments/all-apartments/all-apartments.component';
import {ApartmentInfoComponent} from './components/main/apartments/apartment-info/apartment-info.component';
import {NewApartmentModalComponent} from './components/main/apartments/new-apartment-modal/new-apartment-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllEmployeesComponent} from './components/main/employees/all-employees/all-employees.component';
import {NewEmployeeModalComponent} from './components/main/employees/new-employee-modal/new-employee-modal.component';
import {StatisticsComponent} from './components/main/statistics/statistics.component';
import {ChartsModule} from 'ng2-charts';
import {NewTripComponent} from './components/main/trip/administrate-trips/new-trip/new-trip.component';
import {NewRoleModalComponent} from './components/main/employees/new-role-modal/new-role-modal.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {TokenInterceptor} from './_interceptors/req.interceptor';
import {RegisterComponent} from './components/auth/register/register.component';
import {MainComponent} from './components/main/main.component';
import {EmployeeEditModalComponent} from './components/main/employees/employee-edit-modal/employee-edit-modal.component';
import {MyOrganisedTripsComponent} from './components/main/trip/administrate-trips/my-organised-trips/my-organised-trips.component';
import {MyTripsComponent} from './components/main/trip/my-trips/my-trips.component';
import {MergeTripsModalComponent} from './components/main/trip/administrate-trips/merge-trips-modal/merge-trips-modal.component';
import {EditTripComponent} from './components/main/trip/administrate-trips/edit-trip/edit-trip.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { AllTripsComponent } from './components/main/trip/administrate-trips/all-trips/all-trips.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TripDetailsComponent,
        AllApartmentsComponent,
        ApartmentInfoComponent,
        NewApartmentModalComponent,
        AllEmployeesComponent,
        NewEmployeeModalComponent,
        StatisticsComponent,
        NewTripComponent,
        NewRoleModalComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        MainComponent,
        EmployeeEditModalComponent,
        MyOrganisedTripsComponent,
        MyTripsComponent,
        MergeTripsModalComponent,
        EditTripComponent,
        AllTripsComponent,
        AdministrateTripsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule
    ],
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                width: 900,
                hasBackdrop: true,
                disableClose: false
            }
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        NewApartmentModalComponent,
        NewEmployeeModalComponent,
        NewRoleModalComponent,
        EmployeeEditModalComponent,
        MergeTripsModalComponent
    ]
})
export class AppModule {
}
