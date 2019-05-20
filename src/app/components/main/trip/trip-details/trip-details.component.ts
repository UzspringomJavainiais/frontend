import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TripsService } from "src/app/trips.service";
import { EmployeeService } from "src/app/_services/employee.service";
import { Employee } from "../../../../models/Employee";

@Component({
  selector: "app-trip-details",
  templateUrl: "./trip-details.component.html",
  styleUrls: ["./trip-details.component.css"]
})
export class TripDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  public trips = [];
  public trip: any;
  employees: Employee[] = [];

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.tripsService.getTrips().subscribe(data => {
      this.trips = data;
      this.sub = this.route.params.subscribe(params => {
        this.id = +params["id"];

        this.trip = this.trips.find(trip => trip.id === this.id);
      });

      this.employeeService.getAllEmployees().subscribe(employeeData => {
        console.log(employeeData);
        this.trips.forEach(trip => {
          employeeData.forEach(employee => {
            trip.accounts.forEach(account => {
              if (employee.id === account) {
                this.employees.push(employee);
              }
            })
          });
        });
      });
      console.log(this.employees);
    });
  }
}
