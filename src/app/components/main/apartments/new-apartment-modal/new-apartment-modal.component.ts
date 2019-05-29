import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../../../_services/apartment.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-new-apartment-modal',
    templateUrl: './new-apartment-modal.component.html',
    styleUrls: ['./new-apartment-modal.component.css']
})
export class NewApartmentModalComponent implements OnInit {
    public addApartmentForm: FormGroup;
    public roomsList: FormArray;

    constructor(private apartmentService: ApartmentService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
    }

    public saveApartment() {
        const dto = this.addApartmentForm.value;
        this.apartmentService.saveApartment(dto)
            .subscribe(data => {
                //  TODO:
                console.log('successfully saved, show snackbar maybe?');
            });
    }

    addRoom() {
        this.roomsList.push(this.fb.group({
            number: [this.addApartmentForm.value.name + '-' + (this.roomsList.length + 1), Validators.required],
            capacity: [1, Validators.required],
        }));
    }

    removeRoom(i) {
        this.roomsList.removeAt(i);
    }

    private createForm() {
        this.addApartmentForm = this.fb.group({
            name: ['', Validators.required],
            // maxCapacity: ['', Validators.required],
            location: this.fb.group({
                country: ['', Validators.required],
                city: ['', Validators.required],
                address: ['', Validators.required],
            }),
            rooms: this.fb.array([])
        });

        this.roomsList = this.addApartmentForm.get('rooms') as FormArray;
    }
}
