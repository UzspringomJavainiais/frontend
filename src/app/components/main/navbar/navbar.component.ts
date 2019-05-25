import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public me: any;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.checkMe();
    }

    checkMe() {
        this.authService.checkMe()
            .subscribe(data => this.me = data);
    }

    logout() {
        this.authService.logout()
            .subscribe(data => {
                    this.router.navigateByUrl('auth');
                },
                () => this.router.navigateByUrl('auth')
            );
    }

    haveRole(role) {
        if (!this.me || !this.me.roles) { return false; }
        return this.me.roles.findIndex(item => item === role) >= 0;
    }
}
