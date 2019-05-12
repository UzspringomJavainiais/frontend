import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TripsComponent } from "../components/main/trip/trips/trips.component";
import { TripDetailsComponent } from "../components/main/trip/trip-details/trip-details.component";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from '../app.component';

const appRoutes: Routes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "trip", component: TripsComponent },
  { path: "trip-details", component: TripDetailsComponent }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
