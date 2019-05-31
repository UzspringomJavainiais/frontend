import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmployeeService} from 'src/app/_services/employee.service';
import {RoleService} from 'src/app/_services/role.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Employee} from '../../../../models/Employee';

@Component({
    selector: 'app-employee-edit-modal',
    templateUrl: './employee-edit-modal.component.html',
    styleUrls: ['./employee-edit-modal.component.css']
})
export class EmployeeEditModalComponent implements OnInit {
    public editEmployeeForm: FormGroup;
    public selectedEmployee: Employee;
    public roles: any;
    id: number;

    constructor(private employeeService: EmployeeService,
                private fb: FormBuilder,
                private roleService: RoleService,
                public dialogRef: MatDialogRef<EmployeeEditModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {

        this.selectedEmployee = data;
    }

    ngOnInit() {
        this.editEmployeeForm = this.fb.group({
            id: [this.selectedEmployee.id],
            firstName: [this.selectedEmployee.firstName, Validators.required],
            lastName: [this.selectedEmployee.lastName, Validators.required],
            password: ['', Validators],
            email: [this.selectedEmployee.email, Validators.required],
            roles: ['', Validators]
        });
        this.getRoles();
    }

    saveEmployee() {
        const employee = this.editEmployeeForm.value;
        this.employeeService
            .editEmployee(employee)
            .subscribe(data => {
                console.log('Edited employee');
                this.dialogRef.close();
            });
    }

    private getRoles() {
        this.roleService.getAllRoles()
            .subscribe(data => {
                this.roles = data;
                this.editEmployeeForm.patchValue({roles: data});
            });
    }
}
