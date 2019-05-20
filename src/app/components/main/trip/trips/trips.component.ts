import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TripsService } from "src/app/trips.service";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"]
})
export class TripsComponent implements OnInit {
  private clickedId;
  public trips = [];

  constructor(private router: Router, private tripsService: TripsService) {}

  ngOnInit() {
    this.tripsService.getTrips().subscribe(data => (this.trips = data));
  }

  getTripDetails = (id: number) => {
    this.router.navigate(["/trip-details", id]);
  };
}
