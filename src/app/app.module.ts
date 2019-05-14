import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './components/main/navbar/navbar.component';
import {TripsComponent} from './components/main/trip/trips/trips.component';
import {TripDetailsComponent} from './components/main/trip/trip-details/trip-details.component';
import {MyTripsComponent} from './components/main/my-trips/my-trips.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AllApartmentsComponent} from './components/main/apartments/all-apartments/all-apartments.component';
import {ApartmentInfoComponent} from './components/main/apartments/apartment-info/apartment-info.component';
import {NewApartmentModalComponent} from './components/main/apartments/new-apartment-modal/new-apartment-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllEmployeesComponent} from './components/main/employees/all-employees/all-employees.component';
import {NewEmployeeModalComponent} from './components/main/employees/new-employee-modal/new-employee-modal.component';
import {EmployeeInfoComponent} from './components/main/employees/employee-info/employee-info.component';
import {StatisticsComponent} from './components/main/statistics/statistics.component';
import {ChartsModule} from 'ng2-charts';
import {NewTripComponent} from './components/main/trip/new-trip/new-trip.component';
import {RolesComponent} from './components/main/employees/roles/roles.component';
import {NewRoleModalComponent} from './components/main/employees/new-role-modal/new-role-modal.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {TokenInterceptor} from './_interceptors/req.interceptor';
import {RegisterComponent} from './components/auth/register/register.component';
import {MainComponent} from './components/main/main.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TripsComponent,
        TripDetailsComponent,
        MyTripsComponent,
        AllApartmentsComponent,
        ApartmentInfoComponent,
        NewApartmentModalComponent,
        AllEmployeesComponent,
        NewEmployeeModalComponent,
        EmployeeInfoComponent,
        StatisticsComponent,
        NewTripComponent,
        RolesComponent,
        NewRoleModalComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        MainComponent
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
    providers: [CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        NewApartmentModalComponent,
        NewEmployeeModalComponent,
        NewRoleModalComponent]
})
export class AppModule {
}
