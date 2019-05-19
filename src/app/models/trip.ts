export interface Trip {
  name: string;
  // account: [
  //   {
  //     sta
  //   }
  // ];
  description: string;
  checkListItems: [{ name: string; isChecked: boolean; price: number }];
}
