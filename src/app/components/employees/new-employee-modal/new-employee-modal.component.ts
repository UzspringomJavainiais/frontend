import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../../_services/apartment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../_services/employee.service';

@Component({
    selector: 'app-new-employee-modal',
    templateUrl: './new-employee-modal.component.html',
    styleUrls: ['./new-employee-modal.component.css']
})
export class NewEmployeeModalComponent implements OnInit {
    public addEmployeeForm: FormGroup;

    constructor(private employeeService: EmployeeService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.addEmployeeForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            roles: this.fb.array([])
        });
    }

    saveEmployee() {
        const employee = this.addEmployeeForm.value;
        console.log('pridedamas: ', employee);
        return;
        this.employeeService.saveEmployees(employee)
            .subscribe(data => console.log('saved employee'));
    }
}
