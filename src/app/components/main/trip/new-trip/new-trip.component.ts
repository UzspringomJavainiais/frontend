import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/_services/trip.service";
import { Trip } from "../../../../models/trip";
import { EmployeeService } from "src/app/_services/employee.service";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.component.html",
  styleUrls: ["./new-trip.component.css"]
})
export class NewTripComponent implements OnInit {
  public employees;
  public trip: Trip = {
    name: "",
    accounts: [],
    description: "",
    dateFrom: new Date(),
    dateUntil: new Date(),
    checkListItems: [{ name: null, isChecked: null, price: null }]
  };
  item = { name: "", isChecked: false, price: null };

  constructor(
    private tripService: TripService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  onSubmit() {
    console.log(this.trip);
    this.trip.checkListItems.shift();
    this.tripService.createTrip(this.trip).subscribe(data => console.log(data));
  }

  selectEmployee(id: never) {
    this.trip.accounts.push(id);
  }

  onAddNewItem() {
    if (!this.item.name && !this.item.price) {
      return 0;
    }

    this.trip.checkListItems.push(this.item);
  }
}
