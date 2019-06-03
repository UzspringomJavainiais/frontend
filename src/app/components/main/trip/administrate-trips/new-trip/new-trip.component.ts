import {Component, OnInit} from '@angular/core';
import {TripService} from 'src/app/_services/trip.service';
import {Trip} from '../../../../../models/trip';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Observable, of, forkJoin } from 'rxjs';
import { Employee, SortableEmployee } from 'src/app/models/Employee';
import * as moment from 'moment';
import { ApartmentService } from 'src/app/_services/apartment.service';

@Component({
    selector: 'app-new-trip',
    templateUrl: './new-trip.component.html',
    styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
    public employees: SortableEmployee[];
    apartments: any;
    from: any;
    to: any;

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
                private fb: FormBuilder,
                private apartmentService: ApartmentService) {

        this.tripForm = this.fb.group({
            name: ['', Validators.required],
            description: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            accounts: this.fb.array([]),
            from: '',
            to: ''
        });

        this.checklistItemsList = this.tripForm.get('checklistItems') as FormArray;
        this.accountsList = this.tripForm.get('accounts') as FormArray;

        this.tripForm.get('dateFrom').valueChanges.subscribe(date => {
            if (this.tripForm.get('dateTo').value < date) {
                this.tripForm.get('dateTo').setValue(date);
            }
        });
        this.tripForm.get('dateTo').valueChanges.subscribe(date => {
            if (this.tripForm.get('dateFrom').value > date) {
                this.tripForm.get('dateFrom').setValue(date);
            }
        });
    }

    setEmployeesAvailability(): SortableEmployee[] {
        return this.employees.map(e => {
            const newE = e;
            newE.isFree = this.isEmployeeFree(e);
            return newE;
        });
    }

    createCheckListItem(item) {
        return this.fb.group({
            name: [item.name ? item.name : '', Validators.required],
            price: [item.price ? item.price : '', Validators.required]
        });
    }

    ngOnInit() {
        this.employeeService.getAllEmployees(true)
        .subscribe(data => {
            this.employees = data.map(e => new SortableEmployee(e));
        });

        this.apartmentService.getAllApartments().subscribe(apartments => {
            this.apartments = apartments;
        });
    }

    async onSubmit() {
        if (this.tripForm.valid && !this.employees.some(e => !this.isEmployeeFree(e) && e.isChecked)) {
            const dto = this.tripForm.value;
            this.tripService.createTrip(dto)
            .subscribe(trip => {
                this.tripService.getTripRequests();
                this.router.navigate(['/my-trips/add-attachments', trip.tripId]);
            });
        }
    }

    selectEmployee(employee: SortableEmployee): void {
        const index = this.employees.findIndex(e => e.id === employee.id);
        if (this.isEmployeeFree(employee)) { 
            if (index !== -1) {
                this.employees[index].isChecked = !this.employees[index].isChecked;
            }

            if (this.accountsList.value.findIndex(account => account.id === employee.id) >= 0) {
                this.accountsList.removeAt(employee.id);
            } else {
                this.accountsList.push(this.fb.group({ id: employee.id }));
            }
        } else if (index !== -1 && this.employees[index].isChecked) {
            this.employees[index].isChecked = !this.employees[index].isChecked;
        }
    }

    onAddNewItem() {
        if (!this.item.name && !this.item.price) {
            return 0;
        }

        this.checklistItemsList.push(this.createCheckListItem(this.item));
        this.item = {name: null, isChecked: null, price: null};
    }

    getNumberOfSelectedEmployees(): number {
        return this.employees ? this.employees.filter(e => e.isChecked).length : 0;
    }

    isPreviousDate(date: Date): boolean {
        const someDate = new Date(date);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.getTime() <= someDate.getTime();
    }

    busyDateClassSelector(employee: SortableEmployee): (date: Date) => string {
        return (date: Date) => {
            if (!employee.calendarEntries || employee.calendarEntries.length === 0) return undefined;
            
            let d = moment(date).format("YYYY-MM-DD");
            return employee.calendarEntries.some(entry => isDateBetween(entry.start, entry.end, d)) 
                ? 'busy-date' 
                : undefined;
        }
    }

    isEmployeeFree(employee: Employee): boolean {
        let from = moment(this.tripForm.get('dateFrom').value).format("YYYY-MM-DD");
        let to = moment(this.tripForm.get('dateTo').value).format("YYYY-MM-DD");
        return !employee.calendarEntries.some(entry => isDateBetween(entry.start, entry.end, from))
            && !employee.calendarEntries.some(entry => isDateBetween(entry.start, entry.end, to));
    }
}

const isDateBetween = 
    (startDate: Date, endDate: Date, dateToCheck): boolean => {
        return dateToCheck >= startDate && dateToCheck <= endDate;
    }
