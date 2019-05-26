import { CheckListItem } from './checkListItem';

export interface Trip {
    id?: number;
    name: string;
    accounts: [];
    description: string;
    dateFrom: Date;
    dateTo: Date;
    checklistItems: CheckListItem[];
}
