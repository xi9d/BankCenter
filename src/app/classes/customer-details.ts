export class CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  pin: string;

  constructor(firstName: string, lastName: string, email: string, pin: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.pin = pin;
  }
}

export class Customer {
  public id: number;
  public name: string;
  public email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
