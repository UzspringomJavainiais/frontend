import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../../_services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: any;
    password: any;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private authService: AuthService) {
    }

    ngOnInit() {
    }

    onLogin() {
        this.authService.login(this.username, this.password);
    }
}
