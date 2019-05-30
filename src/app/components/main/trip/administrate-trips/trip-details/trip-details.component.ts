import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TripService} from '../../../../../_services/trip.service';
import {AuthService} from '../../../../../_services/auth.service';
import {Trip} from '../../../../../models/trip';

@Component({
    selector: 'app-trip-details',
    templateUrl: './trip-details.component.html',
    styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
    trip: any;
    possibleMerges: Trip[];

    constructor(
        private route: ActivatedRoute,
        private tripService: TripService,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tripService.getTripById(+params.id).subscribe(data => {
                this.trip = data;
                this.getPossibleMerges();
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
                this.router.navigate(['']);
            });
    }

    editTripDetails = () => {
        this.router.navigate(['/my-trips/edit', this.trip.id]);
    }

    getPossibleMerges() {
        this.tripService.getPossibleMerges(this.trip.id).subscribe(trips => {
            this.possibleMerges = trips;
        })
    }

    getSideBySideTrips(id) {
        this.router.navigate(['/merge-trips'], { queryParams: { tripId: this.trip.id, mergeId: id }});
    }

  }
