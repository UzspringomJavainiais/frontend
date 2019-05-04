import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITrip } from "./trip";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TripsService {
  private _url: string = "/assets/mocks/trips.json";

  constructor(private http: HttpClient) {}

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this._url);
  }
}
