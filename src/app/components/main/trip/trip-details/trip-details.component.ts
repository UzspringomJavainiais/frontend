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
  public trip: any;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripsService.getTripById(+params.id).subscribe(data => {
        this.trip = data;
        console.log(data);
      });
    });
  }
}
