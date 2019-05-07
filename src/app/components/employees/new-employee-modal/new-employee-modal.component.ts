import {Component, OnInit} from '@angular/core';
import {ApartmentService} from '../../../_services/apartment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../_services/employee.service';
import {RoleService} from '../../../_services/role.service';

@Component({
    selector: 'app-new-employee-modal',
    templateUrl: './new-employee-modal.component.html',
    styleUrls: ['./new-employee-modal.component.css']
})
export class NewEmployeeModalComponent implements OnInit {
    public addEmployeeForm: FormGroup;
    public roles: any;

    constructor(private employeeService: EmployeeService,
                private fb: FormBuilder,
                private roleService: RoleService) {
    }

    ngOnInit() {
        this.addEmployeeForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required],
            roles: ['', Validators.required]
        });

        this.getRoles();
    }

    saveEmployee() {
        const employee = this.addEmployeeForm.value;
        employee.roleIds = employee.roles.map(role => role.id);
        console.log('pridedamas: ', employee);
        this.employeeService.saveEmployees(employee)
            .subscribe(data => console.log('saved employee'));
    }

    private getRoles() {
        this.roleService.getAllRoles()
            .subscribe(data => this.roles = data);
    }
}
