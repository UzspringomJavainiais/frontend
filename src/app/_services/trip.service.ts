import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Trip } from "../models/trip";

@Injectable({
  providedIn: "root"
})
export class TripService {
  url = "http://localhost:8080/api/trip";

  constructor(private http: HttpClient) {}

  createTrip(trip): Observable<Trip> {
    console.log(trip);
    return this.http.post<Trip>(this.url, trip);
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }
}
