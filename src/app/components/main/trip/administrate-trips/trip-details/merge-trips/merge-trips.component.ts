import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TripService } from "src/app/_services/trip.service";
import { Trip } from "../../../../../../models/trip";

@Component({
  selector: "app-merge-trips",
  templateUrl: "./merge-trips.component.html",
  styleUrls: ["./merge-trips.component.css"]
})
export class MergeTripsComponent implements OnInit {
  trip: Trip;
  mergeTrip: Trip;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.tripService.getTripById(param.tripId).subscribe(data => {
        this.trip = data;
        console.log(this.trip);
      });
      this.tripService.getTripById(param.mergeId).subscribe(data => {
        this.mergeTrip = data;
        console.log(this.mergeTrip);
      });
    });
  }

  submitMerge() {
    this.tripService
      .mergeTrips(this.trip.id, this.mergeTrip.id)
      .subscribe(data => {
        this.router.navigate(["administrate-trips"]);
      });
  }
}
