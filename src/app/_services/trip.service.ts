import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    public tripRequests: any;

    constructor(private http: HttpClient) {
        this.tripRequests = new BehaviorSubject(null);
        this.getTripRequests();
    }

    getPossibleMerges(id: number): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${environment.apiUrl}api/trip/${id}/tripsForMerge`);
    }

    editTrip(trip): Observable<Trip[]> {
        return this.http.put<Trip[]>(`${environment.apiUrl}api/trip`, trip);
    }

    getMyOrganisedTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${environment.apiUrl}api/me/organizing`);
    }

    getMyTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${environment.apiUrl}api/me/trips`);
    }

    mergeTrips(id1, id2) {
        return this.http.post(
            `${environment.apiUrl}api/trip/merge/${id1}&${id2}`,
            null
        );
    }

    getTripById(id: number): Observable<Trip> {
        return this.http.get<Trip>(`${environment.apiUrl}api/trip/${id}`);
    }

    createTrip(trip): Observable<Trip> {
        return this.http.post<Trip>(`${environment.apiUrl}api/trip`, trip);
    }

    getTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${environment.apiUrl}api/trip`);
    }

    getTripsCsv() {
        return this.http.get<Blob>(`${environment.apiUrl}api/tripsInfo/csv`, {
            responseType: 'blob' as 'json'
        });
    }

    myPendingTripRequests() {
        return this.http.get(`${environment.apiUrl}api/me/pendingRequests`);
    }

    myPendingRequestsByTripId(id) {
        return this.http.get(`${environment.apiUrl}api/trip/requests/${id}`);
    }

    patchTripRequest(patchDto) {
        return this.http.patch(`${environment.apiUrl}api/trip/requests`, patchDto);
    }

    getTripRequests() {
        this.myPendingTripRequests().subscribe(data => {
            this.tripRequests.next(data);
        });
    }
}
