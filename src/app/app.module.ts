import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TripsComponent,
        TripDetailsComponent,
      ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
