import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TripsComponent} from './components/trips/trips.component';
import {TripDetailsComponent} from './components/trip-details/trip-details.component';
import {MyTripsComponent} from './components/my-trips/my-trips.component';
import {TripsService} from './trips.service';
import {HttpClientModule} from '@angular/common/http';
import {AllApartmentsComponent} from './components/apartments/all-apartments/all-apartments.component';
import {ApartmentInfoComponent} from './components/apartments/apartment-info/apartment-info.component';
import {NewApartmentModalComponent} from './components/apartments/new-apartment-modal/new-apartment-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TripsComponent,
        TripDetailsComponent,
        MyTripsComponent,
        AllApartmentsComponent,
        ApartmentInfoComponent,
        NewApartmentModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [TripsService],
    bootstrap: [AppComponent],
    entryComponents: [NewApartmentModalComponent]
})
export class AppModule {
}
