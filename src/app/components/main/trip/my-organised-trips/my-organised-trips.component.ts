import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/_services/trip.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-organised-trips",
  templateUrl: "./my-organised-trips.component.html",
  styleUrls: ["./my-organised-trips.component.css"]
})
export class MyOrganisedTripsComponent implements OnInit {
  public trips = [];

  constructor(private router: Router, private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getMyOrganisedTrips().subscribe(trips => {
      this.trips = trips;
      console.log(this.trips);
    });
  }

  getTripDetails = (id: number) => {
    this.router.navigate(["/trip-details", id]);
  };
}
