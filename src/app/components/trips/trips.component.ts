import { Component, OnInit } from '@angular/core';
const trips = require("../../../mocks/trips.json");

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  dataSource = trips;

  constructor() {
  }

  ngOnInit() {
  }

}
