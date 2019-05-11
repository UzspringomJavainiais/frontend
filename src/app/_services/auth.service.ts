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

    public loggedIn = false;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    login(username, password) {
        this.http.post(`${environment.apiUrl}/api/auth/signin`, {username, password})
            .subscribe((data: any) => {
                    this.cookieService.set('Authorization', data.token);
                    this.loggedIn = true;
                    this.router.navigateByUrl('/trips');
                },
                () => console.log('error'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('can activate?: ', this.isLoggedIn());
        if (this.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['auth', 'login']);
            return false;
        }
    }

    checkMe() {
        return this.http.get(`${environment.apiUrl}/api/auth/me`);
    }
}
