import {Component, OnInit} from '@angular/core';
import {TripService} from 'src/app/_services/trip.service';
import {Trip} from '../../../../models/trip';
import {EmployeeService} from 'src/app/_services/employee.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-trip',
    templateUrl: './new-trip.component.html',
    styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
    public employees;
    public trip: Trip = {
        name: '',
        accounts: [],
        description: '',
        dateFrom: new Date(),
        dateTo: new Date(),
        checklistItems: [{name: null, isChecked: null, price: null}]
    };

    item: any = {name: null, isChecked: null, price: null};

    constructor(private tripService: TripService,
                private employeeService: EmployeeService,
                private router: Router) {
    }

    ngOnInit() {
        this.employeeService.getAllEmployees().subscribe(data => {
            this.employees = data;
        });
    }

    onSubmit() {
        this.tripService.createTrip(this.trip)
            .subscribe(data => {
                this.router.navigateByUrl('/trips');
            });
    }

    selectEmployee(id: never) {
        // @ts-ignore
        this.trip.accounts.push({id});
    }

    onAddNewItem() {
        if (!this.item.name && !this.item.price) {
            return 0;
        }

        this.trip.checklistItems.push(this.item as any);
        this.item = {name: null, isChecked: null, price: null};
    }
}
