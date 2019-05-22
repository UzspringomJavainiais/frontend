import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TripsService } from "src/app/trips.service";
import { EmployeeService } from "../../../../_services/employee.service";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"]
})
export class TripsComponent implements OnInit {
  public trips = [];
  public myTrips = [];

  constructor(
    private router: Router,
    private tripsService: TripsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.tripsService.getTrips().subscribe(data => (this.trips = data));

    this.employeeService
      .getMyTrips(2)
      .subscribe((data: any[]) => (this.myTrips = data));
  }

  getTripDetails = (id: number) => {
    this.router.navigate(["/trip-details", id]);
  };
}
