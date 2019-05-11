import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getAllRoles() {
        return this.http.get(`${environment.apiUrl}api/role`);
    }

    saveRole(role) {
        return this.http.post(`${environment.apiUrl}api/role`, role);
    }
}
