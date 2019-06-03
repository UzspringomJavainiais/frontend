import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscriber} from 'rxjs';
import {Trip} from '../models/trip';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CheckListItemWithAttachment } from '../components/main/trip/administrate-trips/new-trip/add-attachments/add-attachments.component';

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

    uploadTripFile(tripId: number, checkListItemWithAttachment: CheckListItemWithAttachment, fila): Observable<any> {

        // return this.fileToString(checkListItemWithAttachment.attachment)
        // .pipe(
        //     map((fileAsString) => {

        return this.http.post<any>(`${environment.apiUrl}api/checklist-item`, {
            name: checkListItemWithAttachment.name,
            price: checkListItemWithAttachment.price,
            tripId: tripId,
            checked: checkListItemWithAttachment.attachment !== null,
            // attachment: {
            //     // fileName: checkListItemWithAttachment.attachment.name,
            //     // fileData: fila,
            // }
        });
        //     })
        // );
    }

    private fileToString(file: File): Observable<string> {
        return Observable.create(
            (sub: Subscriber<string>): void => {
                const r = new FileReader;
                // if success
                r.onload = (ev: ProgressEvent): void => {
                    sub.next((ev.target as any).result);
                };
                // if failed
                r.onerror = (ev): void => {
                    sub.error(ev);
                };
                r.readAsText(file);
            }
        );
    }
}
