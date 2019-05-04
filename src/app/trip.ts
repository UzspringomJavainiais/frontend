export interface ITrip {
  id: number;
  name: string;
  numberOfEmpoyees: number;
  dateFrom: Date;
  emploees: {
    id: number;
    name: string;
  };
}
