import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    url = 'http://localhost:8080/api/trip';

    public tripRequests: any;

    constructor(private http: HttpClient) {
        this.tripRequests = new BehaviorSubject(null);
        this.getTripRequests();
    }

    createTrip(trip): Observable<Trip> {
        console.log(trip);
        return this.http.post<Trip>(this.url, trip);
    }

    getTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.url);
    }

    getTripsCsv() {
        return this.http.get<Blob>(`${environment.apiUrl}api/tripsInfo/csv`, {responseType: 'blob' as 'json'});
    }

    myPendingTripRequests() {
        return this.http.get(`${environment.apiUrl}api/myPendingRequests`);
    }

    myPendingRequestsByTripId(id) {
        return this.http.get(`${environment.apiUrl}api/tripRequests/${id}`);
    }

    patchTripRequest(patchDto) {
        return this.http.patch(`${environment.apiUrl}api/tripRequests`, patchDto);
    }

    getTripRequests() {
        this.myPendingTripRequests()
            .subscribe(data => {
                this.tripRequests.next(data);
            });
    }


}
