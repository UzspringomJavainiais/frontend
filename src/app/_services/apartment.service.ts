import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApartmentService {

    constructor(private http: HttpClient) {
    }

    getAllApartments() {
        return this.http.get(`${environment.apiUrl}api/apartment`);
    }

    saveApartment(apartment) {
        return this.http.post(`${environment.apiUrl}api/apartment`, apartment);
    }
}
