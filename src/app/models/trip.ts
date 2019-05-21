export interface Trip {
    name: string;
    accounts: [];
    description: string;
    dateFrom: Date;
    dateTo: Date;
    checklistItems: [{name: null, isChecked: null, price: null}];
}
