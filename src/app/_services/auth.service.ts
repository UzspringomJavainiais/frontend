import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

    private loggedIn = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    login(username, password) {
        this.http.post(`${environment.apiUrl}api/auth/signin`, {username, password})
            .subscribe((data: any) => {
                    console.log(data);
                    this.loggedIn = true;
                    this.router.navigateByUrl('/trips');
                },
                () => console.log('error'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
        // if (this.isLoggedIn()) {
        //     return true;
        // } else {
        //     this.router.navigate(['auth', 'login']);
        //     return false;
        // }
    }

    checkMe() {
        return this.http.get(`${environment.apiUrl}api/auth/me`);
    }

    logout() {
        this.loggedIn = false;
        return this.http.get(`${environment.apiUrl}api/auth/logout`);
    }
}
