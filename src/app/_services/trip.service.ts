import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment';
import { Trip } from "../models/trip";

@Injectable({
  providedIn: "root"
})
export class TripService {

  constructor(private http: HttpClient) {}

  createTrip(trip): Observable<Trip> {
    console.log(trip);
    return this.http.post<Trip>(`${environment.apiUrl}api/trip`, trip);
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.apiUrl}api/trip`);
  }

  getMyOrganisedTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.apiUrl}api/me/trips`);
  }

  getTripById(id: number):Observable<Trip> {
    return this.http.get<Trip>(`${environment.apiUrl}api/trip/${id}`);
  }
}
