import {Component, OnInit} from '@angular/core';
import {NewRoleModalComponent} from '../new-role-modal/new-role-modal.component';
import {MatDialog} from '@angular/material';
import {EmployeeService} from '../../../_services/employee.service';
import {NewEmployeeModalComponent} from '../new-employee-modal/new-employee-modal.component';

@Component({
    selector: 'app-all-employees',
    templateUrl: './all-employees.component.html',
    styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
    public employees: any;

    constructor(private matDialog: MatDialog, private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.getEmployees();
    }

    openAddNewEmployeeModal() {
        const matDialogRef = this.matDialog.open(NewEmployeeModalComponent);
        matDialogRef.afterClosed()
            .subscribe(data => this.getEmployees());
    }

    private getEmployees() {
        this.employeeService.getAllEmployees()
            .subscribe(data => this.employees = data);
    }
}
