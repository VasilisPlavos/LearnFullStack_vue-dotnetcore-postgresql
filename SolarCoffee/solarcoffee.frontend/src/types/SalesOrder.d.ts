import { ICustomer } from "./Customer.d";
import { ILineItems } from "./Invoice.d";

export interface SalesOrder {
  id: number;
  createdOn: Date;
  updatedOn?: Date;
  customer: ICustomer;
  isPaid: boolean;
  salesOrderItems: ILineItems[];
}
