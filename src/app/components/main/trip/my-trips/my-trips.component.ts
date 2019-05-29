import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from 'src/app/_services/trip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  public trips = [];

  constructor(private router: Router, private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getMyTrips().subscribe(trips => {
      this.trips = trips;
    });
  }

  getTripDetails = (id: number) => {
    this.router.navigate(['/trip-details', id]);
  }
}
