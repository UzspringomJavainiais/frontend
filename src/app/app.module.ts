import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TripsComponent} from './components/trip/trips/trips.component';
import {TripDetailsComponent} from './components/trip/trip-details/trip-details.component';
import {MyTripsComponent} from './components/my-trips/my-trips.component';
import {TripsService} from './trips.service';
import {HttpClientModule} from '@angular/common/http';
import {AllApartmentsComponent} from './components/apartments/all-apartments/all-apartments.component';
import {ApartmentInfoComponent} from './components/apartments/apartment-info/apartment-info.component';
import {NewApartmentModalComponent} from './components/apartments/new-apartment-modal/new-apartment-modal.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AllEmployeesComponent} from './components/employees/all-employees/all-employees.component';
import {NewEmployeeModalComponent} from './components/employees/new-employee-modal/new-employee-modal.component';
import {EmployeeInfoComponent} from './components/employees/employee-info/employee-info.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {ChartsModule} from 'ng2-charts';
import {NewTripComponent} from './components/trip/new-trip/new-trip.component';
import {RolesComponent} from './components/employees/roles/roles.component';
import {NewRoleModalComponent} from './components/employees/new-role-modal/new-role-modal.component';

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
        NewRoleModalComponent
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
    providers: [TripsService],
    bootstrap: [AppComponent],
    entryComponents: [
        NewApartmentModalComponent,
        NewEmployeeModalComponent,
        NewRoleModalComponent]
})
export class AppModule {
}
