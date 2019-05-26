import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    public tripRequests: any;

    getMyOrganisedTrips(): Observable<Trip[]> {
        return this.http.get<Trip[]>(`${environment.apiUrl}api/me/trips`);
    }

    getTripById(id: number): Observable<Trip> {
        return this.http.get<Trip>(`${environment.apiUrl}api/trip/${id}`);
    }

    constructor(private http: HttpClient) {
        this.tripRequests = new BehaviorSubject(null);
        this.getTripRequests();
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

    uploadTripFile(tripId: number, file: any): Observable<void> {
        // Instantiate a FormData to store form fields and encode the file
        let body = new FormData();
        // Add file content to prepare the request
        body.append("file", file);
        return this.http.post<any>(`${environment.apiUrl}api/trip/${tripId}/addFile`, body, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: progress };
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            })
        );
    }
}
