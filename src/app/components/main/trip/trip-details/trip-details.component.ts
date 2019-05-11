import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from "src/app/trips.service";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  public trips = [];
  public trip: object;

  constructor(private route: ActivatedRoute, private _tripsService: TripsService) {}

  ngOnInit() {
    this._tripsService.getTrips().subscribe(data => {
      this.trips = data;

      this.sub = this.route.params.subscribe(params => {
        this.id =+ params['id'];
  
        this.trip = this.trips.find(trip => trip.id === this.id);
      })
    });
  }

}
