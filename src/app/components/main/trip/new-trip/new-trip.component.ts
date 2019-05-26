import {Component, OnInit} from '@angular/core';
import {TripService} from 'src/app/_services/trip.service';
import {Trip} from '../../../../models/trip';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable, of, forkJoin } from 'rxjs';

@Component({
    selector: 'app-new-trip',
    templateUrl: './new-trip.component.html',
    styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
    public employees;

    item: any = {name: null, isChecked: null, price: null};

    public tripForm: FormGroup;
    public checklistItemsList: FormArray;
    public accountsList: FormArray;

    public uploader: FileUploader = new FileUploader({
        isHTML5: true
    });
    title: string = 'Angular File Upload';

    constructor(private tripService: TripService,
                private employeeService: EmployeeService,
                private router: Router,
                private fb: FormBuilder) {

        this.tripForm = this.fb.group({
            name: '',
            description: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            accounts: this.fb.array([]),
            checklistItems: this.fb.array([]),
            document: [null, null],
        });

        this.checklistItemsList = this.tripForm.get('checklistItems') as FormArray;
        this.accountsList = this.tripForm.get('accounts') as FormArray;

        this.tripForm.get('dateFrom').valueChanges.subscribe(data => this.checkEmployees());
        this.tripForm.get('dateTo').valueChanges.subscribe(data => this.checkEmployees());
    }

    createAccount() {

    }

    createCheckListItem(item) {
        return this.fb.group({
            name: [item.name ? item.name : '', Validators.required],
            price: [item.price ? item.price : '', Validators.required]
        });
    }

    ngOnInit() {
        this.employeeService.getAllEmployees()
        .subscribe(data => {
            this.employees = data;
        });
    }

    checkEmployees() {
        this.employees.forEach(employee => {

            this.employeeService.checkIfEmployeeFree(employee.id, this.tripForm.value.dateFrom.toISOString(), this.tripForm.value.dateTo.toISOString())
                .subscribe(data => {
                    employee.isFree = data;
                });
        });
    }

    async onSubmit() {
        const dto = this.tripForm.value;

        this.tripService.createTrip(dto)
        .subscribe(trip => {
            this.tripService.getTripRequests();
            this.upploadAttachments(trip).subscribe((resp) => {
                console.log(resp);
                // this.router.navigateByUrl('/trips');
            });
        });
    }

    selectEmployee(id) {
        if (this.accountsList.value.findIndex(account => account.id === id) >= 0) {
            this.accountsList.removeAt(id);
        } else {
            this.accountsList.push(this.fb.group({
                id
            }));
        }

    }

    onAddNewItem() {
        if (!this.item.name && !this.item.price) {
            return 0;
        }

        this.checklistItemsList.push(this.createCheckListItem(this.item));
        this.item = {name: null, isChecked: null, price: null};
    }

    private upploadAttachments(trip: Trip): Observable<any[]> {
        for (let i = 0; i < this.uploader.queue.length; i++) {
            let fileItem = this.uploader.queue[i]._file;
            if(fileItem.size > 10000000){
                alert("Each File should be less than 10 MB of size.");
                throw Error();
            }
        }
        let uploads = [];
        for (let j = 0; j < this.uploader.queue.length; j++) {
            let fileItem = this.uploader.queue[j]._file;
            uploads.push(this.tripService.uploadTripFile(trip.id, fileItem));
        }
        this.uploader.clearQueue();
        return forkJoin([ ...uploads ]);
    }
}
