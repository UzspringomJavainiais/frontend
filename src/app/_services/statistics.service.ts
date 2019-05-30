import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {environment} from '../../environments/environment';
import {Moment} from 'moment';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    constructor(private http: HttpClient) {

    }

    getTripsByDuration() {
        return this.http.get(`${environment.apiUrl}api/statistics/orderByDuration/DESC`);
    }

    getTripsByPrice() {
        return this.http.get(`${environment.apiUrl}api/statistics/orderByPrice/DESC`);

    }

    getTripCountByEmployee() {
        return this.http.get(`${environment.apiUrl}api/statistics/tripCountByEmployee/DESC`);

    }

    getTripCountByPeriod(dateFrom: Moment, dateTo: Moment) {
        if (!dateFrom || !dateTo) {
            console.log('invalid dates');
            return;
        }

        return this.http.get(`${environment.apiUrl}api/statistics/tripCountByPeriod?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`);

    }

    getTripsByApartments() {
        return this.http.get(`${environment.apiUrl}api/statistics/tripCountByApartments/DESC`);
    }
}
