import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITrip } from "./trip";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TripsService {
  private _url: string = "http://localhost:8080/api/trip";

  constructor(private http: HttpClient) {}

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this._url);
  }
}
