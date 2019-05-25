import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import {TripService} from '../../../_services/trip.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public me: any;
    public pendingRequests: any;

    constructor(private authService: AuthService,
                private tripService: TripService,
                private router: Router) {
    }

    ngOnInit() {
        this.checkMe();
        this.tripService.tripRequests
            .subscribe((data) => this.pendingRequests = data);
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
        if (!this.me || !this.me.roles) {
            return false;
        }
        return this.me.roles.findIndex(item => item === role) >= 0;
    }
}
