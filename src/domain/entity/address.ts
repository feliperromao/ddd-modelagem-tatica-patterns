export default class Address {
  private street: string = "";
  private number: number = 0;
  private zip: string = "";
  private city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this.street = street;
    this.number = number;
    this.zip = zip;
    this.city = city;

    this.validate();
  }


  validate() {
    if (this.street.length === 0) {
      throw new Error("street is required");
    }
    if (this.number === 0) {
      throw new Error("number is required");
    }
    if (this.zip.length === 0) {
      throw new Error("zip is required");
    }
    if (this.city.length === 0) {
      throw new Error("city is required");
    }
  }

  toString() {
    return `${this.street} ${this.number} ${this.zip} ${this.city}`;
  }
}