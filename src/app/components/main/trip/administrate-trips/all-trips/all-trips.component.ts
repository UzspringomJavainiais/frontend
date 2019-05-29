import {Component, OnInit} from '@angular/core';
import {Trip} from '../../../../../models/trip';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TripService} from '../../../../../_services/trip.service';
import {EmployeeService} from '../../../../../_services/employee.service';
import {MergeTripsModalComponent} from '../merge-trips-modal/merge-trips-modal.component';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-all-trips',
    templateUrl: './all-trips.component.html',
    styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent implements OnInit {
    public trips: Trip[] = [];
    public myTrips = [];

    constructor(
        private router: Router,
        private matDialog: MatDialog,
        private tripService: TripService,
        private employeeService: EmployeeService
    ) {
    }

    ngOnInit() {
        this.tripService.getTrips().subscribe(data => (this.trips = data));

        this.employeeService
            .getMyTrips(2)
            .subscribe((data: any[]) => (this.myTrips = data));
    }

    getCsvData() {
        this.tripService.getTripsCsv().subscribe(data => {
            const blob = new Blob([data as any], {type: 'text/plain'});
            FileSaver.saveAs(blob, 'export.csv', false);
        });
    }

    getTripDetails = (id: number) => {
        this.router.navigate(['/trip-details', id]);
    };

    mergeTrips() {
        const matDialogRef = this.matDialog.open(MergeTripsModalComponent);
        matDialogRef.afterClosed().subscribe(data => {
            this.tripService.getTrips().subscribe((data) => (this.trips = data));
        });
    }

}
