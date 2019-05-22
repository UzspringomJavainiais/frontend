import { CheckListItem } from './checkListItem';

export interface Trip {
    name: string;
    accounts: [];
    description: string;
    dateFrom: Date;
    dateTo: Date;
    checklistItems: CheckListItem[];
}
