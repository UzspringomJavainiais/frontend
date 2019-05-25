import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TripService } from "src/app/_services/trip.service";

@Component({
  selector: "app-trip-details",
  templateUrl: "./trip-details.component.html",
  styleUrls: ["./trip-details.component.css"]
})
export class TripDetailsComponent implements OnInit {
  public trip: any;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripService.getTripById(+params.id).subscribe(data => {
        this.trip = data;
      });
    });
  }
}
