import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TripService } from "src/app/_services/trip.service";
import { AuthService } from "src/app/_services/auth.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/_services/employee.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"]
})
export class EditTripComponent implements OnInit {
  public employees;
  public trip;

  item: any = { name: null, isChecked: null, price: null };

  public tripForm: FormGroup;
  public checklistItemsList: FormArray;
  public accountsList: FormArray;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.tripForm = this.fb.group({
      name: "",
      description: "",
      dateFrom: new Date(),
      dateTo: new Date(),
      accounts: this.fb.array([]),
      checklistItems: this.fb.array([])
    });

    this.checklistItemsList = this.tripForm.get("checklistItems") as FormArray;
    this.accountsList = this.tripForm.get("accounts") as FormArray;

    this.tripForm
      .get("dateFrom")
      .valueChanges.subscribe(data => this.checkEmployees());
    this.tripForm
      .get("dateTo")
      .valueChanges.subscribe(data => this.checkEmployees());
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripService.getTripById(+params.id).subscribe(data => {
        this.trip = data;

        this.trip.checklistItems.map(item => {
          this.checklistItemsList.push(
            this.fb.group({
              name: [item.name? item.name : "", Validators.required],
              price: [item.price ? item.price : "", Validators.required]
            })
          );
        });

        this.tripForm = this.fb.group({
          name: this.trip.name,
          description: this.trip.description,
          dateFrom: this.trip.dateFrom,
          dateTo: this.trip.dateTo,
          accounts: this.fb.array([]),
          checklistItems: this.fb.array([])
        });

        this.employeeService.getAllEmployees().subscribe(data => {
          this.employees = data;
        });

        this.accountsList = this.tripForm.get("accounts") as FormArray;
      });
    });
  }

  checkEmployees() {
    this.employees.forEach(employee => {
      this.employeeService
        .checkIfEmployeeFree(
          employee.id,
          this.tripForm.value.dateFrom.toISOString(),
          this.tripForm.value.dateTo.toISOString()
        )
        .subscribe(data => {
          employee.isFree = data;
        });
    });
  }

  createCheckListItem(item) {
    return this.fb.group({
      name: [item.name ? item.name : "", Validators.required],
      price: [item.price ? item.price : "", Validators.required]
    });
  }

  onSubmit() {
    const dto = this.tripForm.value;

    this.tripService.editTrip(this.tripForm).subscribe(data => {
      this.tripService.getTripRequests();
      this.router.navigateByUrl("/my-trips");
    });
  }

  selectEmployee(id) {
    if (this.accountsList.value.findIndex(account => account.id === id) >= 0) {
      this.accountsList.removeAt(id);
    } else {
      this.accountsList.push(
        this.fb.group({
          id
        })
      );
    }
  }

  onAddNewItem() {
    if (!this.item.name && !this.item.price) {
      return 0;
    }

    this.checklistItemsList.push(this.createCheckListItem(this.item));
    this.item = { name: null, isChecked: null, price: null };
  }
}
