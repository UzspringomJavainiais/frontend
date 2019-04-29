import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
const trips = require("../../../mocks/trips.json");

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"]
})
export class TripsComponent implements OnInit {
  public dataSource = trips;
  private clickedId;

  constructor(private router: Router) {}

  ngOnInit() {}

  getTripDetails = (id: number) => {
    this.router.navigate(['/trip-details', id]);
  };
}
