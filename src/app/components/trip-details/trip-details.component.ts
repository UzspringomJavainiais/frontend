import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
const trips = require("../../../mocks/trips.json");

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  public trips = trips;
  public trip: object;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =+ params['id'];

      this.trip = trips.find(trip => trip.id === this.id);
      console.log(this.trip);
    })
  }

}
