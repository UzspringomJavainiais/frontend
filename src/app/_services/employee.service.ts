import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../models/Employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${environment.apiUrl}api/account`);
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

}
