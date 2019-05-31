export interface Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  calendarEntries?: CalendarEntry[];
}

export class SortableEmployee implements Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  calendarEntries: CalendarEntry[];

  isChecked: boolean = false;
  isFree: boolean = true;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.email = employee.email;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.password = employee.password;
    this.calendarEntries = employee.calendarEntries;
  }
}

export interface CalendarEntry {
  tripId: number,
  start: Date,
  end: Date,
  type: string,
};