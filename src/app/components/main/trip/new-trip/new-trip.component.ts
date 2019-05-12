import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/_services/trip.service";
import { Trip } from "../../../../models/trip";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.component.html",
  styleUrls: ["./new-trip.component.css"]
})
export class NewTripComponent implements OnInit {
  public trip: Trip = {
    name: "",
    account: [
      {
        name: ""
      }
    ],
    description: "",
    checkListItems: [{ name: "", isChecked: false, price: null }]
  };
  typesOfShoes: string[] = [
    "Boots",
    "Clogs",
    "Loafers",
    "Moccasins",
    "Sneakers"
  ];
  item = { name: "", isChecked: false, price: null };
  public name: string;
  public itemName: string;
  public account: string;
  public description: string;

  constructor(private tripService: TripService) {}

  ngOnInit() {}

  onSubmit() {
    this.tripService.createTrip(this.trip.checkListItems).subscribe(data => console.log(data));
  }

  onAddNewItem() {
    this.item = {
      name: this.itemName,
      isChecked: false,
      price: 0
    };
    this.trip.checkListItems.push(this.item);
    this.itemName = "";
  }
}
