export interface Trip {
  name: string;
  accounts: [];
  description: string;
  dateFrom: Date;
  dateUntil: Date;
  checkListItems: [{ name: string; isChecked: boolean; price: number }];
}
