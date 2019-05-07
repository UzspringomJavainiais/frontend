import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    getAllEmployees() {
        return this.http.get(`${environment.apiUrl}/api/account`);
    }

    saveEmployees(employee) {
        return this.http.post(`${environment.apiUrl}/api/account`, employee);
    }
}
