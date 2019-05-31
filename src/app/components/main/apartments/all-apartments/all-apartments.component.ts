import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../../../_services/apartment.service';
import {MatDialog} from '@angular/material';
import {NewApartmentModalComponent} from '../new-apartment-modal/new-apartment-modal.component';

@Component({
    selector: 'app-all-apartments',
    templateUrl: './all-apartments.component.html',
    styleUrls: ['./all-apartments.component.css']
})
export class AllApartmentsComponent implements OnInit {
    public apartments: any;

    constructor(private apartmentService: ApartmentService,
                private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.getApartments();
    }

    public openAddNewApartmentModal() {
        const matDialogRef = this.matDialog.open(NewApartmentModalComponent);
        matDialogRef.afterClosed()
            .subscribe(data => this.getApartments());
    }

    private getApartments() {
        this.apartmentService.getAllApartments()
            .subscribe(data => {
                this.apartments = data;
            });
    }
}
