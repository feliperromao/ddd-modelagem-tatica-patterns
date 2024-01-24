import Address from "./address";

export default class Customer {
    private id: string;
    private name: string;
    private address!: Address;
    private active: boolean = false;
    private rewardPoints: number = 0;

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

    addRewardPoints(points: number) {
        this.rewardPoints += points;
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

    getRewardPoints(): number {
        return this.rewardPoints;
    }

    getName(): string {
        return this.name;
    }
    getId(): string {
        return this.id
    }

    isActive(): boolean {
        return this.active
    }
}