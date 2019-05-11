import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorization = this.cookieService.get('Authorization');
        if (authorization) {
            request = request.clone({
                headers: new HttpHeaders({Authorization: authorization})
            });
        }
        return next.handle(request);
    }
}
