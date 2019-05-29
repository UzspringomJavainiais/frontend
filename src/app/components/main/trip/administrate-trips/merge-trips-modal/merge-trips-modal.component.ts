import { Component, OnInit } from "@angular/core";
import { TripService } from "../../../../../_services/trip.service";
import { Trip } from "../../../../../models/trip";

@Component({
  selector: "app-merge-trips-modal",
  templateUrl: "./merge-trips-modal.component.html",
  styleUrls: ["./merge-trips-modal.component.css"]
})
export class MergeTripsModalComponent implements OnInit {
  public trips: Trip[] = [];
  public mergeTrips = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => {
      this.trips = data;
    });
  }

  selectTrip(id) {
    this.mergeTrips = [...this.mergeTrips, id];
  }

  submitMerge() {
    this.tripService.mergeTrips(this.mergeTrips).subscribe(data => {
      console.log(data);
    })
  }
}
