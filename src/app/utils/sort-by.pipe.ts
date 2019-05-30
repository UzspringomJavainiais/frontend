import { Pipe, PipeTransform } from '@angular/core';
import { Employee, SortableEmployee } from '../models/Employee';

@Pipe({
    name: 'SortBy',
    pure: false,
})
export class SortByPipe implements PipeTransform {

    transform(employees: Array<SortableEmployee>, args?: string): any {
        if (!employees || employees === undefined || employees.length === 0) return null;
        return employees.sort(e => e.isChecked ? -1 : 1);
    }
}