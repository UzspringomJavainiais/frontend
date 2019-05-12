export interface Trip {
  name: string;
  account: [
    {
      name: string;
    }
  ];
  description: string;
  checkListItems: [{ name: string; isChecked: boolean; price: number }];
}
