import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    url = '/api/trip';

    constructor(private http: HttpClient) {
    }

    createTrip(trip): Observable<Trip> {
        return this.http.post<Trip>(this.url, trip);
    }
}
