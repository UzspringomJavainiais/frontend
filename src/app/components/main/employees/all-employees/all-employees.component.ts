import { Component, OnInit } from "@angular/core";
import { NewRoleModalComponent } from "../new-role-modal/new-role-modal.component";
import { MatDialog } from "@angular/material";
import { EmployeeService } from "../../../../_services/employee.service";
import { NewEmployeeModalComponent } from "../new-employee-modal/new-employee-modal.component";
import { EmployeeEditModalComponent } from "../employee-edit-modal/employee-edit-modal.component";
import { Employee } from "../../../../models/Employee";

@Component({
  selector: "app-all-employees",
  templateUrl: "./all-employees.component.html",
  styleUrls: ["./all-employees.component.css"]
})
export class AllEmployeesComponent implements OnInit {
  public employees: Employee[];
  public selectedEmployee: Employee;

  constructor(
    private matDialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  openAddNewEmployeeModal() {
    const matDialogRef = this.matDialog.open(NewEmployeeModalComponent);
    matDialogRef.afterClosed().subscribe(data => this.getEmployees());
  }

  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  editEmployee(id) {
    this.getSelectedEmployee(id);
  }

  getSelectedEmployee(id) {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.selectedEmployee = data.find(data => data.id === id);
      const matDialogRef = this.matDialog.open(EmployeeEditModalComponent, {
        data: this.selectedEmployee
      });
      matDialogRef.afterClosed().subscribe(data => this.getEmployees());
    });
  }
}
