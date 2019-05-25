import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TripsService} from 'src/app/trips.service';
import {TripService} from '../../../../_services/trip.service';
import {AuthService} from '../../../../_services/auth.service';

@Component({
    selector: 'app-trip-details',
    templateUrl: './trip-details.component.html',
    styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
    public trip: any;

    constructor(
        private route: ActivatedRoute,
        private tripsService: TripsService,
        private tripService: TripService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tripsService.getTripById(+params.id).subscribe(data => {
                this.trip = data;

            });
        });

        setTimeout(() => {
            this.getMyRequests();
        }, 2000);
    }

    getMyRequests() {
        if (!this.trip) { return []; }
        return this.trip.tripRequests.filter(request => request.account.email === this.authService.me.username && request.status === 'NEW');
    }

    acceptTripRequst(request) {
        this.tripService.patchTripRequest({tripRequestId: request.id, decision: 'CONFIRMED'})
            .subscribe(data => {
                console.log('accepted');
                this.tripService.getTripRequests();
                this.router.navigate(['/trips']);
            });
    }

    rejectTripRequest(request) {
        this.tripService.patchTripRequest({tripRequestId: request.id, decision: 'DECLINED'})
            .subscribe(data => {
                console.log('declined');
                this.tripService.getTripRequests();
                this.router.navigate(['/trips']);
            });
    }

}
