import Address from "./address";

export default class Customer {
    private id: string;
    private name: string;
    private address!: Address;
    private active: boolean = false;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    validate() {
        if (this.id.length === 0) {
            throw new Error("Id is required");
        }

        if (this.name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this.name = name;
        this.validate();
    }

    activate() {
        if (this.address === undefined) {
            throw new Error("Address is required to activade a customer")
        }
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    setAddress(address: Address) {
        this.address = address;
    }

    getName(): string {
        return this.name;
    }

    isActive(): boolean {
        return this.active
    }
}