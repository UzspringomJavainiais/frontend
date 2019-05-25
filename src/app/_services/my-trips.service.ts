import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class MyTripsService {

  constructor(private http: HttpClient) { }

  getMyTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${environment.apiUrl}api/me/trips`);
  }
}
