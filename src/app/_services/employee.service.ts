import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../models/Employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    getAllEmployees(includeBusyDays = false): Observable<Employee[]> {
        let params = new HttpParams();
        params = params.append('includeBusyDays', `${includeBusyDays}`);
        return this.http.get<Employee[]>(`${environment.apiUrl}api/account`, { params } );
    }

    saveEmployees(employee) {
        return this.http.post(`${environment.apiUrl}api/account`, employee);
    }

    getMyTrips(employeeId) {
        return this.http.get(`${environment.apiUrl}api/account/${employeeId}/trips`);
    }

    editEmployee(employee) {
        return this.http.put(`${environment.apiUrl}api/account/${employee.id}`, employee);
    }

    checkIfEmployeeFree(accountId, dateFrom, dateTo) {
        return this.http.get(`${environment.apiUrl}api/account/${accountId}/isAccountFree?dateStart=${dateFrom}&dateEnd=${dateTo}`);
    }
}
