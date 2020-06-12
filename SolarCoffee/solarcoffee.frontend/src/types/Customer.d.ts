export class ICustomer {
  id: number;
  createdOn: Date;
  updatedOn?: Date;
  firstName: String;
  lastName: String;
  primaryAddress: IAddress;
}

export class IAddress {
  id: number;
  createdOn: Date;
  updatedOn?: Date;
  addressLine1: String;
  addressLine2: String;
  city: String;
  state: String;
  postalCode: String;
  country: String;
}