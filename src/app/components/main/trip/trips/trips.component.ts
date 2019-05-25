import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TripService } from "src/app/_services/trip.service";
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
    private tripService: TripService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => (this.trips = data));

    this.employeeService
      .getMyTrips(2)
      .subscribe((data: any[]) => (this.myTrips = data));
  }

  getTripDetails = (id: number) => {
    this.router.navigate(["/trip-details", id]);
  };
}
