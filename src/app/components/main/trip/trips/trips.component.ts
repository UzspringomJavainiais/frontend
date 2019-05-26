import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeeService } from "../../../../_services/employee.service";
import { TripService } from "../../../../_services/trip.service";
import * as FileSaver from "file-saver";
import { MatDialog } from "@angular/material";
import { MergeTripsModalComponent } from "../merge-trips-modal/merge-trips-modal.component";
import { Trip } from "../../../../models/trip";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"]
})
export class TripsComponent implements OnInit {
  public trips: Trip[] = [];
  public myTrips = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private tripService: TripService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => (this.trips = data));

    this.employeeService
      .getMyTrips(2)
      .subscribe((data: any[]) => (this.myTrips = data));
  }

  getCsvData() {
    this.tripService.getTripsCsv().subscribe(data => {
      const blob = new Blob([data as any], { type: "text/plain" });
      FileSaver.saveAs(blob, "export.csv", false);
    });
  }

  getTripDetails = (id: number) => {
    this.router.navigate(["/trip-details", id]);
  };

  mergeTrips() {
    const matDialogRef = this.matDialog.open(MergeTripsModalComponent);
    matDialogRef.afterClosed().subscribe(data => {
      this.tripService.getTrips().subscribe(data => (this.trips = data));
    });
  }
}
