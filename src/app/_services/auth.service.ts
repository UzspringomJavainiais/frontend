import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';
import {TripService} from './trip.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public me: any;
    constructor(private http: HttpClient,
                private router: Router,
                private tripService: TripService) {
    }

    login(username, password) {
        this.http.post(`${environment.apiUrl}api/auth/signin`, {username, password})
            .subscribe((data: any) => {
                    this.router.navigateByUrl('');
                    this.tripService.getTripRequests();
                },
                () => console.log('error'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    checkMe() {
        return this.http.get(`${environment.apiUrl}api/me`).pipe(tap((data) => {
            this.me = data;
        }));
    }

    logout() {
        return this.http.post(`${environment.apiUrl}api/auth/logout`, null);
    }

    haveRole(role) {
        if (!this.me || !this.me.roles) {
            return false;
        }
        return this.me.roles.findIndex(item => item === role) >= 0;
    }
}
