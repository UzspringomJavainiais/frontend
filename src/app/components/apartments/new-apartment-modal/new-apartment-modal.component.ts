import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../../_services/apartment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-new-apartment-modal',
    templateUrl: './new-apartment-modal.component.html',
    styleUrls: ['./new-apartment-modal.component.css']
})
export class NewApartmentModalComponent implements OnInit {
    public addApartmentForm: FormGroup;

    constructor(private apartmentService: ApartmentService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.addApartmentForm = this.fb.group({
            name: ['', Validators.required],
            maxCapacity: ['', Validators.required],
            locationId: ['', Validators.required]
        });
    }

    public saveApartment() {
        const dto = this.addApartmentForm.value;
        this.apartmentService.saveApartment(dto)
            .subscribe(data => {
                //  TODO:
                console.log('successfully saved, show snackbar maybe?');
            });
    }

}
