import { Component, OnInit } from "@angular/core";
import { TripService } from "src/app/_services/trip.service";
import { Trip } from "../../../../models/trip";
import { AccountService } from "src/app/_services/account.service";

@Component({
  selector: "app-new-trip",
  templateUrl: "./new-trip.component.html",
  styleUrls: ["./new-trip.component.css"]
})
export class NewTripComponent implements OnInit {
  public accounts;
  public trip: Trip = {
    name: "",
    // account: [
    //   {
    //     name: ""
    //   }
    // ],
    description: "",
    checkListItems: [{ name: "", isChecked: false, price: null }]
  };
  item = { name: "", isChecked: false, price: null };
  public name: string;
  public itemName: string;
  public account: string;
  public description: string;

  constructor(
    private tripService: TripService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
      console.log(this.account);
    });
  }

  onSubmit() {
    // this.trip = {
    //   name: "labas",
    //   description: "NAXUI"
    // };
    this.tripService.createTrip(this.trip).subscribe(data => console.log(data));
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
